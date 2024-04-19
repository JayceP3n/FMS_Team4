function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255);

  createAButton();
}

function createAButton() {
  let button = createButton('Return');
  button.position(0, 100);
  button.mousePressed(() => window.open("https://c733358c-456c-457f-a1c5-c8b11fc3ce9f-00-3t54d2zygg6dn.spock.replit.dev/", "_self"));
}
