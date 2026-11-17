const PETS = [
  { id: 'orange', type: 'cat', name: '小橘', emoji: '🐈', desc: '干饭一级选手，摸肚子会打呼噜', main: '#f2a45e', belly: '#ffe3bd', inner: '#ff9ba5', stats: { satiety: 78, mood: 86, bond: 62 } },
  { id: 'milk', type: 'cat', name: '奶糖', emoji: '🐱', desc: '奶牛猫，两只眼睛颜色不一样', main: '#f4f0e8', belly: '#ffffff', inner: '#ffb3c1', patch: '#4b4763', stats: { satiety: 64, mood: 72, bond: 45 } },
  { id: 'coal', type: 'cat', name: '煤球', emoji: '🐈‍⬛', desc: '黑猫，深夜赛博巡逻员', main: '#5d5b7a', belly: '#8a86a8', inner: '#ff8fa3', stats: { satiety: 55, mood: 68, bond: 38 } },
  { id: 'shiba', type: 'dog', name: '豆豆', emoji: '🐕', desc: '柴犬，微笑天使', main: '#e8a052', belly: '#fff3df', ear: '#c77a35', stats: { satiety: 82, mood: 92, bond: 70 } },
  { id: 'corgi', type: 'dog', name: '年糕', emoji: '🐶', desc: '柯基，屁股摇得像 Wi-Fi', main: '#d8874b', belly: '#fff2e2', ear: '#b56a33', stats: { satiety: 70, mood: 88, bond: 58 } },
  { id: 'husky', type: 'dog', name: '雪碧', emoji: '🐺', desc: '哈士奇，拆家但很可爱', main: '#a3b7cd', belly: '#f7fbff', ear: '#708aa5', patch: '#708aa5', stats: { satiety: 60, mood: 80, bond: 42 } }
];
const FOODS = [
  { id: 'fish', type: 'cat', emoji: '🐟', name: '小鱼干', s: 14, m: 4 },
  { id: 'can', type: 'cat', emoji: '🥫', name: '猫咪罐头', s: 22, m: 6 },
  { id: 'mint', type: 'cat', emoji: '🌿', name: '猫薄荷', s: 4, m: 15 },
  { id: 'kibble', type: 'cat', emoji: '🍚', name: '猫粮', s: 12, m: 2 },
  { id: 'bone', type: 'dog', emoji: '🦴', name: '肉骨头', s: 16, m: 5 },
  { id: 'chicken', type: 'dog', emoji: '🍗', name: '鸡肉干', s: 18, m: 6 },
  { id: 'stick', type: 'dog', emoji: '🥕', name: '磨牙棒', s: 7, m: 11 },
  { id: 'dogfood', type: 'dog', emoji: '🥣', name: '香喷狗粮', s: 13, m: 2 }
];
const EMOJIS = ['❤️', '😻', '🐾', '✨', '😂', '🥹', '🔥', '🌈', '🐱', '🐶', '🍗', '⭐'];
const AMBIENT = ['好可爱啊！', '今天的猫猫也在营业 🐱', '摸摸头 ❤️', '狗勾摇尾巴啦！', '再来一份小鱼干 🐟', '赛博吸猫中…', '这也太治愈了吧 ✨', 'woof! 🐶', '前排投喂 🦴'];
const KEY = 'paw-planet-v1';

const $ = (id) => document.getElementById(id);
const clamp = (n) => Math.max(0, Math.min(100, Math.round(n)));
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

let activeType = 'cat';
let currentPet = null;
let toastTimer = null;

function loadState() {
  try {
    const raw = JSON.parse(localStorage.getItem(KEY) || '{}');
    return {
      stats: raw.stats && typeof raw.stats === 'object' ? raw.stats : {},
      messages: Array.isArray(raw.messages)
        ? raw.messages.filter((m) => m && typeof m.text === 'string' && m.text.trim()).slice(-40)
        : [],
      danmakuOn: raw.danmakuOn !== false
    };
  } catch (err) {
    return { stats: {}, messages: [], danmakuOn: true };
  }
}
function persist() {
  try { localStorage.setItem(KEY, JSON.stringify(saved)); } catch (err) { /* 隐私模式下忽略 */ }
}
const saved = loadState();

