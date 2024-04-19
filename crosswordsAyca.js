let box_x = [];
let startButton;
let checkButton;
let retryButton;
let quitButton;
let completed;

function setup() {
  createCanvas(400, 400);
  textAlign(CENTER, CENTER);

  startButton = createButton('Start');
  startButton.position(width / 2 - 50, height / 2);
  startButton.mousePressed(startGame);

  checkButton = createButton('Check');
  checkButton.position(width / 2 - 50, height - 50);
  checkButton.hide();
  checkButton.mousePressed(checkSolution);

  retryButton = createButton('Retry');
  retryButton.position(width / 2 - 75, height - 50);
  retryButton.hide();
  retryButton.mousePressed(startGame);

  quitButton = createButton('Quit');
  quitButton.position(width / 2 + 25, height - 50);
  quitButton.hide();
  quitButton.mousePressed(returnToMain);

  completed = false;
}

function draw() {
  background(220);
  if (box_x.length > 0) {
    for (let box of box_x) {
      box.show();
    }
  }
}

function startGame() {
  startButton.hide();
  checkButton.show();
  retryButton.hide();
  quitButton.hide();
  completed = false;

  box_x = [];
  box_x.push(new Box(width / 2 - 25, 50, 1));
  box_x.push(new Box(width / 2 - 25, 100, 'A'));
  box_x.push(new Box(width / 2 - 25, 150, 2));
  box_x.push(new Box(width / 2 - 25, 200, 3));
  box_x.push(new Box(width / 2 - 25, 250, 4));
  box_x.push(new Box(width / 2 + 25, 100, 'B'));
  box_x.push(new Box(width / 2 + 75, 100, 'C'));
}

function checkSolution() {
  let correct = box_x[0].letter === 'c' &&
                box_x[2].letter === 'h' &&
                box_x[4].letter === 'i' &&
                box_x[5].letter === 'l' &&
                box_x[1].letter === 'd' &&
                box_x[3].letter === 'i' &&
                box_x[6].letter === 'm';

  for (let box of box_x) {
    if (correct) {
      box.color = box.letter === '' ? 'white' : 'green';
    } else {
      if (box.label === 1 && box.letter !== 'c' ||
          box.label === 'A' && box.letter !== 'h' ||
          box.label === 2 && box.letter !== 'i' ||
          box.label === 3 && box.letter !== 'l' ||
          box.label === 4 && box.letter !== 'd' ||
          box.label === 'B' && box.letter !== 'i' ||
          box.label === 'C' && box.letter !== 'm') {
        box.color = box.letter === '' ? 'white' : 'red';
      } else {
        box.color = box.letter === '' ? 'white' : 'green';
      }
    }
  }

  if (correct) {
    completed = true;
    checkButton.hide();
    retryButton.hide();
    quitButton.hide();
    setTimeout(() => {
      startGame();
    }, 5000);
  } else {
    checkButton.hide();
    retryButton.show();
    quitButton.show();
  }
}

function returnToMain() {
  startButton.show();
  checkButton.hide();
  retryButton.hide();
  quitButton.hide();
  box_x = [];
}
function mousePressed() {
  for (let box of box_x) {
    box.mousePressed();
  }
}
class Box {
  constructor(x, y, label) {
    this.x = x;
    this.y = y;
    this.label = label;
    this.letter = '';
    this.color = 'white';
  }

  show() {
    stroke(0);
    fill(this.color);
    rect(this.x, this.y, 50, 50);
    textSize(20);
    text(this.letter, this.x + 25, this.y + 25);
    textSize(12);
    text(this.label, this.x + 25, this.y + 40);
  }

  mousePressed() {
    if (mouseX > this.x && mouseX < this.x + 50 && mouseY > this.y && mouseY < this.y + 50) {
      this.letter = prompt('Enter letter:');
    }
  }
  
}


