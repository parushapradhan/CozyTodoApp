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
