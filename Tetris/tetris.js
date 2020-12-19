const canvas = document.getElementById('background');
const context = canvas.getContext('2d');

context.scale(30, 30);
context.fillStyle = 'black';
context.fillRect(0, 0, canvas.width, canvas.height);

const matrix =  [
    [
        [0, 0, 0],
        [1, 1, 1],
        [0, 1, 0]
    ],            
    [
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 0, 0]
    ],
    [
        [0, 1, 0],
        [0, 1, 0],
        [0, 1, 2]
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
let color =  colors[Math.floor((Math.random() * 5))];
let m = matrix[Math.floor((Math.random() * 5))]

function drawPieces(position){
    context.fillStyle = 'black';
    context.fillRect(0, 0, canvas.width, canvas.height);
    m.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value !== 0) {
                context.fillStyle = color;
                context.fillRect(x + position.x, y + position.y, 1, 1);   
            } 
        });
    });
}

let counter = 0;
let period = 1000;
let lastTime = 0;

function update(time = 0){
    const delta = time - lastTime;
    lastTime = time;
    counter += delta;
    if (counter > period) {
        position.y++;
        counter = 0;
    }
    if(position.y == 14){
        location.reload();
    }
    drawPieces(position);
    requestAnimationFrame(update);
}

let position = {x:5, y:0}
update();