function statOf(pet) {
  if (!saved.stats[pet.id]) saved.stats[pet.id] = { ...pet.stats };
  return saved.stats[pet.id];
}

function petSVG(pet) {
  const cat = pet.type === 'cat';
  const ear = pet.ear || pet.main;
  const patch = pet.patch
    ? `<ellipse cx="${cat ? 74 : 88}" cy="${cat ? 102 : 110}" rx="${cat ? 19 : 22}" ry="${cat ? 15 : 18}" fill="${pet.patch}" opacity=".78"/>`
    : '';
  const eyes = `<g class="eyes"><ellipse cx="99" cy="101" rx="6" ry="8" fill="#2c2440"/><ellipse cx="141" cy="101" rx="6" ry="8" fill="#2c2440"/><circle cx="101" cy="98" r="2" fill="#fff"/><circle cx="143" cy="98" r="2" fill="#fff"/></g>`;
  const tail = cat
    ? `<g class="tail-cat"><path d="M166 172 C 204 172, 210 124, 190 116" fill="none" stroke="${pet.main}" stroke-width="16" stroke-linecap="round"/></g>`
    : `<g class="tail-dog"><path d="M164 170 C 196 164, 204 144, 198 128" fill="none" stroke="${pet.main}" stroke-width="14" stroke-linecap="round"/></g>`;
  const body = `<ellipse cx="120" cy="166" rx="58" ry="42" fill="${pet.main}"/><ellipse cx="120" cy="180" rx="36" ry="25" fill="${pet.belly}" opacity=".92"/><ellipse cx="94" cy="199" rx="13" ry="8" fill="${pet.main}"/><ellipse cx="146" cy="199" rx="13" ry="8" fill="${pet.main}"/>`;
  const ears = cat
    ? `<path d="M70 88 L66 38 L108 70 Z" fill="${pet.main}"/><path d="M170 88 L174 38 L132 70 Z" fill="${pet.main}"/><path d="M78 77 L75 53 L96 71 Z" fill="${pet.inner}"/><path d="M162 77 L165 53 L144 71 Z" fill="${pet.inner}"/>`
    : `<path d="M74 82 C 42 70, 38 118, 58 136 C 66 143, 78 130, 80 112 Z" fill="${ear}"/><path d="M166 82 C 198 70, 202 118, 182 136 C 174 143, 162 130, 160 112 Z" fill="${ear}"/>`;
  const face = cat
    ? `${patch}${eyes}<path d="M115 117 L125 117 L120 122 Z" fill="#ff8fa3"/><path d="M120 123 q-7 8 -14 1 M120 123 q7 8 14 1" fill="none" stroke="#7b5a68" stroke-width="2.4" stroke-linecap="round"/><g stroke="#e4d6ce" stroke-width="1.6" stroke-linecap="round" opacity=".85"><path d="M88 116 L52 108 M88 122 L50 124 M152 116 L188 108 M152 122 L190 124"/></g><ellipse cx="88" cy="113" rx="9" ry="5" fill="#ff9db5" opacity=".45"/><ellipse cx="152" cy="113" rx="9" ry="5" fill="#ff9db5" opacity=".45"/>`
    : `${patch}<ellipse cx="120" cy="128" rx="31" ry="22" fill="${pet.belly}"/>${eyes}<ellipse cx="120" cy="119" rx="9" ry="6" fill="#3b2d3a"/><path d="M120 125 v5 M120 130 q-10 8 -18 0 M120 130 q10 8 18 0" fill="none" stroke="#5a444c" stroke-width="2.4" stroke-linecap="round"/><ellipse class="tongue" cx="120" cy="140" rx="7" ry="9" fill="#ff7f9e"/>`;
  return `<svg class="pet-svg" viewBox="0 0 240 220" role="img" aria-label="${pet.name}">${tail}${body}${ears}<circle cx="120" cy="104" r="56" fill="${pet.main}"/>${face}</svg>`;
}

