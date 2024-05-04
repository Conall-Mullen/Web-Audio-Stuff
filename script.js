console.clear();
let audioContext = new AudioContext();

async function loadAudioFile(url) {
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
loadAudioFile("./assets/What can I do .wav")
  .then((decodedAudioData) => {
    // Create an empty AudioBuffer with the same parameters as the decoded audio data
    let audioBuffer = audioContext.createBuffer(
      decodedAudioData.numberOfChannels,
      decodedAudioData.length,
      decodedAudioData.sampleRate
    );
    console.log(audioBuffer);
    // Copy decoded audio data to the AudioBuffer
    for (
      let channel = 0;
      channel < decodedAudioData.numberOfChannels;
      channel++
    ) {
      let channelData = decodedAudioData.getChannelData(channel);
      audioBuffer.getChannelData(channel).set(channelData);
    }

    // Now you have the audio data stored in the audioBuffer
    // You can do further processing or play it back as needed
  })
  .catch((error) => {
    console.error(error.message);
  });

const audioElements = Array.from(document.querySelectorAll('[class="audio"]'));
const buttons = Array.from(document.querySelectorAll('[class="button"]'));
const volumeFaders = Array.from(
  document.querySelectorAll('[class="fader__volume"]')
);

for (var i = 0; i < buttons.length; i++) {
  (function (index) {
    buttons[index].addEventListener("click", function (event) {
      console.log(`You clicked ${event.target.attributes[1].nodeValue}`);
      audioElements[index].currentTime = 0;
      audioElements[index].play();
    });
  })(i);
}

for (var i = 0; i < volumeFaders.length; i++) {
  (function (index) {
    volumeFaders[index].addEventListener("input", function (event) {
      let volume = event.target.value / 100;
      audioElements[index].volume = volume;
      console.log(event.target.attributes[2].nodeValue, volume);
    });
  })(i);
}
