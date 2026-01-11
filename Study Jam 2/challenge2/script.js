/**
 * Challenge 2 — JS Animation Control
 * Fokus:
 * - Event listener tombol
 * - Modifikasi style via JS: element.style.transform
 * - requestAnimationFrame untuk animasi halus
 */

const $ = (s) => document.querySelector(s);

const meme = $("#meme");

const statusEl = $("#status");
const directionEl = $("#direction");
const angleEl = $("#angle");

const btnStop = $("#btn-stop");
const btnReset = $("#btn-reset");
const btnCW = $("#btn-cw");
const btnCCW = $("#btn-ccw");

// ====== STATE ======
let angle = 0;          // derajat
let running = true;     // animasi jalan / berhenti
let direction = 1;      // 1 = searah jarum jam, -1 = lawan arah
let speed = 180;        // derajat per detik (boleh diubah)

// untuk hitung delta time (biar konsisten di PC lemot / cepat)
let lastTime = performance.now();

// ====== INIT ======
renderUI();
requestAnimationFrame(loop);

btnStop.addEventListener("click", () => {
  running = !running;
  renderUI();
});

btnReset.addEventListener("click", () => {
  angle = 0;
  // langsung apply transform
  meme.style.transform = `rotate(${angle}deg)`;
  renderUI();
});

btnCW.addEventListener("click", () => {
  direction = 1;
  renderUI();
});

btnCCW.addEventListener("click", () => {
  direction = -1;
  renderUI();
});

// ====== ANIMATION LOOP ======
function loop(now) {
  const dt = (now - lastTime) / 1000; // detik
  lastTime = now;

  if (running) {
    // update sudut
    angle += direction * speed * dt;

    // biar sudut nggak membesar terus, rapihin jadi 0..360
    angle = ((angle % 360) + 360) % 360;

    // ini inti challenge: modifikasi style lewat JS
    meme.style.transform = `rotate(${angle}deg)`;
    angleEl.textContent = `${Math.round(angle)}°`;
  }

  requestAnimationFrame(loop);
}

// ====== RENDER UI (DOM change text) ======
function renderUI() {
  statusEl.textContent = running ? "Spinning" : "Stopped";
  directionEl.textContent = direction === 1 ? "Searah Jarum Jam" : "Lawan Arah";

  // label tombol stop menyesuaikan state
  btnStop.textContent = running ? "Stop" : "Play";
}
