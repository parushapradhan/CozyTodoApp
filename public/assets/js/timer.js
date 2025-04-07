let countdown;
let remainingTime = 0;
let isPaused = false;
const audio = new Audio("/assets/music/track1.mp3");

function startTimer() {
  clearInterval(countdown);
  const hrs = parseInt(document.getElementById("hours").value) || 0;
  const mins = parseInt(document.getElementById("minutes").value) || 0;
  const secs = parseInt(document.getElementById("seconds").value) || 0;

  remainingTime = hrs * 3600 + mins * 60 + secs;

  if (remainingTime <= 0) {
    alert("Enter valid time");
    return;
  }

  isPaused = false;

  countdown = setInterval(() => {
    if (!isPaused) {
      const h = Math.floor(remainingTime / 3600);
      const m = Math.floor((remainingTime % 3600) / 60);
      const s = remainingTime % 60;

      document.getElementById("timer-display").innerText = 
        `Time left: ${pad(h)}:${pad(m)}:${pad(s)}`;

      remainingTime--;

      if (remainingTime < 0) {
        clearInterval(countdown);
        document.getElementById("timer-display").innerText = "Time's up!";
        audio.play();
      }
    }
  }, 1000);
}

function pauseTimer() {
  isPaused = !isPaused;
}

function resetTimer() {
  clearInterval(countdown);
  remainingTime = 0;
  isPaused = false;
  document.getElementById("hours").value = 0;
  document.getElementById("minutes").value = 0;
  document.getElementById("seconds").value = 0;
  document.getElementById("timer-display").innerText = "Time left: --:--:--";
}

function pad(num) {
  return String(num).padStart(2, "0");
}
