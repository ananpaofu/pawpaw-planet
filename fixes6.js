/* 爪爪星球 v1.72 补丁：任务三态视觉区分 + 真实墨镜与落地的家具 */
(function () {
  'use strict';

  /* ---------- 一、任务面板三态 ---------- */
  var baseOpenTasks = window.openTasks;
  if (typeof baseOpenTasks === 'function') {
    window.openTasks = function () {
      baseOpenTasks();
      var body = document.getElementById('modalBody');
      if (!body) return;
      Array.prototype.forEach.call(body.querySelectorAll('.task-item'), function (item) {
        var btn = item.querySelector('[data-task]');
        if (!btn) return;
        var label = (btn.textContent || '').trim();
        if (label === '已领取') item.setAttribute('data-state', 'claimed');
        else if (label === '未完成') item.setAttribute('data-state', 'todo');
        else item.setAttribute('data-state', 'ready');
      });
    };
  }

  /* ---------- 二、真实墨镜 ---------- */
  var GLASS_SVG =
    '<svg viewBox="0 0 100 38" xmlns="http://www.w3.org/2000/svg">' +
    '<defs>' +
    '<linearGradient id="pzG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4a4a70"/><stop offset=".5" stop-color="#1a1a30"/><stop offset="1" stop-color="#0b0b18"/></linearGradient>' +
    '<linearGradient id="pzS" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".6"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>' +
    '</defs>' +
    '<path d="M4 12 L18 14 M82 14 L96 12" stroke="#2a2a44" stroke-width="3" stroke-linecap="round"/>' +
    '<rect x="16" y="8" width="31" height="23" rx="9" fill="url(#pzG)" stroke="#5ee7ff" stroke-width="1.4"/>' +
    '<rect x="53" y="8" width="31" height="23" rx="9" fill="url(#pzG)" stroke="#5ee7ff" stroke-width="1.4"/>' +
    '<path d="M47 14 Q50 10 53 14" stroke="#2a2a44" stroke-width="3" fill="none"/>' +
    '<path d="M20 12 L31 12 L25 22 L18 22 Z" fill="url(#pzS)" opacity=".65"/>' +
    '<path d="M57 12 L68 12 L62 22 L55 22 Z" fill="url(#pzS)" opacity=".65"/>' +
    '</svg>';

  var baseRenderOutfits = window.renderOutfits;
  if (typeof baseRenderOutfits === 'function') {
    window.renderOutfits = function () {
      baseRenderOutfits();
      var layer = document.getElementById('outfitLayer');
      if (!layer) return;
      Array.prototype.forEach.call(layer.querySelectorAll('.outfit-glass'), function (el) {
        el.classList.add('glass-real');
        el.innerHTML = GLASS_SVG;
      });
    };
  }

  /* ---------- 三、真实落地的家具（SVG） ---------- */
  var FURN_SVG = {
    lamp: '<svg viewBox="0 0 80 200" xmlns="http://www.w3.org/2000/svg"><defs>' +
      '<linearGradient id="lampShade" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5ee7ff"/><stop offset="1" stop-color="#ff6ba9"/></linearGradient>' +
      '<radialGradient id="lampGlow"><stop offset="0" stop-color="#5ee7ff" stop-opacity=".45"/><stop offset="1" stop-color="#5ee7ff" stop-opacity="0"/></radialGradient></defs>' +
      '<ellipse cx="40" cy="192" rx="22" ry="5" fill="rgba(0,0,0,.5)"/><ellipse cx="40" cy="72" rx="46" ry="46" fill="url(#lampGlow)"/>' +
      '<rect x="37" y="72" width="6" height="116" fill="#4a4666"/><ellipse cx="40" cy="189" rx="19" ry="5" fill="#5b5677"/>' +
      '<path d="M18 72 L62 72 L52 30 L28 30 Z" fill="url(#lampShade)" opacity=".92"/><ellipse cx="40" cy="30" rx="12" ry="4" fill="#ffe9a8"/></svg>',
    rug: '<svg viewBox="0 0 280 64" xmlns="http://www.w3.org/2000/svg"><defs>' +
      '<radialGradient id="rugG"><stop offset="0" stop-color="#b07bff"/><stop offset="1" stop-color="#5ee7ff"/></radialGradient></defs>' +
      '<ellipse cx="140" cy="52" rx="132" ry="9" fill="rgba(0,0,0,.4)"/>' +
      '<ellipse cx="140" cy="36" rx="128" ry="24" fill="url(#rugG)" opacity=".7"/>' +
      '<ellipse cx="140" cy="34" rx="112" ry="18" fill="none" stroke="#ffd166" stroke-width="2" opacity=".55"/>' +
      '<ellipse cx="140" cy="34" rx="86" ry="12" fill="none" stroke="#fff" stroke-width="1" opacity=".3"/></svg>',
    sign: '<svg viewBox="0 0 120 56" xmlns="http://www.w3.org/2000/svg">' +
      '<rect x="4" y="6" width="112" height="42" rx="8" fill="#161334" stroke="#ff6ba9" stroke-width="2"/>' +
      '<text x="60" y="27" fill="#ff6ba9" font-size="13" font-weight="700" text-anchor="middle" font-family="sans-serif">PAW</text>' +
      '<text x="60" y="41" fill="#5ee7ff" font-size="9" text-anchor="middle" font-family="sans-serif">CYBER HOUSE</text></svg>',
    plant: '<svg viewBox="0 0 80 110" xmlns="http://www.w3.org/2000/svg">' +
      '<ellipse cx="40" cy="104" rx="22" ry="5" fill="rgba(0,0,0,.45)"/>' +
      '<path d="M40 70 Q18 50 24 24 Q40 34 40 70" fill="#3fbf7f"/><path d="M40 70 Q62 48 58 20 Q42 34 40 70" fill="#57d98f"/>' +
      '<path d="M40 70 Q40 36 40 12 Q52 40 40 70" fill="#7ff0ad"/>' +
      '<path d="M22 70 L58 70 L53 104 L27 104 Z" fill="#b06b4a"/><rect x="20" y="66" width="40" height="8" rx="3" fill="#c47a54"/></svg>',
    bed: '<svg viewBox="0 0 150 70" xmlns="http://www.w3.org/2000/svg">' +
      '<ellipse cx="75" cy="62" rx="66" ry="7" fill="rgba(0,0,0,.45)"/>' +
      '<path d="M14 46 Q10 24 34 22 Q46 8 66 20 Q84 8 100 22 Q124 20 132 42 Q128 58 100 58 L44 58 Q18 58 14 46 Z" fill="#eef0ff"/>' +
      '<path d="M30 40 Q60 30 118 40" stroke="#cdd2f5" stroke-width="2" fill="none"/></svg>',
    bowl: '<svg viewBox="0 0 80 50" xmlns="http://www.w3.org/2000/svg">' +
      '<ellipse cx="40" cy="44" rx="28" ry="5" fill="rgba(0,0,0,.45)"/>' +
      '<path d="M12 20 Q40 34 68 20 Q64 42 40 42 Q16 42 12 20 Z" fill="#5ee7ff"/>' +
      '<ellipse cx="40" cy="20" rx="28" ry="8" fill="#ff6ba9"/><ellipse cx="40" cy="20" rx="20" ry="5" fill="#ffd166"/></svg>',
    window: '<svg viewBox="0 0 120 110" xmlns="http://www.w3.org/2000/svg"><defs>' +
      '<linearGradient id="winSky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1b2a6b"/><stop offset="1" stop-color="#4a2a7a"/></linearGradient></defs>' +
      '<rect x="8" y="6" width="104" height="94" rx="10" fill="url(#winSky)" stroke="#5ee7ff" stroke-width="3"/>' +
      '<circle cx="34" cy="30" r="2" fill="#fff"/><circle cx="78" cy="24" r="1.6" fill="#fff"/><circle cx="60" cy="52" r="2" fill="#ffd166"/><circle cx="92" cy="60" r="1.4" fill="#fff"/>' +
      '<path d="M60 6 L60 100 M8 53 L112 53" stroke="#5ee7ff" stroke-width="2" opacity=".7"/></svg>',
    poster: '<svg viewBox="0 0 80 100" xmlns="http://www.w3.org/2000/svg">' +
      '<rect x="6" y="6" width="68" height="88" rx="4" fill="#241a44" stroke="#ffd166" stroke-width="3"/>' +
      '<text x="40" y="48" font-size="30" text-anchor="middle">🐱</text><text x="40" y="80" font-size="26" text-anchor="middle">🐶</text></svg>',
    tree: '<svg viewBox="0 0 120 200" xmlns="http://www.w3.org/2000/svg">' +
      '<ellipse cx="60" cy="192" rx="42" ry="6" fill="rgba(0,0,0,.45)"/>' +
      '<rect x="50" y="40" width="20" height="150" rx="6" fill="#8a6b52"/>' +
      '<ellipse cx="60" cy="44" rx="40" ry="12" fill="#c9a97e"/><ellipse cx="60" cy="106" rx="32" ry="10" fill="#d8bb90"/>' +
      '<path d="M20 44 Q10 20 34 10 Q40 30 20 44" fill="#57d98f"/><path d="M100 106 Q112 84 88 74 Q82 96 100 106" fill="#7ff0ad"/></svg>',
    toybox: '<svg viewBox="0 0 90 70" xmlns="http://www.w3.org/2000/svg">' +
      '<ellipse cx="45" cy="64" rx="36" ry="5" fill="rgba(0,0,0,.45)"/>' +
      '<rect x="12" y="22" width="66" height="40" rx="6" fill="#ff8ab5"/><rect x="10" y="16" width="70" height="12" rx="6" fill="#ff6ba9"/>' +
      '<circle cx="45" cy="42" r="8" fill="#ffd166"/><path d="M40 42 L50 42 M45 37 L45 47" stroke="#fff" stroke-width="2"/></svg>'
  };

  var baseRenderFurniture = window.renderFurniture;
  if (typeof baseRenderFurniture === 'function') {
    window.renderFurniture = function () {
      baseRenderFurniture();
      var layer = document.getElementById('furnitureLayer');
      if (!layer) return;
      Array.prototype.forEach.call(layer.querySelectorAll('.furniture-item'), function (el) {
        var cls = (el.className || '').split(' ').find(function (c) { return c.indexOf('furniture-') === 0 && c !== 'furniture-item'; });
        if (!cls) return;
        var id = cls.slice('furniture-'.length);
        var svg = FURN_SVG[id];
        if (!svg) return;
        el.classList.add('fr-real', 'fr-' + id);
        el.innerHTML = svg;
      });
    };
  }

  /* ---------- 样式 ---------- */
  var css = document.createElement('style');
  css.textContent = [
    /* 任务三态 */
    '.task-item[data-state="claimed"]{opacity:.42;filter:grayscale(.8)}',
    '.task-item[data-state="claimed"] .mini-btn{background:rgba(255,255,255,.06)!important;border-color:rgba(255,255,255,.12)!important;color:#9a98b5!important;cursor:default}',
    '.task-item[data-state="todo"]{opacity:.62;filter:saturate(.45)}',
    '.task-item[data-state="todo"] .mini-btn{background:rgba(255,255,255,.05)!important;border-color:rgba(255,255,255,.14)!important;color:#a6a4c4!important;cursor:default}',
    '.task-item[data-state="ready"]{border-color:rgba(255,209,102,.55);background:rgba(255,209,102,.08);box-shadow:0 0 0 1px rgba(255,209,102,.2)}',
    '.task-item[data-state="ready"] .mini-btn{background:linear-gradient(135deg,#ffd166,#ff8ab5)!important;color:#24102a!important;font-weight:700;border:0!important;animation:pzGlow 1.8s ease-in-out infinite}',
    '@keyframes pzGlow{0%,100%{box-shadow:0 0 0 0 rgba(255,209,102,.5)}50%{box-shadow:0 0 0 5px rgba(255,209,102,0)}}',
    /* 真实墨镜 */
    '.outfit-glass.glass-real{font-size:0!important;width:44%!important;top:41%!important}',
    '.outfit-glass.glass-real svg{display:block;width:100%;height:auto}',
    /* 真实家具：落地/贴墙 + 投影 */
    '.furniture-item.fr-real{font-size:0!important;filter:drop-shadow(0 8px 10px rgba(0,0,0,.5))}',
    '.furniture-item.fr-real svg{display:block;width:100%;height:100%}',
    '.fr-lamp{left:6%;bottom:4%;width:64px;height:180px}',
    '.fr-rug{left:50%;bottom:3%;width:min(52%,280px);height:64px;transform:translateX(-50%)}',
    '.fr-sign{right:5%;top:9%;width:120px;height:56px}',
    '.fr-plant{right:7%;bottom:5%;width:80px;height:110px}',
    '.fr-bed{left:13%;bottom:5%;width:150px;height:70px}',
    '.fr-bowl{right:23%;bottom:4%;width:80px;height:50px}',
    '.fr-window{left:7%;top:8%;width:120px;height:110px}',
    '.fr-poster{left:5%;top:36%;width:80px;height:100px}',
    '.fr-tree{right:13%;bottom:6%;width:120px;height:200px}',
    '.fr-toybox{left:26%;bottom:3%;width:90px;height:70px}',
    '@media(max-width:600px){',
    '.fr-lamp{width:40px;height:110px}.fr-rug{height:46px}.fr-sign{width:84px;height:40px}',
    '.fr-plant{width:52px;height:72px}.fr-bed{width:96px;height:46px}.fr-bowl{width:52px;height:34px}',
    '.fr-window{width:78px;height:72px}.fr-poster{width:54px;height:68px}.fr-tree{width:76px;height:128px}.fr-toybox{width:58px;height:46px}',
    '}'
  ].join('');
  document.head.appendChild(css);

  /* 首次刷新已渲染的内容 */
  window.addEventListener('load', function () {
    setTimeout(function () {
      if (typeof window.renderOutfits === 'function') window.renderOutfits();
      if (typeof window.renderFurniture === 'function') window.renderFurniture();
    }, 30);
  });
})();
