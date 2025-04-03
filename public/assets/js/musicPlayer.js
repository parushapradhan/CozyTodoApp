const tracks = [
  { name: "Lofi Sunrise", src: "/assets/music/track1.mp3" },
  { name: "Rainy Loops", src: "/assets/music/track2.mp3" },
  { name: "Calm Forest", src: "/assets/music/track3.mp3" },
];

let currentTrackIndex = 0;
let audio = new Audio(tracks[currentTrackIndex].src);
let isPlaying = false;

function playTrack(index) {
  audio.src = tracks[index].src;
  audio.play();
  isPlaying = true;
}

document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.getElementById("toggle-music");
  const shuffleBtn = document.getElementById("shuffle-music");
  const trackList = document.getElementById("track-list");

  toggleBtn.onclick = () => {
    if (isPlaying) {
      audio.pause();
      isPlaying = false;
    } else {
      playTrack(currentTrackIndex);
    }
  };

  shuffleBtn.onclick = () => {
    currentTrackIndex = Math.floor(Math.random() * tracks.length);
    playTrack(currentTrackIndex);
  };

  tracks.forEach((track, index) => {
    const li = document.createElement("li");
    li.textContent = track.name;
    li.style.color = "white";
    li.style.cursor = "pointer";
    li.onclick = () => {
      currentTrackIndex = index;
      playTrack(index);
    };
    trackList.appendChild(li);
  });
});
