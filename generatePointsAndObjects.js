function generatePointsAndObjects() {
  fontSize = 400;
  pointsPhys.length = 0;
  sticks.length = 0;

  let bounds = font.textBounds(word, 0, 0, fontSize);
  if (bounds.w > width * 0.9) {
    let scaleFactor = (width * 0.9) / bounds.w;
    fontSize *= scaleFactor;
    bounds = font.textBounds(word, 0, 0, fontSize);
  }

  let x = (width - bounds.w) / 2 - bounds.x;
  let y = height / 2 + bounds.h / 2;

  points = font.textToPoints(word, x, y, fontSize, {
    sampleFactor: 0.017
  });

  radObjects = [];

  for (let i = 0; i < points.length; i++) {
    radObjects.push(new Rad(i));

    if (i % numbSticks === 0) {
      let p = createVector(points[i].x, points[i].y);

      let offset1 = random() < 0.5 ? random(-80, -40) : random(40, 80);
      let offset2 = random() < 0.5 ? random(-80, -40) : random(40, 80);

      let op = createVector(points[i].x + offset1, points[i].y + offset2);

      let p1 = new VerletPoint(p, p.copy(), 6, random(360));
      let p2 = new VerletPoint(op, op.copy(), 6, random(360));
      
      if (gravityMode === 1) {
        p1.gravity = 1;
        p2.gravity = 1;
      } else if (gravityMode === 2) {
        p1.gravity = -1;
        p2.gravity = -1;
      } else if (gravityMode === 3) {
        p1.gravity = random() < 0.5 ? -1 : 1;
        p2.gravity = random() < 0.5 ? -1 : 1;
      }
      



      if (i % 2 === 0) p1.pinned = true;

      pointsPhys.push(p1);
      pointsPhys.push(p2);

      sticks.push(new Stick(p1, p2));
    }
  }

  
  connectorSticks.length = 0;

  if (leftBottomCheckbox2.checked()) {
    for (let i = 0; i < sticks.length - 1; i++) {
      let currentEnd = sticks[i].end;
      let nextEnd = sticks[i + 1].end;
      connectorSticks.push(new Stick(currentEnd, nextEnd));
    }
  } else if (leftBottomCheckbox3.checked()) {
    for (let i = 0; i < sticks.length - 1; i++) {
      let currentEnd = sticks[i].end;
      let nextEnd = sticks[i + 1].end;
  
      let midX = (currentEnd.pos.x + nextEnd.pos.x) / 2;
      let midY = (currentEnd.pos.y + nextEnd.pos.y) / 2;
      let midPos = createVector(midX, midY);
  
      let verletPoint = new VerletPoint(midPos.copy(), midPos.copy(), 6, random(360));
      pointsPhys.push(verletPoint);
  
      connectorSticks.push(new Stick(currentEnd, verletPoint));
      connectorSticks.push(new Stick(verletPoint, nextEnd));
    }
  }
      

}