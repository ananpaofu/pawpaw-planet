const RARE_PETS = [
  { id: 'ragdoll', type: 'cat', name: '布丁', emoji: '🐈', desc: '布偶猫，赛博棉花糖', main: '#e8d8c8', belly: '#fff8f0', inner: '#ffb3c1', patch: '#b89a86', rare: true, stats: { satiety: 70, mood: 82, bond: 50 } },
  { id: 'border', type: 'dog', name: '闪电', emoji: '🐕', desc: '边牧，智商在线但拆家也快', main: '#5b5f70', belly: '#ffffff', ear: '#3e424f', patch: '#ffffff', rare: true, stats: { satiety: 74, mood: 86, bond: 52 } },
  { id: 'stardust', type: 'cat', name: '星尘', emoji: '🐱', desc: '银白长毛猫，尾巴会发光', main: '#cbd5e1', belly: '#ffffff', inner: '#f7a6c0', patch: '#8fa3bf', rare: true, stats: { satiety: 78, mood: 90, bond: 60 } },
  { id: 'meteor', type: 'dog', name: '陨石', emoji: '🐶', desc: '陨石色牧羊犬，眼神很深邃', main: '#6d7488', belly: '#f3f1ea', ear: '#444b5e', patch: '#f3f1ea', rare: true, stats: { satiety: 80, mood: 92, bond: 62 } }
];
const NEW_PETS = [
  { id: 'sesame', type: 'cat', name: '芝麻', emoji: '🐈', desc: '狸花猫，野外生存专家', main: '#9c8a76', belly: '#e8ded0', inner: '#ffb0a8', patch: '#5f5448', stats: { satiety: 68, mood: 74, bond: 40 } },
  { id: 'snowball', type: 'cat', name: '雪球', emoji: '🐱', desc: '白猫，雪地里会隐形', main: '#f6f4f0', belly: '#ffffff', inner: '#ffc0cb', stats: { satiety: 72, mood: 80, bond: 45 } },
  { id: 'coffee', type: 'cat', name: '咖啡', emoji: '🐈', desc: '暹罗猫，话多且理直气壮', main: '#d8c3a5', belly: '#f7ead6', inner: '#ff9e9e', patch: '#6b5548', stats: { satiety: 60, mood: 70, bond: 38 } },
  { id: 'silver', type: 'cat', name: '银月', emoji: '🐱', desc: '银渐层，自带冷白皮', main: '#b9c0cc', belly: '#f2f4f7', inner: '#f2a6b6', stats: { satiety: 75, mood: 78, bond: 48 } },
  { id: 'wangcai', type: 'dog', name: '旺财', emoji: '🐕', desc: '金毛，见谁都像亲兄弟', main: '#e3b06a', belly: '#fff0d5', ear: '#c58a45', stats: { satiety: 80, mood: 88, bond: 55 } },
  { id: 'cola', type: 'dog', name: '可乐', emoji: '🐶', desc: '腊肠犬，腿短但气势足', main: '#a96036', belly: '#e9b98f', ear: '#7d4227', stats: { satiety: 66, mood: 82, bond: 44 } },
  { id: 'cream', type: 'dog', name: '奶盖', emoji: '🐕', desc: '萨摩耶，微笑是默认的', main: '#f3f1e8', belly: '#ffffff', ear: '#d7d5cb', stats: { satiety: 74, mood: 90, bond: 50 } },
  { id: 'blackie', type: 'dog', name: '阿黑', emoji: '🐶', desc: '黑背，巡逻队队长', main: '#4b5566', belly: '#e7e9ee', ear: '#2f3642', patch: '#e7e9ee', stats: { satiety: 62, mood: 76, bond: 42 } }
];
const LIMITED_FOODS = [
  { id: 'star_pudding', type: 'cat', emoji: '🍮', name: '星尘布丁', s: 26, m: 18, limited: true },
  { id: 'gold_fish', type: 'cat', emoji: '🐠', name: '黄金小鱼干', s: 30, m: 12, limited: true },
  { id: 'cosmo_bone', type: 'dog', emoji: '🦴', name: '宇宙骨头', s: 28, m: 16, limited: true },
  { id: 'rainbow_can', type: 'dog', emoji: '🌈', name: '彩虹罐头', s: 32, m: 20, limited: true }
];
const TASKS = [
  { id: 'checkin3', emoji: '📅', name: '连续签到 3 天', desc: '每天签到不中断', reward: 30, food: 'star_pudding', check: () => saved.checkin.streak >= 3 },
  { id: 'feed5', emoji: '🐟', name: '累计投喂 5 次', desc: '喂饱毛孩子', reward: 25, food: 'gold_fish', check: () => saved.counters.feed >= 5 },
  { id: 'pat50', emoji: '🖐️', name: '累计摸摸 50 次', desc: '手感才是核心竞争力', reward: 40, food: 'cosmo_bone', check: () => saved.counters.pat >= 50 },
  { id: 'mood100', emoji: '🌈', name: '让任意宠物心情满值', desc: '把心情条点到 100', reward: 35, food: 'rainbow_can', check: () => PETS.some((p) => statOf(p).mood >= 100) },
  { id: 'decor3', emoji: '🛋️', name: '摆放 3 件家具', desc: '把宠物窝布置起来', reward: 30, furniture: 'bed', check: () => saved.roomFurniture.length >= 3 },
  { id: 'theme2', emoji: '🎨', name: '体验 2 种房间主题', desc: '给窝换个心情', reward: 25, furniture: 'poster', check: () => (saved.themesTried || []).length >= 2 }
];
const OUTFITS = [
  { id: 'hat_neon', slot: 'hat', name: '霓虹小帽', emoji: '🎩', price: 20 },
  { id: 'hat_bow', slot: 'hat', name: '蝴蝶结', emoji: '🎀', price: 28 },
  { id: 'scarf', slot: 'scarf', name: '条纹围巾', emoji: '🧣', price: 25 },
  { id: 'glasses', slot: 'glass', name: '赛博墨镜', emoji: '🕶️', price: 35 },
  { id: 'collar', slot: 'collar', name: '星星项圈', emoji: '🌟', price: 22 }
];
const FURNITURE = [
  { id: 'lamp', name: '霓虹落地灯', emoji: '💡', price: 30 },
  { id: 'rug', name: '软乎乎地毯', emoji: '🟣', price: 24 },
  { id: 'sign', name: '赛博招牌', emoji: '🪧', price: 28 },
  { id: 'plant', name: '太空绿植', emoji: '🪴', price: 20 },
  { id: 'bed', name: '云朵窝', emoji: '☁️', price: 40 },
  { id: 'bowl', name: '彩虹食盆', emoji: '🥣', price: 18 },
  { id: 'window', name: '星空窗', emoji: '🌌', price: 45 },
  { id: 'poster', name: '猫狗海报', emoji: '🖼️', price: 22 },
  { id: 'tree', name: '猫爬架', emoji: '🌳', price: 50 },
  { id: 'toybox', name: '玩具箱', emoji: '🧸', price: 26 }
];
const ROOM_THEMES = [
  { id: 'neon', name: '霓虹夜', emoji: '🌆' },
  { id: 'star', name: '星空', emoji: '🌌' },
  { id: 'warm', name: '暖窝', emoji: '🛋️' },
  { id: 'cyber', name: '赛博', emoji: '🤖' }
];
const EVENT_DEFS = [
  { id: 'delivery', emoji: '📦', text: '门口出现一个神秘快递', good: '拆开看看', bad: '先放一边' },
  { id: 'visitor', emoji: '🚪', text: '有朋友来串门了', good: '一起玩会儿', bad: '躲起来' },
  { id: 'thunder', emoji: '⛈️', text: '外面突然打雷了', good: '抱抱安慰', bad: '假装没事' },
  { id: 'bug', emoji: '🐛', text: '发现一只会发光的小虫子', good: '一起研究', bad: '果断无视' }
];
const TALK = {
  pat: {
    cat: ['呼噜呼噜……再摸一下', '这手感，勉强合格', '别摸了，其实很舒服'],
    dog: ['汪！还要还要！', '尾巴已经摇成螺旋桨了', '最好的朋友！']
  },
  feed: { cat: ['这个罐头可以入库', '哼，算你识相', '吃饱了才有力气营业'], dog: ['好香好香！', '再来一口嘛', '我可是很乖的'] },
  play: { cat: ['激光点！抓住它！', '本猫只是热身一下', '这个玩具尚可'], dog: ['接住啦！', '再扔一次！', '我跑得超快！'] },
  idle: {
    cat: ['今天也在认真营业', '赛博吸猫，概不退款', '窗外有只鸟……', '本猫正在充电'],
    dog: ['出门？现在？！', '摇尾巴中，请勿打扰', '你是我的全世界', '闻到了好吃的味道']
  },
  hungry: { cat: '碗见底了，该投喂了', dog: '饿饿！快看碗里！' },
  sad: { cat: '有点无聊，摸摸我嘛', dog: '没人陪我玩，呜……' },
  night: { cat: '深夜了，本猫要眯一会儿', dog: '困了……晚安' }
};
const COATS = {
  cat: [
    { id: 'sun_orange', name: '阳光橘', main: '#f2a45e', belly: '#ffe3bd', inner: '#ff9ba5' },
    { id: 'cow', name: '奶牛', main: '#f4f0e8', belly: '#ffffff', inner: '#ffb3c1', patch: '#4b4763' },
    { id: 'night_black', name: '夜行黑', main: '#5d5b7a', belly: '#8a86a8', inner: '#ff8fa3' },
    { id: 'tabby', name: '狸花', main: '#9c8a76', belly: '#e8ded0', inner: '#ffb0a8', patch: '#5f5448' },
    { id: 'snow', name: '雪团', main: '#f6f4f0', belly: '#ffffff', inner: '#ffc0cb' },
    { id: 'silver', name: '银渐层', main: '#b9c0cc', belly: '#f2f4f7', inner: '#f2a6b6' }
  ],
  dog: [
    { id: 'shiba', name: '柴犬橘', main: '#e8a052', belly: '#fff3df', ear: '#c77a35' },
    { id: 'corgi', name: '柯基棕', main: '#d8874b', belly: '#fff2e2', ear: '#b56a33' },
    { id: 'samoyed', name: '萨摩白', main: '#f3f1e8', belly: '#ffffff', ear: '#d7d5cb' },
    { id: 'husky', name: '哈士奇灰', main: '#a3b7cd', belly: '#f7fbff', ear: '#708aa5', patch: '#708aa5' },
    { id: 'golden', name: '金毛金', main: '#e3b06a', belly: '#fff0d5', ear: '#c58a45' },
    { id: 'black_back', name: '黑背蓝', main: '#4b5566', belly: '#e7e9ee', ear: '#2f3642', patch: '#e7e9ee' }
  ]
};
const $x = (id) => document.getElementById(id);
let audioCtx = null;
let channel = null;
let syncTimer = null;
let voteTimer = null;
let gameTimer = null;
let socket = null;
let socketConnectedOnce = false;
const CLIENT_ID = Math.random().toString(36).slice(2);

