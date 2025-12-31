// Player.
let me; 

class Player {
  constructor(x, y, u) {
    this.x = x;
    this.y = y;
    this.r = 50;
  }

  draw() {
    // Tail.
    noFill();
    stroke(20, 20, 220);
    strokeWeight(me.r/10);
     beginShape();
    vertex(me.x - (me.r / 4), me.y + (me.r / 4));
    bezierVertex(me.x - (me.r / 4), me.y + 50, me.x - (me.r / 4), me.y - (me.r / 4), me.x - (me.r / 4), me.y - (me.r / 4));
    endShape();

    // Ears.
    noStroke();
    fill(255, 225, 53);
    circle(me.x + (me.r / 2), me.y - (me.r/3), me.r/4); 
    circle(me.x - (me.r / 2), me.y - (me.r/3), me.r/4);
    // fill(230, 200, 50); 
    // circle(me.x - me.size/2 + 20, me.y - 30, 30);
    // circle(me.x + me.size/4, me.y - me.size/2 + 20, 30);

    // Body.
    fill(255, 225, 53);
    noStroke();
    let mouthAngle = map(sin(frameCount * 0.15), -1, 1, 0, 0.5);
    arc(me.x, me.y, me.r, me.r, mouthAngle, TWO_PI - mouthAngle, PIE);

    // Clothes.
    fill(45, 120, 190); // Denim Blue
    arc(me.x, me.y, me.r, me.r, PI * 0.3, PI * 0.8, CHORD);

    // Eye.
    stroke(me.size / 5);
    strokeWeight(me.r/10);
    line(me.x - me.r/3, me.y - me.r/3, me.x + me.r/3 , me.y - me.r/3);
    noStroke();
    fill(150); 
    circle(me.x + (me.r / 10), me.y - (me.r/3), me.r / 3);
    fill(255);
    circle(me.x + (me.r / 10), me.y - (me.r/3), me.r/5);
    fill(100, 50, 20);
    circle(me.x + (me.r / 10), me.y - (me.r/3), me.r/8);
    fill(0);
    circle(me.x + (me.r / 10), me.y - (me.r/3), me.r/14);
    fill(255);
    circle(me.x + (me.r / 10), me.y - (me.r/3), me.r/20);
  }
  left() {
    if (this.x >= 0)
      this.x -= 10;
  }
  right() {
    if (this.x <= width)
      this.x += 10;
  }
  up() {
    if (this.y >= 0)
    this.y -= 10;
  }
  down() {
    if (this.y <= height)
      this.y += 10;
  }
};


function setup() {
  createCanvas(500, 500);
  textAlign(CENTER, CENTER);
  textSize(2);
  me = new Player(height/2, width/2, 10);
  //showStartScreen();
}

function draw() {
  background(255, 0, 255);
  me.draw();
  if (keyIsDown(LEFT_ARROW) === true) {
    me.left()
  }
  if (keyIsDown(RIGHT_ARROW) === true) {
    me.right()
  }
  if (keyIsDown(UP_ARROW) === true) {
    me.up()
  }
  if (keyIsDown(DOWN_ARROW) === true) {
    me.down()
  }
}

function showStartScreen() {
  noStroke();
  fill(32);
  rect(2, gridHeight / 2 - 5, gridWidth - 4, 10, 2);
  fill(255);
  text(
    'Click to play.\nUse arrow keys to move.',
    gridWidth / 2,
    gridHeight / 2
  );
  noLoop();
}


function startGame() {
  // Put the fruit in a random place
  updateFruitCoordinates();

  // Start with an empty array for segments
  segments = [];

  // Start with x at the starting position and repeat until specified
  // number of segments have been created, increasing x by 1 each time
  for (let x = xStart; x < xStart + startingSegments; x += 1) {
    // Create a new vector at the current position
    let segmentPosition = createVector(x, yStart);

    // Add it to the beginning of the array
    segments.unshift(segmentPosition);
  }

  direction = startDirection;
  score = 0;
  gameStarted = true;
  loop();
}

function showFruit() {
  stroke(255, 64, 32);
  point(fruit.x, fruit.y);
}

function showSegments() {
  noFill();
  stroke(96, 255, 64);
  beginShape();
  for (let segment of segments) {
    vertex(segment.x, segment.y);
  }
  endShape();
}

function updateSegments() {
  // Remove last segment
  segments.pop();

  // Copy current head of snake
  let head = segments[0].copy();

  // Insert the new snake head at the beginning of the array
  segments.unshift(head);

  // Adjust the head's position based on the current direction
  switch (direction) {
    case 'right':
      head.x = head.x + 1;
      break;
    case 'up':
      head.y = head.y - 1;
      break;
    case 'left':
      head.x = head.x - 1;
      break;
    case 'down':
      head.y = head.y + 1;
      break;
  }
}

function checkForCollision() {
  // Store first segment in array as head
  let head = segments[0];

  // If snake's head...
  if (
    // hit right edge or
    head.x >= gridWidth ||
    // hit left edge or
    head.x < 0 ||
    // hit bottom edge or
    head.y >= gridHeight ||
    // hit top edge or
    head.y < 0 ||
    // collided with itself
    selfColliding() === true
  ) {
    // show game over screen
    gameOver();
  }
}

function gameOver() {
  noStroke();
  fill(32);
  rect(2, gridHeight / 2 - 5, gridWidth - 4, 12, 2);
  fill(255);

  // Set high score to whichever is larger: current score or previous
  // high score
  highScore = max(score, highScore);

  // Put high score in local storage. This will be be stored in browser
  // data, even after the user reloads the page.
  storeItem('high score', highScore);
  text(
    `Game over!
Your score: ${score}
High score: ${highScore}
Click to play again.`,
    gridWidth / 2,
    gridHeight / 2
  );
  gameStarted = false;
  noLoop();
}

function selfColliding() {
  // Store the last segment as head
  let head = segments[0];

  // Store every segment except the first
  let segmentsAfterHead = segments.slice(1);

  // Check each of the other segments
  for (let segment of segmentsAfterHead) {
    // If segment is in the same place as head
    if (segment.equals(head) === true) {
      return true;
    }
  }
  return false;
}

function checkForFruit() {
  // Store first segment as head
  let head = segments[0];

  // If the head segment is in the same place as the fruit
  if (head.equals(fruit) === true) {
    // Give player a point
    score = score + 1;

    // Duplicate the tail segment
    let tail = segments[segments.length - 1];
    let newSegment = tail.copy();

    // Put the duplicate in the beginning of the array
    segments.push(newSegment);

    // Reset fruit to a new location
    updateFruitCoordinates();
  }
}

function updateFruitCoordinates() {
  // Pick a random new coordinate for the fruit
  // and round it down using floor().
  // Because the segments move in increments of 1,
  // in order for the snake to hit the same position
  // as the fruit, the fruit's coordinates must be
  // integers, but random() returns a float
  let x = floor(random(gridWidth));
  let y = floor(random(gridHeight));
  fruit = createVector(x, y);
}

// When an arrow key is pressed, switch the snake's direction of movement,
// but if the snake is already moving in the opposite direction,
// do nothing.
function keyPressed() {
  switch (keyCode) {
    case LEFT_ARROW:
      if (direction !== 'right') {
        direction = 'left';
      }
      break;
    case RIGHT_ARROW:
      if (direction !== 'left') {
        direction = 'right';
      }
      break;
    case UP_ARROW:
      if (direction !== 'down') {
        direction = 'up';
      }
      break;
    case DOWN_ARROW:
      if (direction !== 'up') {
        direction = 'down';
      }
      break;
  }
}




