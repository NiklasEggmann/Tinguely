let radObjects = [];
let Anzahl = 8;
let isMouseMoving = false;
let isMousePressed = false;

let resetText = "HIER KLICKEN FÜR RESET";

let font;
let satzFontLight;
let satzFontBold;
let points;
let word = "C 4 T A";
let fontSize = 400;

let numbSticks = 3;

const pointsPhys = [];
const sticks = [];
const connectorSticks = [];

const paintEnd = [];

let takingScreenshot = false;


function preload() {
  font = loadFont("data/HelveticaNeueLTW1G-ThEx.otf");
  satzFontLight = loadFont("data/SpaceGrotesk-Light.ttf");
  satzFontBold = loadFont("data/SpaceGrotesk-Bold.ttf");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);
  colorMode(HSL);

  gravityCheckboxDown = createCheckbox(' Earth', true);
  gravityCheckboxDown.position(10, 10);
  gravityCheckboxDown.style('font-family', 'SpaceGrotesk-Light');
  gravityCheckboxDown.style('font-size', '16px');
  gravityCheckboxDown.changed(() => selectGravityMode(1));

  gravityCheckboxUp = createCheckbox(' Mars', false);
  gravityCheckboxUp.position(10, 30);
  gravityCheckboxUp.style('font-family', 'SpaceGrotesk-Light');
  gravityCheckboxUp.style('font-size', '16px');
  gravityCheckboxUp.changed(() => selectGravityMode(2));

  gravityCheckboxRandom = createCheckbox(' Rollercoaster', false);
  gravityCheckboxRandom.position(10, 50);
  gravityCheckboxRandom.style('font-family', 'SpaceGrotesk-Light');
  gravityCheckboxRandom.style('font-size', '16px');
  gravityCheckboxRandom.changed(() => selectGravityMode(3));



  const marginBottom = 10;
  const spacing = 20;

  leftBottomCheckbox1 = createCheckbox(' 1 Connection', false);
  leftBottomCheckbox1.position(10, height - marginBottom - spacing * 3);
  leftBottomCheckbox1.style('font-family', 'SpaceGrotesk-Light');
  leftBottomCheckbox1.style('font-size', '16px');
  leftBottomCheckbox1.checked(true);

  leftBottomCheckbox2 = createCheckbox(' 2 Connections', false);
  leftBottomCheckbox2.position(10, height - marginBottom - spacing * 2);
  leftBottomCheckbox2.style('font-family', 'SpaceGrotesk-Light');
  leftBottomCheckbox2.style('font-size', '16px');

  leftBottomCheckbox3 = createCheckbox(' 3 Connections', false);
  leftBottomCheckbox3.position(10, height - marginBottom - spacing * 1);
  leftBottomCheckbox3.style('font-family', 'SpaceGrotesk-Light');
  leftBottomCheckbox3.style('font-size', '16px');

  leftBottomCheckbox1.changed(() => {
    if (leftBottomCheckbox1.checked()) {
      leftBottomCheckbox2.checked(false);
      leftBottomCheckbox3.checked(false);
    }

    generatePointsAndObjects();

  });

  leftBottomCheckbox2.changed(() => {
  if (leftBottomCheckbox2.checked()) {
    leftBottomCheckbox1.checked(false);
    leftBottomCheckbox3.checked(false);
  }
  generatePointsAndObjects();
});

leftBottomCheckbox3.changed(() => {
  if (leftBottomCheckbox3.checked()) {
    leftBottomCheckbox1.checked(false);
    leftBottomCheckbox2.checked(false);
  }
  generatePointsAndObjects();
});

  generatePointsAndObjects();
}