function ensureExtrasState() {
  const defaults = {
    coins: 30, outfits: [], equipped: {}, furniture: [], roomFurniture: [], unlockedPets: [],
    foodsSeen: [], events: [], lastSeen: Date.now(), soundOn: true, room: '公开舍',
    best: {}, votes: null, chain: '', pendingEvent: null, createdAt: Date.now(),
    checkin: { last: '', streak: 0 }, counters: { feed: 0, pat: 0 }, badges: [], claimed: [],
    inventory: {}, adopted: false, customPets: [], adoptedId: '', profile: 'guest', nickname: '', wsUrl: '', roomTheme: 'neon', themesTried: [],
    starterInventoryDone: false, level: 1, xp: 0, deadPets: [], deathTrack: {}, afkOn: false, tutorialDone: false, lastVersion: ''
  };
  Object.keys(defaults).forEach((k) => { if (saved[k] === undefined) saved[k] = defaults[k]; });
  (saved.customPets || []).forEach((p) => { if (!PETS.some((x) => x.id === p.id)) PETS.push(p); });
  NEW_PETS.forEach((p) => { if (!PETS.some((x) => x.id === p.id)) PETS.push(p); });
  RARE_PETS.forEach((p) => {
    if (saved.unlockedPets.includes(p.id) && !PETS.some((x) => x.id === p.id)) PETS.push(p);
  });
  persist();
  initializeStarterInventory();
}
function initializeStarterInventory() {
  if (saved.starterInventoryDone) return;
  const inv = saved.inventory || (saved.inventory = {});
  FOODS.filter((f) => !f.limited).forEach((f) => { if (inv[f.id] === undefined) inv[f.id] = 15; });
  saved.starterInventoryDone = true;
  persist();
}
function availablePets() {
  const dead = saved.deadPets || [];
  const registered = String(saved.profile || '').indexOf('u:') === 0;
  return PETS.filter((p) => {
    if (dead.some((d) => d.id === p.id)) return false;
    if (p.rare) return (saved.unlockedPets || []).includes(p.id);
    if (registered) {
      return p.id === saved.adoptedId || (saved.customPets || []).some((c) => c.id === p.id) || (saved.unlockedPets || []).includes(p.id);
    }
    return true;
  });
}
function addCoins(n) {
  saved.coins = Math.max(0, saved.coins + n);
  persist();
  updateHUD();
  emitSync();
}
function addXP(n) {
  saved.level = saved.level || 1;
  saved.xp = (saved.xp || 0) + n;
  while (saved.xp >= saved.level * 100) {
    saved.xp -= saved.level * 100;
    saved.level++;
    const reward = 20 * saved.level;
    const food = pick(FOODS.filter((f) => !f.limited));
    addCoins(reward);
    grantFood(food.id, 3);
    logEvent('升到 Lv.' + saved.level + '，获得 ' + reward + ' 贝壳和 ' + food.name);
    sound('reward');
    toast('升级啦！Lv.' + saved.level + ' +' + reward + ' 贝壳');
  }
  persist();
  updateHUD();
}
function updateHUD() {
  if ($x('coinCount')) $x('coinCount').textContent = saved.coins;
  if ($x('roomName')) $x('roomName').textContent = saved.room;
  if ($x('soundBtn')) $x('soundBtn').textContent = '🔊 音效：' + (saved.soundOn ? '开' : '关');
  if ($x('accountName')) $x('accountName').textContent = 'Lv.' + (saved.level || 1) + ' ' + (saved.nickname || '游客');
  if ($x('afkBtn')) $x('afkBtn').textContent = saved.afkOn ? '⏰ 挂机：开' : '⏰ 挂机：关';
}
function logEvent(text) {
  saved.events.unshift({ text, time: Date.now() });
  saved.events = saved.events.slice(0, 30);
  persist();
}
function beep(freq, dur, type, vol) {
  if (!saved.soundOn) return;
  try {
    audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)();
    const o = audioCtx.createOscillator();
    const g = audioCtx.createGain();
    o.type = type || 'sine';
    o.frequency.value = freq;
    g.gain.value = vol || .04;
    o.connect(g);
    g.connect(audioCtx.destination);
    o.start();
    g.gain.exponentialRampToValueAtTime(.0001, audioCtx.currentTime + dur);
    o.stop(audioCtx.currentTime + dur);
  } catch (err) { /* 忽略音频限制 */ }
}
function sound(kind) {
  if (kind === 'meow') { beep(520, .14, 'triangle'); setTimeout(() => beep(690, .12, 'triangle'), 120); }
  else if (kind === 'woof') { beep(190, .12, 'sawtooth', .035); setTimeout(() => beep(140, .1, 'sawtooth', .035), 130); }
  else if (kind === 'coin') { beep(880, .08, 'square', .025); setTimeout(() => beep(1180, .08, 'square', .025), 80); }
  else if (kind === 'reward') { [523, 659, 784].forEach((f, i) => setTimeout(() => beep(f, .12, 'triangle', .035), i * 110)); }
  else if (kind === 'eat') { beep(320, .06, 'square', .025); setTimeout(() => beep(250, .06, 'square', .025), 80); setTimeout(() => beep(350, .05, 'square', .025), 160); }
}
function buzz(ms) { try { if (navigator.vibrate) navigator.vibrate(ms || 12); } catch (err) { /* 忽略 */ } }
function say(text) {
  const layer = $x('bubbleLayer');
  if (!layer || !currentPet) return;
  const el = document.createElement('div');
  el.className = 'bubble';
  el.textContent = currentPet.name + '：' + text;
  layer.appendChild(el);
  setTimeout(() => el.remove(), 4200);
}
let suppressHooks = false;
const baseFeed = feed;
const basePat = pat;
const basePlay = play;
const baseLaunch = launchDanmaku;
const baseRenderFoods = renderFoods;
renderFoods = function () {
  baseRenderFoods();
  const foods = FOODS.filter((f) => f.type === activeType);
  Array.from(document.querySelectorAll('#foodGrid .food-btn')).forEach((btn, i) => {
    const f = foods[i];
    if (!f) return;
    const n = (saved.inventory || {})[f.id] || 0;
    if (n > 0) {
      const badge = document.createElement('span');
      badge.className = 'stock-badge';
      badge.textContent = '×' + n;
      btn.appendChild(badge);
    }
  });
};

