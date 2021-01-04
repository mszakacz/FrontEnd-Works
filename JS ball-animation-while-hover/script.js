
var topPositions = [33, 42.5, 45.3, 55, 58.5, 74.5, 53.5, 51.5, 39.5, 37.5, 23, 33];
var leftPositions = [23.5, 42, 36.5, 54, 49, 78.5, 61, 65.2, 52.2, 56, 44.5, 23.5];
var time = [1, 0.25, 0.9, 0.2, 1.5, 1.1, 0.2, 0.9, 0.2, 0.8, 1.5, 1];
var distance = [];



let curTopPos = topPositions[0];
let curLeftPos = leftPositions[0];
let curSector = 0;
let curDistance = 0;

let hovered = false;

var ball = document.querySelector(".ball");
ball.addEventListener("mouseenter", moveForward);
ball.addEventListener("mouseout", moveBack);
 
function calcDistanceArray(){
    distance[0] = 0;
    let sector = 1;
    while(sector < topPositions.length)
    {
        var y = topPositions[sector] - topPositions[sector - 1];
        var x = leftPositions[sector] - leftPositions[sector - 1];
        distance[sector] = distance[sector - 1] + Math.sqrt(x * x + y * y);
        console.log(sector, distance[sector]);
        sector++;
    }
}

function calcCurrentDistance(){
    var y = curTopPos - topPositions[curSector];
    var x = curLeftPos - leftPositions[curSector];
    curDistance = distance[curSector] + Math.sqrt(x * x + y * y);
}

calcDistanceArray();

function moveForward(){
    hovered = true;
    var moveForwardInterval = setInterval(() => {
        var moveTop = (topPositions[curSector + 1] - topPositions[curSector]) / 100 / time[curSector];
        var moveLeft = (leftPositions[curSector + 1] - leftPositions[curSector]) / 100 / time[curSector];
        console.log(curSector, curTopPos, topPositions[curSector + 1]);
        calcCurrentDistance();
        if(curDistance >= distance[curSector + 1]){
            curSector++;
            curTopPos = topPositions[curSector];
            curLeftPos = leftPositions[curSector];
            if(curSector == 11)curSector = 0;
        }
        curTopPos += moveTop;
        curLeftPos += moveLeft;
        ball.setAttribute("style", "top: " + curTopPos + "%; left: " + curLeftPos + "%; transition-duration: " + 0.1 + "s;");

        if (hovered == false) {
            clearInterval(moveForwardInterval);
        }
    }, 100);
}

function moveBack(){
    hovered = false;
    var moveBackInterval = setInterval(() => {
        var moveTop = (topPositions[curSector + 1] - topPositions[curSector]) / 100 / time[curSector];
        var moveLeft = (leftPositions[curSector + 1] - leftPositions[curSector]) / 100 / time[curSector];
        calcCurrentDistance();
        if(Math.abs(curDistance - distance[curSector]) < 3*Math.sqrt(moveTop * moveTop + moveLeft * moveLeft)){
            if(curSector == 0){
                curTopPos = topPositions[0];
                curLeftPos = leftPositions[0];
                clearInterval(moveBackInterval);
            }
            else {
                curSector--;
                curTopPos = topPositions[curSector + 1];
                curLeftPos = leftPositions[curSector + 1];
            }
        }
        if(Math.abs(curLeftPos - leftPositions[0]) < moveLeft)clearInterval(moveBackInterval);
        curTopPos -= moveTop;
        curLeftPos -= moveLeft;
        ball.setAttribute("style", "top: " + curTopPos + "%; left: " + curLeftPos + "%; transition-duration: " + 0.1 + "s;");

        if (hovered == true) {
            clearInterval(moveBackInterval);
        }
    }, 100);
}
