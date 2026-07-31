/* ═══════════════════════════════════════════════════════════════════
   Happy Girlfriend's Day — Ajju ❤️ Srishuu
   All the words live in the CONFIG block below. Edit freely.
   ═══════════════════════════════════════════════════════════════════ */

/* ─────────────────────────  ✏️  CONFIG  ─────────────────────────── */

const MET_DATE = new Date(2026, 4, 12);   // 12 May 2026 — the day we met

const LETTER = `Srishuu,

Tum woh insaan ho jo mujhe is duniya mein sabse special mili.

You are the most special person I have ever found — aur tum hi rahogi, meri poori zindagi ke liye. ❤️

*But… haan, ek BUT hai* 😏

Pehle ek chhota sa quiz complete karna padega.

Agar tum meri Srishuu ho, toh yeh toh aasaan hoga… right? 😌`;

const QUIZ = [
  {
    id: 'q1', type: 'mcq',
    q: 'Who is the better dancer? 💃',
    opts: ['Ajju', 'Ajuuu', 'Ajuuuuuu', 'Srishuuuuuuuu'],
    correct: [3],
    wrong: ['Bilkul nahi 😂 phir se socho.', 'Arre nahi yaar 🙈 dobara try karo.', 'Hmm… nope 😌'],
    right: 'Ekdum sahi! 💃 Obviously Srishuu — Ajju toh bas taali baja sakta hai 😅',
    photo: 'q1',
    caption: 'Exhibit A ❤️'
  },
  {
    id: 'q2', type: 'mcq',
    q: 'First date pe humne kaunse colour ki dress pehni thi? 🖤❤️',
    hint: '(Sochke… isme ek chhoti si trick hai 😏)',
    opts: ['Yellow & Black', 'Black & Yellow'],
    correct: [0, 1],
    right: 'Dono sahi! 😍 Kyunki dono ne wahi pehna tha — perfectly matching, bina kuch plan kiye.',
    photo: 'q2',
    caption: 'Our very first date 🖤❤️'
  },
  {
    id: 'q3', type: 'mcq',
    q: 'Ek hi din mein humne maximum kitne plushies jeete the? 🧸',
    opts: ['3', '4', '5', '6'],
    correct: [1],
    wrong: ['Utne nahi 😄 thoda aur yaad karo.', 'Nahi… ek aur guess 🧸', 'So close! Par nahi 😆'],
    right: 'Chaar! 🧸🧸🧸🧸 Ek din, ek claw machine, aur do champions.',
    photo: 'q3',
    caption: 'Our plushie army 🧸'
  },
  {
    id: 'q4', type: 'text',
    q: 'Humara sabse pehla Italian restaurant kaunsa tha? 🍝',
    hint: '(Yeh toh likhna padega — no options 😌)',
    placeholder: 'Yahan type karo…',
    wrong: [
      'Nahi jaan 😅 wahan toh hum baad mein gaye the. Ab yaad aaya? 🤔',
      'Abhi bhi nahi? 🥺 ek baar aur socho…'
    ],
    hintAfter: 2,
    hintText: 'Hint:  C _ _ _ _   A _ _ _ _ A  ☕',
    right: 'Perfect ✨ Caffè Allora — jahan humne garlic bread khaya, coffee pi, aur barish ko enjoy kiya 🥹☕🌧️',
    photo: 'q4',
    caption: 'Caffè Allora ☕🌧️'
  },
  {
    id: 'q5', type: 'mcq',
    q: 'Humara pehla international trip kahan hoga? ✈️',
    opts: ['Japan', 'Russia', 'Canada', 'Mauritius'],
    correct: [0],
    wrong: ['Nahi… ek aur guess 😌 (hint: 🌸)', 'Thanda hai wahan 🥶 phir se socho.', 'Uhh nope 😆'],
    right: 'Japan 🇯🇵🌸 Cherry blossoms, ramen, aur tumhare saath ek-ek photo.',
    emoji: '🌸 🗼 🍜'
  }
];

const FINAL_Q = {
  id: 'q6', type: 'mcq',
  q: 'Ajju sabse zyada khush kiske saath hota hai? 🥰',
  opts: ['Srishuu', 'Srishuu', 'Srishuu', 'srishuu'],
  correct: 'any',
  right: 'Kitne bhi options ho na…\nAjju hamesha Srishuu hi chunega. ❤️',
  emoji: '❤️ ❤️ ❤️'
};

