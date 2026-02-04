<h1 align="center">Google Developer Groups on Campus UNESA  <br> Web Development </h1>

<p align="center">
  <img src="https://res.cloudinary.com/startup-grind/image/upload/c_fill,dpr_2.0,f_auto,g_center,h_360,q_100,w_1140/v1/gcs/platform-data-goog/chapter_banners/2_Cf0EcZi.png" width="400" />
</p>

<p align="center">
 <a href="https://developer.mozilla.org/en-US/docs/Web/HTML">
    <img alt="HTML5" src="https://img.shields.io/badge/HTML 5-grey?style=for-the-badge&logo=html5" />
  </a>
  <a href="https://developer.mozilla.org/en-US/docs/Web/CSS">
    <img alt="CSS3" src="https://img.shields.io/badge/CSS 3-grey?style=for-the-badge&logo=css" />
  </a>
  <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript">
    <img alt="JavaScript" src="https://img.shields.io/badge/JAVASCRIPT-grey?style=for-the-badge&logo=javascript" />
  </a>
  <a href="https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Events">
    <img alt="DOM & Events" src="https://img.shields.io/badge/DOM%20%26%20EVENTS-grey?style=for-the-badge&logo=javascript" />
  </a>
</p>

<p align="center">
  <img alt="Beginner Friendly" src="https://img.shields.io/badge/LEVEL-BEGINNER%20FRIENDLY-grey?style=for-the-badge" />
  <img alt="Focus" src="https://img.shields.io/badge/FOCUS-DOM%20MANIPULATION-grey?style=for-the-badge" />
  <img alt="Focus" src="https://img.shields.io/badge/FOCUS-EVENT%20HANDLING-grey?style=for-the-badge" />
  <img alt="Platform" src="https://img.shields.io/badge/PLATFORM-WEB-grey?style=for-the-badge&logo=googlechrome" />
</p>

<br/>

Repo ini berisi kumpulan materi Study Jam **Web Development** untuk:

1. [**Study Jam 1 : Taking Your First Steps in Web Architecture**](#ch1)
2. [**Study Jam 2 : Bringing Your Websites to LIfe with JavaScript and TypeScript**](#ch2)

Fokus utama challenge ini: **DOM Manipulation + Event Handling**.


<br>

<a id="ch1"></a>

# Study Jam 1 : Taking Your First Steps in Web Architecture

<img src="https://res.cloudinary.com/startup-grind/image/upload/c_fill,w_500,h_500,g_center/c_fill,dpr_2.0,f_auto,g_center,q_auto:good/v1/gcs/platform-data-goog/events/blob_tuhYjc9" width="0" />

### 📕 Study Jam Module

Modul untuk Study Jam 1 ini berisi :

- Arsitektur dari Web bekerja
- Bagaimana siklus Reques dan Response pada Web
- 

### Aturan Validasi (Important)

Kamu cuma boleh ngubah / nambahin **4 poin** di `script.js`:

1. ambil tombol `btn`
2. ambil counter `countEl`
3. pasang event click
4. isi 1 baris update angka ke DOM

---

## Jawaban / Fix yang Dilakukan (4 poin)

### (1) Ambil tombol dari HTML

- Kamu ambil tombol klik utama dari DOM dan simpan di variabel **`btn`**
- Ini penting karena event click dipasang ke `btn`

### (2) Ambil elemen counter dari HTML

- Kamu ambil elemen angka display dan simpan di **`countEl`**

### (3) Pasang event click (addEventListener)

- Kamu pasang: `btn.addEventListener("click", ...)`
- Lalu **tempel logika inti yang sudah disediakan** (jangan diacak)

### (4) Update angka ke DOM

- Kamu isi 1 baris yang kosong: update `countEl.textContent = String(clicks)` (atau innerText)
- Tanpa ini: clicks naik “di belakang layar”, tapi angka di UI tetap 0

---

## Poin Belajar (DOM + Event)

- `getElementById/querySelector` buat ambil elemen
- `addEventListener("click")`
- update UI via `textContent/innerText`
- state (clicks) → UI (counter + gif + message)

<br>

---

<a id="ch2"></a>

# 😸 Challenge 2 : Hover to Stop

<img src="assets/challenge2.gif" width="500" />

### Target Perilaku

- gambar muter terus
- mouse masuk (mouseenter) → **stop**
- mouse keluar (mouseleave) → **muter lagi**
- status text berubah sesuai kondisi
- derajat (#angle) ikut update

### Aturan Validasi (Important)

Cuma boleh ngubah / nambahin **4 poin**:

1. ambil elemen gambar
2. isi event mouseleave
3. buat event mouseenter
4. terapkan rotasi ke style.transform

---

## Jawaban / Fix yang Dilakukan (4 poin)

### (1) Ambil elemen gambar dari HTML

- Ambil elemen gambar yang diputar via selector DOM

### (2) Lengkapi event `mouseleave`

- Saat mouse keluar:
  - `spinning = true`
  - status text jadi “Spinning”

### (3) Buat event `mouseenter`

- Saat mouse masuk:
  - `spinning = false`
  - status text jadi “Stopped/Paused”

### (4) Terapkan rotasi ke DOM (transform)

- Di loop animasi, update:
  - `img.style.transform = "rotate(...deg)"`
- Tanpa ini: `angle` berubah, tapi gambar tidak muter

---

## Poin Belajar (DOM + Event)

- bedain `mouseenter` vs `mouseleave`
- update UI realtime pakai `style.transform`
- loop animation (requestAnimationFrame) + state `spinning`
- teks status & angka derajat itu contoh “UI feedback”

<br>

---

<a id="ch3"></a>

# 🛸 Challenge 3 : Move The Avatar

<img src="assets/challenge1.gif" width="500" />

### Target Perilaku

Mini arena:

- player gerak pakai **W A S D**
- nama player bisa diganti tapi harus valid
- background arena & avatar bisa diganti via dropdown

Requirement resminya:

### Aturan Validasi (Important)

Cuma boleh ngubah / nambahin **4 poin** sesuai TODO:

1. event keydown WASD
2. event input validasi nama
3. event change dropdown
4. update DOM/style biar perubahan kelihatan

---

## Jawaban / Fix yang Dilakukan (4 poin)

### (1) EVENT `keydown` — WASD untuk gerak

- Pasang event `document.addEventListener("keydown", (e) => ...)`
- Mapping:
  - W = atas, A = kiri, S = bawah, D = kanan
- Catatan penting:
  - saat fokus di input nama, WASD harus non-aktif biar gak ganggu ngetik

### (2) EVENT `input` — Validasi nama

- Pasang event input pada field nama:
  - valid → update tag + hint “Nama valid”
  - invalid → tambah class “bad” + hint error
- Rule nama:
  - minimal 3 karakter
  - hanya huruf dan spasi

### (3) EVENT `change` — Dropdown background & avatar

- dropdown background → ganti class arena
- dropdown avatar → ganti src gambar avatar

### (4) UPDATE DOM/STYLE — Terapkan perubahan ke tampilan

Yang harus kelihatan berubah:

- posisi player (style.left/top)
- nama player (textContent)
- hint (class + textContent)
- arena (className)
- avatar (src)

---

## Poin Belajar (DOM + Event)

- `keydown` untuk kontrol game/shortcut
- “focus guard”: jangan jalanin shortcut kalau user sedang ngetik
- `input` untuk validasi realtime
- `change` untuk dropdown
- update style (left/top) untuk gerak + batas arena (keepInsideArena)
