const friction = 0.999
const bounce = 0.9
//let gravity = 1

let gravityCheckboxDown;
let gravityCheckboxUp;
let gravityCheckboxRandom;
let gravityMode = 1;



function selectGravityMode(mode) {
    gravityMode = mode;
  
    gravityCheckboxDown.checked(mode === 1);
    gravityCheckboxUp.checked(mode === 2);
    gravityCheckboxRandom.checked(mode === 3);
  
    for (let point of pointsPhys) {
      if (mode === 1) {
        point.gravity = 1;
      } else if (mode === 2) {
        point.gravity = -1;
      } else if (mode === 3) {
        point.gravity = random() < 0.5 ? -1 : 1;
      }
    }
  }
  
  

function updatePosition(el) {
    if(!el.pinned) {
        let v = p5.Vector.sub(el.pos, el.oldPos)
        v.mult(friction)
        el.oldPos.set(el.pos)
        el.pos.add(v)
        el.pos.y += el.gravity
    }
}

function checkBoundaries(el) {

    if(!el.pinned) {
    if (el.pos.x + el.rad > width) {
        let v = p5.Vector.sub(el.pos, el.oldPos)
        el.pos.set(width - el.rad, el.pos.y)
        el.oldPos.set(el.pos.x + v.x * bounce, el.oldPos.y)
    }

    if (el.pos.x - el.rad < 0) {
        let v = p5.Vector.sub(el.pos, el.oldPos)
        el.pos.set(0 + el.rad, el.pos.y)
        el.oldPos.set(el.pos.x + v.x * bounce, el.oldPos.y)
    }

    if (el.pos.y + el.rad > height) {
        let v = p5.Vector.sub(el.pos, el.oldPos)
        el.pos.set(el.pos.x, height - el.rad)
        el.oldPos.set(el.oldPos.x, el.pos.y + v.y * bounce)
    }

    if (el.pos.y - el.rad < 0) {
        let v = p5.Vector.sub(el.pos, el.oldPos)
        el.pos.set(el.pos.x, 0 + el.rad)
        el.oldPos.set(el.oldPos.x, el.pos.y + v.y * bounce)
    }
}
    
}
