// ===============================
// SISTEMA DE TROCA DE TELAS
// ===============================
const navButtons = document.querySelectorAll(".nav button");
const screens = document.querySelectorAll(".screen");

navButtons.forEach((btn) => {
  btn.onclick = () => {
    navButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    screens.forEach((s) => s.classList.remove("visible"));
    document
      .getElementById("screen-" + btn.dataset.screen)
      .classList.add("visible");
  };
});

// ===============================
// 🔴 POMODORO
// ===============================
let pomodoroSeconds = 25 * 60;
let pomodoroInterval;

const pDisplay = document.getElementById("pomodoro-display");

function updatePomodoro() {
  const m = String(Math.floor(pomodoroSeconds / 60)).padStart(2, "0");
  const s = String(pomodoroSeconds % 60).padStart(2, "0");
  pDisplay.textContent = `${m}:${s}`;
}

document.getElementById("p-start").onclick = () => {
  clearInterval(pomodoroInterval);
  pomodoroInterval = setInterval(() => {
    if (pomodoroSeconds > 0) {
      pomodoroSeconds--;
      updatePomodoro();
    } else {
      clearInterval(pomodoroInterval);
      new Notification("Pomodoro", { body: "Ciclo finalizado!" });
    }
  }, 1000);
};

document.getElementById("p-pause").onclick = () => {
  clearInterval(pomodoroInterval);
};

document.getElementById("p-reset").onclick = () => {
  clearInterval(pomodoroInterval);
  pomodoroSeconds = 25 * 60;
  updatePomodoro();
};

document.querySelectorAll(".cycles button").forEach((btn) => {
  btn.onclick = () => {
    clearInterval(pomodoroInterval);
    pomodoroSeconds = Number(btn.dataset.time) * 60;
    updatePomodoro();
  };
});

updatePomodoro();

// ===============================
// 🔵 TEMPORIZADOR
// ===============================
let timerSeconds = 0;
let timerInterval;
const tDisplay = document.getElementById("timer-display");

function updateTimerDisplay() {
  const m = String(Math.floor(timerSeconds / 60)).padStart(2, "0");
  const s = String(timerSeconds % 60).padStart(2, "0");
  tDisplay.textContent = `${m}:${s}`;
}

document.getElementById("t-start").onclick = () => {
  const min = Number(document.getElementById("custom-minutes").value || 0);
  if (min > 0) timerSeconds = min * 60;

  clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    if (timerSeconds > 0) {
      timerSeconds--;
      updateTimerDisplay();
    } else {
      clearInterval(timerInterval);
      new Notification("Temporizador", { body: "Tempo esgotado!" });
    }
  }, 1000);
};

document.getElementById("t-pause").onclick = () => {
  clearInterval(timerInterval);
};

document.getElementById("t-reset").onclick = () => {
  clearInterval(timerInterval);
  timerSeconds = 0;
  updateTimerDisplay();
};

updateTimerDisplay();

// ===============================
// 🟢 CRONÔMETRO PROFISSIONAL (CENTÉSIMOS)
// ===============================
let swInterval;
let swCentiseconds = 0; // 1 centésimo = 10ms
const sDisplay = document.getElementById("stopwatch-display");

function updateStopwatch() {
  const h = String(Math.floor(swCentiseconds / 360000)).padStart(2, "0");
  const m = String(Math.floor((swCentiseconds % 360000) / 6000)).padStart(
    2,
    "0"
  );
  const s = String(Math.floor((swCentiseconds % 6000) / 100)).padStart(2, "0");
  const cs = String(swCentiseconds % 100).padStart(2, "0");

  sDisplay.textContent = `${h}:${m}:${s}:${cs}`;
}

document.getElementById("s-start").onclick = () => {
  clearInterval(swInterval);
  swInterval = setInterval(() => {
    swCentiseconds++;
    updateStopwatch();
  }, 10); // 10ms por tick
};

document.getElementById("s-pause").onclick = () => {
  clearInterval(swInterval);
};

document.getElementById("s-reset").onclick = () => {
  clearInterval(swInterval);
  swCentiseconds = 0;
  updateStopwatch();
};

updateStopwatch();

// ===============================
// Botão fechar janela
// ===============================
document.getElementById("btn-close").onclick = () => window.close();
