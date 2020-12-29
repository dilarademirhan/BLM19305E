const canvas = document.getElementById('background');
const context = canvas.getContext('2d');

context.scale(20, 20);

var mySound;
rotateSound = new sound("SFX_PieceRotateLR.ogg");
function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = () => this.sound.play();
    
    this.stop = () => this.sound.pause();   
}


const matrix = [
    [
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 0, 0]
    ],
    [
        [0, 1, 0],
        [0, 1, 0],
        [0, 1, 1]
    ],
    [
        [0, 1, 0],
        [0, 1, 0],
        [1, 1, 0]
    ],
    [
        [1, 1],
        [1, 1]
    ],
    [
        [1, 1, 0],
        [0, 1, 1],
        [0, 0, 0]
    ],
    [
        [0, 1, 1],
        [1, 1, 0],
        [0, 0, 0]
    ],
    [
        [0, 1, 0],
        [1, 1, 1],
        [0, 0, 0]
    ]
]





const colors = ['#E8D375', '#D65252', '#70D8D5', '#A470D8', '#99D870']
let color = colors[Math.floor((Math.random() * 5))]; //a random color
let m = matrix[Math.floor((Math.random() * 5))] //a random tetromino



function drawPieces(position) {
    context.fillStyle = 'black';
    context.fillRect(0, 0, canvas.width, canvas.height);
    document.onkeydown = keyControl; //rotating tetrominoes
    
    m.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value) {
                context.fillStyle = color;
                context.fillRect(x + position.x, y + position.y, 1, 1);
            }
        });
    });
}


function keyControl(e) {

    e = e || window.event;
   if (e.keyCode == '38') {
        rotateSound.play()
        m = m[0].map((val, index) => m.map(row => row[index]).reverse())
        
    }
    else if (e.keyCode == '40') {
        position.y++;
    }
    else if (e.keyCode == '37') {
        position.x--;
    }
    else if (e.keyCode == '39') {
        position.x++;
    }

}





let counter = 0;
let period = 500;
let lastTime = 0;

function update(time = 0) {
    const delta = time - lastTime;
    lastTime = time;
    counter += delta;
    if (counter > period) {
        position.y++;
        counter = 0;
    }
    if (position.y >= 22) {
        position.y = 23;
        position.x = position.x
    }
    if (position.x <= 0) {
        position.x = 0;
    }
    drawPieces(position);
    requestAnimationFrame(update);
}


let position = {
    x: 5,
    y: 0
}
update();
