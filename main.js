/* ===== SETTINGS (FILL IN) ===== */
const PHOTOS = [
  { src: "images/MKGFCUTEPIC.jpeg" },
  { src: "images/MKGF1.jpeg", title: "You're my hope.", text: "On my hardest days, you're the reason I still believe everything will be okay." },
  { src: "images/MKGF2.jpeg", title: "You're my reason.", text: "Every early morning, every push forward, every goal I chase, it's all for you." },
  { src: "images/MKGF3.jpeg", title: "You're my sunlight.", text: "You brighten every room you walk into, and every single day you're in." },
  { src: "images/MKGF4.jpeg", title: "You're the best thing that happened to me in 22 years.", text: "Of all the years I've lived, none of them made sense until you." },
  { src: "images/MKGFFAVPERSON.jpeg" },
];
const WHISPERS = ["you're so loved", "always & forever", "bubz ♡", "my favourite person", "so beautiful", "forever yours", "happy birthday ♡", "my sunlight", "my hope", "my reason", "my everything", "birthday girl 🎂", "you deserve the world", "proud of you", "my peace", "only you ♡", "pretty girl", "22 & thriving", "loved endlessly", "mine forever 💕"];
const colours = ["#ffc2d9", "#ff6fa8", "#ff1f7a", "#c2183c"];
const $ = (s) => document.querySelector(s);

/* ===== SCREEN SWITCHER ===== */
function show(id) {
  document.querySelectorAll(".screen.active").forEach((s) => {
    s.classList.add("leave");
    s.classList.remove("active");
  });
  $(id).classList.remove("leave");
  $(id).classList.add("active");
}

/* ===== CONFETTI ===== */
function cornerBurst() {
  [{ x: 0, y: 0, a: -45 }, { x: 1, y: 0, a: 225 }, { x: 0, y: 1, a: 45 }, { x: 1, y: 1, a: 135 }].forEach((c) =>
    confetti({ particleCount: 70, angle: c.a, spread: 55, startVelocity: 55, origin: { x: c.x, y: c.y }, colors: colours })
  );
}
function centreBurst(size = 1) {
  confetti({ particleCount: 200 * size, spread: 360, startVelocity: 45 * size, origin: { x: 0.5, y: 0.45 }, colors: colours });
}
function emojiBoom(count, minSize, maxSize) {
  const icons = ["💖", "🌹", "🧸", "💕", "🌹", "🧸", "❤️"];
  for (let i = 0; i < count; i++) {
    const b = document.createElement("span");
    b.className = "boom";
    b.textContent = icons[Math.floor(Math.random() * icons.length)];
    const ang = Math.random() * Math.PI * 2, dist = 30 + Math.random() * 45;
    b.style.setProperty("--x", Math.cos(ang) * dist + "vw");
    b.style.setProperty("--y", Math.sin(ang) * dist + "vh");
    b.style.setProperty("--r", Math.random() * 360 - 180 + "deg");
    b.style.fontSize = minSize + Math.random() * (maxSize - minSize) + "rem";
    document.body.appendChild(b);
    setTimeout(() => b.remove(), 3000);
  }
}

/* ===== MUSIC ===== */
const song = $("#song");

/* ===== INTRO ===== */
$("#intro").addEventListener("click", () => {
  song.play().catch(() => {});
  cornerBurst();
  centreBurst();
  emojiBoom(20, 1.5, 3);
  show("#hero");
}, { once: true });

/* ===== HERO ===== */
$("#hero").addEventListener("click", () => show("#deck"), { once: true });

/* ===== CARD DECK ===== */
const cardsBox = $("#cards"), msgBox = $("#msgBox");
const cards = PHOTOS.map((p, i) => {
  const img = document.createElement("img");
  img.className = "card";
  img.src = p.src;
  img.style.zIndex = PHOTOS.length - i;
  const tilt = (i % 2 ? 1 : -1) * (i * 3);
  img.style.transform = `translate(${i * 6}px, ${i * 4}px) rotate(${tilt}deg)`;
  cardsBox.appendChild(img);
  return img;
});
const directions = [[-1, -1], [1, 0], [0, -1], [-1, 1], [1, 1], [1, -1], [-1, 0], [0, 1]];
let step = 0, showingMsg = false, busy = false;