// Q4 accepts anything close to "allora"
const ALLORA_RE = /al+o+r+a/;

const NO_TAUNTS = [
  'Arre nahi nahi 😑 dobara socho.',
  'Are you sure? 🤨',
  'Pakka? 😯',
  'Sach mein pakka?? 🥺'
];
const NO_GONE = 'Maine "No" hata diya 😌 ab sirf YES hai.';

const YES_CHAIN = [
  { q: 'Pakka? 🥺', btn: 'Haan, pakka! ❤️' },
  { q: 'Sach mein… lock kar doon? 🔒', btn: 'Lock kar de! 🔒' }
];

// Background music. Drop any file in as Assets/song.mp3 — no other change needed.
// To repeat only the best bit instead of the whole track, set both times in seconds,
// e.g. { start: 48, end: 76 }. Leave them null to loop the entire file.
const SONG_LOOP = { start: null, end: null };

/* ─────────────────────────  BUILD QUIZ  ─────────────────────────── */

const TOTAL_Q = QUIZ.length + 1;

function dots(activeIdx) {
  return `<div class="dots">${Array.from({ length: TOTAL_Q }, (_, i) =>
    `<span class="dot${i < activeIdx ? ' done' : i === activeIdx ? ' now' : ''}"></span>`).join('')}</div>`;
}

function buildSlide(item, idx) {
  const s = document.createElement('section');
  s.className = 'slide quiz';
  s.id = 's-' + item.id;

  const body = item.type === 'text'
    ? `<form class="answer-form" novalidate>
         <input class="answer-input" type="text" autocomplete="off" autocorrect="off"
                autocapitalize="off" spellcheck="false" placeholder="${item.placeholder}">
         <button class="btn" type="submit">Check karo ✨</button>
       </form>`
    : `<div class="options">${item.opts.map((o, i) =>
         `<button class="opt" data-i="${i}"><span class="lbl">${'ABCD'[i]}</span>${o}</button>`).join('')}</div>`;

  // deliberately no src — the photo is encrypted and gets attached after she unlocks
  const revealInner = item.photo
    ? `<div class="polaroid"><img alt="" data-photo="${item.photo}"><p class="caption">${item.caption}</p></div>`
    : `<div class="big-emoji">${item.emoji || '❤️'}</div>`;

  s.innerHTML = `
    <div class="qhead">
      <span class="qnum">Question ${idx + 1} / ${TOTAL_Q}</span>
      ${dots(idx)}
    </div>
    <h2 class="qtext">${item.q}</h2>
    ${item.hint ? `<p class="qhint">${item.hint}</p>` : ''}
    ${body}
    <p class="feedback"></p>
    <div class="reveal">
      ${revealInner}
      <button class="btn next">Next ➜</button>
    </div>`;

  return s;
}

QUIZ.forEach((item, i) => document.getElementById('quiz-mount').appendChild(buildSlide(item, i)));
document.getElementById('final-q-mount').appendChild(buildSlide(FINAL_Q, QUIZ.length));

/* ─────────────────────────  QUIZ LOGIC  ─────────────────────────── */

function levenshtein(a, b) {
  const m = a.length, n = b.length;
  let prev = Array.from({ length: n + 1 }, (_, j) => j);
  for (let i = 1; i <= m; i++) {
    const cur = [i];
    for (let j = 1; j <= n; j++) {
      cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
    }
    prev = cur;
  }
  return prev[n];
}

