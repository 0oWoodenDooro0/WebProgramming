function changeTableWidth(n){
    const table = document.getElementById("table");
    table.style.width = `${n}px`;
}

function changeBorderAndSpacing(n){
    const table = document.getElementById("table");
    table.style.border = `${n}px solid black`;
    table.style.borderSpacing = `${n}px`;
}

function changeTableBackgroundColor(color){
    const table = document.getElementById("table");
    const tds = document.getElementsByTagName("td");
    table.style.backgroundColor = color;
    for (let td of tds){
        td.style.backgroundColor = color;
    }
}

function reset(){
    const table = document.getElementById("table");
    table.style.width = "0px";
    table.style.border = "1px solid black";
    table.style.borderSpacing = "2px";
    table.style.backgroundColor = "khaki";
    const tds = document.getElementsByTagName("td");
    for (let td of tds){
        td.style.backgroundColor = "khaki";
    }
}