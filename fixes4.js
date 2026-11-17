/* 爪爪星球 v1.6 根因修复：初始化前抢先恢复完整存档
   解决 extras.js 的 ensureExtrasState() 先 persist 覆盖存档、
   再 loadProfileState() 读回被覆盖数据，导致每次刷新都变新用户的问题。*/
(function () {
  'use strict';
  var STORE = 'paw-planet-v1';

  function restoreFullState() {
    var best = null;
    try { best = JSON.parse(localStorage.getItem(STORE) || '{}') || {}; } catch (e) {}
    if (!best || !best.adopted) {
      try {
        for (var i = 0; i < localStorage.length; i++) {
          var k = localStorage.key(i);
          if (k && k.indexOf(STORE + ':profile:') === 0) {
            var snap = null;
            try { snap = JSON.parse(localStorage.getItem(k) || '{}'); } catch (e) {}
            if (snap && snap.adopted) { best = snap; break; }
          }
        }
      } catch (e) {}
    }
    if (best && typeof best === 'object') {
      Object.keys(best).forEach(function (key) { saved[key] = best[key]; });
    }
    // 同步写回主存档，避免后续脚本顶层(如 fixes2)再读到旧的空状态
    try { localStorage.setItem(STORE, JSON.stringify(saved)); } catch (e) {}
  }

  restoreFullState();
})();