$("#deck").addEventListener("click", () => {
  if (busy) return;
  if (showingMsg) {
    msgBox.classList.remove("show");
    showingMsg = false;
    if (step === PHOTOS.length) setTimeout(goLetter, 500);
    return;
  }
  busy = true;
  const [dx, dy] = directions[Math.floor(Math.random() * directions.length)];
  cards[step].style.transform = `translate(${dx * 130}vw, ${dy * 130}vh) rotate(${Math.random() * 90 - 45}deg)`;
  cards[step].style.opacity = 0;
  const photo = PHOTOS[step];
  step++;
  setTimeout(() => {
    busy = false;
    if (photo.title) {
      msgBox.querySelector("h3").textContent = photo.title;
      msgBox.querySelector("p").textContent = photo.text || "";
      msgBox.classList.add("show");
      showingMsg = true;
    } else if (step === PHOTOS.length) {
      goLetter();
    }
  }, 600);
});

/* ===== LETTER ===== */
let finaleStarted = false, touchY = 0;
function goLetter() {
  show("#letterScreen");
  const s = $("#letterScreen");
s.addEventListener("wheel", (e) => { if (Math.abs(e.deltaY) > 0) startFinale(); });  s.addEventListener("touchstart", (e) => (touchY = e.touches[0].clientY));
s.addEventListener("touchend", (e) => { if (Math.abs(touchY - e.changedTouches[0].clientY) > 40) startFinale(); });  s.addEventListener("click", startFinale);
}

/* ===== FINALE ===== */
function startFinale() {
  if (finaleStarted) return;
  finaleStarted = true;
  show("#finale");
  const stage = $("#finale");
  const flyers = PHOTOS.map((p) => {
    const f = document.createElement("img");
    f.className = "fly";
    f.src = p.src;
    const [dx, dy] = directions[Math.floor(Math.random() * directions.length)];
    f.style.transform = `translate(calc(-50% + ${dx * 120 || 120}vw), calc(-50% + ${dy * 120}vh)) rotate(${Math.random() * 180}deg)`;
    stage.appendChild(f);
    return f;
  });
  // whoosh in
  setTimeout(() => flyers.forEach((f, i) => {
    f.style.transitionDelay = i * 0.12 + "s";
    f.style.transform = `translate(-50%, -50%) rotate(${Math.random() * 30 - 15}deg)`;
  }), 100);
  // glow up
  setTimeout(() => flyers.forEach((f) => f.classList.add("glow")), 1900);
  // big explosion
  setTimeout(() => {
    flyers.forEach((f) => {
      const a = Math.random() * Math.PI * 2;
      f.style.transitionDelay = "0s";
      f.style.transform = `translate(calc(-50% + ${Math.cos(a) * 130}vw), calc(-50% + ${Math.sin(a) * 130}vh)) rotate(${Math.random() * 360}deg)`;
      f.style.opacity = 0;
    });
    $("#mainPhoto").classList.add("reveal");
    $("#finaleText").classList.add("reveal");
    centreBurst(1.5);
    cornerBurst();
    emojiBoom(45, 2.5, 5.5);
    setTimeout(() => emojiBoom(30, 2, 4.5), 1200);
    setInterval(() => { emojiBoom(12, 2, 4); cornerBurst(); }, 5000);
  }, 2900);
}

/* ===== BACKGROUND: ROSES + HEARTS ===== */
const bg = $("#bg"), floaters = ["🌹", "💖", "🌹", "💕", "🌹", "❤️"];
for (let i = 0; i < 14; i++) {
  const r = document.createElement("span");
  r.className = "rise";
  r.textContent = floaters[i % floaters.length];
  r.style.left = (i % 2 ? 1 + Math.random() * 13 : 84 + Math.random() * 13) + "vw";
  r.style.animationDuration = 10 + Math.random() * 10 + "s";
  r.style.animationDelay = -Math.random() * 20 + "s";
  bg.appendChild(r);
}

/* ===== BACKGROUND: WHISPER MESSAGES ===== */
setInterval(() => {
  const w = document.createElement("span");
  w.className = "whisper";
  w.textContent = WHISPERS[Math.floor(Math.random() * WHISPERS.length)];
  w.style.left = 5 + Math.random() * 70 + "vw";
  w.style.top = 5 + Math.random() * 85 + "vh";
  bg.appendChild(w);
  setTimeout(() => w.remove(), 6000);
}, 1800);

/* ===== REPLAY ===== */
$("#replay").addEventListener("click", () => location.reload());