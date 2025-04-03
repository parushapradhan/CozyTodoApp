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
