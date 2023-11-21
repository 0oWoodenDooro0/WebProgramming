let piece1;

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
    },
    clear: function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}
gameArea.canvas.addEventListener('mousemove', function (evt){
    piece1.x = evt.x - piece1.width / 2;
    piece1.y = evt.y - piece1.height / 2;
    piece1.reset();
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
    this.gravity = 0.05;
    this.gravitySpeed = 0;
    this.bounce = 0.7;
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
        this.gravitySpeed += this.gravity;
        this.x += this.speedX;
        this.y += this.speedY + this.gravitySpeed;
    }
    this.hitRight = function () {
        if (this.y > gameArea.canvas.height - this.height) {
            this.y = gameArea.canvas.height - this.height;
            this.gravitySpeed = -(this.gravitySpeed * this.bounce);
            this.speedX = 1;
            if (Math.abs(this.gravitySpeed) < 1){
                this.speedX = Math.abs(this.gravitySpeed);
            }
        }
    }
    this.reset = function (){
        this.gravitySpeed = 0;
        this.speedX = 0;
        this.speedY = 0;
    }
}

function updateGameArea() {
    gameArea.clear();
    piece1.hitRight();
    piece1.newPos();
    piece1.update();
}

function onReset() {
    piece1 = new Component(60, 60, "red", 50, 50, "color");
    gameArea.pause = true;
}