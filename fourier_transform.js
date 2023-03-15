let R = 75;
let wavepos = 200;
let time = 0;
let wave = [];
let fourierX;
let fourierY;
let dt;
let x = [];
let y = [];
let path = [];
let paused = false;

function setup() {
    var canvas = createCanvas(1200, 1000);

    // X AND Y DATA GO HERE
    
    for(let i =0; i < 100; i++) {
        y[i] = i;
        x[i] = i;
    }

    fourierX = dft(x);
    fourierY = dft(y);

    fourierX.sort((a, b) => abs(a.amp - b.amp));
    fourierY.sort((a, b) => abs(a.amp - b.amp));
    dt = TWO_PI / fourierY.length;
}

function epiCycles(x, y, rotation, fourier) {

    for(let i=0; i < fourier.length; i++) {
        let prevx = x;
        let prevy = y;

        let freq = fourier[i].freq;
        let amp = fourier[i].amp;
        let phase = fourier[i].phase;

        x += amp * cos(freq * time + phase + rotation);
        y += amp * sin(freq * time + phase + rotation);

        stroke(255);
        beginShape();
        noFill();
        ellipse(prevx, prevy, 2 * amp); // Main Circle
        endShape();

        fill(255);
        stroke(255);
        line(prevx, prevy, x, y);
        //ellipse(x, y, 2);
    }
    
    return createVector(x, y);
}

function draw() {
    background(0);
    translate(100, 100);

    let vx = epiCycles(600, 0, 0, fourierX);
    let vy = epiCycles(100, 400, HALF_PI, fourierY);

    let v = createVector(vx.x, vy.y);
    path.unshift(v);

    line(vx.x, vx.y, v.x, v.y);
    line(vy.x, vy.y, v.x, v.y);

    // translate(wavepos, 0);
    // line(x - wavepos, y, 0, wave[0]);
    beginShape();
    noFill();
    for(let i = 0; i < path.length; i++)
        vertex(path[i].x, path[i].y)
    endShape();
    
    time += dt;

    // if (time > TWO_PI) {
    //     time = 0;
    //     path = [];
    // }
    // if (wave.length > 1000) {
    //     wave.pop()
    // }
}
