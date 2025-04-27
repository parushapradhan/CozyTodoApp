/* --- Playlist & Audio Setup --- */
const tracks = [
  { name: "Lofi Sunrise", src: "/assets/music/lofi/lofi-hip-hop.mp3" },
  { name: "Rainy Loops", src: "/assets/music/lofi/good-night.mp3" },
  { name: "Calm Forest", src: "/assets/music/lofi/walking-dream.mp3" },
];

let currentTrackIndex = 0;
let audio = new Audio(tracks[currentTrackIndex].src);
audio.volume = 0.5;
let isPlaying = true;

function updateTrackInfo() {
  const trackInfoElem = document.getElementById("track-info");
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
  const playPauseIcon = document.getElementById("toggle-music");
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
  const playPauseIcon = document.getElementById("playPauseIcon");

  // Toggle play/pause
  toggleBtn.addEventListener("click", () => {
    if (isPlaying) {
      audio.pause();
      isPlaying = false;
      // Change icon to "play" (triangle)
      if (playPauseIcon) {
        playPauseIcon.innerHTML =
          '<img src="/assets/images/icon/Play.svg" alt="Play" />';
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


var birds = new Howl({ src: ["/assets/music/birds.mp3"], loop: true, volume: 0.5 });
var cicadas = new Howl({ src: ["/assets/music/cicadas.mp3"], loop: true, volume: 0.3 });
var fire = new Howl({ src: ["/assets/music/fire.mp3"], loop: true,volume: 0.3 });
var rain = new Howl({ src: ["/assets/music/rain.mp3"], loop: true,volume: 0 });
var wind = new Howl({ src: ["/assets/music/wind.mp3"], loop: true,volume: 0 });

// Play each sound and store the players
let birdsSoundPlayer = birds.play();
let cicadasSoundPlayer = cicadas.play();
let fireSoundPlayer = fire.play();
let rainSoundPlayer = rain.play();
let windSoundPlayer = wind.play();

// Link sliders to their corresponding sound objects
const birdsSlider = document.getElementById("birds");
const cicadasSlider = document.getElementById("cicadas");
const windSlider = document.getElementById("wind");
const rainSlider = document.getElementById("rain");
const fireSlider = document.getElementById("fire");

birdsSlider.addEventListener("input", updateValue);
cicadasSlider.addEventListener("input", updateValue);
windSlider.addEventListener("input", updateValue);
rainSlider.addEventListener("input", updateValue);
fireSlider.addEventListener("input", updateValue);

function updateValue(e) {
  const soundPlayer = getSoundPlayer(e.target.id);
  soundPlayer.volume(e.target.value / 100);
}

function getSoundPlayer(id) {
  if (id === "birds") return birds;
  if (id === "cicadas") return cicadas;
  if (id === "wind") return wind;
  if (id === "rain") return rain;
  if (id === "fire") return fire;
}


    // Toggle functionality for Menu 1
document.getElementById('notebook').addEventListener('click', function() {
  var menu1 = document.getElementById('menu-1');
  menu1.style.display = (menu1.style.display === 'none' || menu1.style.display === '') ? 'flex' : 'none';
});

document.addEventListener('keydown', function(event) {
  if (event.key.toLowerCase() === 'escape') {
    var menu1 = document.getElementById('menu-1');
    menu1.style.display = (menu1.style.display === 'none' || menu1.style.display === '') ? 'flex' : 'none';
  }
});

