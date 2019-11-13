let plants = [];
let max_water = 10;
let a_press = [];
let b_press = [];
let myArray = [10, 20, 30];
let weight = [4, 10, 8, 16];
let colors = ['#D9BBA0', '#93A603','#5A7302', '#373740'];
let color1 = '#373740';
let color2 = '#373740';
let color3 = '#373740';
let color4 = '#373740';
let color5 = '#373740';
let weight1 = 4;
let weight2 = 4;
let weight3 = 4;
let weight4 = 4;
let weight5 = 4;
let score = 0;
let song;

function preload() {
    // preload() runs once
    //song = loadSound('sound/swerving.mp3');
}
function setup() {
    createCanvas(720, 400);
    //createCanvas(1080, 521);
    for (let i = 0; i < 10; i++){
       let plant = new Plant();
       plant.create(i*15, myArray[Math.floor(Math.random() * myArray.length)]);
       plants.push(plant);
    }
    document.getElementById("score").innerHTML = "Score: 0";
    noLoop();
}

function draw() {
    background('#EBEEF2');
    plants[0].demo(4, 4, 0.01, color1, weight1);
    plants[1].demo(2, 2, 0.02, color2, weight2);
    plants[2].demo(-2, -2, 0.03, color3, weight3);
    plants[3].demo(3, 3,0.02, color4, weight4);
    plants[4].demo(-5, -15, 0.01, color5, weight5);
    // plants[0].demo(-8, -7, 0.02, '#590F08');
    // plants[1].demo(5, -6, 0.03, '#F2A25C');

}


// Plant class
class Plant {
    constructor() {
        this.circle = [];
        this.square = [];
        this.morph = [];
        this.state = false;
        this.size = 0;
        this.water = 0;
        this.weight = 0;
        this.color = colors[Math.floor(Math.random() * colors.length)];
    }

    create(size, water) {
        // Create a circle using vectors pointing from center
        this.size = size;
        this.water = water;
        for (let angle = 0; angle < 360; angle += 9) {
            // Note we are not starting from 0 in order to match the
            // path of a circle.
            let v = p5.Vector.fromAngle(radians(angle - 135));
            v.mult(this.size);
            this.circle.push(v);
            // Let's fill out morph ArrayList with blank PVectors while we are at it
            this.morph.push(createVector());
        }

        // A square is a bunch of vertices along straight lines
        // Top of square
        for (let x = -50; x < 50; x += 10) {
            this.square.push(createVector(x, -50));
        }
        // Right side
        for (let y = -50; y < 50; y += 10) {
            this.square.push(createVector(50, y));
        }
        // Bottom
        for (let x = 50; x > -50; x -= 10) {
            this.square.push(createVector(x, 50));
        }
        // Left side
        for (let y = 50; y > -50; y -= 10) {
            this.square.push(createVector(-50, y));
        }
    }

    demo(posX, posY, lerp_val, color, weight) {
        this.weight = weight;
        // We will keep how far the vertices are from their target
        let totalDistance = 0;

        // Look at each vertex
        for (let i = 0; i < this.circle.length; i++) {
            let v1;
            // Are we lerping to the circle or square?
            if (this.state) {
                v1 = this.circle[i];
            } else {
                v1 = this.square[i];
            }
            // Get the vertex we will draw
            let v2 = this.morph[i];
            // Lerp to the target
            v2.lerp(v1, lerp_val);
            // Check how far we are from target
            totalDistance += p5.Vector.dist(v1, v2);
        }

        // If all the vertices are close, switch shape
        if (totalDistance < 0.1) {
            this.state = !this.state;
        }

        // Draw relative to center
        translate(width / posX, height / posY);
        strokeWeight(weight);
        // Draw a polygon that makes up all the vertices
        beginShape();
        noFill();
        stroke(color);

        this.morph.forEach(v => {
            vertex(v.x, v.y);
        });
        endShape(CLOSE);
    }

    get_water(){
        return this.water;
    }


}

// When the user clicks the mouse start the session
function mousePressed() {
    loop();

}

function endGame() {
    noLoop();

}

function keyPressed() {
    switch (key) {
        case 'a':
            color1 = colors[Math.floor(Math.random() * colors.length)];
            color2 = colors[Math.floor(Math.random() * colors.length)];
            color3 = colors[Math.floor(Math.random() * colors.length)];
            color4 = colors[Math.floor(Math.random() * colors.length)];
            color5 = colors[Math.floor(Math.random() * colors.length)];
            weight1 = weight[Math.floor(Math.random() * weight.length)];
            weight2 = weight[Math.floor(Math.random() * weight.length)];
            weight3 = weight[Math.floor(Math.random() * weight.length)];
            weight4 = weight[Math.floor(Math.random() * weight.length)];
            weight5 = weight[Math.floor(Math.random() * weight.length)];
            max_water--;
            a_press.push(1);
            score = getScore(a_press.length).toString();
            document.getElementById("score").innerHTML = score;
            break;

        case 'b':
            color1 = colors[Math.floor(Math.random() * colors.length)];
            color2 = colors[Math.floor(Math.random() * colors.length)];
            color3 = colors[Math.floor(Math.random() * colors.length)];
            color4 = colors[Math.floor(Math.random() * colors.length)];
            color5 = colors[Math.floor(Math.random() * colors.length)];
            max_water++;
            b_press.push(1);
            score = getScore(b_press.length).toString();
            document.getElementById("score").innerHTML = score;
            //document.getElementById("score").innerHTML = "Score: 30";
            break;
        case 'e':
            endGame();
            break;
    }


}


function getScore(clicks) {
    return (max_water + clicks);

}


