/* 爪爪星球 v1.73 补丁：装扮跟随宠物 + 家具前后层级 + 完整版本更新历史 */
(function () {
  'use strict';

  /* ---------- 一、装扮跟随宠物走动 ---------- */
  // 宠物的左右走动动画作用在 #petArt .pet-walker 上，
  // 装扮层原本挂在 pet-zone 里，所以不跟着动。把它移进 walker 即可。
  function attachOutfitToWalker() {
    var layer = document.getElementById('outfitLayer');
    var walker = document.querySelector('#petArt .pet-walker');
    if (!layer || !walker) return;
    if (layer.parentElement !== walker) walker.appendChild(layer);
  }

  var baseRenderPet7 = window.renderPet;
  if (typeof baseRenderPet7 === 'function') {
    window.renderPet = function () {
      baseRenderPet7();
      attachOutfitToWalker();
    };
  }
  var baseRenderOutfits7 = window.renderOutfits;
  if (typeof baseRenderOutfits7 === 'function') {
    window.renderOutfits = function () {
      baseRenderOutfits7();
      attachOutfitToWalker();
    };
  }

  /* ---------- 二、家具前后层级 ---------- */
  var FURN_DEPTH = {
    window: 1, poster: 1, sign: 1,
    tree: 2, lamp: 2,
    rug: 3,
    bed: 4, bowl: 4, toybox: 4,
    plant: 5
  };
  function ensureFgLayer() {
    var fg = document.getElementById('foregroundLayer');
    if (!fg) {
      fg = document.createElement('div');
      fg.id = 'foregroundLayer';
      fg.className = 'foreground-layer';
      var stage = document.getElementById('stage');
      if (stage) stage.appendChild(fg);
    }
    return fg;
  }
  var baseRenderFurniture7 = window.renderFurniture;
  if (typeof baseRenderFurniture7 === 'function') {
    window.renderFurniture = function () {
      baseRenderFurniture7();
      var layer = document.getElementById('furnitureLayer');
      var fg = ensureFgLayer();
      if (fg) fg.innerHTML = '';
      if (!layer) return;
      Array.prototype.forEach.call(layer.querySelectorAll('.furniture-item'), function (el) {
        var cls = (el.className || '').split(' ').find(function (c) {
          return c.indexOf('furniture-') === 0 && c !== 'furniture-item' && c.indexOf('fr-') !== 0;
        });
        if (!cls) return;
        var id = cls.slice('furniture-'.length);
        var depth = FURN_DEPTH[id] || 3;
        if (depth >= 5) {
          fg.appendChild(el);
        } else {
          el.style.zIndex = String(depth);
        }
      });
    };
  }

  /* ---------- 三、完整版本更新历史 ---------- */
  var CHANGELOG = [
    { v: '1.0', notes: '爪爪星球上线：猫狗图鉴、投喂摸摸、弹幕、盲盒、装扮等基础玩法' },
    { v: '1.1', notes: '支持 Railway 联机弹幕，新增自动更新提示' },
    { v: '1.2', notes: '联机弹幕中继接入，统一版本号管理静态资源缓存' },
    { v: '1.3', notes: '修复登录状态丢失与重复领养弹窗；新手指引改为按钮随时查看；新增新手上路引导条' },
    { v: '1.4', notes: '记住账号自动填充；错误提示置顶不再被弹窗遮挡' },
    { v: '1.5', notes: '补发新手基础食物' },
    { v: '1.6', notes: '彻底修复刷新后重复领养与数据丢失：初始化前恢复完整存档' },
    { v: '1.7', notes: '优化手机端适配；弹幕列表可查看其他用户昵称与头像' },
    { v: '1.71', notes: '调整版本号节奏，改用 1.7x 小版本递进' },
    { v: '1.72', notes: '任务按钮三态区分；装扮升级为真实墨镜与落地的家具' },
    { v: '1.73', notes: '装扮跟随宠物走动；家具增加前后层级；更新提示展示全部历史版本' }
  ];

  window.checkVersionUpdate = function (offlineHours) {
    var current = String(window.SITE_VERSION || '1.0');
    var previous = saved.lastVersion || '';
    saved.lastVersion = current;
    try { if (typeof persist === 'function') persist(); } catch (e) {}
    if (!previous || previous === current) return false;
    var notes = String(window.SITE_NOTES || '');
    var list = CHANGELOG.map(function (x) {
      var cur = x.v === current;
      return '<div class="pz-ver' + (cur ? ' cur' : '') + '"><b>v' + x.v + '</b><span>' + (typeof esc === 'function' ? esc(x.notes) : x.notes) + '</span></div>';
    }).join('');
    var html = '<div class="card"><h3>🆕 爪爪星球更新啦</h3>' +
      '<p>上次版本：v' + (typeof esc === 'function' ? esc(previous) : previous) + ' → 当前 v' + current + '</p>' +
      '<p>' + (typeof esc === 'function' ? esc(notes) : notes) + '</p>' +
      '<div class="pz-changelog">' + list + '</div>' +
      '<div class="card-actions" style="margin-top:12px"><button class="mini-btn" id="updateOk" type="button">知道了</button></div></div>';
    if (typeof openModal === 'function') openModal('更新到 v' + current, html, '你的宠物和资产都已保留');
    var ok = document.getElementById('updateOk');
    if (ok) ok.onclick = function () {
      if (typeof closeModal === 'function') closeModal();
      if (offlineHours && typeof showOfflinePopup === 'function') showOfflinePopup(offlineHours);
    };
    return true;
  };

  /* ---------- 样式 ---------- */
  var css = document.createElement('style');
  css.textContent = [
    '.foreground-layer{position:absolute;inset:0;pointer-events:none;z-index:5}',
    '.pz-changelog{max-height:240px;overflow:auto;margin-top:10px;border-top:1px solid var(--line);padding-top:8px}',
    '.pz-ver{display:flex;gap:8px;font-size:13px;padding:5px 0;color:var(--muted);line-height:1.45;border-bottom:1px solid rgba(255,255,255,.05)}',
    '.pz-ver b{color:var(--cyan);flex:none;width:42px}',
    '.pz-ver.cur{color:var(--text)}',
    '.pz-ver.cur b{color:var(--yellow)}',
    '.outfit-layer{z-index:6!important}'
  ].join('');
  document.head.appendChild(css);

  window.addEventListener('load', function () {
    setTimeout(function () {
      attachOutfitToWalker();
      if (typeof window.renderFurniture === 'function') window.renderFurniture();
    }, 40);
  });
})();
