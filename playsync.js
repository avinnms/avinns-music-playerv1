const playlist = [
    {
        src:"putasong.mp3",
        title:"something - someone"
    }

];

let currentIndex = 0;

const audioPlayer = document.getElementById("main-audio");
const nowPlaying = document.getElementById("now-playing");
const progressBar = document.getElementById("progress-bar");
const playPauseBtn = document.getElementById("play-pause");
const shuffleBtn = document.getElementById("shuffle");
const timestamp = document.getElementById("timestamp");
const volumeSlider = document.getElementById("volume-slider");
const speedSelect = document.getElementById("speed-select");
function playSong(index) {
  currentIndex = index;
  const song = playlist[index];
  audioPlayer.src = song.src;
  nowPlaying.textContent = `Now Playing: ${song.title}`;
  audioPlayer.play();
  playPauseBtn.textContent = "⏸";
}

function playNextSong() {
  let nextIndex = (currentIndex + 1) % playlist.length;
  playSong(nextIndex);
}

function playPreviousSong() {
  let prevIndex = (currentIndex - 1 + playlist.length) % playlist.length;
  playSong(prevIndex);
}

function skipForward() {
  audioPlayer.currentTime = Math.min(audioPlayer.duration, audioPlayer.currentTime + 15);
}

function skipBackward() {
  audioPlayer.currentTime = Math.max(0, audioPlayer.currentTime - 15);
}
function shuffleSongs() {
let newIndex;

  do {
    newIndex = Math.floor(Math.random() * playlist.length);
} 
  while (newIndex === currentIndex && playlist.length > 1);

  playSong(newIndex);
}
shuffleBtn.addEventListener("click", shuffleSongs);

playPauseBtn.addEventListener("click", () => {
  if (audioPlayer.paused) {
    audioPlayer.play();
    playPauseBtn.textContent = "⏸";
  } else {
    audioPlayer.pause();
    playPauseBtn.textContent = "▶";
  }
});


function formatTime(seconds) {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

audioPlayer.addEventListener("timeupdate", () => {
  const percent = (audioPlayer.currentTime / audioPlayer.duration) * 100;
  progressBar.style.width = `${percent}%`;
  timestamp.textContent = `${formatTime(audioPlayer.currentTime)} / ${formatTime(audioPlayer.duration || 0)}`;
});

function seek(e) {
  const container = e.currentTarget;
  const clickX = e.offsetX;
  const width = container.clientWidth;
  const duration = audioPlayer.duration;
  audioPlayer.currentTime = (clickX / width) * duration;
}

volumeSlider.addEventListener("input", () => {
  audioPlayer.volume = volumeSlider.value;
});

speedSelect.addEventListener("change", () => {
  audioPlayer.playbackRate = parseFloat(speedSelect.value);
});

audioPlayer.addEventListener("ended", playNextSong);
