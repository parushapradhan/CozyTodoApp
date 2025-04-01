// === Lo-fi Music Player ===

const loFiTracks = [
  "/assets/music/lofi1.mp3",
  "/assets/music/lofi2.mp3",
  "/assets/music/lofi3.mp3",
];

let currentTrackIndex = 0;
let loFiSound;

function playTrack(index) {
  if (loFiSound) loFiSound.stop();
  loFiSound = new Howl({
    src: [loFiTracks[index]],
    html5: true,
    onend: () => {
      shuffleAndPlay();
    },
  });
  loFiSound.play();
}

function shuffleAndPlay() {
  let nextIndex;
  do {
    nextIndex = Math.floor(Math.random() * loFiTracks.length);
  } while (nextIndex === currentTrackIndex);
  currentTrackIndex = nextIndex;
  playTrack(currentTrackIndex);
}

function toggleLoFiMusic() {
  if (!loFiSound || !loFiSound.playing()) {
    playTrack(currentTrackIndex);
  } else {
    loFiSound.stop();
  }
}
