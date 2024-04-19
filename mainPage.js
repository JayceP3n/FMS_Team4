/**
 * Read [README.md](https://replit.com/@mnovlani/ExaltedDentalAngle) for updates (OUTDATED)
 * [REMINDER] There are some codes that are left for debug purposes
 */

let fishes = []; // An array of fishes objects
let x = 0;       // x-position of the fishes
let y = 200;     // y-position of the fishes
let speed = 2;   // speed of the fishes

let bubbles = [];          // An array of bubbles objects
let bubbleIntensity = 0.5; // The intensity of the bubbles

var mainPage_bg;      // Variable for mainPage background image
var starterBtn;       // Start button
var titleUI;          // Variable for title UI image
var mainPage_bgMusic; // Variable for mainPage background music

/**
 * The function preload() helps prevent any delays or glitches that may
 * occur while the program is running by ensuring that all necessary resources are
 * preloaded and ready to use.
 */
function preload() {
  mainPage_bg = loadImage("Images/mainPage_bg.jpg");
  loadImage("Images/GUI/Trimmed_FMS_title.png");
  loadImage("Images/GUI/Buttons/First_button_sign.png");
  loadImage("Images/GUI/Buttons/Second_button_sign.png");
  loadImage("Images/GUI/Buttons/Third_button_sign.png");
  mainPage_bgMusic = loadSound("sounds/ocean-waves-112906.mp3")
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  textAlign(CENTER, CENTER);

  // Play background music
  // playBGMusic();

  // Create multiple fish objects
  CreateFish();

  // Create image object for title GUI
  titleUI = createImg("Images/GUI/Trimmed_FMS_title.png", "FMS Title");

  // Create image object for buttons
  CreateButtons();
}

function draw() {
  background(mainPage_bg);
  
  // Updates and Display the Fishies
  updateDisplayFishy();
  
  // Update and display each bubble
  CreateAndDisplayBubbles();

  // Display the title UI on screen
  displayTitleUI();

  // Display the button UI on screen
  displayButtons();
}



/**
 * In the following codes, these are the functions that are used to create the main page of the game
 */

// Function to create multiple fish objects
function CreateFish() {
  for (let i = 0; i < 5; i++) {
    let fish = new Fish(random(width), random(height), random(1, 3));
    fishes.push(fish);
  }
}

// Function to create multiple button objects
function CreateButtons() {
  firstBtn = createImg("Images/GUI/Buttons/First_button_sign.png");
  secondBtn = createImg("Images/GUI/Buttons/Second_button_sign.png")
  thirdBtn = createImg("Images/GUI/Buttons/Third_button_sign.png")
}

// Function to update and display Fishies
function updateDisplayFishy() {
  for (let i = 0; i < fishes.length; i++) {
    fishes[i].update();
    fishes[i].display();
  }
}

// Update and display each bubble
function CreateAndDisplayBubbles() {
  for (let i = bubbles.length - 1; i >= 0; i--) {
    bubbles[i].update();
    bubbles[i].display();
    if (bubbles[i].y < 0) {
      bubbles.splice(i, 1);
    }
  }

  // Generate bubbles randomly
  if (random(bubbleIntensity) < 0.03) {
    let bubble = new Bubble(random(width), height, random(3, 8));
    bubbles.push(bubble);
  }
}

// Display Title UI
function displayTitleUI() {
  titleUI.size(windowWidth/2, windowHeight/2);
  titleUI.position(width/2-titleUI.width/2, (height/2-titleUI.height/2) - 200 );
}

// << Currently Unused  >>
function displayButtons1() {
  /**
   * !!! Acts like a Function !!!
   *               Type                 Name                     Description
   *   @param {variable}          - starterBtn - Name of the variable (dont forget to declare a variable 1st. Example: [var starterBtn;])
   *   @param {File path: string} - src        - Filepath/source of button's image
   *   @param {string}            - alt        - Alternative name incase the picture did not load
   *   @param {number}            - xSize      - Width of the button
   *   @param {number}            - ySize      - Height of the button
   *   @xPos  {number}            - xPos       - x-position of the button
   *   @yPos  {number}            - yPos       - y-position of the button
   *   @text  {string}            - text       - Text to be displayed on the button
   *   @fill  {string}            - fill       - Text color
   *   @txtSize {number}          - txtSize    - Text size
   *   @xPosTxt {number}          - xPosTxt    - x-position of the text
   *   @yPosTxt {number}          - yPosTxt    - y-position of the text
   *   @link  {string}            - link       - Link to be opened when the button is clicked
   */
  new ButtonClass(starterBtn, "Images/GUI/blankButton_UndaTheSea.png", "startBtn", windowWidth/3, windowHeight/7, width/2-13, height/2, 'Ultimate Tic Tac Twist', 'black', 28, width/2+55, height/2, "https://editor.p5js.org/lmconte/full/QiZCMrK2G");
  new ButtonClass(starterBtn, "Images/GUI/blankButton_UndaTheSea.png", "startBtn", windowWidth/3, windowHeight/7, width/2-13, height/2+100, 'Koi Fish Pond Feeding Frenzy', 'black', 28,  width/2-13, height/2+100, "https://editor.p5js.org/gzahn1/full/9SJPXmoWl");
  new ButtonClass(starterBtn, "Images/GUI/blankButton_UndaTheSea.png", "startBtn", windowWidth/3, windowHeight/7, width/2-13, height/2+200, 'Under the Sea Crossword', 'black', 28, width/2+30, height/2+200, "https://editor.p5js.org/rpchuri/full/tMPzdLlTO");
}

// Display Button UI and create event listeners
function displayButtons() {
  let buttonWidth = windowWidth/4;
  let buttonHeight = windowHeight/6;
  // let firstGame = "https://editor.p5js.org/lmconte/full/QiZCMrK2G";
  let firstGame = "https://bdbd7bff-8635-45ac-8fc3-57633c6e20d5-00-24hd4tpq1ak9i.kirk.replit.dev/";
  let secondGame = "https://editor.p5js.org/gzahn1/full/9SJPXmoWl";
  let thirdGame = "https://editor.p5js.org/rpchuri/full/tMPzdLlTO";
  
  firstBtn.size(buttonWidth, buttonHeight);
  firstBtn.position(width/2-firstBtn.width/2, height/2-firstBtn.height/2);
  
  secondBtn.size(buttonWidth, buttonHeight);
  secondBtn.position(width/2-secondBtn.width/2, height/2-secondBtn.height/2 + 130);
  
  
  thirdBtn.size(buttonWidth, buttonHeight)
  thirdBtn.position(width/2-thirdBtn.width/2, height/2-thirdBtn.height/2 + 260);

  // Add event listener for buttons
  firstBtn.mouseClicked(() => {
    window.open(firstGame, "_self");
  })
  secondBtn.mouseClicked(() => {
    window.open(secondGame, "_self");
  })
  thirdBtn.mouseClicked(() => {
    window.open(thirdGame, "_self");
  })
}

function playBGMusic() {
  mainPage_bgMusic.setVolume(.3);
  mainPage_bgMusic.play();
  mainPage_bgMusic.loop();
  
}

