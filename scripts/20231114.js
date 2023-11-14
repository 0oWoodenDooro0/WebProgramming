let piece1, piece2, piece3;

function loadGame() {
    gameArea.load();
    onReset();
}

let gameArea = {
    canvas: document.createElement("canvas"),
    load: function () {
        this.pause = true;
        this.canvas.width = 480;
        this.canvas.height = 270;
        this.canvas.style.border = "1px solid black"
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(updateGameArea, 20);
        this.x = 0;
        this.y = 0;
    },
    clear: function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    getMousePos: function (evt) {
        const rect = this.canvas.getBoundingClientRect();
        this.x = evt.clientX - rect.left;
        this.y = evt.clientY - rect.top;
    },
}

gameArea.canvas.addEventListener('mousedown', function (evt) {
    gameArea.getMousePos(evt);
}, false)

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
    this.hitWall = function () {
        if (this.x > gameArea.canvas.width - this.width) {
            this.speedX = -this.speedX;
        } else if (this.x < 0) {
            this.speedX = -this.speedX;
        } else if (this.y > gameArea.canvas.height - this.height) {
            this.speedY = -this.speedY;
        } else if (this.y < 0) {
            this.speedY = -this.speedY;
        }
    }
}

function updateGameArea() {
    gameArea.clear();
    gameArea.context.fillStyle = "black";
    gameArea.context.font = "12px Verdana";
    gameArea.context.fillText(`(${gameArea.x},${gameArea.y})`,400, 200);
    if (!gameArea.pause) {
        piece1.newPos();
        piece2.newPos();
        piece3.newPos();
        piece1.hitWall();
        piece2.hitWall();
        piece3.hitWall();
    }
    piece1.update();
    piece2.update();
    piece3.update();
}

function onStart() {
    gameArea.pause = false;
}

function onStop() {
    gameArea.pause = true;
}

function onReset() {
    piece1 = new Component(60, 60, "red", 50, 50);
    piece2 = new Component(60, 60, "blue", 70, 150);
    piece3 = new Component(60, 60, "yellow", 20, 150);
    piece1.speedX = 1;
    piece2.speedX = 1;
    piece2.speedY = 1;
    piece3.speedX = 1;
    piece3.speedY = -1;
}