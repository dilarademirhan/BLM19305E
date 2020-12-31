const canvas = document.getElementById('background');
const context = canvas.getContext('2d');
const scale = 20;
context.scale(scale, scale);

let score = 0;

let arena = []

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



let m = matrix[Math.floor((Math.random() * 5))] //a random tetromino

var img = new Image();
img.src = '../Tetris/images/gray.PNG'

function drawPieces(position) {
    document.onkeydown = keyControl; //rotating tetrominoes
    m.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value) {
                context.drawImage(img, x + position.x, y + position.y, 1, 1);
            }
        });
    });
}


var music = new sound("../sounds/music.mp3");
var startSound = new sound("../sounds/start.wav");
startSound.play()
var rotateSound = new sound("../sounds/SFX_PieceRotateLR.ogg");
var moveSound = new sound("../sounds/SFX_PieceMoveLR.ogg");
var hardDropSound = new sound("../sounds/SFX_PieceHardDrop.ogg");
var clearSound = new sound("../sounds/line.wav");
var gameOverSound = new sound("../sounds/lose.wav");


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

let musicControl = 1
document.getElementById("music").onclick = function () {
   musicControl = 0
   music.stop()
   document.getElementById("music").style.display = "none";
   document.getElementById("musicoff").style.display = "inline";
};

let soundControl = 1
document.getElementById("sound").onclick = function () {
    soundControl = 0
    document.getElementById("sound").style.display = "none";
    document.getElementById("soundoff").style.display = "inline";
 };
 document.getElementById("musicoff").onclick = function () {
    musicControl = 1 
    document.getElementById("musicoff").style.display = "none";
    document.getElementById("music").style.display = "inline";
 };
 document.getElementById("soundoff").onclick = function () {
     soundControl = 1
     document.getElementById("soundoff").style.display = "none";
     document.getElementById("sound").style.display = "inline";
  };

function keyControl(e) {

    e = e || window.event;
    if (e.keyCode == '38') {
        if(soundControl)
            rotateSound.play()
        m = m[0].map((val, index) => m.map(row => row[index]).reverse())
        if(collision()){
            for (let index = 0; index < 3; index++) {
                m = m[0].map((val, index) => m.map(row => row[index]).reverse())
            }
        }
    }
    else if (e.keyCode == '40') {
        if(soundControl)
            moveSound.play()
        position.y++;
        counter = 0;
    }
    else if (e.keyCode == '37') {
        if(soundControl)
            moveSound.play()
        position.x--;
        if (collision())
            position.x++;
    }
    else if (e.keyCode == '39') {
        if(soundControl)
            moveSound.play()
        position.x++;
        if (collision())
            position.x--;
    }else if (e.keyCode === 32) {
        if(soundControl)
            hardDropSound.play()
        period = 1; 
    }

}

document.getElementById("up").onclick = function () {
    if(soundControl)
        rotateSound.play()
    m = m[0].map((val, index) => m.map(row => row[index]).reverse())
    if(collision()){
        for (let index = 0; index < 3; index++) {
            m = m[0].map((val, index) => m.map(row => row[index]).reverse())
        }
    }
};
document.getElementById("down").onclick = function () {
    if(soundControl)
        moveSound.play()
    position.y++;
    counter = 0;
};
document.getElementById("left").onclick = function () {
    if(soundControl)
        moveSound.play()
    position.x--;
    if (collision())
        position.x++;
};
document.getElementById("right").onclick = function () {
    if(soundControl)
        moveSound.play()
    position.x++;
    if (collision())
        position.x--;
};
document.getElementById("space").onclick = function () {
    if(soundControl)
        hardDropSound.play()
    period = 0;
};


function collision() {
    for (let i = 0; i < m.length; i++) {
        for (let j = 0; j < m[i].length; j++) {
            if (m[i][j] && arena[position.y + i + 1][position.x + j + 1]){
                return 1;
            }
        }
    }
    return 0;
}

function merge() {
    for (let i = 0; i < m.length; i++) {
        for (let j = 0; j < m[i].length; j++) {
            arena[position.y + i][position.x + j + 1] = arena[position.y + i][position.x + j + 1] || m[i][j]; //pos.y-1
        }
    }
}
    
