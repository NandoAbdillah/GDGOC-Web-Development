// 100 Click DOM Challenge (minimal + enak dilihat)
// Fokus: event listener + ubah text HTML + show/hide element

const $ = (sel) => document.querySelector(sel);

const TARGET = 100;

const btnClick = $("#btn-click");
const btnOpen  = $("#btn-open");
const btnReset = $("#btn-reset");
const btnReroll = $("#btn-reroll");

const countEl  = $("#count");
const statusEl = $("#status");

const rewardBox  = $("#reward");
const rewardMedia = $("#reward-media");
const rewardText  = $("#reward-text");

// Kamu bisa ganti daftar meme ini.
// Saran paling aman: taruh file di folder project, misalnya:
// /memes/1.gif, /memes/2.gif, /memes/boom.mp4
const MEMES = [
  // { type: "gif", src: "memes/1.gif", caption: "W setelah 100 klik." },
  // { type: "gif", src: "memes/2.gif", caption: "Ketika DOM-nya jalan." },
  // { type: "video", src: "memes/boom.mp4", caption: "Buka blind box: BOOM!" },

  // Placeholder (biar ga blank kalau belum punya file meme):
  { type: "text", src: "", caption: "🎁 Taruh meme kamu di folder /memes lalu update array MEMES di script.js" },
];

let clicks = 0;
let opened = false;

init();

function init(){
  render();

  btnClick.addEventListener("click", onClickPlusOne);
  btnOpen.addEventListener("click", openBlindBox);
  btnReroll.addEventListener("click", rerollBlindBox);
  btnReset.addEventListener("click", resetAll);
}

function onClickPlusOne(){
  if (clicks >= TARGET) return;

  clicks += 1;

  // contoh milestone text (opsional, cuma ganti teks)
  if (clicks === 25) statusEl.textContent = "25/100 — lumayan, lanjut!";
  else if (clicks === 50) statusEl.textContent = "50/100 — setengah jalan 🔥";
  else if (clicks === 75) statusEl.textContent = "75/100 — dikit lagi!";
  else statusEl.textContent = `Klik ke-${clicks}`;

  render();

  if (clicks === TARGET){
    statusEl.textContent = "100/100 ✅ Sekarang buka Blind Box!";
    btnClick.disabled = true;
    btnOpen.disabled = false;
  }
}

function render(){
  // DOM change text (inti challenge)
  countEl.textContent = String(clicks);

  // tombol open hanya aktif pas selesai 100 klik
  if (clicks < TARGET) btnOpen.disabled = true;

  // kalau belum open, box disembunyikan
  if (!opened) rewardBox.hidden = true;
}

function openBlindBox(){
  if (clicks < TARGET) return;

  opened = true;
  rewardBox.hidden = false;

  // DOM change: set HTML media + text
  showRandomMeme();
}

function rerollBlindBox(){
  if (!opened) return;
  showRandomMeme();
}

function showRandomMeme(){
  const pick = MEMES[Math.floor(Math.random() * MEMES.length)];

  // bersihin dulu
  rewardMedia.innerHTML = "";

  if (pick.type === "gif"){
    const img = document.createElement("img");
    img.src = pick.src;
    img.alt = "meme gif";
    img.loading = "lazy";
    rewardMedia.appendChild(img);
  } else if (pick.type === "video"){
    const video = document.createElement("video");
    video.src = pick.src;
    video.controls = true;
    video.autoplay = true;
    video.loop = true;
    rewardMedia.appendChild(video);
  } else {
    // fallback text
    const p = document.createElement("div");
    p.textContent = "🎭 (media belum di-set)";
    rewardMedia.appendChild(p);
  }

  rewardText.textContent = pick.caption || "🎁";
}

function resetAll(){
  clicks = 0;
  opened = false;

  btnClick.disabled = false;
  btnOpen.disabled = true;

  statusEl.textContent = "Klik tombol untuk mulai.";
  render();
}