const baseRenderPetList = renderPetList;
const baseRenderPet = renderPet;
let petListExpanded = false;
renderPetList = function () {
  baseRenderPetList();
  const list = $x('petList');
  if (!list) return;
  const allowed = availablePets();
  const items = Array.from(list.querySelectorAll('.pet-item'));
  const old = list.querySelector('.pet-toggle');
  if (old) old.remove();
  const shown = items.filter((item) => allowed.some((p) => p.id === item.dataset.id));
  items.forEach((item) => { item.style.display = shown.includes(item) ? '' : 'none'; });
  const limit = 5;
  $('petCount').textContent = shown.length + ' 只';
  shown.forEach((item, i) => { item.style.display = (!petListExpanded && i >= limit) ? 'none' : ''; });
  if (shown.length <= limit) return;
  const toggle = document.createElement('button');
  toggle.type = 'button';
  toggle.className = 'pet-toggle';
  toggle.textContent = petListExpanded ? '收起住客 ▲' : '展开其余 ' + (shown.length - limit) + ' 位 ▼';
  toggle.onclick = () => {
    petListExpanded = !petListExpanded;
    saved.petListExpanded = petListExpanded;
    persist();
    renderPetList();
  };
  list.appendChild(toggle);
};
renderPet = function () {
  baseRenderPet();
  const art = $x('petArt');
  const svg = art && art.querySelector('svg');
  if (!svg) return;
  let walker = art.querySelector('.pet-walker');
  if (!walker) {
    walker = document.createElement('div');
    walker.className = 'pet-walker';
    art.appendChild(walker);
  }
  if (svg.parentElement !== walker) walker.appendChild(svg);
  walker.style.animationDuration = (7 + Math.random() * 5) + 's';
  walker.style.animationDelay = (-Math.random() * 4) + 's';
};
feed = function (food) {
  if (!currentPet || food.type !== currentPet.type) return baseFeed(food);
  if (statOf(currentPet).satiety >= 100) return baseFeed(food);
  const inv = saved.inventory || (saved.inventory = {});
  if (!(inv[food.id] > 0)) {
    toast('这份食物库存为 0，等在线补给、盲盒或任务获得吧');
    return;
  }
  inv[food.id]--;
  if (!inv[food.id]) delete inv[food.id];
  renderFoods();
  baseFeed(food);
  saved.counters.feed++;
  addXP(5);
  addCoins(2);
  sound('eat');
  talk('feed');
  if (!saved.foodsSeen.includes(food.id)) saved.foodsSeen.push(food.id);
  persist();
  emitSync();
};
pat = function () {
  basePat();
  saved.counters.pat++;
  addXP(3);
  addCoins(1);
  sound(currentPet && currentPet.type === 'dog' ? 'woof' : 'meow');
  buzz(12);
  talk('pat');
};
play = function () {
  if (!currentPet) return basePlay();
  const s = statOf(currentPet);
  if (s.satiety > 5) {
    addXP(6);
    addCoins(2);
    sound(currentPet.type === 'dog' ? 'woof' : 'meow');
    buzz(18);
    talk('play');
  }
  basePlay();
  emitSync();
};
launchDanmaku = function (msg, own) {
  baseLaunch(msg, own);
  if (suppressHooks) return;
  danmakuHooks(msg, own);
  if (own) sendSocketDanmaku(msg);
  if (own && channel) {
    try { channel.postMessage({ type: 'danmaku', msg: msg }); } catch (err) { /* 忽略 */ }
  }
};
function talk(kind) {
  if (!currentPet) return;
  const s = statOf(currentPet);
  let text;
  if (kind === 'idle') {
    const hour = new Date().getHours();
    text = s.satiety < 25 ? TALK.hungry[currentPet.type]
      : s.mood < 30 ? TALK.sad[currentPet.type]
      : (hour >= 23 || hour < 6) ? TALK.night[currentPet.type]
      : pick(TALK.idle[currentPet.type]);
  } else {
    text = pick(TALK[kind][currentPet.type]);
  }
  say(text);
  if (Math.random() < .25) sound(currentPet.type === 'dog' ? 'woof' : 'meow');
}
function profileKey() { return KEY + ':profile:' + saved.profile; }
function roomKey() { return KEY + ':room:' + saved.profile + ':' + saved.room; }
function persist() {
  try {
    const data = JSON.stringify(saved);
    localStorage.setItem(KEY, data);
    localStorage.setItem(profileKey(), data);
    localStorage.setItem(roomKey(), data);
  } catch (err) { /* 隐私模式忽略 */ }
}
function freshProfileState() {
  const scope = saved.profile || 'guest';
  Object.keys(saved).forEach((k) => { delete saved[k]; });
  Object.assign(saved, {
    stats: {}, messages: [], danmakuOn: true, coins: 30,
    outfits: [], equipped: {}, furniture: [], roomFurniture: [], unlockedPets: [],
    foodsSeen: [], events: [], lastSeen: Date.now(), soundOn: true, room: '公开舍',
    best: {}, votes: null, chain: '', pendingEvent: null, createdAt: Date.now(),
    checkin: { last: '', streak: 0 }, counters: { feed: 0, pat: 0 }, badges: [], claimed: [],
    inventory: {}, adopted: false, customPets: [], adoptedId: '', profile: scope, nickname: '', wsUrl: '', roomTheme: 'neon', themesTried: [],
    starterInventoryDone: false, level: 1, xp: 0, deadPets: [], deathTrack: {}, afkOn: false, tutorialDone: false, lastVersion: ''
  });
}
function loadProfileState() {
  try {
    const raw = localStorage.getItem(profileKey());
    if (!raw) { freshProfileState(); return; }
    const data = JSON.parse(raw);
    if (!data || typeof data !== 'object') { freshProfileState(); return; }
    Object.keys(saved).forEach((k) => { delete saved[k]; });
    Object.assign(saved, data);
  } catch (err) { freshProfileState(); }
}
function loadRoomData() {
  try {
    const raw = localStorage.getItem(roomKey());
    if (!raw) return;
    const data = JSON.parse(raw);
    if (!data || typeof data !== 'object') return;
    Object.keys(data).forEach((k) => { if (k !== 'room') saved[k] = data[k]; });
    saved.messages = (saved.messages || []).filter((m) => m && typeof m.text === 'string' && m.text.trim());
  } catch (err) { /* 忽略损坏数据 */ }
}
function refreshAll() {
  updateHUD();
  renderPetList();
  renderFoods();
  renderPet();
  renderMessages();
  updateToggle();
  renderOutfits();
  renderFurniture();
  applyTheme();
  renderAfk();
}
function handleSync(e) {
  const data = e.data;
  if (!data) return;
  if (data.type === 'sync' && data.data && data.data.room === saved.room && data.data.profile === saved.profile) {
    Object.assign(saved, data.data);
    refreshAll();
  } else if (data.type === 'danmaku' && data.msg) {
    suppressHooks = true;
    launchDanmaku(data.msg, false);
    suppressHooks = false;
  }
}
function emitSync() {
  if (syncTimer) clearTimeout(syncTimer);
  syncTimer = setTimeout(() => {
    if (!channel) return;
    try { channel.postMessage({ type: 'sync', data: JSON.parse(JSON.stringify(saved)) }); } catch (err) { /* 忽略 */ }
  }, 180);
}
function socketUrl() {
  if (saved.wsUrl) return saved.wsUrl;
  if (window.RELAY_URL) return window.RELAY_URL;
  if (location.protocol === 'file:' || !location.hostname) return 'ws://localhost:8765';
  return (location.protocol === 'https:' ? 'wss://' : 'ws://') + location.hostname + ':8765';
}
function initSocket() {
  if (socket && (socket.readyState === 0 || socket.readyState === 1)) return;
  try {
    socket = new WebSocket(socketUrl());
    socket.onopen = () => {
      if (!socketConnectedOnce) { socketConnectedOnce = true; toast('联机弹幕已连接'); }
      try { socket.send(JSON.stringify({ type: 'room', room: saved.room, clientId: CLIENT_ID })); } catch (err) { /* 忽略 */ }
    };
    socket.onmessage = (e) => {
      try {
        const d = JSON.parse(e.data);
        if (d.type === 'danmaku' && d.msg && d.clientId !== CLIENT_ID && d.room === saved.room) {
          suppressHooks = true;
          launchDanmaku(d.msg, false);
          suppressHooks = false;
        }
      } catch (err) { /* 忽略 */ }
    };
    socket.onclose = () => { socket = null; setTimeout(initSocket, 5000); };
  } catch (err) {
    socket = null;
    setTimeout(initSocket, 8000);
  }
}
function sendSocketDanmaku(msg) {
  if (socket && socket.readyState === 1) {
    try { socket.send(JSON.stringify({ type: 'danmaku', room: saved.room, msg: msg, clientId: CLIENT_ID })); } catch (err) { /* 忽略 */ }
  }
}
function initRoom() {
  if (channel) { try { channel.close(); } catch (err) { /* 忽略 */ } }
  try {
    channel = new BroadcastChannel('paw-planet-' + saved.profile + '-' + saved.room);
    channel.onmessage = handleSync;
  } catch (err) { channel = null; }
  if (!storageBound) {
    storageBound = true;
    window.addEventListener('storage', (e) => {
      if (e.key !== KEY || !e.newValue) return;
      try {
        const data = JSON.parse(e.newValue);
        if (data.room === saved.room && data.profile === saved.profile) { Object.assign(saved, data); refreshAll(); }
      } catch (err) { /* 忽略 */ }
    });
  }
}
function openModal(title, body, note) {
  const root = $x('modalRoot');
  root.hidden = false;
  root.innerHTML = '<div class="modal" role="dialog" aria-modal="true"><div class="modal-head"><h2>' + title + '</h2><button class="close-btn" type="button" aria-label="关闭">×</button></div>' + (note ? '<p class="modal-note">' + note + '</p>' : '') + '<div id="modalBody">' + body + '</div></div>';
  root.querySelector('.close-btn').onclick = closeModal;
  root.onclick = (e) => { if (e.target === root) closeModal(); };
}
function closeModal() {
  const root = $x('modalRoot');
  root.hidden = true;
  root.innerHTML = '';
  if (voteTimer) { clearInterval(voteTimer); voteTimer = null; }
  if (gameTimer) { gameTimer.forEach(clearInterval); gameTimer = null; }
}
function emojiRain(text) {
  const layer = $x('emojiRainLayer');
  const source = Array.from(String(text || '')).filter((c) => /\p{Extended_Pictographic}/u.test(c));
  const emojis = source.length ? source : ['✨', '🎉', '🌈', '💖', '🐾'];
  for (let i = 0; i < 26; i++) {
    const el = document.createElement('span');
    el.className = 'rain-emoji';
    el.textContent = pick(emojis);
    el.style.left = (Math.random() * 94) + '%';
    el.style.animationDuration = (1.8 + Math.random() * 1.6) + 's';
    el.style.animationDelay = (Math.random() * .5) + 's';
    layer.appendChild(el);
    el.addEventListener('animationend', () => el.remove());
  }
  sound('reward');
}
function hasTripleEmoji(text) {
  const counts = {};
  Array.from(text).forEach((c) => {
    if (/\p{Extended_Pictographic}/u.test(c)) counts[c] = (counts[c] || 0) + 1;
  });
  return Object.values(counts).some((n) => n >= 3);
}
function voteFromDanmaku(text) {
  if (!saved.votes || saved.votes.ends < Date.now()) return;
  const t = text.trim();
  let idx = -1;
  if (/^[1-4]$/.test(t)) idx = Number(t) - 1;
  else idx = saved.votes.options.findIndex((o) => t.includes(o.name));
  if (idx >= 0 && idx < saved.votes.counts.length) {
    saved.votes.counts[idx]++;
    persist();
  }
}
function chainFromDanmaku(text) {
  const chars = Array.from(text.trim());
  if (!chars.length) return;
  const first = chars[0];
  const last = chars[chars.length - 1];
  if (saved.chain && first === saved.chain) {
    addCoins(3);
    say('接龙成功，奖励 3 贝壳！');
    logEvent('弹幕接龙成功');
  }
  saved.chain = last;
  persist();
}
function danmakuHooks(msg, own) {
  const text = String(msg.text || '');
  if (/[🌈🎉🎊]/.test(text) || hasTripleEmoji(text)) emojiRain(text);
  voteFromDanmaku(text);
  chainFromDanmaku(text);
  if (!own && Math.random() < .12) addCoins(1);
}
function setupTools() {
  const row = $x('toolRow');
  row.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-tool]');
    if (!btn) return;
    const tool = btn.dataset.tool;
    if (tool === 'game') startGame();
    else if (tool === 'event') openEventLog();
    else if (tool === 'task') openTasks();
    else if (tool === 'vote') openVote();
    else if (tool === 'rain') emojiRain('🌈🎉✨');
    else if (tool === 'dress') openDress();
    else if (tool === 'decor') openRoomDecor();
    else if (tool === 'album') openAlbum();
    else if (tool === 'gacha') openGacha();
    else if (tool === 'share') openShare();
    else if (tool === 'afk') toggleAfk();
    else if (tool === 'sound') {
      saved.soundOn = !saved.soundOn;
      persist();
      updateHUD();
      if (saved.soundOn) sound('coin');
    }
  });
  const pill = $x('roomPill');
  const openRoom = () => openRoomModal();
  pill.addEventListener('click', openRoom);
  pill.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openRoom(); } });
  const coin = $x('coinPill');
  coin.addEventListener('click', openCoinGuide);
  coin.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openCoinGuide(); } });
  const account = $x('accountPill');
  account.addEventListener('click', openAccount);
  account.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openAccount(); } });
}
function esc(s) { return String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])); }
function startGame() {
  if (!currentPet) return;
  const isCat = currentPet.type === 'cat';
  let time = 20, score = 0, combo = 0, lastHit = 0;
  openModal('限时小游戏', '<div class="game-arena" id="gameArena"><div class="game-hud"><span>⏱ <b id="gTime">20</b> 秒</span><span>🎯 <b id="gScore">0</b> 分</span><span>🔥 <b id="gCombo">0</b> 连击</span></div><button class="game-target" id="gTarget" type="button" aria-label="点击目标"></button><div class="game-tip">' + (isCat ? '点中出现的激光点' : '点中弹跳的飞盘') + '</div></div>',
    '点中目标得分，1 秒内连续点中算连击，20 秒后结算贝壳');
  const arena = $x('gameArena');
  const target = $x('gTarget');
  const move = () => {
    const w = Math.max(20, arena.clientWidth - 72);
    const h = Math.max(20, arena.clientHeight - 72);
    target.style.left = (16 + Math.random() * w) + 'px';
    target.style.top = (54 + Math.random() * h) + 'px';
  };
  target.onclick = () => {
    const now = Date.now();
    combo = (now - lastHit < 1100) ? combo + 1 : 1;
    lastHit = now;
    score += 10 + combo * 2;
    $x('gScore').textContent = score;
    $x('gCombo').textContent = combo;
    sound('coin');
    buzz(10);
    move();
  };
  move();
  const tick = setInterval(() => {
    time--;
    $x('gTime').textContent = time;
    if (time <= 0) { clearInterval(tick); clearInterval(mover); finish(); }
  }, 1000);
  const mover = setInterval(move, 900);
  gameTimer = [tick, mover];
  function finish() {
    gameTimer = null;
    const reward = Math.max(3, Math.floor(score / 12));
    const s = statOf(currentPet);
    s.mood = clamp(s.mood + Math.min(12, Math.floor(score / 15)));
    s.bond = clamp(s.bond + Math.min(8, Math.floor(score / 25)));
    saved.best[currentPet.type] = Math.max(saved.best[currentPet.type] || 0, score);
    addXP(Math.max(5, Math.floor(score / 5)));
    persist();
    renderStats();
    renderPetList();
    closeModal();
    addCoins(reward);
    sound('reward');
    say('玩得好开心，再来一局！');
    toast('本局 ' + score + ' 分，获得 ' + reward + ' 贝壳');
    logEvent('小游戏得分 ' + score);
    emitSync();
  }
}
function maybeEvent() {
  if (saved.pendingEvent || !$x('modalRoot').hidden || Math.random() > .45) return;
  const def = pick(EVENT_DEFS);
  saved.pendingEvent = { id: def.id, time: Date.now() };
  logEvent('触发事件：' + def.text);
  persist();
  renderEventBanner();
  emitSync();
}
function renderEventBanner() {
  const layer = $x('eventLayer');
  layer.innerHTML = '';
  if (!saved.pendingEvent) return;
  const def = EVENT_DEFS.find((e) => e.id === saved.pendingEvent.id);
  if (!def) return;
  const banner = document.createElement('div');
  banner.className = 'event-banner';
  banner.innerHTML = '<span>' + def.emoji + ' ' + esc(def.text) + '</span><button type="button" data-act="good">' + esc(def.good) + '</button><button type="button" class="ghost-mini" data-act="bad">' + esc(def.bad) + '</button>';
  banner.querySelectorAll('button').forEach((b) => {
    b.onclick = () => resolveEvent(b.dataset.act === 'good');
  });
  layer.appendChild(banner);
  setTimeout(() => { if (saved.pendingEvent && saved.pendingEvent.id === def.id) resolveEvent(false); }, 22000);
}
function resolveEvent(good) {
  const def = EVENT_DEFS.find((e) => e.id === (saved.pendingEvent && saved.pendingEvent.id));
  $x('eventLayer').innerHTML = '';
  saved.pendingEvent = null;
  if (!def) { persist(); return; }
  if (good) {
    const s = statOf(currentPet);
    s.mood = clamp(s.mood + 6);
    s.bond = clamp(s.bond + 2);
    addCoins(6);
    sound('reward');
    say(currentPet.type === 'cat' ? '本猫勉为其难地收下奖励' : '太好了！一起玩吧！');
    logEvent('处理事件：' + def.text + '（获得 6 贝壳）');
  } else {
    say(currentPet.type === 'cat' ? '哼，本猫自己会处理' : '没关系，我等你');
    logEvent('事件飘过：' + def.text);
  }
  persist();
  renderStats();
  emitSync();
}
function openEventLog() {
  const html = '<div class="log-list">' + (saved.events.length
    ? saved.events.map((e) => {
      const t = new Date(e.time);
      return '<div class="log-item">' + String(t.getHours()).padStart(2, '0') + ':' + String(t.getMinutes()).padStart(2, '0') + ' · ' + esc(e.text) + '</div>';
    }).join('')
    : '<div class="log-item">还没有事件记录，再多玩一会儿吧</div>') + '</div>';
  openModal('事件簿', html, '随机事件会自动出现，处理得好会有贝壳奖励');
}
function grantFood(id, n) {
  const inv = saved.inventory || (saved.inventory = {});
  inv[id] = Math.min(99, (inv[id] || 0) + n);
  persist();
  renderFoods();
  emitSync();
}
function checkVersionUpdate(offlineHours) {
  const current = String(window.SITE_VERSION || '1.0');
  const previous = saved.lastVersion || '';
  saved.lastVersion = current;
  persist();
  if (!previous || previous === current) return false;
  const notes = String(window.SITE_NOTES || '修复了一些问题，优化了一些体验。');
  openModal('更新到 v' + current, '<div class="card"><span class="icon-tile">🆕</span><h3>爪爪星球更新啦</h3><p>上次版本：v' + esc(previous) + '</p><p>' + esc(notes) + '</p><div class="card-actions" style="margin-top:12px"><button class="mini-btn" id="updateOk" type="button">知道了</button></div></div>', '你的宠物和资产都已保留');
  $x('updateOk').onclick = () => {
    closeModal();
    if (offlineHours) showOfflinePopup(offlineHours);
  };
  return true;
}
function openTutorial(hours) {
  saved.tutorialDone = true;
  persist();
  openModal('新手指引', '<div class="card"><h3>30 秒上手</h3><p>1. 左侧住客列表：点击切换宠物，超过 5 只会折叠</p><p>2. 中间舞台：点宠物摸摸，逗玩会让它跳起来</p><p>3. 右侧投喂：消耗食物库存，每 30 秒在线补给 1 份</p><p>4. 弹幕区：发文字或表情，投票、接龙、表情雨都能玩</p><p>5. 顶部玩法栏：小游戏、任务徽章、装扮、图鉴、盲盒、布置宠物窝</p><p>6. 头像里可注册账号，游客和注册账号资产互相独立</p><div class="card-actions" style="margin-top:12px"><button class="mini-btn" id="tutorialOk" type="button">知道了，开始玩</button></div></div>', '之后可以在帮助里再看；注册/切换账号会重新显示一次');
  $x('tutorialOk').onclick = () => {
    closeModal();
    if (hours) showOfflinePopup(hours);
  };
}
function showOfflinePopup(hoursFloat) {
  const hours = Math.min(12, Math.max(0, hoursFloat || 0));
  if (hours < 1 / 60) return;
  const coins = Math.max(3, Math.floor(hours * 3));
  const count = Math.min(3, Math.floor(hours) + 1);
  const foods = [];
  for (let i = 0; i < count; i++) foods.push(pick(FOODS));
  const list = foods.map((f) => '<span class="badge-chip">' + f.emoji + ' ' + esc(f.name) + ' ×1</span>').join('');
  openModal('离线收益', '<div class="card"><span class="icon-tile">🌙</span><h3>你离开了 ' + hours.toFixed(1) + ' 小时</h3><p>最多按 12 小时结算</p><p>贝壳 +' + coins + '</p><div class="badge-row" style="margin-top:8px">' + list + '</div><div class="card-actions" style="margin-top:12px"><button class="mini-btn" id="offlineClaim" type="button">领取收益</button></div></div>', '离线时间越长，补给越多，但单次最多 12 小时');
  $x('offlineClaim').onclick = () => {
    addCoins(coins);
    foods.forEach((f) => grantFood(f.id, 1));
    saved.lastSeen = Date.now();
    persist();
    closeModal();
    sound('reward');
    toast('离线收益已到账');
    emitSync();
  };
}
function openCoinGuide() {
  const html = '<div class="card"><h3>赚取贝壳</h3><p>摸摸头 +1 · 投喂 +2 · 逗玩 +2</p><p>小游戏结算按分数发放，接龙成功 +3，随机事件 +6</p><p>每日签到、长期任务、盲盒返利也能赚</p></div><div class="card" style="margin-top:10px"><h3>花掉贝壳</h3><p>购买装扮、房间家具，或开神秘盲盒</p><p>完成任务还会解锁限定食物和徽章</p></div>';
  openModal('贝壳怎么赚', html, '点顶部「任务徽章」可以领取额外奖励');
}
function todayKey() {
  const d = new Date();
  return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
}
function dayDiff(a, b) {
  return Math.round((new Date(b) - new Date(a)) / 86400000);
}
function doCheckin() {
  const today = todayKey();
  const c = saved.checkin;
  if (c.last === today) { toast('今天已经签到过啦'); return; }
  c.streak = (c.last && dayDiff(c.last, today) === 1) ? c.streak + 1 : 1;
  c.last = today;
  const reward = 10 + c.streak * 2;
  addXP(10);
  addCoins(reward);
  logEvent('连续签到第 ' + c.streak + ' 天');
  persist();
  sound('reward');
  toast('签到成功，+' + reward + ' 贝壳');
  emitSync();
  closeModal();
  openTasks();
}
function taskProgress(t) {
  if (t.id === 'checkin3') return Math.min(saved.checkin.streak, 3) + '/3 天';
  if (t.id === 'feed5') return Math.min(saved.counters.feed, 5) + '/5 次';
  if (t.id === 'pat50') return Math.min(saved.counters.pat, 50) + '/50 次';
  if (t.id === 'decor3') return Math.min(saved.roomFurniture.length, 3) + '/3 件';
  if (t.id === 'theme2') return Math.min((saved.themesTried || []).length, 2) + '/2 种';
  const max = PETS.reduce((m, p) => Math.max(m, statOf(p).mood), 0);
  return max + '/100';
}
function openTasks() {
  const c = saved.checkin;
  const done = c.last === todayKey();
  const next = 10 + (done ? c.streak : c.streak + 1) * 2;
  let html = '<div class="card"><h3>每日签到</h3><p>已连续 ' + c.streak + ' 天 · 上次 ' + (c.last || '无') + '</p><div class="card-actions"><button class="mini-btn" id="checkinBtn" type="button" ' + (done ? 'disabled' : '') + '>' + (done ? '今天已签到' : '签到 +' + next) + '</button></div></div>';
  html += '<h3 style="margin-top:14px">长期任务</h3>';
  html += TASKS.map((t) => {
    const ok = t.check();
    const claimed = saved.claimed.includes(t.id);
    const food = LIMITED_FOODS.find((f) => f.id === t.food);
    const furniture = FURNITURE.find((f) => f.id === t.furniture);
    const rewardName = food ? food.name : furniture ? furniture.name : '神秘奖励';
    return '<div class="task-item"><span class="icon-tile">' + t.emoji + '</span><div class="task-info"><h3>' + esc(t.name) + '</h3><p>' + esc(t.desc) + ' · ' + taskProgress(t) + '</p><p>奖励 ' + t.reward + ' 贝壳 + ' + esc(rewardName) + ' + 徽章</p></div><button class="mini-btn" data-task="' + t.id + '" type="button" ' + (claimed || !ok ? 'disabled' : '') + '>' + (claimed ? '已领取' : ok ? '领取' : '未完成') + '</button></div>';
  }).join('');
  html += '<h3 style="margin-top:14px">已获得徽章</h3><div class="badge-row">' + (saved.badges.length
    ? saved.badges.map((id) => {
      const t = TASKS.find((x) => x.id === id);
      return t ? '<span class="badge-chip">' + t.emoji + ' ' + esc(t.name) + '</span>' : '';
    }).join('')
    : '<p class="modal-note">还没有徽章，去完成任务吧</p>') + '</div>';
  openModal('任务与徽章', html, '完成条件后点领取，贝壳、限定食物和徽章一起到账');
  $x('checkinBtn').onclick = doCheckin;
  $x('modalBody').querySelectorAll('[data-task]').forEach((btn) => {
    btn.onclick = () => claimTask(btn.dataset.task);
  });
}
function claimTask(id) {
  const t = TASKS.find((x) => x.id === id);
  if (!t || saved.claimed.includes(id) || !t.check()) return;
  saved.claimed.push(id);
  saved.badges.push(id);
  const food = LIMITED_FOODS.find((f) => f.id === t.food);
  if (food) {
    if (!FOODS.some((f) => f.id === food.id)) FOODS.push(food);
    if (!saved.foodsSeen.includes(food.id)) saved.foodsSeen.push(food.id);
    grantFood(food.id, 5);
  }
  if (t.furniture) {
    if (!saved.furniture.includes(t.furniture)) saved.furniture.push(t.furniture);
    if (!saved.roomFurniture.includes(t.furniture)) saved.roomFurniture.push(t.furniture);
    renderFurniture();
  }
  persist();
  renderFoods();
  addXP(20);
  addCoins(t.reward);
  sound('reward');
  logEvent('完成任务：' + t.name);
  toast('获得徽章和 ' + t.reward + ' 贝壳！');
  emitSync();
  closeModal();
  openTasks();
}
function adoptPet(type, coat, name) {
  const id = 'adopt-' + Date.now();
  const pet = {
    id: id, type: type, name: name, emoji: type === 'cat' ? '🐈' : '🐕',
    desc: '你的专属' + (type === 'cat' ? '猫主子' : '狗子'),
    main: coat.main, belly: coat.belly, inner: coat.inner || '#ffb3c1',
    ear: coat.ear, patch: coat.patch, custom: true,
    stats: { satiety: 82, mood: 88, bond: 65 }
  };
  PETS.push(pet);
  saved.customPets.push(pet);
  saved.adopted = true;
  saved.adoptedId = id;
  currentPet = pet;
  persist();
  refreshAll();
  closeModal();
  sound('reward');
  say('你好，新主人！以后的饭就靠你了');
  toast('领养成功：' + pet.name);
  emitSync();
  if (!saved.tutorialDone) openTutorial(0);
}
function openAdoption() {
  const root = $x('modalRoot');
  root.hidden = false;
  let type = 'cat';
  let coatId = COATS.cat[0].id;
  let petName = '';
  root.innerHTML = '<div class="modal"><div class="modal-head"><h2>领养你的第一只</h2></div><p class="modal-note">选择猫或狗，再挑一个喜欢的花色，它会成为你的专属住客</p><div id="adoptBody"></div></div>';
  function render() {
    const coats = COATS[type];
    if (!coats.some((c) => c.id === coatId)) coatId = coats[0].id;
    const body = $x('adoptBody');
    body.innerHTML = '<div class="type-switch"><button class="ghost-mini ' + (type === 'cat' ? 'active' : '') + '" data-adopt-type="cat" type="button">🐱 猫</button><button class="ghost-mini ' + (type === 'dog' ? 'active' : '') + '" data-adopt-type="dog" type="button">🐶 狗</button></div><div class="coat-grid">' + coats.map((c) => '<button class="coat-item ' + (c.id === coatId ? 'active' : '') + '" data-coat="' + c.id + '" type="button"><span class="coat-swatch" style="background:' + c.main + ';border-color:' + (c.belly || '#fff') + '"></span>' + esc(c.name) + '</button>').join('') + '</div><input id="petNameInput" class="room-input" maxlength="10" placeholder="给它起个名字" value="' + esc(petName) + '" aria-label="宠物名字" /><div class="card-actions" style="margin-top:12px"><button class="mini-btn" id="adoptConfirm" type="button">确认领养</button></div>';
    body.querySelectorAll('[data-adopt-type]').forEach((b) => {
      b.onclick = () => {
        const input = $x('petNameInput');
        if (input) petName = input.value;
        type = b.dataset.adoptType;
        coatId = COATS[type][0].id;
        render();
      };
    });
    body.querySelectorAll('[data-coat]').forEach((b) => {
      b.onclick = () => {
        petName = $x('petNameInput').value;
        coatId = b.dataset.coat;
        render();
      };
    });
    $x('adoptConfirm').onclick = () => {
      const input = $x('petNameInput');
      petName = (input.value.trim() || (type === 'cat' ? '小主子' : '小可爱')).slice(0, 10);
      const coat = COATS[type].find((c) => c.id === coatId);
      adoptPet(type, coat, petName);
    };
  }
  render();
}
function accountMap() {
  try { return JSON.parse(localStorage.getItem(KEY + ':accounts') || '{}'); }
  catch (err) { return {}; }
}
function saveAccounts(map) {
  try { localStorage.setItem(KEY + ':accounts', JSON.stringify(map)); } catch (err) { /* 忽略 */ }
}
function hashPw(s) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return String(h);
}
function afterProfileSwitch() {
  loadRoomData();
  persist();
  updateHUD();
  initRoom();
  const allowed = availablePets();
  const adopted = allowed.find((p) => p.id === saved.adoptedId) || allowed.find((p) => p.type === activeType) || allowed[0];
  currentPet = adopted || PETS[0];
  refreshAll();
  if (!saved.adopted) openAdoption();
  else if (typeof showOfflinePopup === 'function') showOfflinePopup();
}
function openAccount() {
  const root = $x('modalRoot');
  root.hidden = false;
  let mode = 'login';
  root.innerHTML = '<div class="modal"><div class="modal-head"><h2>账号</h2></div><p class="modal-note">账号仅保存在本机浏览器；游客与注册用户的资产互相独立</p><div id="accountBody"></div></div>';
  function render() {
    const body = $x('accountBody');
    const register = mode === 'register';
    body.innerHTML = '<div class="type-switch"><button class="ghost-mini ' + (!register ? 'active' : '') + '" data-acc-mode="login" type="button">登录</button><button class="ghost-mini ' + (register ? 'active' : '') + '" data-acc-mode="register" type="button">注册</button></div>' +
      '<input id="accUser" class="room-input" maxlength="16" placeholder="用户名" aria-label="用户名" />' +
      (register ? '<input id="accNick" class="room-input" style="margin-top:8px" maxlength="12" placeholder="昵称" aria-label="昵称" />' : '') +
      '<input id="accPass" class="room-input" style="margin-top:8px" type="password" maxlength="32" placeholder="密码" aria-label="密码" />' +
      '<div class="card-actions" style="margin-top:12px"><button class="mini-btn" id="accSubmit" type="button">' + (register ? '注册并进入' : '登录') + '</button><button class="ghost-mini" id="accGuest" type="button">以游客身份进入</button></div>' +
      '<p class="modal-note">当前：' + esc(saved.nickname || '游客') + '</p>';
    body.querySelectorAll('[data-acc-mode]').forEach((b) => {
      b.onclick = () => { mode = b.dataset.accMode; render(); };
    });
    $x('accSubmit').onclick = () => {
      const user = $x('accUser').value.trim().slice(0, 16);
      const pass = $x('accPass').value;
      if (!user || !pass) { toast('请填写用户名和密码'); return; }
      const map = accountMap();
      if (register) {
        if (map[user]) { toast('这个用户名已经存在'); return; }
        const nick = ($x('accNick').value.trim() || user).slice(0, 12);
        map[user] = { nickname: nick, hash: hashPw(pass), created: Date.now() };
        saveAccounts(map);
        saved.profile = 'u:' + user;
        freshProfileState();
        saved.nickname = nick;
        closeModal();
        afterProfileSwitch();
        toast('注册成功，欢迎 ' + nick);
      } else {
        const acc = map[user];
        if (!acc || acc.hash !== hashPw(pass)) { toast('用户名或密码错误'); return; }
        saved.profile = 'u:' + user;
        saved.nickname = acc.nickname;
        loadProfileState();
        saved.nickname = acc.nickname;
        closeModal();
        afterProfileSwitch();
        toast('欢迎回来，' + acc.nickname);
      }
    };
    $x('accGuest').onclick = () => {
      saved.profile = 'guest';
      saved.nickname = '';
      loadProfileState();
      saved.nickname = '';
      closeModal();
      afterProfileSwitch();
      toast('已进入游客模式');
    };
  }
  render();
}
function openVote() {
  if (!currentPet) return;
  const opts = FOODS.filter((f) => f.type === activeType).slice(0, 4);
  if (!saved.votes || saved.votes.ends < Date.now()) {
    saved.votes = {
      options: opts.map((f) => ({ id: f.id, name: f.name, emoji: f.emoji })),
      counts: opts.map(() => 0), ends: Date.now() + 30000
    };
    persist();
  }
  openModal('弹幕投票：今晚吃什么', '<div id="voteBody"></div>', '点按钮投票，也可以发弹幕“1 / 2 / 3 / 4”或食物名');
  renderVote();
  voteTimer = setInterval(renderVote, 1000);
}
function renderVote() {
  const body = $x('voteBody');
  if (!body || !saved.votes) return;
  if (saved.votes.ends < Date.now()) { finishVote(); return; }
  const total = saved.votes.counts.reduce((a, b) => a + b, 0) || 1;
  const left = Math.ceil((saved.votes.ends - Date.now()) / 1000);
  body.innerHTML = saved.votes.options.map((o, i) => {
    const pct = Math.round(saved.votes.counts[i] / total * 100);
    return '<div class="vote-option"><span>' + (i + 1) + '. ' + o.emoji + ' ' + esc(o.name) + '</span><button class="mini-btn" data-vote="' + i + '">投它</button></div><div class="mini-bar"><i style="width:' + pct + '%"></i></div>';
  }).join('') + '<p class="modal-note">剩余 ' + left + ' 秒，票数最多者会被自动投喂</p>';
  body.querySelectorAll('[data-vote]').forEach((b) => { b.onclick = () => castVote(Number(b.dataset.vote)); });
}
function castVote(i) {
  if (!saved.votes) return;
  saved.votes.counts[i]++;
  persist();
  renderVote();
}
function finishVote() {
  if (voteTimer) { clearInterval(voteTimer); voteTimer = null; }
  const v = saved.votes;
  if (!v) return;
  const max = Math.max.apply(null, v.counts);
  const winner = v.options[v.counts.indexOf(max)];
  saved.votes = null;
  persist();
  const body = $x('voteBody');
  if (body) body.innerHTML = '<div class="card"><span class="icon-tile">' + winner.emoji + '</span><h3>' + esc(winner.name) + ' 获胜！</h3><p>已自动投喂一份</p></div>';
  const food = FOODS.find((f) => f.id === winner.id);
  if (food && currentPet && food.type === currentPet.type) baseFeed(food);
  say('大家决定了，就吃' + winner.name + '！');
  logEvent('投票结果：' + winner.name);
  emitSync();
  setTimeout(() => { if (!$x('modalRoot').hidden) closeModal(); }, 2000);
}
function openRoomModal() {
  openModal('房间号', '<div class="card"><p>当前房间：<b>' + esc(saved.room) + '</b></p><input id="roomInput" class="room-input" maxlength="16" value="' + esc(saved.room) + '" aria-label="房间号" /><input id="wsInput" class="room-input" style="margin-top:8px" placeholder="弹幕服务器地址（留空默认 localhost:8765）" value="' + esc(saved.wsUrl || '') + '" aria-label="弹幕服务器地址" /><div class="card-actions"><button class="mini-btn" id="roomSet" type="button">保存房间</button><button class="ghost-mini" id="roomCopy" type="button">复制房间号</button></div><p class="modal-note">同一房间可以看到其他真人用户发的弹幕，需要先运行 server.py 中继</p></div>');
  $x('roomSet').onclick = () => {
    const name = $x('roomInput').value.trim().slice(0, 16) || '公开舍';
    const ws = $x('wsInput').value.trim();
    const roomChanged = name !== saved.room;
    saved.room = name;
    saved.wsUrl = ws;
    if (roomChanged) { loadRoomData(); refreshAll(); }
    updateHUD();
    closeModal();
    initRoom();
    emitSync();
    if (socket) { try { socket.close(); } catch (err) { /* 忽略 */ } socket = null; }
    initSocket();
    persist();
    toast(roomChanged ? '已切换到房间：' + name : '房间设置已保存');
  };
  $x('roomCopy').onclick = async () => {
    try { await navigator.clipboard.writeText(saved.room); toast('房间号已复制'); }
    catch (err) { toast('房间号：' + saved.room); }
  };
}
function renderOutfits() {
  let layer = $x('outfitLayer');
  if (!layer) {
    layer = document.createElement('div');
    layer.id = 'outfitLayer';
    layer.className = 'outfit-layer';
    document.querySelector('.pet-zone').appendChild(layer);
  }
  layer.innerHTML = '';
  if (!currentPet) return;
  const eq = saved.equipped[currentPet.id] || {};
  Object.keys(eq).forEach((slot) => {
    const item = OUTFITS.find((o) => o.id === eq[slot]);
    if (!item) return;
    const el = document.createElement('span');
    el.className = 'outfit-item outfit-' + slot;
    el.textContent = item.emoji;
    layer.appendChild(el);
  });
}
function renderFurniture() {
  let layer = $x('furnitureLayer');
  if (!layer) {
    layer = document.createElement('div');
    layer.id = 'furnitureLayer';
    layer.className = 'furniture-layer';
    $x('stage').appendChild(layer);
  }
  layer.innerHTML = '';
  saved.roomFurniture.forEach((id) => {
    const item = FURNITURE.find((f) => f.id === id);
    if (!item) return;
    const el = document.createElement('span');
    el.className = 'furniture-item furniture-' + id;
    el.textContent = item.emoji;
    layer.appendChild(el);
  });
}
function openDress() {
  if (!currentPet) return;
  const pet = currentPet;
  const eq = saved.equipped[pet.id] || {};
  const outfitHtml = OUTFITS.map((o) => {
    const owned = saved.outfits.includes(o.id);
    const on = eq[o.slot] === o.id;
    return '<div class="card ' + (owned ? '' : 'locked') + '"><span class="icon-tile">' + o.emoji + '</span><h3>' + esc(o.name) + '</h3><p>' + (owned ? (on ? '已佩戴' : '已拥有') : '售价 ' + o.price + ' 贝壳') + '</p><div class="card-actions"><button class="ghost-mini ' + (on ? 'active' : '') + '" data-outfit="' + o.id + '" type="button">' + (owned ? (on ? '卸下' : '佩戴') : '购买') + '</button></div></div>';
  }).join('');
  const furnitureHtml = FURNITURE.map((f) => {
    const owned = saved.furniture.includes(f.id);
    const on = saved.roomFurniture.includes(f.id);
    return '<div class="card ' + (owned ? '' : 'locked') + '"><span class="icon-tile">' + f.emoji + '</span><h3>' + esc(f.name) + '</h3><p>' + (owned ? (on ? '已摆放' : '已拥有') : '售价 ' + f.price + ' 贝壳') + '</p><div class="card-actions"><button class="ghost-mini ' + (on ? 'active' : '') + '" data-furn="' + f.id + '" type="button">' + (owned ? (on ? '收起' : '摆放') : '购买') + '</button></div></div>';
  }).join('');
  openModal('装扮与房间', '<h3>装扮 ' + esc(pet.name) + '</h3><div class="modal-grid">' + outfitHtml + '</div><h3 style="margin-top:16px">房间布置</h3><div class="modal-grid">' + furnitureHtml + '</div>', '装扮只对当前宠物生效，房间布置对所有宠物生效');
  const body = $x('modalBody');
  body.querySelectorAll('[data-outfit]').forEach((btn) => {
    btn.onclick = () => {
      const item = OUTFITS.find((o) => o.id === btn.dataset.outfit);
      if (!saved.outfits.includes(item.id)) {
        if (saved.coins < item.price) { toast('贝壳不够啦，先玩一局小游戏吧'); return; }
        saved.coins -= item.price;
        saved.outfits.push(item.id);
      }
      const cur = saved.equipped[pet.id] || {};
      cur[item.slot] = cur[item.slot] === item.id ? null : item.id;
      saved.equipped[pet.id] = cur;
      persist();
      updateHUD();
      renderOutfits();
      sound('coin');
      emitSync();
      closeModal();
      openDress();
    };
  });
  body.querySelectorAll('[data-furn]').forEach((btn) => {
    btn.onclick = () => {
      const item = FURNITURE.find((f) => f.id === btn.dataset.furn);
      if (!saved.furniture.includes(item.id)) {
        if (saved.coins < item.price) { toast('贝壳不够啦'); return; }
        saved.coins -= item.price;
        saved.furniture.push(item.id);
      }
      if (saved.roomFurniture.includes(item.id)) saved.roomFurniture = saved.roomFurniture.filter((id) => id !== item.id);
      else saved.roomFurniture.push(item.id);
      persist();
      updateHUD();
      renderFurniture();
      sound('coin');
      emitSync();
      closeModal();
      openDress();
    };
  });
}
function openAlbum() {
  const foodHtml = FOODS.map((f) => {
    const got = saved.foodsSeen.includes(f.id);
    return '<div class="card ' + (got ? '' : 'locked') + '"><span class="icon-tile">' + (got ? f.emoji : '❔') + '</span><h3>' + (got ? esc(f.name) : '未解锁') + '</h3><p>' + (got ? f.type === 'cat' ? '猫咪美食' : '狗狗美食' : '投喂后解锁') + '</p></div>';
  }).join('');
  const allPets = PETS.slice();
  RARE_PETS.forEach((p) => { if (!allPets.some((x) => x.id === p.id)) allPets.push(p); });
  const petHtml = allPets.map((p) => {
    const got = PETS.some((x) => x.id === p.id);
    return '<div class="card ' + (got ? '' : 'locked') + '"><span class="icon-tile">' + (got ? p.emoji : '❔') + '</span><h3>' + (got ? esc(p.name) : '未解锁') + '</h3><p>' + (got ? esc(p.desc) : '神秘盲盒中') + '</p></div>';
  }).join('');
  const badgeHtml = TASKS.map((t) => {
    const got = saved.badges.includes(t.id);
    return '<div class="card ' + (got ? '' : 'locked') + '"><span class="icon-tile">' + (got ? t.emoji : '❔') + '</span><h3>' + (got ? esc(t.name) : '未解锁') + '</h3><p>' + (got ? esc(t.desc) : '完成对应任务') + '</p></div>';
  }).join('');
  openModal('收集图鉴', '<p class="modal-note">食物 ' + saved.foodsSeen.filter((id) => FOODS.some((f) => f.id === id)).length + '/' + FOODS.length + ' · 宠物 ' + PETS.length + '/' + allPets.length + ' · 徽章 ' + saved.badges.length + '/' + TASKS.length + '</p><h3>食物卡</h3><div class="modal-grid">' + foodHtml + '</div><h3 style="margin-top:16px">宠物卡</h3><div class="modal-grid">' + petHtml + '</div><h3 style="margin-top:16px">徽章</h3><div class="modal-grid">' + badgeHtml + '</div>', '投喂新食物、完成任务、开盲盒都能解锁图鉴');
}
function openGacha() {
  openModal('神秘盲盒', '<div class="card" id="gachaCard"><span class="icon-tile">🎲</span><h3>花费 15 贝壳开一次</h3><p>可能开出稀有宠物、装扮、食物图鉴或贝壳返利</p><div class="card-actions"><button class="mini-btn" id="gachaGo" type="button">开盲盒（-15）</button></div></div>', '稀有宠物解锁后会加入住客列表');
  $x('gachaGo').onclick = () => {
    if (saved.coins < 15) { toast('贝壳不够啦，先去玩一局吧'); return; }
    saved.coins -= 15;
    const r = Math.random();
    let html = '';
    if (r < .35 && RARE_PETS.some((p) => !saved.unlockedPets.includes(p.id))) {
      const p = RARE_PETS.find((x) => !saved.unlockedPets.includes(x.id));
      saved.unlockedPets.push(p.id);
      if (!PETS.some((x) => x.id === p.id)) PETS.push(p);
      html = '<span class="icon-tile">' + p.emoji + '</span><h3>稀有宠物：' + esc(p.name) + '</h3><p>' + esc(p.desc) + '</p>';
      renderPetList();
    } else if (r < .65) {
      const o = pick(OUTFITS);
      if (!saved.outfits.includes(o.id)) saved.outfits.push(o.id);
      html = '<span class="icon-tile">' + o.emoji + '</span><h3>获得装扮：' + esc(o.name) + '</h3><p>去装扮里佩戴吧</p>';
    } else if (r < .85) {
      const f = pick(FOODS);
      if (!saved.foodsSeen.includes(f.id)) saved.foodsSeen.push(f.id);
      grantFood(f.id, 3);
      html = '<span class="icon-tile">' + f.emoji + '</span><h3>解锁食物图鉴：' + esc(f.name) + '</h3><p>图鉴又丰富了一格</p>';
    } else {
      saved.coins += 30;
      html = '<span class="icon-tile">🪙</span><h3>贝壳返利 +30</h3><p>四舍五入算你赚了</p>';
    }
    persist();
    updateHUD();
    sound('reward');
    $x('gachaCard').innerHTML = html;
    logEvent('开盲盒：' + $x('gachaCard').querySelector('h3').textContent);
    emitSync();
  };
}
function renderAfk() {
  let el = $x('afkPet');
  if (!saved.afkOn) { if (el) el.remove(); return; }
  if (!el) {
    el = document.createElement('div');
    el.id = 'afkPet';
    el.className = 'afk-pet';
    el.title = '点击回到舞台';
    el.onclick = () => { if ($x('stage')) $x('stage').scrollIntoView({ behavior: 'smooth', block: 'center' }); };
    document.body.appendChild(el);
  }
  el.innerHTML = currentPet ? petSVG(currentPet) : '';
}
function toggleAfk() {
  saved.afkOn = !saved.afkOn;
  persist();
  updateHUD();
  renderAfk();
  toast(saved.afkOn ? '挂机模式开启：宠物会留在页面角落并产出收益' : '已关闭挂机模式');
  emitSync();
}
function applyTheme() {
  const stage = $x('stage');
  if (stage) stage.dataset.theme = saved.roomTheme || 'neon';
}
function openRoomDecor() {
  const themeHtml = ROOM_THEMES.map((t) => '<button class="coat-item ' + (saved.roomTheme === t.id ? 'active' : '') + '" data-room-theme="' + t.id + '" type="button"><span class="icon-tile">' + t.emoji + '</span>' + esc(t.name) + '</button>').join('');
  const furnitureHtml = FURNITURE.map((f) => {
    const owned = saved.furniture.includes(f.id);
    const on = saved.roomFurniture.includes(f.id);
    return '<div class="card ' + (owned ? '' : 'locked') + '"><span class="icon-tile">' + f.emoji + '</span><h3>' + esc(f.name) + '</h3><p>' + (owned ? (on ? '已摆放' : '已拥有') : '售价 ' + f.price + ' 贝壳') + '</p><div class="card-actions"><button class="ghost-mini ' + (on ? 'active' : '') + '" data-decor-furn="' + f.id + '" type="button">' + (owned ? (on ? '收起' : '摆放') : '购买') + '</button></div></div>';
  }).join('');
  openModal('布置宠物窝', '<h3>房间主题</h3><div class="coat-grid">' + themeHtml + '</div><h3>家具</h3><div class="modal-grid">' + furnitureHtml + '</div>', '切换主题、摆放家具，完成对应任务还能领贝壳和限定家具');
  const body = $x('modalBody');
  body.querySelectorAll('[data-room-theme]').forEach((btn) => {
    btn.onclick = () => {
      const id = btn.dataset.roomTheme;
      saved.roomTheme = id;
      saved.themesTried = saved.themesTried || [];
      if (!saved.themesTried.includes(id)) saved.themesTried.push(id);
      persist();
      applyTheme();
      sound('coin');
      emitSync();
      closeModal();
      openRoomDecor();
    };
  });
  body.querySelectorAll('[data-decor-furn]').forEach((btn) => {
    btn.onclick = () => {
      const item = FURNITURE.find((f) => f.id === btn.dataset.decorFurn);
      if (!saved.furniture.includes(item.id)) {
        if (saved.coins < item.price) { toast('贝壳不够啦'); return; }
        saved.coins -= item.price;
        saved.furniture.push(item.id);
      }
      if (saved.roomFurniture.includes(item.id)) saved.roomFurniture = saved.roomFurniture.filter((id) => id !== item.id);
      else saved.roomFurniture.push(item.id);
      persist();
      updateHUD();
      renderFurniture();
      sound('coin');
      emitSync();
      closeModal();
      openRoomDecor();
    };
  });
}
function openShare() {
  if (!currentPet) return;
  const s = statOf(currentPet);
  const eq = saved.equipped[currentPet.id] || {};
  const worn = Object.keys(eq).map((slot) => OUTFITS.find((o) => o.id === eq[slot])).filter(Boolean).map((o) => o.emoji).join(' ');
  const html = '<div class="share-card"><div id="shareSvgWrap">' + petSVG(currentPet) + '</div><h3>' + esc(currentPet.name) + '</h3><p>' + esc(currentPet.desc) + '</p><div class="share-stats"><span>🍚 ' + s.satiety + '</span><span>💖 ' + s.mood + '</span><span>🤝 ' + s.bond + '</span></div><p>' + (worn || '今天素颜营业') + '</p><div class="card-actions" style="justify-content:center"><button class="mini-btn" id="shareSave" type="button">保存 PNG</button></div></div>';
  openModal('今日分享卡', html, '把这只小可爱保存下来，发给朋友吧');
  $x('shareSave').onclick = () => {
    const svg = $x('shareSvgWrap').querySelector('svg');
    if (!svg) { toast('生成失败，请直接截图'); return; }
    const clone = svg.cloneNode(true);
    clone.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    clone.setAttribute('width', '480');
    clone.setAttribute('height', '440');
    const url = URL.createObjectURL(new Blob([new XMLSerializer().serializeToString(clone)], { type: 'image/svg+xml;charset=utf-8' }));
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 720;
      canvas.height = 900;
      const ctx = canvas.getContext('2d');
      const g = ctx.createLinearGradient(0, 0, 0, 900);
      g.addColorStop(0, '#2a1a4d');
      g.addColorStop(1, '#0f0e24');
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 120, 170, 480, 440);
      ctx.fillStyle = '#ffffff';
      ctx.textAlign = 'center';
      ctx.font = 'bold 46px sans-serif';
      ctx.fillText(currentPet.name, 360, 670);
      ctx.font = '26px sans-serif';
      ctx.fillStyle = '#c9c6e8';
      ctx.fillText('爪爪星球 · CYBER PET HOUSE', 360, 720);
      ctx.fillText('饱食 ' + s.satiety + '  ·  心情 ' + s.mood + '  ·  亲密 ' + s.bond, 360, 770);
      canvas.toBlob((blob) => {
        if (!blob) { toast('保存失败，请直接截图'); return; }
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = '爪爪星球-' + currentPet.name + '.png';
        a.click();
        URL.revokeObjectURL(a.href);
      });
      URL.revokeObjectURL(url);
    };
    img.onerror = () => { toast('保存失败，请直接截图'); URL.revokeObjectURL(url); };
    img.src = url;
  };
}
let storageBound = false;
function checkDeaths() {
  const now = Date.now();
  saved.deathTrack = saved.deathTrack || {};
  saved.deadPets = saved.deadPets || [];
  PETS.forEach((p) => {
    if (saved.deadPets.some((d) => d.id === p.id)) return;
    const s = statOf(p);
    const critical = s.satiety <= 0 || s.mood <= 0;
    if (!critical) { delete saved.deathTrack[p.id]; return; }
    if (!saved.deathTrack[p.id]) {
      saved.deathTrack[p.id] = { since: now, reason: s.satiety <= 0 && s.mood <= 0 ? '又饿又孤单' : s.satiety <= 0 ? '饿坏了' : '太孤独了' };
    }
    if (now - saved.deathTrack[p.id].since >= 10 * 60 * 1000) killPet(p, saved.deathTrack[p.id].reason);
  });
  persist();
}
function killPet(pet, reason) {
  saved.deadPets.push({ id: pet.id, time: Date.now(), reason: reason });
  delete saved.deathTrack[pet.id];
  if (currentPet && currentPet.id === pet.id) {
    currentPet = availablePets().find((x) => x.id !== pet.id) || pet;
  }
  logEvent(pet.name + ' 去了彩虹桥：' + reason);
  persist();
  refreshAll();
  if ($x('modalRoot').hidden) openDeathModal(pet, reason);
  else toast(pet.name + ' 去了彩虹桥…');
}
function openDeathModal(pet, reason) {
  openModal('彩虹桥', '<div class="card"><span class="icon-tile">🕯️</span><h3>' + esc(pet.name) + ' 离开了</h3><p>原因：' + esc(reason) + '</p><p>饱食度或心情值归零并持续 10 分钟就会触发</p><div class="card-actions" style="margin-top:12px"><button class="mini-btn" id="reviveBtn" type="button">花 50 贝壳复活</button></div></div>', '记得及时投喂和陪玩哦');
  $x('reviveBtn').onclick = () => revivePet(pet.id);
}
function revivePet(id) {
  if (saved.coins < 50) { toast('复活需要 50 贝壳'); return; }
  const pet = PETS.find((p) => p.id === id);
  if (!pet) return;
  saved.coins -= 50;
  saved.deadPets = (saved.deadPets || []).filter((d) => d.id !== id);
  delete saved.deathTrack[id];
  const s = statOf(pet);
  s.satiety = 60;
  s.mood = 60;
  s.bond = 40;
  currentPet = pet;
  updateHUD();
  persist();
  closeModal();
  refreshAll();
  sound('reward');
  toast(pet.name + ' 回来啦！');
  emitSync();
}
function startLoops() {
  setInterval(() => { saved.lastSeen = Date.now(); }, 60000);
  setInterval(() => {
    if (document.hidden || !$x('modalRoot').hidden) return;
    talk('idle');
  }, 24000);
  setInterval(() => { if (!document.hidden) maybeEvent(); }, 52000);
  setInterval(() => { if (!document.hidden) checkDeaths(); }, 30000);
  let afkTicks = 0;
  setInterval(() => {
    if (!saved.afkOn) return;
    afkTicks++;
    addCoins(2);
    if (afkTicks % 3 === 0) {
      const food = pick(FOODS.filter((f) => !f.limited));
      grantFood(food.id, 1);
    }
  }, 60000);
  setInterval(() => {
    if (document.hidden) return;
    const food = pick(FOODS);
    grantFood(food.id, 1);
    toast('在线补给：' + food.name + ' 库存 +1');
  }, 30000);
}
function offlineGreeting() {
  const now = Date.now();
  const hoursFloat = Math.max(0, now - (saved.lastSeen || now)) / 3600000;
  const hours = Math.floor(hoursFloat);
  if (hours >= 1) {
    say('等你 ' + hours + ' 小时了，刚才一直在想你');
    logEvent('离线 ' + hours + ' 小时后回归');
  } else {
    setTimeout(() => talk('idle'), 2500);
  }
  return hoursFloat;
}
function initExtras() {
  ensureExtrasState();
  loadProfileState();
  ensureExtrasState();
  loadRoomData();
  persist();
  updateHUD();
  initRoom();
  setupTools();
  refreshAll();
  renderEventBanner();
  const away = offlineGreeting();
  startLoops();
  let modalShown = false;
  if (!saved.adopted) { openAdoption(); modalShown = true; }
  if (!modalShown && checkVersionUpdate(away)) modalShown = true;
  if (!modalShown && !saved.tutorialDone) { openTutorial(away); modalShown = true; }
  if (!modalShown) showOfflinePopup(away);
  saved.lastSeen = Date.now();
  persist();
  if (typeof initSocket === 'function') initSocket();
}
window.addEventListener('load', initExtras);





