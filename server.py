import base64
import hashlib
import os
import json
import socket
import struct
import threading

GUID = "258EAFA5-E914-47DA-95CA-C5AB0DC85B11"
clients = {}
lock = threading.Lock()


def send_frame(conn, payload, opcode=1):
    data = payload.encode("utf-8") if isinstance(payload, str) else payload
    header = bytearray([0x80 | opcode])
    n = len(data)
    if n < 126:
        header.append(n)
    elif n < 65536:
        header.append(126)
        header.extend(struct.pack(">H", n))
    else:
        header.append(127)
        header.extend(struct.pack(">Q", n))
    try:
        conn.sendall(bytes(header) + data)
    except OSError:
        pass


def broadcast(room, text, exclude):
    with lock:
        targets = [c for c, r in clients.items() if r == room and c is not exclude]
    for c in targets:
        send_frame(c, text)


def recv_exact(conn, n):
    buf = b""
    while len(buf) < n:
        chunk = conn.recv(n - len(buf))
        if not chunk:
            return None
        buf += chunk
    return buf


def handle(conn):
    try:
        request = b""
        while b"\r\n\r\n" not in request:
            chunk = conn.recv(4096)
            if not chunk:
                conn.close()
                return
            request += chunk
        key = ""
        is_websocket = False
        for line in request.decode("utf-8", "ignore").split("\r\n"):
            lower = line.lower()
            if lower.startswith("upgrade: websocket"):
                is_websocket = True
            if lower.startswith("sec-websocket-key:"):
                key = line.split(":", 1)[1].strip()
        if not is_websocket or not key:
            body = b"Paw Planet relay OK"
            conn.sendall((
                "HTTP/1.1 200 OK\r\n"
                "Content-Type: text/plain; charset=utf-8\r\n"
                "Content-Length: " + str(len(body)) + "\r\n"
                "Connection: close\r\n\r\n"
            ).encode() + body)
            return
        accept = base64.b64encode(hashlib.sha1((key + GUID).encode()).digest()).decode()
        conn.sendall((
            "HTTP/1.1 101 Switching Protocols\r\n"
            "Upgrade: websocket\r\n"
            "Connection: Upgrade\r\n"
            "Sec-WebSocket-Accept: " + accept + "\r\n\r\n"
        ).encode())
        room = "公开舍"
        with lock:
            clients[conn] = room
        while True:
            head = recv_exact(conn, 2)
            if not head:
                break
            opcode = head[0] & 0x0F
            masked = bool(head[1] & 0x80)
            length = head[1] & 0x7F
            if length == 126:
                ext = recv_exact(conn, 2)
                if not ext:
                    break
                length = struct.unpack(">H", ext)[0]
            elif length == 127:
                ext = recv_exact(conn, 8)
                if not ext:
                    break
                length = struct.unpack(">Q", ext)[0]
            mask = recv_exact(conn, 4) if masked else None
            payload = recv_exact(conn, length) if length else b""
            if payload is None:
                break
            if mask:
                payload = bytes(b ^ mask[i % 4] for i, b in enumerate(payload))
            if opcode == 8:
                break
            if opcode == 9:
                send_frame(conn, payload, 10)
                continue
            if opcode != 1:
                continue
            try:
                msg = json.loads(payload.decode("utf-8"))
            except (ValueError, UnicodeDecodeError):
                continue
            if msg.get("type") == "room":
                room = str(msg.get("room") or "公开舍")[:16]
                with lock:
                    clients[conn] = room
            elif msg.get("type") == "danmaku":
                broadcast(room, payload.decode("utf-8"), conn)
    except OSError:
        pass
    finally:
        with lock:
            clients.pop(conn, None)
        try:
            conn.close()
        except OSError:
            pass


def main():
    server = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    server.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
    port = int(os.environ.get("PORT", "8765"))
    server.bind(("0.0.0.0", port))
    server.listen(128)
    print("Paw Planet relay running on port " + str(port))
    try:
        while True:
            conn, _ = server.accept()
            threading.Thread(target=handle, args=(conn,), daemon=True).start()
    except KeyboardInterrupt:
        pass
    finally:
        server.close()


if __name__ == "__main__":
    main()

