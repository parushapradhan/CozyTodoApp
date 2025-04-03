<<<<<<< Updated upstream
const timeDisplay = document.getElementById("currentTime");
const timeToggle = document.getElementById("timeFormatToggle");

function updateTime() {
  const now = new Date();
  const format = timeToggle.value;
  const options = {
    hour: "numeric",
    minute: "2-digit",
    hour12: format === "12",
  };
  timeDisplay.textContent = now.toLocaleTimeString([], options);
}

if (timeToggle && timeDisplay) {
  setInterval(updateTime, 1000);
  timeToggle.addEventListener("change", updateTime);
  updateTime();
}
=======
let use24hr = false;

function updateClock() {
  const now = new Date();
  let hours = now.getHours();
  let minutes = now.getMinutes();
  let ampm = "";

  if (!use24hr) {
    ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
  }

  const formatted = `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}${use24hr ? "" : " " + ampm}`;
  document.getElementById("time").textContent = formatted;
}

setInterval(updateClock, 1000);
updateClock();

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("toggle-format").onclick = () => {
    use24hr = !use24hr;
    updateClock();
  };
});
>>>>>>> Stashed changes
