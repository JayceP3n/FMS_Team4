let creatures = [];
let pointsEarned = 0;
let level = 1;
let button;
let creatureSpeed;
let homeButton;
function setup() {
  createCanvas(800, 600);

  button = createButton('Move to Level 2');
  button.position(width / 2 - 75, height / 2);
  button.hide();
  button.mousePressed(moveToLevel2);
  // Create initial creatures for level 1
  creatureSpeed = 2;
  createCreatures(5);
  // Create Home button
  createHomeButton();
}

function draw() {
  background(0, 191, 255); // Ocean blue background

  // Update and display all creatures
  for (let i = 0; i < creatures.length; i++) {
    creatures[i].update();
    creatures[i].display();
  }

  fill(255);
  textSize(24);
  text('Points Earned: ' + pointsEarned, 20, 40);
  text('Level: ' + level, 20, 80);

  // Check if the player has reached the score threshold for the current level
  if (level === 1 && pointsEarned >= 5) {
    button.show();
  } else if (level === 2 && pointsEarned >= 10) {
    text('Congratulations! You have completed Level 2!', width / 2 - 200, height / 2);
    noLoop(); // Stop the game
  }
}

function mousePressed() {
  // Check if clicked on any creature
  for (let i = creatures.length - 1; i >= 0; i--) {
    if (creatures[i].contains(mouseX, mouseY)) {
      pointsEarned++;
      creatures.splice(i, 1); // Remove the creature from the array
      break; // Exit loop after feeding one creature
    }
  }
}

function createCreatures(numCreatures) {

  for (let i = 0; i < numCreatures; i++) {
    creatures.push(new Creature());
  }
}

function createHomeButton() {
  homeButton = createButton('Home');
  homeButton.position(width - 100, height - 50);
  homeButton.mousePressed(checkAuthAndGoBack); // initially goToHome
}

// Temporary testing unction by Jullian
// function checkAuthAndGoBack() {
//   const urlParams = new URLSearchParams(window.location.search);
//   const replitAuthed = urlParams.get('replit_authed');

//   if (replitAuthed !== '1') {
//     // Go back to the previous page using document.referrer
//     window.location.href = document.referrer;
//   }
// }

// Call the function to check authentication and go back
checkAuthAndGoBack();

function moveToLevel2() {
  level = 2;
  pointsEarned = 0;
  creatureSpeed = 4;
  createCreatures(10); // Create creatures for level 2
  button.hide();
  loop(); // Resume game loop
}

function goToHome() {
  level = 1;
  pointsEarned = 0;
  creatureSpeed = 2;
  createCreatures(5); // Create creatures for level 1
  loop(); // Resume game loop
}

class Creature {
  constructor() {
    this.x = random(width);
    this.y = random(height);
    this.size = random(50, 100);
    this.vx = random(-creatureSpeed, creatureSpeed);
    this.vy = random(-creatureSpeed, creatureSpeed);
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;

    // Wrap around screen
    if (this.x < 0) {
      this.x = width;
    } else if (this.x > width) {
      this.x = 0;
    }

    if (this.y < 0) {
      this.y = height;
    } else if (this.y > height) {
      this.y = 0;
    }
  }

  display() {
    // Draw creature body
    fill(255, 204, 0); // Yellow color for creature body
    push();
    translate(this.x, this.y);
    beginShape();
    vertex(0, -this.size / 2);
    bezierVertex(-this.size / 4, -this.size / 2, -this.size / 2, -this.size / 3, -this.size / 2, 0);
    bezierVertex(-this.size / 2, this.size / 3, -this.size / 4, this.size / 2, 0, this.size / 2);
    bezierVertex(this.size / 4, this.size / 2, this.size / 2, this.size / 3, this.size / 2, 0);
    bezierVertex(this.size / 4, -this.size / 2, this.size / 2, -this.size / 3, 0, -this.size / 2);
    endShape(CLOSE);
    pop();

    // Draw creature tail
    fill(255, 204, 0); // Yellow color for creature tail
    push();
    translate(this.x - this.size / 2, this.y);
    beginShape();
    vertex(0, 0);
    bezierVertex(-this.size / 4, -this.size / 8, -this.size / 4, this.size / 8, 0, 0);
    endShape(CLOSE);
    pop();
    // Draw creature eye
    fill(0); // Black color for eye
    ellipse(this.x + this.size / 4, this.y - this.size / 4, this.size / 10, this.size / 10);
  }
  contains(x, y) {
    // Check if given point is inside the creature
    let d = dist(x, y, this.x, this.y);
    return d < this.size / 2;
  }
}