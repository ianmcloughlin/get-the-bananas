function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  
  // Center coordinates
  let cx = width / 2;
  let cy = height / 2;
  let size = 200;
  
  // -- Animation Logic --
  // Make the mouth open and close like Pacman using a sine wave
  let mouthAngle = map(sin(frameCount * 0.15), -1, 1, 0, 0.5);

  // -- 1. THE MONKEY TAIL (Draw first so it appears behind) --
  noFill();
  stroke(180, 160, 40); // Darker yellow/brown for tail
  strokeWeight(8);
  beginShape();
  vertex(cx - 80, cy + 50);
  bezierVertex(cx - 150, cy + 50, cx - 180, cy - 50, cx - 120, cy - 80);
  endShape();
  
  // -- 2. THE MONKEY EARS --
  noStroke();
  fill(255, 225, 53); // Minion Yellow
  // Left Ear
  circle(cx - size/2 + 20, cy - 30, 60); 
  // Right Ear (slightly offset because of perspective)
  circle(cx + size/4, cy - size/2 + 20, 60);
  
  // Inner Ears
  fill(230, 200, 50); 
  circle(cx - size/2 + 20, cy - 30, 30);
  circle(cx + size/4, cy - size/2 + 20, 30);

  // -- 3. THE BODY (Pacman Shape + Minion Color) --
  fill(255, 225, 53); // Minion Yellow
  noStroke();
  
  // We use the arc function to create the Pacman mouth
  // The angles change based on the 'mouthAngle' variable calculated above
  arc(cx, cy, size, size, mouthAngle, TWO_PI - mouthAngle, PIE);

  // -- 4. MINION OVERALLS --
  // A blue chord shape at the bottom to represent the pants
  fill(45, 120, 190); // Denim Blue
  arc(cx, cy, size, size, PI * 0.2, PI * 0.8, CHORD);

  // -- 5. MINION GOGGLE & EYE --
  // The Strap
  stroke(40);
  strokeWeight(12);
  line(cx - size/2 + 10, cy - 20, cx + size/2 - 10, cy - 20);
  
  // The Goggle Frame (Silver)
  noStroke();
  fill(150); 
  circle(cx, cy - 20, 90);
  
  // The Eyeball (White)
  fill(255);
  circle(cx, cy - 20, 70);
  
  // The Iris (Brown)
  fill(100, 50, 20);
  circle(cx, cy - 20, 30);
  
  // The Pupil (Black)
  fill(0);
  circle(cx, cy - 20, 12);
  
  // Goggle Reflection (Small white dot for liveliness)
  fill(255);
  circle(cx + 10, cy - 30, 8);
}