function draw() {
  background(44, 24, 90);

  //Text
  if (!takingScreenshot) {
    push();
    textAlign(CENTER);
    textFont(satzFontLight);
    textSize(20);
    fill(0);
    text("TIPPEN, UM ZU SCHREIBEN", width / 2, 30);
    text("KLICKE, UM ZU MALEN", width / 2, 55);

    text("SHIFT + S = SCREENSHOT", width / 2, height-40);


    let tw = textWidth(resetText);
    
    if (mouseX > width/2 - (tw/2) && mouseX < width/2 + (tw/2)
        && mouseY > height-30 && mouseY < height-10) {
          textFont(satzFontBold);
    } else {
      textFont(satzFontLight);
    }
    
    text(resetText, width / 2, height - 15);
    
    pop();
  }


  // Stick-Startpunkt aktualisieren
  for (let i = 0; i < sticks.length; i++) {
    const index = i * numbSticks;
    if (index < radObjects.length) {
      const pointOnWheel = radObjects[index].getPoint();
      sticks[i].start.updatePos(pointOnWheel.x, pointOnWheel.y);
    }
  }

  // Rad-Objekte bewegen
  if (isMouseMoving || mouseIsPressed) {
    for (let i = 0; i < points.length; i++) {
      radObjects[i].moveUp();
    }
  } else {
    for (let i = 0; i < points.length; i++) {
      radObjects[i].moveDown();
    }
  }

  for (let i = 0; i < radObjects.length; i++) {
    radObjects[i].show();
    radObjects[i].move();
    radObjects[i].followMouse();
  }

  isMouseMoving = false;
  isMousePressed = false;

  for (const stick of sticks) {
    stick.update();
    stick.show();
  }

  for (const stick of connectorSticks) {
    stick.update();
    stick.show();
  }

  for (const point of pointsPhys) {
    point.show();
    updatePosition(point);
    checkBoundaries(point);
  }



  if (mouseIsPressed) {

    for (let i = 0; i < paintEnd.length; i++) {
      showDraw(paintEnd[i]);
    }

    for (let i = 0; i < sticks.length - 1; i++) {
      const end = sticks[i].end;
      paintEnd.push({
        pos: end.pos.copy(),
        hue: end.hue
      });
    }

   
    // Zusätzliche Punkte aus den connectorSticks zeichnen
    for (let i = 0; i < connectorSticks.length; i++) {
    const middle = connectorSticks[i].start;
    paintEnd.push({
    pos: middle.pos.copy(),
    hue: middle.hue
    });
    }
  

  }

}
//Ende Draw


function mouseMoved() {
  isMouseMoving = true;
}


function mouseClicked() {
  let tw = textWidth(resetText);

  if (mouseX > width/2 - (tw/1.32) && mouseX < width/2 + (tw/1.32)
    && mouseY > height-30 && mouseY < height-10) {

  paintEnd.length = 0;

  }
}

function mousePressed() {
  makeGrey = 100;
  isMouseMoving = true;
}

function mouseReleased() {
  makeGrey = 0;
}


function keyTyped() {
  if (key === 'S' && keyIsDown(SHIFT)) return;
  if (key === 'Enter' || key === 'Return' || key === 'Tab') return;

  word += " " + key.toUpperCase();
  generatePointsAndObjects();
}


function keyPressed() {
  if (key === 'S' && keyIsDown(SHIFT)) {
    takingScreenshot = true;

    setTimeout(() => {
      saveCanvas('screenshot', 'jpg');
  
      takingScreenshot = false;

    }, 200);
  }

  if (
    keyCode === BACKSPACE || keyCode === DELETE ||
    key === 'Backspace' || key === 'Delete'
  ) {
    word = word.slice(0, -2);
    generatePointsAndObjects();
    return false;
  }
}

function showDraw(point) {
  fill(point.hue, 100, 50);
  noStroke();
  ellipse(point.pos.x, point.pos.y, 5);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);

  const marginBottom = 20;
  const spacing = 25;

  leftBottomCheckbox1.position(10, height - marginBottom - spacing * 3);
  leftBottomCheckbox2.position(10, height - marginBottom - spacing * 2);
  leftBottomCheckbox3.position(10, height - marginBottom - spacing * 1);
}