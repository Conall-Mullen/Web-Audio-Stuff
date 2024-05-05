console.clear();
const audioContext = new AudioContext();
const audioFiles = [
  "samples/MR16_BD_02_T1S.wav",
  "samples/MR16_Cabasa_X1_st.wav",
  "samples/MR16_Clap_X1.wav",
  "samples/MR16_CongaHigh_T1S.wav",
  "samples/MR16_CongaLow_T1A.wav",
  "samples/MR16_Cow_C2A.wav",
  "samples/MR16_Cym_T1A.wav",
  "samples/MR16_HH_C2A.wav",
  "samples/MR16_HHo_T1A.wav",
  "samples/MR16_Ride_T1A.wav",
  "samples/MR16_Rim_T1A.wav",
  "samples/MR16_Snr_T1S.wav",
  "samples/MR16_WoodBlock_C2S.wav",
  "assets/Guitar fill 3.wav",
  "assets/Piano Chord.wav",
  "assets/Piano Chord 2.wav",
];
let samples;
const body = document.getElementsByTagName("body");
for (let i = 0; i < audioFiles.length; i++) {
  const newSamplePad = document.createElement("section");
  newSamplePad.classList.add("button");
  document.body.append(newSamplePad);
}

const samplePads = Array.from(document.querySelectorAll(".button"));
console.log(samplePads);
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
    sample.name = path;
    audioBuffers.push(sample);
  }
  console.log("Sample set up done");
  console.log(audioBuffers);
  return audioBuffers;
}

function playAudio(buffer, time) {
  const source = audioContext.createBufferSource();
  source.buffer = buffer;
  source.connect(audioContext.destination);
  source.start(time);
}

setUpSamples(audioFiles).then((response) => {
  samples = response;
});

for (let index = 0; index < samplePads.length; index++) {
  samplePads[index].addEventListener("click", () => {
    playAudio(samples[index], 0);
  });
}
