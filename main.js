/* ===== START AT TOP ===== */
history.scrollRestoration = "manual";
window.scrollTo(0, 0);

/* ===== INTRO + MUSIC ===== */
      const intro = document.getElementById("intro"),
        song = document.getElementById("song"),
        btn = document.getElementById("musicBtn");
      intro.addEventListener("click", () => {
        intro.style.opacity = 0;
        setTimeout(() => intro.remove(), 1000);
        song.play().catch(() => {});
        burst();
      });
      btn.addEventListener("click", () => {
        song.paused ? song.play() : song.pause();
        btn.textContent = song.paused ? "🔇" : "🎵";
      });
/* ===== SCROLL REVEAL ===== */
let letterDone = false;
const obs = new IntersectionObserver(
  (es) => es.forEach((e) => {
    e.target.classList.toggle("show", e.isIntersecting);
    if (e.isIntersecting && e.target.classList.contains("letter") && !letterDone) {
      burst();
      letterDone = true;
    }
  }),
  { threshold: 0.5 }
);
document.querySelectorAll(".moment,.letter").forEach((el) => obs.observe(el));
/* ===== CONFETTI ===== */
const colours = ["#ffc2d9", "#ff6fa8", "#ff1f7a", "#c2183c"];
function burst() {
  const corners = [
    { x: 0, y: 0, angle: -45 },  // top left
    { x: 1, y: 0, angle: 225 },  // top right
    { x: 0, y: 1, angle: 45 },   // bottom left
    { x: 1, y: 1, angle: 135 },  // bottom right
  ];
  corners.forEach((c) =>
    confetti({
      particleCount: 70,
      angle: c.angle,
      spread: 55,
      startVelocity: 55,
      origin: { x: c.x, y: c.y },
      colors: colours,
    })
  );
}