function plain(str) {
  return str.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

// "allora", "Caffè Allora", "cafe alora", "allorra" → all pass. "brick oven" → fails.
function matchesAllora(input) {
  const squashed = plain(input).replace(/[^a-z0-9]/g, '');
  if (!squashed) return false;
  if (ALLORA_RE.test(squashed)) return true;
  return plain(input).split(/[^a-z0-9]+/).filter(Boolean)
    .some(w => w.length >= 4 && levenshtein(w, 'allora') <= 2);
}

function wireQuiz(item, idx) {
  const slide = document.getElementById('s-' + item.id);
  const feedback = slide.querySelector('.feedback');
  const reveal = slide.querySelector('.reveal');
  let misses = 0;
  let solved = false;

  const win = () => {
    solved = true;
    feedback.textContent = item.right;
    feedback.className = 'feedback good';
    reveal.classList.add('show');
    slide.querySelectorAll('.dot')[idx].classList.replace('now', 'done');
    if (item.correct === 'any') burstHearts();
    setTimeout(() => reveal.scrollIntoView({ behavior: 'smooth', block: 'center' }), 260);
  };

  const miss = () => {
    const list = item.wrong || ['Nahi 😅 phir se socho.'];
    feedback.textContent = list[Math.min(misses, list.length - 1)];
    feedback.className = 'feedback bad';
    misses++;
    if (item.hintAfter && misses >= item.hintAfter) {
      const hint = slide.querySelector('.qhint') || slide.querySelector('.qtext').insertAdjacentElement(
        'afterend', Object.assign(document.createElement('p'), { className: 'qhint' }));
      hint.textContent = item.hintText;
    }
  };

  if (item.type === 'mcq') {
    slide.querySelectorAll('.opt').forEach(btn => btn.addEventListener('click', () => {
      if (solved) return;
      const i = +btn.dataset.i;
      const ok = item.correct === 'any' || item.correct.includes(i);
      if (ok) {
        btn.classList.add('correct');
        slide.querySelectorAll('.opt').forEach(b => { b.disabled = true; });
        win();
      } else {
        btn.classList.add('wrong');
        setTimeout(() => btn.classList.remove('wrong'), 500);
        miss();
      }
    }));
  } else {
    const form = slide.querySelector('.answer-form');
    const input = slide.querySelector('.answer-input');
    form.addEventListener('submit', e => {
      e.preventDefault();
      if (solved) return;
      if (matchesAllora(input.value)) {
        input.classList.add('ok');
        input.disabled = true;
        form.querySelector('button').hidden = true;
        input.blur();
        win();
      } else {
        input.classList.add('wrong');
        setTimeout(() => input.classList.remove('wrong'), 500);
        miss();
      }
    });
  }
}

QUIZ.forEach(wireQuiz);
wireQuiz(FINAL_Q, QUIZ.length);

/* ─────────────────────────  SLIDE NAV  ──────────────────────────── */

const slides = [...document.querySelectorAll('.slide')];
const backBtn = document.getElementById('back');
let cur = 0;
let floorSlide = 0;   // once she's unlocked, she can never land back on the lock screen

const onEnter = {
  's-letter': startTyping,
  's-locked': () => confettiBlast(),
  's-end': countUpDays
};

function go(i) {
  if (i < floorSlide || i >= slides.length || i === cur) return;
  slides[cur].classList.remove('active');
  cur = i;
  slides[cur].classList.add('active');
  backBtn.hidden = cur <= floorSlide;
  window.scrollTo(0, 0);
  const fn = onEnter[slides[cur].id];
  if (fn) fn();
}

document.addEventListener('click', e => {
  if (e.target instanceof Element && e.target.closest('.btn.next')) go(cur + 1);
});
backBtn.addEventListener('click', () => go(cur - 1));
document.addEventListener('keydown', e => {
  if (e.target.matches('input')) return;
  if (e.key === 'ArrowRight') go(cur + 1);
  if (e.key === 'ArrowLeft') go(cur - 1);
});

/* ────────────────────  LOCK SCREEN / PHOTO DECRYPTION  ──────────────
   The photos ship as AES-256-GCM ciphertext (see tools/encrypt-photos.mjs).
   Nothing decrypts them but the password — the .enc files on the server are
   useless on their own, so the repo and the Pages site can stay public.     */

const lockForm = document.getElementById('lock-form');
const lockInput = document.getElementById('lock-input');
const lockBtn = document.getElementById('lock-btn');
const lockFeedback = document.getElementById('lock-feedback');

const unhex = h => Uint8Array.from(h.match(/../g).map(b => parseInt(b, 16)));

let encMeta = null;
const metaReady = fetch('Assets/photos/enc.json')
  .then(r => r.json()).then(m => (encMeta = m)).catch(() => null);

async function deriveKey(password, salt, iterations) {
  const base = await crypto.subtle.importKey(
    'raw', new TextEncoder().encode(password), 'PBKDF2', false, ['deriveKey']);
  return crypto.subtle.deriveKey(
    { name: 'PBKDF2', salt, iterations, hash: 'SHA-256' },
    base, { name: 'AES-GCM', length: 256 }, false, ['decrypt']);
}

// [12-byte IV][ciphertext || tag] — a wrong key fails the tag, so this throws
function unseal(key, bytes) {
  return crypto.subtle.decrypt({ name: 'AES-GCM', iv: bytes.slice(0, 12) }, key, bytes.slice(12));
}

async function decryptPhotos(key) {
  for (const name of encMeta.files) {
    try {
      const res = await fetch(`Assets/photos/${name}.enc`);
      const jpg = await unseal(key, new Uint8Array(await res.arrayBuffer()));
      const url = URL.createObjectURL(new Blob([jpg], { type: 'image/jpeg' }));
      document.querySelectorAll(`img[data-photo="${name}"]`).forEach(img => { img.src = url; });
    } catch { /* leave the polaroid blank rather than breaking the slide */ }
  }
}

lockForm.addEventListener('submit', async e => {
  e.preventDefault();
  await metaReady;
  if (!encMeta) return;
  lockBtn.disabled = true;
  lockBtn.textContent = 'Kholte hain… ⏳';
  lockFeedback.textContent = '';
  try {
    // forgiving: "12/05/2026" and "12 05 2026" work the same as "12052026"
    const typed = lockInput.value.replace(/[^a-zA-Z0-9]/g, '');
    const key = await deriveKey(typed, unhex(encMeta.salt), encMeta.iterations);
    await unseal(key, unhex(encMeta.check));      // throws on a wrong password
    lockInput.disabled = true;
    floorSlide = 1;
    decryptPhotos(key);                           // in the background — she has a letter to read first
    tryPlayMusic();                               // this tap is the gesture iOS wants
    go(1);
  } catch {
    lockInput.classList.add('wrong');
    setTimeout(() => lockInput.classList.remove('wrong'), 500);
    lockFeedback.textContent = 'Hmm… yeh nahi hai 🤔 phir se socho.';
    lockFeedback.className = 'feedback bad';
  }
  lockBtn.disabled = false;
  lockBtn.textContent = 'Kholo 🔓';
});

/* ─────────────────────────  ENVELOPE  ───────────────────────────── */

const envelope = document.getElementById('envelope');
function openEnvelope() {
  if (envelope.classList.contains('open')) return;
  envelope.classList.add('open');
  tryPlayMusic();
  setTimeout(() => go(cur + 1), 950);
}
envelope.addEventListener('click', openEnvelope);
envelope.addEventListener('keydown', e => {
  if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openEnvelope(); }
});

