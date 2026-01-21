// ===== GLOBAL STATE =====
let currentDate = new Date();

const dateText = document.getElementById("dateText");
const taskList = document.getElementById("taskList");
const taskInput = document.getElementById("taskInput");
const quoteText = document.getElementById("quoteText");
const calendar = document.getElementById("calendar");

// ===== DAY COLORS (Mon → Sun) =====
const dayColors = [
  "#90e0ef", // Monday
  "#ffcad4", // Tuesday
  "#ffea00", // Wednesday
  "#ca7df9", // Thursday
  "#c7f9cc", // Friday
  "#e3d5ca", // Saturday
  "#fec3a6"  // Sunday
];

// ===== 31 DAILY QUOTES =====
const quotes = [
  "Build your day, step by step.",
  "Focus on today. The rest will follow.",
  "Progress matters more than perfection.",
  "Small steps every day create big change.",
  "One day done right is enough.",
  "Consistency beats motivation.",
  "Make today count.",
  "Do something today your future self will thank you for.",
  "Start small. Stay steady.",
  "Discipline builds freedom.",
  "Your effort today shapes tomorrow.",
  "Momentum comes from action.",
  "Clarity comes from doing.",
  "Progress is quiet but powerful.",
  "Done is better than perfect.",
  "One task at a time.",
  "Today is a good day to begin.",
  "Focus creates results.",
  "Habits shape outcomes.",
  "Action beats intention.",
  "Keep moving forward.",
  "Your pace is enough.",
  "Start where you are.",
  "Consistency creates confidence.",
  "Work small. Win daily.",
  "Energy follows action.",
  "Daily effort compounds.",
  "Commit to today.",
  "Build the routine.",
  "Show up daily.",
  "Finish strong."
];

// ===== HELPERS =====
function getKey() {
  return currentDate.toISOString().split("T")[0];
}

function updateQuote() {
  const index = currentDate.getDate() - 1;
  quoteText.textContent = quotes[index] || quotes[0];
}

// ===== TASK FUNCTIONS =====
function loadTasks() {
  taskList.innerHTML = "";
  const tasks = JSON.parse(localStorage.getItem(getKey())) || [];

  tasks.forEach((task, index) => {
    const li = document.createElement("li");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.done;
    checkbox.onclick = () => toggleTask(index);

    const span = document.createElement("span");
    span.textContent = task.text;
    if (task.done) span.classList.add("completed");

    const del = document.createElement("button");
    del.textContent = "×";
    del.onclick = () => deleteTask(index);

    li.append(checkbox, span, del);
    taskList.appendChild(li);
  });
}

function addTask() {
  const text = taskInput.value.trim();
  if (!text) return;

  const tasks = JSON.parse(localStorage.getItem(getKey())) || [];
  tasks.push({ text, done: false });
  localStorage.setItem(getKey(), JSON.stringify(tasks));

  taskInput.value = "";
  loadTasks();
}

function toggleTask(index) {
  const tasks = JSON.parse(localStorage.getItem(getKey()));
  tasks[index].done = !tasks[index].done;
  localStorage.setItem(getKey(), JSON.stringify(tasks));
  loadTasks();
}

function deleteTask(index) {
  const tasks = JSON.parse(localStorage.getItem(getKey()));
  tasks.splice(index, 1);
  localStorage.setItem(getKey(), JSON.stringify(tasks));
  loadTasks();
}

// ===== UI UPDATE =====
function updateUI() {
  const options = { weekday: "long", month: "long", day: "numeric" };
  dateText.textContent = currentDate.toLocaleDateString("en-US", options);

  // Background by weekday
  document.body.style.background =
    dayColors[(currentDate.getDay() + 6) % 7];

  // Sync calendar input
  calendar.value = currentDate.toISOString().split("T")[0];

  updateQuote();
  loadTasks();
}

// ===== EVENT LISTENERS =====
document.getElementById("addBtn").onclick = addTask;

document.getElementById("prevDay").onclick = () => {
  currentDate.setDate(currentDate.getDate() - 1);
  updateUI();
};

document.getElementById("nextDay").onclick = () => {
  currentDate.setDate(currentDate.getDate() + 1);
  updateUI();
};

calendar.onchange = (e) => {
  currentDate = new Date(e.target.value + "T00:00:00");
  updateUI();
};

// ===== INITIAL LOAD =====
updateUI();
