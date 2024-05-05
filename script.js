console.clear();
const audioContext = new AudioContext();

const audioFiles = [
  "assets/Guitar fill 3.wav",
  "assets/Piano Chord.wav",
  "assets/Piano Chord 2.wav",
  "assets/What can I do .wav",
];

/*------------------------
Load files to audio buffer
------------------------*/

async function loadAudioFile(url) {
  try {
    // Fetch audio file
    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();
    const decodedAudioData = await audioContext.decodeAudioData(arrayBuffer);
    return decodedAudioData;
  } catch (error) {
    throw new Error("Error loading or decoding audio file: " + error);
  }
}

async function setUpSamples(paths) {
  const audioBuffers = [];
  for (const path of paths) {
    const sample = await loadAudioFile(path);
    audioBuffers.push(sample);
  }
  console.log("Sample set up done");
  return audioBuffers;
}
function playSample(audioBuffer, time) {
  const sampleSource = audioContext.createBufferSource();
  sampleSource.buffer = decodedAudioData;
}

/*---------------------------------
Event listeners to trigger playback
---------------------------------*/

// const audioElements = Array.from(document.querySelectorAll('[class="audio"]'));
const button = document.querySelector('[class="button"]');
const volumeFader = document.querySelector('[class="faders"]');

button.addEventListener("click", () => {
  console.log("Sample pad clicked");
});

volumeFader.addEventListener("input", function (event) {
  console.log(volumeFader.value);
});