/* ─────────────────────────  TYPEWRITER  ─────────────────────────── */

const typedEl = document.getElementById('typed');
const letterNext = document.getElementById('letter-next');
const skipHint = document.getElementById('skip-hint');

// strip the *bold* markers, remembering which characters were inside them
const chars = [];
{
  let bold = false;
  for (const ch of LETTER) {
    if (ch === '*') { bold = !bold; continue; }
    chars.push({ ch, bold });
  }
}

function renderTyped(upto) {
  let html = '', open = false;
  for (let i = 0; i < upto; i++) {
    const { ch, bold } = chars[i];
    if (bold && !open) { html += '<b>'; open = true; }
    if (!bold && open) { html += '</b>'; open = false; }
    html += ch === '\n' ? '\n' : ch.replace('&', '&amp;').replace('<', '&lt;');
  }
  if (open) html += '</b>';
  typedEl.innerHTML = html + (upto < chars.length ? '<span class="cursor"></span>' : '');
}

let typeTimer = null, typing = false, typed = false;

function finishTyping() {
  clearTimeout(typeTimer);
  typing = false; typed = true;
  renderTyped(chars.length);
  skipHint.hidden = true;
  letterNext.hidden = false;
  // on a short screen the letter can push the button below the fold
  setTimeout(() => letterNext.scrollIntoView({ behavior: 'smooth', block: 'center' }), 120);
}

