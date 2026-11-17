/* 爪爪星球 v1.5 补丁：补发新手基础食物（一次性） */
(function () {
  'use strict';
  var STORE = 'paw-planet-v1';
  var BASICS = ['fish', 'can', 'mint', 'kibble', 'bone', 'chicken', 'stick', 'dogfood'];

  function restoreStarterFoods() {
    try {
      if (saved.starterFoodsRestored) return;
      var inv = saved.inventory || (saved.inventory = {});
      var changed = false;
      BASICS.forEach(function (id) {
        if (!(inv[id] > 0)) { inv[id] = 15; changed = true; }
      });
      saved.starterFoodsRestored = true;
      saved.starterInventoryDone = true;
      if (typeof persist === 'function') persist();
      if (changed && typeof renderFoods === 'function') renderFoods();
      if (changed && typeof toast === 'function') toast('已补发新手食物：每种 15 份');
    } catch (e) {}
  }

  window.addEventListener('load', function () { setTimeout(restoreStarterFoods, 50); });
})();
