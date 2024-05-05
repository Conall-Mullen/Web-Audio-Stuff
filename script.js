console.clear();
const audioContext = new AudioContext();

const audioFiles = [
  "assets/Guitar fill 3.wav",
  "assets/Piano Chord.wav",
  "assets/Piano Chord 2.wav",
  "assets/What can I do .wav",
];

let audioBuffers = []; // Empty array for audio buffers

/*------------------------
Load files to audio buffer
------------------------*/

async function loadAudioFile(url) {
  // Declare function to load audio files
  try {
    // Fetch audio file
    let response = await fetch(url);

    // Decode audio data
    let arrayBuffer = await response.arrayBuffer();
    let decodedAudioData = await audioContext.decodeAudioData(arrayBuffer);
    return decodedAudioData;
  } catch (error) {
    throw new Error("Error loading or decoding audio file: " + error);
  }
}
audioFiles.forEach((file) => {
  // Loop through each file in the array and call the load function with each file
  loadAudioFile(file)
    .then((decodedAudioData) => {
      // Create an empty AudioBuffer with the same parameters as the decoded audio data

      let audioBuffer = audioContext.createBuffer(
        decodedAudioData.numberOfChannels,
        decodedAudioData.length,
        decodedAudioData.sampleRate
      );

      // Copy decoded audio data to the AudioBuffer
      for (
        let channel = 0;
        channel < decodedAudioData.numberOfChannels;
        channel++
      ) {
        let channelData = decodedAudioData.getChannelData(channel);
        audioBuffer.getChannelData(channel).set(channelData);
        audioBuffers.push(audioBuffer);
      }

      // Now you have the audio data stored in the audioBuffer
      // You can do further processing or play it back as needed
    })
    .catch((error) => {
      console.error(error.message);
    });
});

function playAudio(buffer) {
  const sourceNodeLeft = audioContext.createBufferSource();
  const sourceNodeRight = audioContext.createBufferSource();

  // Split the stereo buffer into left and right channels
  const leftChannel = buffer.getChannelData(0);
  const rightChannel = buffer.getChannelData(1);

  // Set buffers for left and right channels
  sourceNodeLeft.buffer = buffer;
  sourceNodeRight.buffer = buffer;

  // Connect left and right source nodes to the audio destination
  sourceNodeLeft.connect(audioContext.destination);
  sourceNodeRight.connect(audioContext.destination);

  // Start playback for left and right channels
  sourceNodeLeft.start(0);
  sourceNodeRight.start(0);
}

console.log(audioBuffers); // Log buffers array to console, in this instance the array has two buffers for each file as they are stereo

/*---------------------------------
Event listeners to trigger playback
---------------------------------*/

// const audioElements = Array.from(document.querySelectorAll('[class="audio"]'));
const buttons = Array.from(document.querySelectorAll('[class="button"]'));
const volumeFaders = Array.from(
  document.querySelectorAll('[class="fader__volume"]')
);

buttons.forEach((button, index) => {
  button.addEventListener("click", () => {
    playAudio(audioBuffers[index]);
  });
});

for (var i = 0; i < volumeFaders.length; i++) {
  (function (index) {
    volumeFaders[index].addEventListener("input", function (event) {
      let volume = event.target.value / 100;
      audioElements[index].volume = volume;
      console.log(`${event.target.attributes[2].nodeValue}:`, volume);
    });
  })(i);
}
