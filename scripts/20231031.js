function onLoad() {
    clock1()
}

function clock1() {
    const c = document.getElementById("clock1");
    c.style.backgroundColor = "#333";
    const ctx = c.getContext("2d");
    let radius = c.height / 2;
    ctx.translate(radius, radius);
    radius = radius * 0.9;
    setInterval(drawClock, 1);

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
    grad.addColorStop(0.5, 'beige');
    grad.addColorStop(1, '#333');

    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, 2 * Math.PI);
    ctx.fillStyle = 'white';
    ctx.fill();

    ctx.strokeStyle = grad;
    ctx.lineWidth = radius * 0.1;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(0, 0, radius * 0.05, 0, 2 * Math.PI);
    ctx.fillStyle = '#333';
    ctx.fill();
}

function drawNumbers(ctx, radius) {
    ctx.font = radius * 0.15 + "px arial";
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    let hours = ["0", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII"];
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
        let rad = Math.PI / 30 * i;
        ctx.beginPath();
        if (i % 5 === 0) {
            ctx.lineWidth = 2;
            ctx.lineCap = "square";
            ctx.rotate(rad);
            ctx.moveTo(0, -170);
            ctx.lineTo(0, -160);
            ctx.stroke();
            ctx.rotate(-rad);
        } else {
            ctx.lineWidth = 1;
            ctx.lineCap = "square";
            ctx.rotate(rad);
            ctx.moveTo(0, -170);
            ctx.lineTo(0, -165);
            ctx.stroke();
            ctx.rotate(-rad);
        }
    }
}

function drawTime(ctx, radius) {
    const now = new Date();
    let hour = now.getHours();
    let minute = now.getMinutes();
    let second = now.getSeconds();
    let oneSecond = now.getMilliseconds();
    //hour
    hour = hour % 12;
    hour = (hour * Math.PI / 6) + (minute * Math.PI / (6 * 60)) + (second * Math.PI / (360 * 60));
    drawHour(ctx, hour, radius * 0.4, radius * 0.07);
    //minute
    minute = (minute * Math.PI / 30) + (second * Math.PI / (30 * 60));
    drawMinute(ctx, minute, radius * 0.75);
    // second
    second = (second * Math.PI / 30);
    drawSecond(ctx, second, radius * 0.85);
    // one second
    oneSecond = (oneSecond * Math.PI / 1000 * 2);
    drawOneSecond(ctx, oneSecond, radius * 0.9, radius * 0.02)
}

function drawHour(ctx, pos, length, width) {
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.lineCap = "round";
    ctx.moveTo(0, 0);
    ctx.rotate(pos);
    ctx.lineTo(0, -length);
    ctx.stroke();
    ctx.rotate(-pos);
}

function drawMinute(ctx, pos, length) {
    ctx.beginPath();
    ctx.fillStyle = "#333";
    ctx.rotate(pos);
    ctx.moveTo(0, 3);
    ctx.lineTo(3, 0);
    ctx.lineTo(0, -length * 4 / 5);
    ctx.lineTo(3, -length * 5 / 6);
    ctx.lineTo(0, -length);
    ctx.lineTo(-3, -length * 5 / 6);
    ctx.lineTo(0, -length * 4 / 5);
    ctx.lineTo(-3, 0);
    ctx.closePath();
    ctx.fill();
    ctx.rotate(-pos);
}

function drawSecond(ctx, pos, length) {
    ctx.beginPath();
    ctx.fillStyle = "red";
    ctx.rotate(pos);
    ctx.moveTo(0, 5);
    ctx.lineTo(3, 0);
    ctx.lineTo(0, -length);
    ctx.lineTo(-3, 0);
    ctx.closePath();
    ctx.fill();
    ctx.rotate(-pos);
}

function drawOneSecond(ctx, pos, length, width) {
    ctx.beginPath();
    ctx.strokeStyle = "red";
    ctx.lineWidth = width;
    ctx.lineCap = "round";
    ctx.moveTo(0, 0);
    ctx.rotate(pos);
    ctx.lineTo(0, -length);
    ctx.stroke();
    ctx.rotate(-pos);
}