function startTyping() {
  if (typed || typing) return;
  typing = true;
  skipHint.hidden = false;
  letterNext.hidden = true;
  let i = 0;
  const step = () => {
    if (i >= chars.length) return finishTyping();
    renderTyped(++i);
    const c = chars[i - 1].ch;
    const pause = c === '\n' ? 120 : '.…,—'.includes(c) ? 180 : 20;
    typeTimer = setTimeout(step, pause);
  };
  step();
}

document.getElementById('s-letter').addEventListener('click', e => {
  if (typing && !e.target.closest('.btn')) finishTyping();
});

/* ─────────────────────────  FOREVER? ────────────────────────────── */

const btnYes = document.getElementById('btn-yes');
const btnNo = document.getElementById('btn-no');
const foreverQ = document.getElementById('forever-q');
const foreverTaunt = document.getElementById('forever-taunt');
let noCount = 0, yesSize = 17, noSize = 17, yesStep = 0;

btnNo.addEventListener('click', () => {
  yesSize = Math.min(yesSize + 7, 46);
  noSize = Math.max(noSize - 2.5, 9);
  btnYes.style.fontSize = yesSize + 'px';
  btnYes.style.padding = `${15 + (yesSize - 17) * 0.9}px ${30 + (yesSize - 17) * 1.6}px`;
  btnNo.style.fontSize = noSize + 'px';
  btnNo.style.padding = '10px 18px';
  btnNo.style.minHeight = 'auto';

  foreverTaunt.textContent = NO_TAUNTS[Math.min(noCount, NO_TAUNTS.length - 1)];
  noCount++;

  if (noCount > NO_TAUNTS.length) {
    btnNo.classList.add('gone');
    foreverTaunt.textContent = NO_GONE;
    return;
  }
  // teleport somewhere else on screen: always fully visible, never on top of YES
  btnNo.classList.add('runaway');
  const r = btnNo.getBoundingClientRect();
  const yesR = btnYes.getBoundingClientRect();
  const pad = 14, gap = 16;
  let x = pad, y = pad, tries = 0;
  do {
    x = pad + Math.random() * Math.max(0, innerWidth - r.width - pad * 2);
    y = innerHeight * 0.16 + Math.random() * Math.max(0, innerHeight * 0.68 - r.height);
    tries++;
  } while (tries < 24 && !(
    x + r.width < yesR.left - gap || x > yesR.right + gap ||
    y + r.height < yesR.top - gap || y > yesR.bottom + gap));
  btnNo.style.left = Math.round(x) + 'px';
  btnNo.style.top = Math.round(y) + 'px';
});

btnYes.addEventListener('click', () => {
  btnNo.classList.add('gone');
  if (yesStep < YES_CHAIN.length) {
    const stepCfg = YES_CHAIN[yesStep];
    foreverQ.textContent = stepCfg.q;
    btnYes.textContent = stepCfg.btn;
    foreverTaunt.textContent = '';
    yesStep++;
    return;
  }
  confettiBlast(180);
  burstHearts(18);
  setTimeout(() => go(cur + 1), 700);
});

/* ─────────────────────────  DAY COUNTER  ────────────────────────── */

function daysTogether() {
  const midnight = d => new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
  return Math.max(0, Math.round((midnight(new Date()) - midnight(MET_DATE)) / 86400000));
}

let counted = false;
function countUpDays() {
  const el = document.getElementById('daycount');
  const target = daysTogether();
  if (counted) { el.textContent = target; return; }
  counted = true;
  const start = performance.now(), dur = 1400;
  const tick = now => {
    const p = Math.min(1, (now - start) / dur);
    el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3)));
    if (p < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}


/* ─────────────────────────  FLOATING HEARTS  ────────────────────── */

const heartLayer = document.getElementById('hearts');
const HEART_EMOJI = ['❤️', '💗', '💖', '💕', '✨', '🩷'];

function spawnHeart(fast) {
  const s = document.createElement('span');
  s.textContent = HEART_EMOJI[Math.floor(Math.random() * HEART_EMOJI.length)];
  s.style.left = Math.random() * 100 + 'vw';
  s.style.fontSize = 13 + Math.random() * 16 + 'px';
  s.style.animationDuration = (fast ? 3 + Math.random() * 2 : 9 + Math.random() * 7) + 's';
  s.style.setProperty('--r', (Math.random() * 90 - 45) + 'deg');
  heartLayer.appendChild(s);
  s.addEventListener('animationend', () => s.remove());
}
setInterval(() => { if (heartLayer.childElementCount < 26) spawnHeart(); }, 900);
for (let i = 0; i < 5; i++) setTimeout(spawnHeart, i * 400);

