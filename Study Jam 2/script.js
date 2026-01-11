const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) =>
  Array.from(root.querySelectorAll(selector));

const LS_THEME = "sj2_theme";
const LS_TODOS = "sj2_todos";

let timerId = null;
let timerValue = 10;

// ====== Theme (classList + localStorage) ======
applySavedTheme();

$("#btn-theme").addEventListener("click", () => {
  document.body.classList.toggle("dark");
  saveTheme();
});

$("#btn-reset").addEventListener("click", () => resetAll());

// ====== 1) DOM Selection + Text/HTML ======
const selTarget = $("#sel-target");

$("#btn-innerText").addEventListener("click", () => {
  selTarget.innerText = "Updated with innerText ✅ (plain text only)";
});

$("#btn-innerHTML").addEventListener("click", () => {
  selTarget.innerHTML = `Updated with <strong>innerHTML</strong> ✅ (HTML allowed)`;
});

$("#btn-logSelection").addEventListener("click", () => {
  console.log("getElementById:", document.getElementById("sel-target"));
  console.log("querySelector:", document.querySelector("#sel-target"));
  console.log("querySelectorAll(.card):", document.querySelectorAll(".card"));
});

// ====== 2) classList + style ======
const boxClassDemo = $("#box-classdemo");

$("#btn-highlight").addEventListener("click", () => {
  boxClassDemo.classList.toggle("highlight");
});

$("#btn-pulse").addEventListener("click", () => {
  boxClassDemo.classList.toggle("pulse");
});

$("#btn-inlineStyle").addEventListener("click", () => {
  // Inline style demo (quick but not best practice)
  boxClassDemo.style.borderStyle = "solid";
  boxClassDemo.style.borderColor = "rgba(59,130,246,0.7)";
  boxClassDemo.style.backgroundColor = "rgba(59,130,246,0.10)";
});

// ====== 3) NodeList.forEach ======
const fruitItems = $$("#list-fruits .item");

$("#btn-markAll").addEventListener("click", () => {
  fruitItems.forEach((el) => el.classList.add("marked"));
});

$("#btn-unmarkAll").addEventListener("click", () => {
  fruitItems.forEach((el) => el.classList.remove("marked"));
});

$("#btn-randomPick").addEventListener("click", () => {
  fruitItems.forEach((el) => el.classList.remove("marked"));
  const idx = Math.floor(Math.random() * fruitItems.length);
  fruitItems[idx].classList.add("marked");
});

// ====== 4) data-* + event delegation ======
const palette = $("#palette");
const colorPreview = $("#color-preview");

palette.addEventListener("click", (e) => {
  // event delegation: handle clicks from child buttons
  const chip = e.target.closest(".chip");
  if (!chip) return;

  const color = chip.dataset.color; // dataset usage
  colorPreview.style.borderStyle = "solid";
  colorPreview.style.borderColor = color;
  colorPreview.style.backgroundColor = hexToRgba(color, 0.12);
  colorPreview.innerText = `Selected color: ${color}`;
});

// ====== 5) Create / Remove elements (Todo with delegation) ======
const todoForm = $("#todo-form");
const todoInput = $("#todo-input");
const todoList = $("#todo-list");

// load saved todos
loadTodos().forEach((t) => renderTodo(t));

todoForm.addEventListener("submit", (e) => {
  e.preventDefault(); // stop page refresh
  const text = todoInput.value.trim();
  if (!text) return;

  const todo = {
    id: cryptoRandomId(),
    text,
    done: false,
    createdAt: Date.now(),
  };

  renderTodo(todo);
  persistTodos();
  todoInput.value = "";
  todoInput.focus();
});

// event delegation for todo actions
todoList.addEventListener("click", (e) => {
  const li = e.target.closest(".todo-item");
  if (!li) return;

  const id = li.dataset.id;

  if (e.target.matches("[data-action='toggle']")) {
    li.classList.toggle("done");
    persistTodos();
    return;
  }

  if (e.target.matches("[data-action='delete']")) {
    li.remove();
    persistTodos();
    return;
  }
});

$("#btn-clearDone").addEventListener("click", () => {
  $$("#todo-list .todo-item.done").forEach((el) => el.remove());
  persistTodos();
});

$("#btn-clearAll").addEventListener("click", () => {
  todoList.innerHTML = "";
  persistTodos();
});

// ====== 6) Form validation + preventDefault ======
const form = $("#signup-form");
const email = $("#email");
const password = $("#password");
const role = $("#role");
const msg = $("#form-msg");

role.addEventListener("change", () => {
  // quick UI feedback
  if (role.value) {
    setMsg(`Nice, you picked: ${role.value} ✅`, "ok");
  } else {
    setMsg("", "");
  }
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const emailVal = email.value.trim();
  const passVal = password.value.trim();
  const roleVal = role.value;

  const errors = [];
  if (!isValidEmail(emailVal)) errors.push("Email looks invalid.");
  if (passVal.length < 6)
    errors.push("Password must be at least 6 characters.");
  if (!roleVal) errors.push("Please choose a role.");

  if (errors.length) {
    setMsg(errors.join(" "), "err");
    return;
  }

  setMsg("Account created (demo). You’re good ✅", "ok");
});

// ====== 7) Live search filter ======
const search = $("#search");
const searchItems = $$("#search-list .search-item");

search.addEventListener("input", () => {
  const q = search.value.trim().toLowerCase();
  searchItems.forEach((el) => {
    const show = el.innerText.toLowerCase().includes(q);
    el.style.display = show ? "" : "none";
  });
});

