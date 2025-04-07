const allTracks = [
  { name: "Calm Wind", file: "/assets/music/track1.mp3" },
  { name: "Evening Vibes", file: "/assets/music/track2.mp3" },
  { name: "Cloud Drift", file: "/assets/music/track3.mp3" },
  { name: "Fireplace", file: "/assets/music/track4.mp3" },
  { name: "Birdsong", file: "/assets/music/track5.mp3" },
];

let playlist = [];
let currentHowl = null;

const checkboxContainer = document.getElementById("track-list-dropdown");

allTracks.forEach((track, index) => {
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.id = `track-${index}`;
  checkbox.name = "selectedTracks"; // 💡 key for backend
  checkbox.value = track.name;
  checkbox.checked = true;
  checkbox.addEventListener("change", updatePlaylist);

  const label = document.createElement("label");
  label.htmlFor = `track-${index}`;
  label.textContent = track.name;

  const wrapper = document.createElement("div");
  wrapper.appendChild(checkbox);
  wrapper.appendChild(label);
  checkboxContainer.appendChild(wrapper);
});

function updatePlaylist() {
  playlist = allTracks.filter(
    (_, i) => document.getElementById(`track-${i}`).checked
  );
}

function playNext() {
  if (playlist.length === 0) return;

  const randomTrack = playlist[Math.floor(Math.random() * playlist.length)];
  if (currentHowl) currentHowl.stop();

  currentHowl = new Howl({
    src: [randomTrack.file],
    onend: playNext,
  });
  currentHowl.play();
}

document.getElementById("toggle-music").addEventListener("click", () => {
  if (currentHowl && currentHowl.playing()) {
    currentHowl.pause();
  } else if (currentHowl) {
    currentHowl.play();
  } else {
    playNext();
  }
});

document.getElementById("shuffle-music").addEventListener("click", () => {
  playNext();
});

updatePlaylist();