function burstHearts(n = 12) {
  for (let i = 0; i < n; i++) setTimeout(() => spawnHeart(true), i * 70);
}

/* ─────────────────────────  CONFETTI  ───────────────────────────── */

const cv = document.getElementById('confetti');
const ctx = cv.getContext('2d');
const COLORS = ['#FF6B8A', '#E63E63', '#FFC94A', '#FF9DB6', '#7ED0B0', '#FFE3EC'];
let parts = [], running = false;

function sizeCanvas() {
  const dpr = Math.min(devicePixelRatio || 1, 2);
  cv.width = innerWidth * dpr;
  cv.height = innerHeight * dpr;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}
sizeCanvas();
addEventListener('resize', sizeCanvas);

function confettiBlast(n = 130) {
  const ox = innerWidth / 2, oy = innerHeight * 0.42;
  for (let i = 0; i < n; i++) {
    const a = Math.random() * Math.PI * 2, sp = 4 + Math.random() * 11;
    parts.push({
      x: ox, y: oy,
      vx: Math.cos(a) * sp, vy: Math.sin(a) * sp - 5,
      rot: Math.random() * 6.28, vr: (Math.random() - 0.5) * 0.35,
      w: 6 + Math.random() * 8, h: 8 + Math.random() * 10,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      heart: Math.random() < 0.25,
      life: 1
    });
  }
  if (!running) { running = true; requestAnimationFrame(frame); }
}

function frame() {
  ctx.clearRect(0, 0, innerWidth, innerHeight);
  parts = parts.filter(p => p.life > 0 && p.y < innerHeight + 60);
  for (const p of parts) {
    p.vy += 0.24;            // gravity
    p.vx *= 0.995;
    p.x += p.vx; p.y += p.vy; p.rot += p.vr;
    if (p.y > innerHeight * 0.75) p.life -= 0.012;
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.rot);
    ctx.globalAlpha = Math.max(0, p.life);
    if (p.heart) {
      ctx.font = `${p.h + 8}px serif`;
      ctx.textAlign = 'center';
      ctx.fillText('❤️', 0, 0);
    } else {
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
    }
    ctx.restore();
  }
  if (parts.length) requestAnimationFrame(frame);
  else { running = false; ctx.clearRect(0, 0, innerWidth, innerHeight); }
}

/* ─────────────────────────  MUSIC  ──────────────────────────────── */

const song = document.getElementById('song');
const musicBtn = document.getElementById('music');
let wantsMusic = true;

song.volume = 0.35;
// preload="metadata" keeps the file off her mobile data until she actually plays it
song.addEventListener('loadedmetadata', () => { musicBtn.hidden = false; }, { once: true });
song.addEventListener('error', () => { musicBtn.hidden = true; });

// Repeat just one section of the track, if SONG_LOOP is configured
if (SONG_LOOP.start != null && SONG_LOOP.end != null) {
  song.loop = false;
  const jumpBack = () => { song.currentTime = SONG_LOOP.start; };
  song.addEventListener('play', () => {
    if (song.currentTime < SONG_LOOP.start || song.currentTime >= SONG_LOOP.end) jumpBack();
  });
  song.addEventListener('ended', jumpBack);
  const watch = () => {
    if (!song.paused && song.currentTime >= SONG_LOOP.end) jumpBack();
    requestAnimationFrame(watch);
  };
  requestAnimationFrame(watch);
}

function tryPlayMusic() {
  if (!wantsMusic) return;
  song.play().then(() => { musicBtn.hidden = false; }).catch(() => {});
}

musicBtn.addEventListener('click', () => {
  if (song.paused) {
    wantsMusic = true;
    song.play().catch(() => {});
    musicBtn.textContent = '🎵';
    musicBtn.classList.remove('off');
  } else {
    wantsMusic = false;
    song.pause();
    musicBtn.textContent = '🔇';
    musicBtn.classList.add('off');
  }
});
