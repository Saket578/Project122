var x = 0;
var y = 0;
var screen_width = 0;
var screen_height = 0;
var img;
var draw_apple = false;
var to_number = null;

var SpeechRecognition = window.webkitSpeechRecognition;
var recognition = new SpeechRecognition();

function preload() {
  img = loadImage("apple.png");
}

function start() {
  document.getElementById("status").innerHTML = "System is listening, please speak";
  recognition.start();
}

recognition.onresult = function(event) {
  console.log(event);
  var content = event.results[0][0].transcript;
  document.getElementById("status").innerHTML = "The speech has been recognized: " + content;

  to_number = Number(content);

  if (Math.floor(Number(to_number)) == Number(to_number)) {
    document.getElementById("status").innerHTML = "Started drawing " + to_number + " apple(s)";
    draw_apple = true;
  } else {
    document.getElementById("status").innerHTML = "Speech has not been recognized as a valid number";
  }
};

function setup() {
  screen_width = window.innerWidth;
  screen_height = window.innerHeight;
  canvas = createCanvas(1000, screen_height - 150);
  canvas.position(150, 150);
}

function draw() {
  if (draw_apple) {
    document.getElementById("status").innerHTML = to_number + " Apples drawn";
    draw_apple = false;

    for (var i = 0; i < to_number; i++) {
      x = Math.floor(Math.random() * 650);
      y = Math.floor(Math.random() * 350);
      image(img, x, y, 50, 50); 
    }
  }
}