function clearBlocks() {
    for (let i = 1; i < arena.length - 2; i++) {
        let clear = 1;

        for (let j = 1; j < arena[i].length-1; j++) {
            if (!arena[i][j])
                clear = 0;
        }

        if (clear) {
            let r = new Array(canvas.width / scale).fill(0);
            r.push(1);
            r.unshift(1);
            score += 100;
            arena.splice(i, 1);
            arena.splice(1, 0, r);
            if(soundControl)
                clearSound.play()
        }
    }
}

function drawArena() {
    for (let i = 1; i < arena.length - 2; i++) {
        for (let j = 1; j < arena[i].length-1; j++) {
            if (arena[i][j]) {
                context.drawImage(img, j-1, i-1, 1, 1);
            }
        }
    }
}

function initArena() {
    arena = [];

    const r = new Array((canvas.width / scale) + 2).fill(1);
    arena.push(r);

    for (let i = 0; i < (canvas.height / scale); i++) {
        let row = new Array(canvas.width / scale).fill(0);
        row.push(1);
        row.unshift(1);

        arena.push(row);
    }

    arena.push(r);
    arena.push(r);
}


function gameOver() {
    for (let j = 1; j < arena[1].length - 1; j++)
        if (arena[1][j]){
            endGame();
            return initArena();
        }
    return;
}
function endGame() {
    if(soundControl)
        gameOverSound.play()    
    music.stop()

    document.getElementById("background").style.display = 'none';
    document.getElementById("score").style.display = 'none';
    document.getElementById("up").style.display = 'none';
    document.getElementById("down").style.display = 'none';
    document.getElementById("left").style.display = 'none';
    document.getElementById("right").style.display = 'none';
    document.getElementById("space").style.display = 'none';
    document.getElementById("music").style.display = 'none';
    document.getElementById("musicoff").style.display = 'none';
    document.getElementById("sound").style.display = 'none';
    document.getElementById("soundoff").style.display = 'none';
    document.getElementById("restart").style.display = 'none';
    

    let para = document.createElement("p");
    para.innerHTML = "GAME OVER...";
    para.style.font = "bold 50px Algerian";
    para.style.color = "black"
    let scorePara = document.createElement("p");
    scorePara.innerHTML = "Score: " + score;
    scorePara.style.font = "bold 50px Algerian";
    scorePara.style.color = "black"
    let btn = document.createElement("button");   
    btn.innerHTML = "Play Again";       
    let styleButton = "display: inline-block; padding: 15px 25px; font-size: 24px; cursor: pointer; "
    +"text-align: center; text-decoration: none;"
    +"font-weight: bold;"
    +"outline: none;"
    +"color: #fff;"
    +"background-color: black;"
    +"border: none;"
    +"border-radius: 15px;"
    +"box-shadow: 0 9px #999;"
    +"btn.setAttribute('style', styleButton);"            
    +"document.body.appendChild(para);"
    +"document.body.appendChild(scorePara);"
    +"document.body.appendChild(btn);"
    btn.setAttribute('style', styleButton);

    document.body.appendChild(para);
    document.body.appendChild(scorePara);
    document.body.appendChild(btn); 
    btn.onclick = function () {
        location.reload();
    };
}
	

document.getElementById("restart").onclick = function () {
    location.reload();
};

let counter = 0;
let period = 500;
let lastTime = 0;

function update(time = 0) {
    document.getElementById('score').innerText = score; 
    if(musicControl)
        music.play()
    const delta = time - lastTime;
    lastTime = time;
    counter += delta;
    if (counter >= period) {
        position.y++;
        counter = 0;
    }
    if (collision()) {
        merge();
        clearBlocks();
        gameOver();

        position.y = 0;
        position.x = 5;
        m = matrix[Math.floor(Math.random() * 5)];

        period = 500;
    }

    context.fillStyle = 'black';
    context.fillRect(0, 0, canvas.width, canvas.height);

    drawArena();

    drawPieces(position);
    requestAnimationFrame(update);
}


let position = {
    x: 5,
    y: 0
}

initArena();
update();