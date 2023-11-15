let piece1, piece2, piece3, obstacle;

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
    }
}

gameArea.canvas.addEventListener('mousemove', function (evt) {
    gameArea.getMousePos(evt);
}, false)

function Component(width, height, color, x, y, type) {
    this.type = type;
    if (this.type === "image") {
        this.image = new Image();
        this.image.src = color;
    }
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;
    this.x = x;
    this.y = y;
    this.images = [color, "https://fonts.gstatic.com/s/e/notoemoji/latest/1f610/512.gif"];
    this.update = function () {
        let ctx = gameArea.context;
        if (this.type === "image") {
            ctx.drawImage(this.image,
                this.x,
                this.y,
                this.width, this.height);
        } else {
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
    this.newPos = function () {
        this.x += this.speedX;
        this.y += this.speedY;
    }
    this.hitWall = function () {
        if (this.x > gameArea.canvas.width - this.width) {
            this.speedX = -this.speedX;
            this.changeImage();
        } else if (this.x < 0) {
            this.speedX = -this.speedX;
            this.changeImage();
        } else if (this.y > gameArea.canvas.height - this.height) {
            this.speedY = -this.speedY;
            this.changeImage();
        } else if (this.y < 0) {
            this.speedY = -this.speedY;
            this.changeImage();
        }
    }
    this.changeImage = function(){
        if (this.type === "image"){
            if (this.image.src === this.images[0]){
                this.image.src = this.images[1];
            }
            else{
                this.image.src = this.images[0];
            }
        }
    }
    this.crashWith = function (obj) {
        let left = this.x;
        let right = this.x + this.width;
        let top = this.y;
        let bottom = this.y + this.height;
        let objLeft = obj.x;
        let objRight = obj.x + obj.width;
        let objTop = obj.y;
        let objBottom = obj.y + obj.height;
        let crash = true;
        if (left > objRight || right < objLeft || top > objBottom || bottom < objTop){
            crash = false;
        }
        return crash;
    }
}

function updateGameArea() {
    gameArea.clear();
    gameArea.context.fillStyle = "black";
    gameArea.context.font = "12px Verdana";
    gameArea.context.fillText(`(${gameArea.x},${gameArea.y})`, gameArea.x,  gameArea.y);
    if (!gameArea.pause) {
        if (!piece1.crashWith(obstacle)) {
            piece1.newPos();
            piece1.hitWall();
        }
        if (!piece2.crashWith(obstacle)) {
            piece2.newPos();
            piece2.hitWall();
        }
        if (!piece3.crashWith(obstacle)) {
            piece3.newPos();
            piece3.hitWall();
        }
    }
    piece1.update();
    piece2.update();
    piece3.update();
    obstacle.update();
}

function onStart() {
    gameArea.pause = false;
}

function onStop() {
    gameArea.pause = true;
}

function onReset() {
    piece1 = new Component(60, 60, "https://fonts.gstatic.com/s/e/notoemoji/latest/1f972/512.gif", 50, 50, "image");
    piece2 = new Component(60, 60, "https://fonts.gstatic.com/s/e/notoemoji/latest/1f636/512.gif", 70, 100, "image");
    piece3 = new Component(60, 60, "https://fonts.gstatic.com/s/e/notoemoji/latest/1f606/512.gif", 20, 150, "image");
    obstacle = new Component(30, 30, "green", 200, 120, "color");
    piece1.speedX = 3;
    piece2.speedX = 3;
    piece2.speedY = 3;
    piece3.speedX = 3;
    piece3.speedY = -3;
    gameArea.pause = true;
}