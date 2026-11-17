/* 爪爪星球 v1.4 体验补丁：登录状态保持 + 记住账号 + 提示置顶 + 新手引导 */
(function () {
  'use strict';
  var STORE = 'paw-planet-v1';
  var QS_DISMISS = STORE + ':quickstart-dismissed';
  var LAST_USER = STORE + ':lastUser';

  function guessRecentAccount() {
    var prefix = STORE + ':profile:u:';
    var best = null, bestT = -1;
    try {
      for (var i = 0; i < localStorage.length; i++) {
        var k = localStorage.key(i);
        if (!k || k.indexOf(prefix) !== 0) continue;
        var d = JSON.parse(localStorage.getItem(k) || '{}');
        var t = Number(d.lastSeen || d.createdAt || 0);
        if (t > bestT) { bestT = t; best = 'u:' + k.slice(prefix.length); }
      }
    } catch (e) {}
    return best;
  }

  function isReturningUser() {
    try {
      var g = JSON.parse(localStorage.getItem(STORE + ':profile:guest') || '{}');
      if (g.adopted) return true;
      for (var i = 0; i < localStorage.length; i++) {
        var k = localStorage.key(i);
        if (k && k.indexOf(STORE + ':profile:u:') === 0) {
          var d = JSON.parse(localStorage.getItem(k) || '{}');
          if (d.adopted) return true;
        }
      }
    } catch (e) {}
    return false;
  }

  // 必须在 extras.js 注册 initExtras(window load)之前恢复账号
  try {
    var raw = JSON.parse(localStorage.getItem(STORE) || '{}');
    var profile = raw && typeof raw.profile === 'string' ? raw.profile : '';
    if (!profile || profile === 'guest') {
      var guest = JSON.parse(localStorage.getItem(STORE + ':profile:guest') || '{}');
      if (!guest.adopted) {
        var guessed = guessRecentAccount();
        if (guessed) profile = guessed;
      }
    }
    if (profile) {
      saved.profile = profile;
      if (raw && typeof raw.nickname === 'string') saved.nickname = raw.nickname;
    }
    if (isReturningUser()) saved.tutorialDone = true;
  } catch (e) {}

  window.addEventListener('load', function () { setTimeout(setupUI, 0); });

  function setupUI() {
    var row = document.getElementById('toolRow');
    if (!row) return;

    var css = document.createElement('style');
    css.textContent = [
      '.toast{z-index:120!important}',
      '.quickstart-bar{max-width:1400px;margin:0 auto 12px;padding:10px 14px;display:flex;flex-wrap:wrap;align-items:center;gap:10px;background:linear-gradient(90deg,rgba(255,107,169,.14),rgba(94,231,255,.10));border:1px solid var(--line);border-radius:14px}',
      '.qs-title{font-weight:700;font-size:14px}',
      '.qs-steps{display:flex;flex-wrap:wrap;gap:8px;margin-left:auto}',
      '.qs-steps button{border:1px solid var(--line);background:rgba(255,255,255,.05);color:var(--text);border-radius:20px;padding:6px 11px;font-size:13px;cursor:pointer;transition:.2s}',
      '.qs-steps button:hover{background:rgba(255,107,169,.2);border-color:rgba(255,107,169,.55)}',
      '@media(max-width:760px){.qs-steps{margin-left:0}}'
    ].join('');
    document.head.appendChild(css);

    if (!document.getElementById('qsGuideBtn')) {
      var g = document.createElement('button');
      g.className = 'tool-btn';
      g.id = 'qsGuideBtn';
      g.type = 'button';
      g.textContent = '🚀 新手上路';
      g.addEventListener('click', function () {
        var bar = document.getElementById('quickStart');
        if (!bar) { buildBar(); return; }
        bar.hidden = !bar.hidden;
        if (bar.hidden) localStorage.setItem(QS_DISMISS, '1');
        else localStorage.removeItem(QS_DISMISS);
      });
      row.appendChild(g);
    }

    if (!localStorage.getItem(QS_DISMISS)) buildBar();

    function buildBar() {
      if (document.getElementById('quickStart')) return;
      var bar = document.createElement('div');
      bar.id = 'quickStart';
      bar.className = 'quickstart-bar';
      bar.innerHTML =
        '<span class="qs-title">🚀 第一次来？照着顺序点，一分钟上手</span>' +
        '<div class="qs-steps">' +
        '<button data-qs="guide" type="button">📖 详细指引</button>' +
        '<button data-qs="adopt" type="button">🐾 领养</button>' +
        '<button data-qs="feed" type="button">🍽️ 投喂</button>' +
        '<button data-qs="pat" type="button">🖐️ 摸摸</button>' +
        '<button data-qs="dm" type="button">💬 弹幕</button>' +
        '<button data-qs="task" type="button">📋 任务</button>' +
        '<button data-qs="decor" type="button">🛋️ 布置窝</button>' +
        '<button data-qs="close" type="button">✕ 收起</button>' +
        '</div>';
      row.parentNode.insertBefore(bar, row.nextSibling);
      bar.addEventListener('click', function (e) {
        var b = e.target.closest('[data-qs]');
        if (!b) return;
        var a = b.getAttribute('data-qs');
        if (a === 'guide') { if (typeof openTutorial === 'function') openTutorial(0); }
        else if (a === 'adopt') { if (typeof openAdoption === 'function' && !saved.adopted) openAdoption(); else flash('#petList'); }
        else if (a === 'feed') flash('#feedPanel');
        else if (a === 'pat') flash('#btnPet');
        else if (a === 'dm') { flash('.danmaku-panel'); var inp = document.getElementById('dmInput'); if (inp) setTimeout(function () { inp.focus(); }, 300); }
        else if (a === 'task') { if (typeof openTasks === 'function') openTasks(); }
        else if (a === 'decor') { if (typeof openRoomDecor === 'function') openRoomDecor(); }
        else if (a === 'close') { bar.hidden = true; localStorage.setItem(QS_DISMISS, '1'); }
      });
    }

    function flash(sel) {
      var el = document.querySelector(sel);
      if (!el) return;
      if (el.scrollIntoView) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      el.style.transition = 'box-shadow .3s';
      el.style.boxShadow = '0 0 0 2px rgba(255,107,169,.9), 0 0 26px rgba(255,107,169,.5)';
      setTimeout(function () { el.style.boxShadow = ''; }, 1600);
    }

    watchAccountForm();
  }

  // 记住上次输入的用户名 + 让浏览器原生密码管理器识别表单
  function watchAccountForm() {
    var root = document.getElementById('modalRoot');
    if (!root || !window.MutationObserver) return;
    var lastUser = '';
    try { lastUser = localStorage.getItem(LAST_USER) || ''; } catch (e) {}
    var mo = new MutationObserver(function () {
      var u = document.getElementById('accUser');
      var p = document.getElementById('accPass');
      var submit = document.getElementById('accSubmit');
      if (!u || !p || !submit) return;
      if (!u.getAttribute('data-fix')) {
        u.setAttribute('data-fix', '1');
        u.setAttribute('name', 'username');
        u.setAttribute('autocomplete', 'username');
        if (lastUser) u.value = lastUser;
      }
      if (!p.getAttribute('data-fix')) {
        p.setAttribute('data-fix', '1');
        p.setAttribute('name', 'password');
        p.setAttribute('autocomplete', 'current-password');
      }
      if (!submit.getAttribute('data-fix')) {
        submit.setAttribute('data-fix', '1');
        submit.addEventListener('click', function () {
          var el = document.getElementById('accUser');
          var v = el ? el.value.trim().slice(0, 16) : '';
          if (v) {
            lastUser = v;
            try { localStorage.setItem(LAST_USER, v); } catch (e) {}
          }
        });
      }
    });
    mo.observe(root, { childList: true, subtree: true });
  }
})();