// ====== 8) Keyboard events (shortcuts) ======
document.addEventListener("keydown", (e) => {
  const isMac = navigator.platform.toLowerCase().includes("mac");
  const cmdOrCtrl = isMac ? e.metaKey : e.ctrlKey;

  // Ctrl/Cmd + K => focus search
  if (cmdOrCtrl && e.key.toLowerCase() === "k") {
    e.preventDefault();
    search.focus();
  }

  // Escape => clear search
  if (e.key === "Escape") {
    if (document.activeElement === search || search.value.length > 0) {
      search.value = "";
      search.dispatchEvent(new Event("input")); // trigger filter update
    }
  }
});

// ====== 9) Timer ======
const timerBox = $("#timer");
updateTimerUI(timerBox);

$("#btn-startTimer").addEventListener("click", () => startTimer(timerBox));
$("#btn-stopTimer").addEventListener("click", () => stopTimer(timerBox));

/* -------------------- Helpers & utilities -------------------- */

function setMsg(text, type) {
  const msg = $("#form-msg");
  msg.classList.remove("ok", "err");
  if (type) msg.classList.add(type);
  msg.innerText = text;
}

function isValidEmail(val) {
  // simple check for demo (not perfect)
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
}

function hexToRgba(hex, alpha = 1) {
  const clean = hex.replace("#", "");
  const r = parseInt(clean.slice(0, 2), 16);
  const g = parseInt(clean.slice(2, 4), 16);
  const b = parseInt(clean.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function cryptoRandomId() {
  // small id helper for demo
  return Math.random().toString(16).slice(2) + Date.now().toString(16);
}

/* -------------------- Theme persistence -------------------- */

function applySavedTheme() {
  const saved = localStorage.getItem(LS_THEME);
  if (saved === "light") document.body.classList.add("light");
}

function saveTheme() {
  const isLight = document.body.classList.contains("light");
  localStorage.setItem(LS_THEME, isLight ? "light" : "dark");
}

/* -------------------- Todo rendering + persistence -------------------- */

function renderTodo(todo) {
  const li = document.createElement("li");
  li.className = "todo-item";
  li.dataset.id = todo.id;

  if (todo.done) li.classList.add("done");

  li.innerHTML = `
    <span class="todo-text"></span>
    <span class="todo-actions">
      <button class="todo-btn" data-action="toggle">${
        todo.done ? "Undo" : "Done"
      }</button>
      <button class="todo-btn" data-action="delete">Delete</button>
    </span>
  `;

  li.querySelector(".todo-text").innerText = todo.text;

  // update button label based on state, using event delegation later too
  const toggleBtn = li.querySelector("[data-action='toggle']");
  toggleBtn.innerText = todo.done ? "Undo" : "Done";

  // when you click done/undo, we update label in persist step (below)
  $("#todo-list").append(li);
}

function persistTodos() {
  const todos = $$("#todo-list .todo-item").map((li) => ({
    id: li.dataset.id,
    text: li.querySelector(".todo-text").innerText,
    done: li.classList.contains("done"),
    createdAt: Date.now(),
  }));

  // update toggle labels to match current state
  $$("#todo-list .todo-item").forEach((li) => {
    const toggleBtn = li.querySelector("[data-action='toggle']");
    toggleBtn.innerText = li.classList.contains("done") ? "Undo" : "Done";
  });

  localStorage.setItem(LS_TODOS, JSON.stringify(todos));
}

function loadTodos() {
  try {
    const raw = localStorage.getItem(LS_TODOS);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed;
  } catch {
    return [];
  }
}

/* -------------------- Timer logic -------------------- */

function updateTimerUI(timerBox) {
  timerBox.innerText = String(timerValue);
  timerBox.style.borderStyle = "dashed";
}

function startTimer(timerBox) {
  stopTimer(timerBox);
  timerValue = 10;
  updateTimerUI(timerBox);

  timerBox.style.borderStyle = "solid";
  timerBox.style.borderColor = "rgba(59,130,246,0.7)";
  timerBox.style.backgroundColor = "rgba(59,130,246,0.10)";

  timerId = setInterval(() => {
    timerValue -= 1;
    timerBox.innerText = String(timerValue);

    if (timerValue <= 0) {
      stopTimer(timerBox);
      timerBox.innerText = "Done ✅";
      timerBox.style.borderColor = "rgba(34,197,94,0.8)";
      timerBox.style.backgroundColor = "rgba(34,197,94,0.12)";
    }
  }, 1000);
}

function stopTimer(timerBox) {
  if (timerId) clearInterval(timerId);
  timerId = null;
}

/* -------------------- Reset -------------------- */

function resetAll() {
  // clear localStorage + reset UI
  localStorage.removeItem(LS_TODOS);
  localStorage.removeItem(LS_THEME);

  // reset theme
  document.body.classList.remove("light");

  // reset selection demo text
  const selTarget = $("#sel-target");
  selTarget.innerHTML = `Hello! I am <strong>target text</strong>.`;

  // reset class demo
  const boxClassDemo = $("#box-classdemo");
  boxClassDemo.classList.remove("highlight", "pulse");
  boxClassDemo.removeAttribute("style");

  // reset fruits
  $$("#list-fruits .item").forEach((el) => el.classList.remove("marked"));

  // reset palette preview
  const colorPreview = $("#color-preview");
  colorPreview.innerText = "Pick a color chip above → this box changes.";
  colorPreview.removeAttribute("style");
  colorPreview.classList.add("box");

  // reset todo
  $("#todo-list").innerHTML = "";

  // reset form
  $("#email").value = "";
  $("#password").value = "";
  $("#role").value = "";
  $("#form-msg").innerText = "";
  $("#form-msg").classList.remove("ok", "err");

  // reset search
  const search = $("#search");
  search.value = "";
  search.dispatchEvent(new Event("input"));

  // reset timer
  stopTimer($("#timer"));
  timerValue = 10;
  $("#timer").removeAttribute("style");
  updateTimerUI($("#timer"));
}
