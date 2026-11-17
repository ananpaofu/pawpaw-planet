/* 爪爪星球 v1.7 补丁（昵称版）：手机端响应式 + 弹幕列表显示他人昵称与头像 */
(function () {
  'use strict';

  function injectResponsiveCss() {
    var css = document.createElement('style');
    css.textContent = [
      '@media (max-width: 600px){',
      '.topbar-right{flex-wrap:wrap;justify-content:flex-start;gap:6px}',
      '.topbar-right>*{flex:0 0 auto!important;white-space:nowrap!important}',
      '.account-pill,.coin-pill,.room-pill,.online-pill,.ghost-btn{flex:none!important;white-space:nowrap!important}',
      '.ghost-btn{padding:7px 9px}',
      '.quickstart-bar{padding:8px 10px;gap:6px}',
      '.qs-title{font-size:13px;width:100%}',
      '.qs-steps{margin-left:0}',
      '}',
      '@media (max-width: 380px){',
      '.account-pill,.coin-pill,.room-pill,.online-pill,.ghost-btn{font-size:13px;padding:6px 8px}',
      '}'
    ].join('');
    document.head.appendChild(css);
  }

  // 接收：他人弹幕写入列表，显示对方昵称 + 头像
  if (typeof launchDanmaku === 'function') {
    var prevLaunch = launchDanmaku;
    launchDanmaku = function (msg, own) {
      prevLaunch(msg, own);
      if (!own && msg && msg.text && (msg.nick || msg.user)) {
        try {
          var user = msg.nick || (msg.user === '你' ? '铲屎官' : msg.user) || '游客';
          var list = saved.messages || (saved.messages = []);
          var last = list[list.length - 1];
          if (!last || last.text !== msg.text || last.time !== msg.time || last.user !== user) {
            list.push({
              avatar: msg.avatar || '🐾',
              user: user,
              text: msg.text,
              time: msg.time || Date.now(),
              own: false
            });
            saved.messages = list.slice(-40);
            if (typeof persist === 'function') persist();
            if (typeof renderMessages === 'function') renderMessages();
          }
        } catch (e) {}
      }
    };
  }

  // 发送：把本机昵称附带进消息，让对方显示真实昵称
  if (typeof sendSocketDanmaku === 'function') {
    var prevSend = sendSocketDanmaku;
    sendSocketDanmaku = function (msg) {
      var out = null;
      try {
        out = {};
        for (var k in msg) {
          if (Object.prototype.hasOwnProperty.call(msg, k)) out[k] = msg[k];
        }
        out.nick = saved.nickname || '游客';
      } catch (e) { out = msg; }
      prevSend(out);
    };
  }

  window.addEventListener('load', function () { setTimeout(injectResponsiveCss, 0); });
})();
