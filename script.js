const msgEl = document.getElementById('msg');

const randomNum = getRandomNumber();

console.log('Number:', randomNum);

window.SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

let recognition = new window.SpeechRecognition();

// Start recognition and game
recognition.start();

// Capture user speech
function onSpeak(e) {
  const msg = e.results[0][0].transcript;

  writeMessage(msg);
  checkNumber(msg);
}

// Output what user speaks
function writeMessage(msg) {
  msgEl.innerHTML = `
    <div><p>You said:</p></div>
    <span class="box">${msg}</span>
  `;
}

// Check msg against number
function checkNumber(msg) {
  const num = +msg;

  // Check if valid number
  if (Number.isNaN(num)) {
    msgEl.innerHTML += "<div><p>That's not a valid number</p></div>";
    return;
  }

  // Check number is in range
  if (num > 100 || num < 1) {
    msgEl.innerHTML += '<div><p>Number must be between 1 and 100</p></div>';
    return;
  }

  // Check if number matches
  if (num === randomNum) {
    document.body.innerHTML = `
      <h1 class="h2">You've guessed the correct number! You're basically a genius.</h1><br><br><p>The number was: ${randomNum}</p>
      <button class="play-again" id="play-again">Play Again</button>
    `;
  } else if (num > randomNum) {
    msgEl.innerHTML += '<div><p>GO LOWER</p></div>';
  } else {
    msgEl.innerHTML += '<div><p>GO HIGHER</p></div>';
  }
}

// Generate random number
function getRandomNumber() {
  return Math.floor(Math.random() * 100) + 1;
}

// Speak result
recognition.addEventListener('result', onSpeak);

// End speech recognition service -> start listening again
recognition.addEventListener('end', () => recognition.start());

// Adding event listener to parent since generated after DOM is already created
document.body.addEventListener('click', (e) => {
  if (e.target.id === 'play-again') {
    window.location.reload();
  }
});
