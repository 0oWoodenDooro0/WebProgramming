function draw() {
    const c = document.getElementById("canvas");
    const ctx = c.getContext("2d");
    let grd = ctx.createLinearGradient(20, 20, 120, 70);
    grd.addColorStop(0, "white");
    grd.addColorStop(1, "red");
    ctx.globalAlpha = .5;
    ctx.fillStyle = grd;
    ctx.fillRect(20, 20, 200, 100);

    grd = ctx.createLinearGradient(120, 70, 330, 70);
    grd.addColorStop(0, "blue");
    grd.addColorStop(1, "transparent");
    ctx.fillStyle = grd;
    ctx.fillRect(120, 70, 200, 100);

    ctx.beginPath();
    ctx.moveTo(20, 130);
    ctx.lineTo(110, 130);
    ctx.lineTo(110, 180);
    ctx.lineTo(350, 180);
    ctx.globalAlpha = 1;
    ctx.lineWidth = 5;
    ctx.strokeStyle = "green";
    ctx.stroke();

    ctx.fillStyle = "yellow";
    ctx.font = "20px Arial";
    ctx.fillText("Overlay", 135, 100);

    ctx.beginPath();
    ctx.strokeStyle = "purple";
    ctx.globalAlpha = .5;
    ctx.arc(320, 70, 10, Math.PI * 0.5, Math.PI, true);
    ctx.stroke();
}

function clock() {
    const c = document.getElementById("clock");
    const ctx = c.getContext("2d");
    let radius = c.height / 2;
    ctx.translate(radius, radius);
    radius = radius * 0.9;
    setInterval(drawClock, 1000);

    function drawClock() {
        ctx.arc(0, 0, radius, 0, 2 * Math.PI);
        ctx.fillStyle = "white";
        ctx.fill();
        drawFace(ctx, radius);
        drawNumbers(ctx, radius);
        drawTime(ctx, radius);
    }
}

function drawFace(ctx, radius) {
    const grad = ctx.createRadialGradient(0, 0, radius * 0.95, 0, 0, radius * 1.05);
    grad.addColorStop(0, '#333');
    grad.addColorStop(0.5, 'white');
    grad.addColorStop(1, '#333');

    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, 2 * Math.PI);
    ctx.fillStyle = 'white';
    ctx.fill();

    ctx.strokeStyle = grad;
    ctx.lineWidth = radius * 0.1;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(0, 0, radius * 0.1, 0, 2 * Math.PI);
    ctx.fillStyle = '#333';
    ctx.fill();
}

function drawNumbers(ctx, radius) {
    ctx.font = radius * 0.15 + "px arial";
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    let hours = ["0","I","II","III","IV","V","VI","VII","VIII","IX","X","XI","XII"];
    for (let num = 1; num < 13; num++) {
        let ang = num * Math.PI / 6;
        ctx.rotate(ang);
        ctx.translate(0, -radius * 0.8);
        ctx.rotate(-ang);
        ctx.fillText(hours[num], 0, 0);
        ctx.rotate(ang);
        ctx.translate(0, radius * 0.8);
        ctx.rotate(-ang);
    }
    for (let i = 0; i < 60; i++) {
        let rad = 2 * Math.PI / 60 * i;
        let x = Math.cos(rad) * (radius - 6 * ctx.canvas.width / 200);
        let y = Math.sin(rad) * (radius - 6 * ctx.canvas.width / 200);
        ctx.beginPath();
        if (i % 5 ===0){
            ctx.fillStyle = "#333";
            ctx.arc(x,y,2*ctx.canvas.width / 200,0, 2*Math.PI, false);
        }else{
            ctx.fillStyle="#333";
            ctx.arc(x,y,ctx.canvas.width /200, 0, 2*Math.PI,false);
        }
        ctx.fill();
    }
}

function drawTime(ctx, radius) {
    const now = new Date();
    let hour = now.getHours();
    let minute = now.getMinutes();
    let second = now.getSeconds();
    //hour
    hour = hour % 12;
    hour = (hour * Math.PI / 6) + (minute * Math.PI / (6 * 60)) + (second * Math.PI / (360 * 60));
    drawHand(ctx, hour, radius * 0.5, radius * 0.07);
    //minute
    minute = (minute * Math.PI / 30) + (second * Math.PI / (30 * 60));
    drawHand(ctx, minute, radius * 0.8, radius * 0.07);
    // second
    second = (second * Math.PI / 30);
    drawHand(ctx, second, radius * 0.9, radius * 0.02);
}

function drawHand(ctx, pos, length, width) {
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.lineCap = "round";
    ctx.moveTo(0, 0);
    ctx.rotate(pos);
    ctx.lineTo(0, -length);
    ctx.stroke();
    ctx.rotate(-pos);
}