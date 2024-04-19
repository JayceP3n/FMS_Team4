let box_x = []; // Array to hold Box objects
let startButton;
let checkButton;
let retryButton;
let quitButton;
let nextButton; // New button for next level
let completed;
let paragraph;
let BackgroundImage;

function preload() {
  // Load background image
  BackgroundImage = loadImage('images/Background.jpeg');
}

function setup() {
  createCanvas(400, 400);
  textAlign(CENTER, CENTER);

  // Create buttons
  startButton = createButton('Start');
  startButton.position(width / 2 - 50, height / 2);
  startButton.mousePressed(startGame);

  checkButton = createButton('Check');
  checkButton.position(width / 2 - 100, height - 50);
  checkButton.hide();
  checkButton.mousePressed(checkSolution);

  retryButton = createButton('Retry');
  retryButton.position(width / 2 - 25, height - 50);
  retryButton.hide();
  retryButton.mousePressed(startGame);

  quitButton = createButton('Quit');
  quitButton.position(width / 2 + 50, height - 50);
  quitButton.hide();
  quitButton.mousePressed(returnToMain);

  nextButton = createButton('Next'); // Creating next button
  nextButton.position(width / 2 + 125, height - 50);
  nextButton.hide(); // Initially hidden
  nextButton.mousePressed(startNextLevel); // Call startNextLevel when clicked

  completed = false;
}

function draw() {
  background(BackgroundImage);
  textSize(14);
  textAlign(LEFT, TOP);
  fill(0);
  textLeading(25);

  // Display instructions
  let paragraphText = "Instructions: Click Start, you may be prompted to enter a letter, click OK on the popup. FIRST GAME: Word options are Abyss, Bay, and Fork. Pick the 2 correct ones and enter them correctly. If correct, you may hit Next to play a new level. SECOND GAME: The word options for this level are Abyss, Sea, Fork, and Bay. Enjoy!";
  text(paragraphText, 20, 20, width - 40, height - 40);

  // Show Box objects
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
  nextButton.hide(); // Hide next button for current level
  completed = false;

  // Initialize Box objects for the game
  box_x = [];
  box_x.push(new Box(width / 2 - 25, 50, 1));
  box_x.push(new Box(width / 2 - 25, 100, 'A'));
  box_x.push(new Box(width / 2 - 25, 150, 2));
  box_x.push(new Box(width / 2 - 25, 200, 3));
  box_x.push(new Box(width / 2 - 25, 250, 4));
  box_x.push(new Box(width / 2 + 25, 100, 'B'));
  box_x.push(new Box(width / 2 + 75, 100, 'C'));
}

function startNextLevel() {
  startButton.hide();
  checkButton.show();
  retryButton.hide();
  quitButton.hide();
  nextButton.hide(); // Hide next button for next level
  completed = false;

  // Initialize Box objects for the next level
  box_x = [];
  box_x.push(new Box(width / 2 - 25, 50, 1));
  box_x.push(new Box(width / 2 - 25, 100, 'A'));
  box_x.push(new Box(width / 2 - 25, 150, 2));
  box_x.push(new Box(width / 2 - 25, 200, 3));
  box_x.push(new Box(width / 2 - 25, 250, 4));
  box_x.push(new Box(width / 2 + 25, 100, 'B'));
  box_x.push(new Box(width / 2 + 75, 100, 'C'));
  box_x.push(new Box(width / 2 + 25, 250, 'x')); // Extra box x
  box_x.push(new Box(width / 2 + 75, 250, 'y')); // Extra box y
}

function checkSolution() {
  let correct = box_x[0].letter === 'a' &&
    box_x[2].letter === 'b' &&
    box_x[4].letter === 'y' &&
    box_x[5].letter === 's' &&
    box_x[1].letter === 's' &&
    box_x[3].letter === 'a' &&
    box_x[6].letter === 'y';

  for (let box of box_x) {
    if (correct) {
      box.color = box.letter === '' ? 'white' : 'green';
    } else {
      if (
        (box.label === 1 && box.letter !== 'a') ||
        (box.label === 'A' && box.letter !== 'b') ||
        (box.label === 2 && box.letter !== 'y') ||
        (box.label === 3 && box.letter !== 's') ||
        (box.label === 4 && box.letter !== 's') ||
        (box.label === 'B' && box.letter !== 'a') ||
        (box.label === 'X' && box.letter !== 'e') ||
        (box.label === 'Y' && box.letter !== 'a') ||
        (box.label === 'C' && box.letter !== 'y')
      ) {
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
    nextButton.show(); // Show next button when current level is completed
    setTimeout(() => {
      startGame();
    }, 5000);
  } else {
    checkButton.hide();
    retryButton.show();
    quitButton.show();
    nextButton.show();
  }
}

function returnToMain() {
  startButton.show();
  checkButton.hide();
  retryButton.hide();
  quitButton.hide();
  nextButton.hide(); // Hide next button when returning to main
  box_x = []; // Clear the box array
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
    // Prompt for letter input when clicked
    if (
      mouseX > this.x &&
      mouseX < this.x + 50 &&
      mouseY > this.y &&
      mouseY < this.y + 50
    ) {
      this.letter = prompt('Enter letter:');
    }
  }
}

function mousePressed() {
  // Handle mouse click for each box
  for (let box of box_x) {
    box.mousePressed();
  }
}



