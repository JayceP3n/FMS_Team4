let board = [];
let currentPlayer = 'Shell';
let cols = 3;
let rows = 3;
let w, h;
let cellPadding = 0.2;
let startOverButton;
let shellImage, fishImage;
let continueButton;

// Sound variables
let clickSound, victorySound, lossSound, tieSound;

function preload() {
  shellImage = loadImage('images/shell.png');
  fishImage = loadImage('images/fish.png');

  // Load sound files
  clickSound = loadSound('sounds/click.wav');
  victorySound = loadSound('sounds/victory.mp3');
  lossSound = loadSound('sounds/loss.mp3');
  tieSound = loadSound('sounds/TieGame.mp3');

  backgroundImage = loadImage('images/Background.jpeg');
  buttonImage = loadImage('ButYellow.png'); // Image for Start Over button
}

function setup() {
  createCanvas(400, 450);
  w = width / cols;
  h = (height - 50) / rows;
  for (let i = 0; i < rows; i++) {
    let row = [];
    for (let j = 0; j < cols; j++) {
      row.push('');
    }
    board.push(row);
  }

  startOverButton = createImg('ButYellow.png', 'Start Over');
  startOverButton.position(width - 350, height - 40);
  startOverButton.mousePressed(startOver);
  startOverButton.size(100, 50); // Adjust size according to your image and preferences

  continueButton = createButton("Next Level");
  continueButton.position(width - 100, height - 40);
  continueButton.mousePressed(continueToLevel2);
}

function draw() {
  background(backgroundImage);
  stroke(0);
  strokeWeight(4);
  for (let i = 1; i < rows; i++) {
    line(0, i * h, width, i * h);
  }
  for (let j = 1; j < cols; j++) {
    line(j * w, 0, j * w, height - 50);
  }

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      let x = j * w + w / 2;
      let y = i * h + h / 2;
      let spot = board[i][j];
      if (spot === 'Shell') {
        image(shellImage, x - w / 4, y - h / 4, w / 2, h / 2);
      } else if (spot === 'Fish') {
        image(fishImage, x - w / 4, y - h / 4, w / 2, h / 2);
      }
    }
  }

  let result = checkWinner();
  if (result != null) {
    let startX = result[0].x * w + (w / 2);
    let startY = result[0].y * h + (h / 2);
    let endX = result[1].x * w + (w / 2);
    let endY = result[1].y * h + (h / 2);
    stroke(255, 0, 0);
    strokeWeight(4);
    line(startX, startY, endX, endY);
    noLoop();

    textAlign(CENTER, CENTER);
    textSize(32);
    fill(0, 102, 153);
    if (board[result[0].y][result[0].x] === 'Shell') {
      text("You won!", width / 2, height - 25);
      victorySound.play(); // Play victory sound
    } else {
      text("You lost!", width / 2, height - 25);
      lossSound.play(); // Play loss sound
    }
  } else if (isBoardFull()) {
    noLoop();
    textAlign(CENTER, CENTER);
    textSize(32);
    fill(0, 102, 153);
    text("Tie!", width / 2, height - 25);
    tieSound.play();
  } else {
    if (currentPlayer === 'Fish') {
      cpuMove();
    }
  }
}

function mousePressed() {
  if (currentPlayer !== 'Shell') {
    return;
  }

  let i = floor(mouseY / h);
  let j = floor(mouseX / w);
  if (board[i][j] === '') {
    board[i][j] = currentPlayer;
    currentPlayer = (currentPlayer === 'Shell') ? 'Fish' : 'Shell';
    clickSound.play(); // Play click sound
  }
}

function cpuMove() {
  let availableSpots = [];
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (board[i][j] === '') {
        availableSpots.push({ row: i, col: j });
      }
    }
  }
  if (availableSpots.length > 0) {
    let move = random(availableSpots);
    board[move.row][move.col] = 'Fish';
    currentPlayer = 'Shell';
  }
}

function checkWinner() {
  // Check rows
  for (let i = 0; i < rows; i++) {
    if (board[i][0] !== '' && board[i][0] === board[i][1] && board[i][0] === board[i][2]) {
      return [{ x: 0, y: i }, { x: 2, y: i }];
    }
  }
  // Check columns
  for (let j = 0; j < cols; j++) {
    if (board[0][j] !== '' && board[0][j] === board[1][j] && board[0][j] === board[2][j]) {
      return [{ x: j, y: 0 }, { x: j, y: 2 }];
    }
  }
  // Check diagonals
  if (board[0][0] !== '' && board[0][0] === board[1][1] && board[0][0] === board[2][2]) {
    return [{ x: 0, y: 0 }, { x: 2, y: 2 }];
  }
  if (board[0][2] !== '' && board[0][2] === board[1][1] && board[0][2] === board[2][0]) {
    return [{ x: 2, y: 0 }, { x: 0, y: 2 }];
  }
  return null;
}

function isBoardFull() {
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (board[i][j] === '') {
        return false;
      }
    }
  }
  return true;
}

function startOver() {
  board = [];
  currentPlayer = 'Shell';
  for (let i = 0; i < rows; i++) {
    let row = [];
    for (let j = 0; j < cols; j++) {
      row.push('');
    }
    board.push(row);
  }
  loop(); // Start the game loop again
}

function continueToLevel2() {
  // Redirect to level 2
  window.location.href = "https://editor.p5js.org/mnovlani/full/GNupRzcZs"; // Change the URL to your level 2 file
}
