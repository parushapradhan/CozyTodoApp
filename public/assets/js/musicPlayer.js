/* --- Playlist & Audio Setup --- */
const tracks = [
  { name: "Lofi Sunrise", src: "/assets/music/lofi/lofi-hip-hop.mp3" },
  { name: "Rainy Loops", src: "/assets/music/lofi/good-night.mp3" },
  { name: "Calm Forest", src: "/assets/music/lofi/walking-dream.mp3" }
];

let currentTrackIndex = 0;
let audio = new Audio(tracks[currentTrackIndex].src);
audio.volume = 0.5; 
let isPlaying = true;

function updateTrackInfo() {
  const trackInfoElem = document.getElementById('track-info');
  if (trackInfoElem) {
    trackInfoElem.textContent = tracks[currentTrackIndex].name;
  }
}

updateTrackInfo();


function playTrack(index) {
  currentTrackIndex = index;
  audio.src = tracks[index].src;
  audio.play();
  isPlaying = true;
  updateTrackInfo();
  const playPauseIcon = document.getElementById('toggle-music');
  if (playPauseIcon) {
    playPauseIcon.innerHTML =
      '<img src="/assets/images/icon/Play.svg" alt="Play" />';
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.getElementById("toggle-music");
  const shuffleBtn = document.getElementById("shuffle-music");
  const volumeSlider = document.getElementById("volume-slider");
  const trackList = document.getElementById("track-list");
  const playPauseIcon = document.getElementById('playPauseIcon');

  // Toggle play/pause
  toggleBtn.addEventListener("click", () => {
    if (isPlaying) {
      audio.pause();
      isPlaying = false;
      // Change icon to "play" (triangle)
      if (playPauseIcon) {
        playPauseIcon.innerHTML = '<img src="/assets/images/icon/Play.svg" alt="Play" />';
      }
    } else {
      playTrack(currentTrackIndex);
    }
  });

  // Shuffle: choose a random track
  shuffleBtn.addEventListener("click", () => {
    let randomIndex = Math.floor(Math.random() * tracks.length);
    if (randomIndex === currentTrackIndex && tracks.length > 1) {
      randomIndex = (randomIndex + 1) % tracks.length;
    }
    playTrack(randomIndex);
  });

  // Volume slider control
  if (volumeSlider) {
    volumeSlider.addEventListener("input", (event) => {
      const volumeValue = event.target.value / 100; // convert to 0–1 range
      audio.volume = volumeValue;
    });
  }

  // Auto-advance to the next track when the current one ends
  audio.addEventListener("ended", () => {
    currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
    playTrack(currentTrackIndex);
  });

  // Build the track list (if the element exists)
  if (trackList) {
    tracks.forEach((track, index) => {
      const li = document.createElement("li");
      li.textContent = track.name;
      li.style.color = "white";
      li.style.cursor = "pointer";
      li.style.listStyle = "none";
      li.style.padding = "5px";
      li.onclick = () => {
        playTrack(index);
      };
      trackList.appendChild(li);
    });
  }
});