function renderPetList() {
  const list = $('petList');
  list.innerHTML = '';
  const pets = PETS.filter((p) => p.type === activeType);
  $('petCount').textContent = pets.length + ' 只';
  pets.forEach((p) => {
    const s = statOf(p);
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'pet-item' + (currentPet && currentPet.id === p.id ? ' active' : '');
    btn.dataset.id = p.id;
    btn.innerHTML = `<span class="pet-avatar" style="--av-bg:${p.main}33">${p.emoji}</span><span class="pet-meta"><b>${p.name}</b><small>${p.desc}</small><span class="pet-mini-bar"><i style="width:${s.satiety}%"></i></span></span>`;
    btn.addEventListener('click', () => selectPet(p.id));
    list.appendChild(btn);
  });
}
function renderFoods() {
  const grid = $('foodGrid');
  grid.innerHTML = '';
  FOODS.filter((f) => f.type === activeType).forEach((f) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'food-btn';
    btn.innerHTML = `<span class="food-emoji">${f.emoji}</span><span class="food-info"><b>${f.name}</b><small>饱食 +${f.s} · 心情 +${f.m}</small></span>`;
    btn.addEventListener('click', () => feed(f));
    grid.appendChild(btn);
  });
  if (currentPet) $('feedingTo').textContent = '喂：' + currentPet.name;
}
function renderPet() {
  if (!currentPet) return;
  $('petArt').innerHTML = petSVG(currentPet);
  $('petName').textContent = currentPet.name;
  $('petDesc').textContent = currentPet.desc;
  $('plateId').textContent = 'ID: ' + (currentPet.type === 'cat' ? 'CAT' : 'DOG') + '-' + String(PETS.indexOf(currentPet) + 1).padStart(3, '0');
  renderStats();
}
function renderStats() {
  if (!currentPet) return;
  const s = statOf(currentPet);
  $('barSatiety').style.width = s.satiety + '%';
  $('barMood').style.width = s.mood + '%';
  $('barBond').style.width = s.bond + '%';
  $('valSatiety').textContent = s.satiety;
  $('valMood').textContent = s.mood;
  $('valBond').textContent = s.bond;
  $('moodText').textContent = s.mood >= 80 ? '心情超棒' : s.mood >= 50 ? '还不错' : s.mood >= 25 ? '有点无聊' : '急需安慰';
  const item = Array.from($('petList').children).find((el) => el.dataset.id === currentPet.id);
  if (item) {
    const bar = item.querySelector('.pet-mini-bar i');
    if (bar) bar.style.width = s.satiety + '%';
  }
}
function renderMessages() {
  const box = $('dmList');
  box.innerHTML = '';
  $('dmCount').textContent = saved.messages.length + ' 条';
  saved.messages.slice(-8).reverse().forEach((msg) => {
    const item = document.createElement('div');
    item.className = 'dm-item' + (msg.own ? ' own' : '');
    const ava = document.createElement('span');
    ava.className = 'dm-ava';
    ava.textContent = msg.avatar || '🐾';
    const body = document.createElement('div');
    body.className = 'dm-body';
    const meta = document.createElement('div');
    meta.className = 'dm-meta';
    const t = new Date(msg.time || Date.now());
    meta.textContent = (msg.user || '匿名用户') + ' · ' + String(t.getHours()).padStart(2, '0') + ':' + String(t.getMinutes()).padStart(2, '0');
    const txt = document.createElement('div');
    txt.className = 'dm-text';
    txt.textContent = msg.text;
    body.append(meta, txt);
    item.append(ava, body);
    box.appendChild(item);
  });
}
function selectType(type) {
  activeType = type;
  document.querySelectorAll('.seg').forEach((btn) => {
    const on = btn.dataset.type === type;
    btn.classList.toggle('active', on);
    btn.setAttribute('aria-selected', on ? 'true' : 'false');
  });
  currentPet = PETS.find((p) => p.type === type);
  renderPetList();
  renderFoods();
  renderPet();
}
function selectPet(id) {
  const p = PETS.find((x) => x.id === id);
  if (!p) return;
  currentPet = p;
  renderPetList();
  renderFoods();
  renderPet();
}
function toast(text) {
  const el = $('toast');
  el.textContent = text;
  el.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove('show'), 2200);
}
function pulse(cls, ms) {
  const el = $('petArt');
  el.classList.remove('eating', 'playing', 'happy');
  void el.offsetWidth;
  el.classList.add(cls);
  setTimeout(() => el.classList.remove(cls), ms);
}
function spawnReaction(emojis, count) {
  const layer = $('reactionLayer');
  for (let i = 0; i < count; i++) {
    const el = document.createElement('span');
    el.className = 'reaction';
    el.textContent = pick(emojis);
    el.style.left = (35 + Math.random() * 30) + '%';
    el.style.top = (48 + Math.random() * 18) + '%';
    el.style.animationDelay = (i * 0.08) + 's';
    layer.appendChild(el);
    el.addEventListener('animationend', () => el.remove());
  }
}
function spawnToy() {
  const el = document.createElement('span');
  el.className = 'toy-ball';
  el.textContent = currentPet.type === 'cat' ? '🧶' : '⚾';
  $('reactionLayer').appendChild(el);
  el.addEventListener('animationend', () => el.remove());
}
function spawnFood(emoji) {
  const el = document.createElement('span');
  el.className = 'fly-food';
  el.textContent = emoji;
  $('reactionLayer').appendChild(el);
  el.addEventListener('animationend', () => el.remove());
}
function feed(food) {
  if (!currentPet || food.type !== currentPet.type) return;
  const s = statOf(currentPet);
  if (s.satiety >= 100) {
    toast(currentPet.name + ' 已经吃撑啦，休息一下再喂～');
    return;
  }
  s.satiety = clamp(s.satiety + food.s);
  s.mood = clamp(s.mood + food.m);
  s.bond = clamp(s.bond + 1);
  persist();
  renderStats();
  renderPetList();
  pulse('eating', 1200);
  spawnFood(food.emoji);
  spawnReaction(['😋', '💛', '✨'], 3);
  $('dmInput').placeholder = '刚投喂了' + food.name + '，说点什么吧…';
  $('dmInput').focus();
}
function pat() {
  if (!currentPet) return;
  const s = statOf(currentPet);
  s.mood = clamp(s.mood + 4);
  s.bond = clamp(s.bond + 2);
  persist();
  renderStats();
  pulse('happy', 500);
  spawnReaction(['💗', '✨', '🐾'], 4);
  toast(currentPet.name + ' 舒服地眯起了眼睛～');
}
function play() {
  if (!currentPet) return;
  const s = statOf(currentPet);
  if (s.satiety <= 5) {
    toast('饿得跑不动啦，先投喂再玩吧～');
    return;
  }
  s.satiety = clamp(s.satiety - 3);
  s.mood = clamp(s.mood + 10);
  s.bond = clamp(s.bond + 3);
  persist();
  renderStats();
  renderPetList();
  pulse('playing', 1700);
  spawnToy();
  spawnReaction(['✨', '🎾', '💖'], 3);
}
function launchDanmaku(msg, own) {
  if (!saved.danmakuOn) return;
  const layer = $('danmakuLayer');
  if (layer.children.length > 9) layer.firstElementChild.remove();
  const el = document.createElement('div');
  el.className = 'danmaku-item' + (own || msg.own ? ' own' : '');
  const ava = document.createElement('span');
  ava.className = 'dm-avatar';
  ava.textContent = msg.avatar || '🐾';
  const txt = document.createElement('span');
  txt.className = 'dm-text';
  txt.textContent = msg.text;
  el.append(ava, txt);
  el.style.top = (8 + Math.random() * 62) + '%';
  el.style.animationDuration = (7 + Math.random() * 4) + 's';
  el.style.setProperty('--dm-color', own || msg.own ? '#ffd166' : pick(['#ffffff', '#5ee7ff', '#ffb3d1', '#d9c8ff']));
  layer.appendChild(el);
  el.addEventListener('animationend', () => el.remove());
}
function insertEmoji(emoji) {
  const input = $('dmInput');
  const start = input.selectionStart === null ? input.value.length : input.selectionStart;
  const end = input.selectionEnd === null ? start : input.selectionEnd;
  input.value = input.value.slice(0, start) + emoji + input.value.slice(end);
  input.focus();
  input.setSelectionRange(start + emoji.length, start + emoji.length);
}
function updateToggle() {
  const btn = $('danmakuToggle');
  btn.textContent = '💬 弹幕：' + (saved.danmakuOn ? '开' : '关');
  btn.setAttribute('aria-pressed', saved.danmakuOn ? 'true' : 'false');
}
function init() {
  if (saved.messages.length === 0) {
    const now = Date.now();
    saved.messages = [
      { avatar: '🐱', user: '橘座粉丝', text: '小橘今天也在认真营业！', time: now - 180000 },
      { avatar: '✨', user: '云铲屎官', text: '刚投喂了小鱼干，好治愈 🐟', time: now - 120000 },
      { avatar: '🐶', user: '狗勾控', text: '前排等待摇尾巴！', time: now - 60000 }
    ];
    persist();
  }
  EMOJIS.forEach((emoji) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'emoji-btn';
    btn.textContent = emoji;
    btn.setAttribute('aria-label', '插入表情 ' + emoji);
    btn.addEventListener('click', () => insertEmoji(emoji));
    $('emojiRow').appendChild(btn);
  });

  document.querySelectorAll('.seg').forEach((btn) => {
    btn.addEventListener('click', () => selectType(btn.dataset.type));
  });
  $('btnPet').addEventListener('click', pat);
  $('btnPlay').addEventListener('click', play);
  $('btnFocusFeed').addEventListener('click', () => {
    $('feedPanel').scrollIntoView({ behavior: 'smooth', block: 'center' });
    toast('选一份好吃的投喂吧～');
  });
  $('petArt').addEventListener('click', pat);
  $('petArt').addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      pat();
    }
  });
  $('dmForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const input = $('dmInput');
    const text = input.value.trim();
    if (!text) {
      toast('先写点什么再发送吧～');
      input.focus();
      return;
    }
    const msg = { avatar: pick(EMOJIS), user: '你', text: text, time: Date.now(), own: true };
    saved.messages.push(msg);
    saved.messages = saved.messages.slice(-40);
    persist();
    renderMessages();
    launchDanmaku(msg, true);
    input.value = '';
    input.placeholder = '说点什么，飘到舞台上去…';
    input.focus();
  });
  $('danmakuToggle').addEventListener('click', () => {
    saved.danmakuOn = !saved.danmakuOn;
    persist();
    updateToggle();
    if (!saved.danmakuOn) $('danmakuLayer').innerHTML = '';
  });

  currentPet = PETS[0];
  renderMessages();
  updateToggle();
  renderPetList();
  renderFoods();
  renderPet();

  setTimeout(() => saved.messages.slice(-3).forEach((m, i) => setTimeout(() => launchDanmaku(m, false), i * 900)), 700);
  setInterval(() => {
    if (!saved.danmakuOn || document.hidden || Math.random() < 0.3) return;
    launchDanmaku({ avatar: pick(EMOJIS), text: pick(AMBIENT) }, false);
  }, 6500);
  setInterval(() => {
    PETS.forEach((p) => {
      const s = statOf(p);
      s.satiety = clamp(s.satiety - 1);
      s.mood = clamp(s.mood - 1);
    });
    persist();
    renderStats();
    renderPetList();
  }, 30000);
  setInterval(() => {
    const el = $('onlineCount');
    const n = Math.max(80, Math.min(220, Number(el.textContent) + Math.floor(Math.random() * 7) - 3));
    el.textContent = n;
  }, 5000);
}
init();


