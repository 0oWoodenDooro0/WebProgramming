let gamePiece;

function loadGame() {
    gameArea.load()
    gamePiece = new Component(30, 30, "red", 10, 120);
    piece1 = new Component(60, 60, "yellow", 50, 50);
    piece2 = new Component(30, 90, "blue", 70, 150);
    piece3 = new Component(30, 30, "green", 20, 150);
}

let gameArea = {
    canvas: document.createElement("canvas"),
    load: function () {
        this.pause = false;
        this.canvas.width = 480;
        this.canvas.height = 270;
        this.canvas.style.border = "1px solid black"
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(updateGameArea, 20);
        window.addEventListener('keydown', function (e){
            gameArea.key = e.key;
        })
        window.addEventListener('keyup', function (_) {
            gameArea.key = false;
        })
    },
    clear: function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

function Component(width, height, color, x, y) {
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;
    this.x = x;
    this.y = y;
    this.update = function () {
        let ctx = gameArea.context;
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    this.newPos = function () {
        this.x += this.speedX;
        this.y += this.speedY;
    }
}

function updateGameArea() {
    gameArea.clear();
    // gamePiece.speedX = 0;
    // gamePiece.speedY = 0;
    // if(gameArea && gameArea.key === 'ArrowUp') {
    //     gamePiece.speedY -= 1;
    // }
    // if(gameArea && gameArea.key === 'ArrowDown') {
    //     gamePiece.speedY += 1;
    // }
    // if(gameArea && gameArea.key === 'ArrowLeft') {
    //     gamePiece.speedX -= 1;
    // }
    // if(gameArea && gameArea.key === 'ArrowRight') {
    //     gamePiece.speedX += 1;
    // }
    gamePiece.newPos();
    gamePiece.update();
    if (!gameArea.pause){
        piece1.speedX = 1;
        piece2.speedY = 1;
        piece3.speedY = -1;
        piece1.newPos();
        piece2.newPos();
        piece3.newPos();
    }
    piece1.update();
    piece2.update();
    piece3.update();
}

function moveUp(){
    gamePiece.speedY -= 1;
}

function moveDown(){
    gamePiece.speedY += 1;
}

function moveLeft(){
    gamePiece.speedX -= 1;
}

function moveRight(){
    gamePiece.speedX += 1;
}

function stop(){
    gamePiece.speedX = 0;
    gamePiece.speedY = 0;
}

function pause(){
    gameArea.pause = !gameArea.pause;
}