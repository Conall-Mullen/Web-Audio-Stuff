console.clear();
// const audioContext = new AudioContext();
const audioElements = Array.from(document.querySelectorAll('[class="audio"]'));
const buttons = Array.from(document.querySelectorAll('[class="button"]'));

for (var i = 0; i < buttons.length; i++) {
  (function (index) {
    buttons[index].addEventListener("click", function (event) {
      console.log(`You clicked ${event.target.attributes[1].nodeValue}`);
      if (audioElements[index].paused) {
        audioElements[index].play();
      } else {
        audioElements[index].pause();
        audioElements[index].currentTime = 0; // Reset playback to the beginning
        audioElements[index].play();
      }
    });
  })(i);
}
