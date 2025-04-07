function chooseShape() {
  let r = random();

  if (r > 0.875) {
    return "shape8";
  } else if (r > 0.75) {
    return "shape7";
  } else if (r > 0.625) {
    return "shape6";
  } else if (r > 0.5) {
    return "shape5";
  } else if (r > 0.375) {
    return "shape4";
  } else if (r > 0.25) {
    return "shape3";
  } else if (r > 0.125) {
    return "shape2";
  } else {
    return "shape1";
  }
}

let makeGrey = 0


function drawShape(shape, size) {
  
  if (shape == "shape1") {
    push();
    noFill();
    stroke(28, 45-makeGrey, 50);
  
    let radius = size / 2;
    let numSpokes = 5;
    let twist = PI / 1.5;
  
    for (let i = 0; i < numSpokes; i++) {
      let baseAngle = TWO_PI / numSpokes * i;
  
      let prevX, prevY;
      for (let t = 0; t <= 1; t += 0.01) {
        let r = radius * t;
        let angle = baseAngle + twist * (1 - t);
        let x = cos(angle) * r;
        let y = sin(angle) * r;
  
        if (t > 0) {
          let weight = lerp(0.5, 4, t);
          strokeWeight(weight * 1.2);
          line(prevX, prevY, x, y);
        }
  
        prevX = x;
        prevY = y;
      }
    }
  
    // Kreis in der Mitte
    strokeWeight(size/8);
    stroke(28, 45-makeGrey, 35);
    ellipse(0, 0, radius * 2 - 2);
  
    pop();

  } else if (shape == "shape2") {

      push();
      noStroke();
      fill(216, 59-makeGrey, 50);
      
      beginShape();
      // Äußere Kontur – kompletter Kreis
      for (let a = 0; a < TWO_PI; a += 0.05) {
        let x = cos(a) * size / 2;
        let y = sin(a) * size / 2;
        vertex(x, y);
      }
      
      // Innere Kontur – Loch
      beginContour();
      for (let a = TWO_PI; a > 0; a -= 0.05) {
        let x = cos(a) * size / 2.8;
        let y = sin(a) * size / 2.8;
        vertex(x, y);
      }
      endContour();
      
      endShape(CLOSE);
      pop();
      

      push();
      noStroke();
      fill(216, 59-makeGrey, 25);
      
      let overlapFactor = 2.7;
      
      beginShape();
      for (let a = PI; a <= TWO_PI; a += 0.05) {
        let x = cos(a) * size / overlapFactor;
        let y = sin(a) * size / overlapFactor;
        vertex(x, y);
      }
      vertex(0, 0);
      endShape(CLOSE);
      pop();
      
      
      


    } else if (shape == "shape3") {
        push();
        noStroke();
        fill(0, 45-makeGrey, 49);
        ellipse(0, 0, size);
        
        for (let r = 0; r < 5; r++) {
            push();
            fill(0, 0-makeGrey, 20);
            let angle = (TAU / 5) * r;
            let x = cos(angle) * size/3;
            let y = sin(angle) * size/3;
            translate(x, y);
            ellipse(0, 0, size / 5);
            pop();
        }
        pop();

        
    } else if (shape == "shape4") {

      push();
      fill(50, 75-makeGrey, 50);
      noStroke();
      rect(0, 0, size / 5, size * 0.8);
      rotate(TAU / 4);
      rect(0, 0, size / 5, size * 0.8);
  
      fill(50, 100-makeGrey, 50);

      beginShape();
      for (let a = 0; a < TWO_PI; a += 0.1) {
        let x = cos(a) * size / 2;
        let y = sin(a) * size / 2;
        vertex(x, y);
      }
  
      beginContour();
      for (let a = TWO_PI; a > 0; a -= 0.1) {
        let x = cos(a) * size / 3.5;
        let y = sin(a) * size / 3.5;
        vertex(x, y);
      }
      endContour();
  
      endShape(CLOSE);
      pop();


    } else if (shape == "shape5") {

      push();
      noFill();
      stroke(0, 0-makeGrey, 25);
      strokeWeight(size/10);
      ellipse(0, 0, size, size);
      for (let s = 0; s < 3; s++) {
        rotate(TAU / 3);
        stroke(0, 0-makeGrey, 10);
        strokeWeight(size/18);
        line(-size / 1.7, 0, size / 1.7, 0);
      }
      pop();

    } else if (shape == "shape6") {

      push();

      let outerR = size / 2;
      let innerR = size / 6; // Breite der Keile am Zentrum
      let numSlices = 5;
      let spread = 0.6; // wie breit die Keile außen sind
    

      noStroke();
      fill(281, 24-makeGrey, 60);
    
      for (let i = 0; i < numSlices; i++) {
        let baseAngle = TWO_PI / numSlices * i;
    
        // linker Innenpunkt
        let angleLeftIn = baseAngle - spread / 4;
        let x0 = cos(angleLeftIn) * innerR;
        let y0 = sin(angleLeftIn) * innerR;
    
        // linker Außenpunkt
        let angleLeftOut = baseAngle - spread / 2;
        let x1 = cos(angleLeftOut) * outerR;
        let y1 = sin(angleLeftOut) * outerR;
    
        // rechter Außenpunkt
        let angleRightOut = baseAngle + spread / 2;
        let x2 = cos(angleRightOut) * outerR;
        let y2 = sin(angleRightOut) * outerR;
    
        // rechter Innenpunkt
        let angleRightIn = baseAngle + spread / 4;
        let x3 = cos(angleRightIn) * innerR;
        let y3 = sin(angleRightIn) * innerR;
    
        beginShape();
        vertex(x0, y0);
        vertex(x1, y1);
        vertex(x2, y2);
        vertex(x3, y3);
        endShape(CLOSE);
      }
    
      // Mittelpunkt-Kreis (Abdeckung)
      fill(281, 24-makeGrey, 40);
      noStroke();
      ellipse(0, 0, innerR * 2); // leicht größer als innerR

      //äusserster Kreis
      noFill();
      stroke(281, 24-makeGrey, 40);
      strokeWeight(size/15);
      ellipse(0, 0, outerR * 2);
    
      pop();


    } else if (shape == "shape7") {

      push();

      let outerR = size / 2;

    
      translate(0, 0); 

      noFill();
      stroke(150, 35-makeGrey, 50);
      strokeWeight(size/25);
      ellipse(0, 0, outerR * 2);

      let triangleR = outerR * 0.95;

      stroke(150, 35-makeGrey, 33);
      strokeWeight(size/50);
      noFill();

      for (let i = 0; i < 3; i++) {
        push();
        rotate((TWO_PI / 9) * i);
        beginShape();
        for (let j = 0; j < 3; j++) {
          let angle = TWO_PI / 3 * j - PI / 2;
          let x = cos(angle) * triangleR;
          let y = sin(angle) * triangleR;
          vertex(x, y);
        }
        endShape(CLOSE);
        pop();
      }

      pop();

    } else if (shape == "shape8") {

      push()
      let middle = 15

      for (let i = 0; i < 6; i++) {
        noFill();
        stroke(177, middle-makeGrey, 25)
        strokeWeight((6-i) * 0.6)
        ellipse(0, i*3.5, size - (i*10));

        middle += 20
      }

      pop()

    }

  }