/* 爪爪星球 v1.7 补丁：手机端响应式优化 + 弹幕列表显示他人弹幕与头像 */

(function () {
  'use strict';

  // 1) 手机端：顶部信息条不再被挤成竖排，改为自动换行
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

  // 2) 把其他用户发来的弹幕也写入弹幕列表（带头像），自己的弹幕已有逻辑不重复处理
  // 本文件在 extras.js 之后加载，此时 launchDanmaku 已被 extras.js 包装
  if (typeof launchDanmaku === 'function') {
    var prevLaunch = launchDanmaku;
    launchDanmaku = function (msg, own) {
      prevLaunch(msg, own);
      if (!own && msg && msg.text && msg.user) {
        try {
          var user = (msg.user === '你') ? '铲屎官' : msg.user;
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

  window.addEventListener('load', function () { setTimeout(injectResponsiveCss, 0); });
})();
