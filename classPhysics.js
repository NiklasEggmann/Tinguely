class VerletPoint {
    constructor(v_pos, v_oldPos, rad, hue) {
        this.pos = v_pos || null
        this.oldPos = v_oldPos || null
        this.rad = rad || 5
        this.hue = hue || 0
        this.pinned = false

        this.a = 0
        this.v = 0.01
        this.radius = 5

        this.gravity = 1
    }

    show() {
        push()
        noStroke()
        fill(this.hue, 100, 0);
        ellipse(this.pos.x, this.pos.y, this.rad);
        pop()
    }

    updatePos(x, y) {
        this.pos.set(x, y)
    }
}


class Stick {
    constructor(start, end) {
        this.start = start
        this.end = end
        this.length = start.pos.dist(end.pos)
    }

    update() {
        const start = this.start.pos
        const end = this.end.pos

        //update stick position (Vergleichen, aufteilen, anpassen)
        //neuen abstand messen
        //const length = stick.length
        const v_d = end.copy().sub(start)
        const v_d_length = v_d.mag()
        //Differenz zur Länge des Sticks
        const difference = this.length - v_d_length
        //Differenz teilen
        const percentage = difference / v_d_length / 2
        const offset = v_d.mult(percentage)

        //2 teilstücke an Stick enden anfügen
        if(!this.start.pinned ){
        start.sub(offset)
        }
        if (!this.end.pinned) {
        end.add(offset)
        }
    }

    show() {
        push()
        noFill()
        stroke(0)
        line(this.start.pos.x, this.start.pos.y, this.end.pos.x, this.end.pos.y)
        pop()
    }
}