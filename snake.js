let moved = false;
let head = [1,5];
let tail = [[1,4,0]];
let apple = [];
let direction = 'right';
const rows = 20;
const columns = 30;
let game = true;
let eaten = false;
let appleCreated = false;
let body = 1;

let score = 0;


function createGrid(){
    document.getElementById('root').textContent = score;
    document.getElementById('root').style.fontWeight = "bold";
    //scoreContainer.textContent = "hello";
    const gridContainer = document.getElementById('grid');
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
            const gridItem = document.createElement('div');
            gridItem.id = `${i+1}|${j+1}`;
            gridItem.className='gridItem';
            if (i % 2 == 0){
                if (j % 2 == 0) gridItem.style.backgroundColor = "#a9d751";
                else gridItem.style.backgroundColor = "#a2d04a";      
            }
            else {
                if (j % 2 == 0) gridItem.style.backgroundColor = "#a2d04a";
                else gridItem.style.backgroundColor = "#a9d751";
            }
            gridContainer.appendChild(gridItem); 
        }
    }    
}
document.addEventListener('keydown', changeDirection);
window.onload = createGrid;

function isTailTouched(){
        tail.forEach(e=>{
            if (e[0] == apple[0] && e[1] == apple[1]) return true;
        });
    return false;
}
let interval = setInterval(gameLoop, 150);
let interval2 = setInterval(createApple, 4000);


function gameLoop(){
    document.getElementById('root').textContent = score;
    if(game) move();
}

function changeDirection(e){
    if (moved){
        switch(e.key){
            case 'ArrowRight': 
            if(direction != 'left' && direction != 'right'){
                if (direction == "up") body = 4;
                else body = 6;
                direction = 'right';
                moved = false;
            }
            break;
            case 'ArrowLeft': 
                if(direction != 'left' && direction != 'right'){
                    if (direction == "up") body = 3;
                    else body = 5;
                    direction = 'left';
                    moved = false;
                }
            break;
            case 'ArrowUp': 
                if(direction != 'down' && direction != 'up'){
                    if (direction == "right") body = 5;
                    else body = 6;
                    direction = 'up';
                    moved = false;
                }
            break;
            case 'ArrowDown':
                if(direction != 'down' && direction != 'up'){ 
                    if (direction == "right") body = 3;
                    else body = 4;
                    direction = 'down';
                    moved = false;
                }
            break;
        }
    }
}

function move(){
    if (!game){
        clearInterval(interval);
    } 
    const temp = JSON.parse(JSON.stringify(head));
    switch (direction){
        case 'up':
            if(head[0] == 1) head[0] = 20;
            else head[0]--;
            break;
        case 'down':
            if(head[0] == 20) head[0] = 1;
            else head[0]++;
            break;
        case 'left':
            if(head[1] == 1) head[1] = 30;
            else head[1]--;
            break;
        case 'right':
            if(head[1] == 30) head[1] = 1;
            else head[1]++;
            break;
    }
    tail.forEach(e=>{
        if (head[0] == e[0] && head[1] == e[1]) {
            game = false;
            alert("Game Over!");
        }
    })
    if (head[0] == apple[0] && head[1] == apple[1]) {
        
        const myNode = document.getElementById(`${apple[0]}|${apple[1]}`);
        if (myNode.firstChild) myNode.removeChild(myNode.lastChild);
        score += 7;
        eaten = true;
        appleCreated = false;
        clearInterval(interval2);
        interval2 = setInterval(createApple, 4000);
    }
    if(tail.length != 0){
        let x = tail.length;
        if (!isTailTouched() && !eaten){
            const gridItem1 = document.getElementById(`${tail[x - 1][0]}|${tail[x - 1][1]}`);
            if (gridItem1.firstChild) {
                gridItem1.removeChild(gridItem1.lastChild);
            }
            tail.pop();
        } 
        else if (eaten && !isTailTouched()){
            eaten = false;
            apple = [];
        } 
        tail.unshift([temp[0],temp[1],body]);
        
    }
    else{
        if (!eaten){
            const gridItem1 = document.getElementById(`${temp[0]}|${temp[1]}`);
            if (gridItem1.firstChild) {
                gridItem1.removeChild(gridItem1.lastChild);
            }
            //gridItem1.style.backgroundColor='white';
        }
        else{
            const gridItem1 = document.getElementById(`${temp[0]}|${temp[1]}`);
            if (gridItem1.firstChild) {
                gridItem1.removeChild(gridItem1.lastChild);
            }
            //gridItem1.style.backgroundColor='white';
            tail.push([temp[0], temp[1]]);
            eaten = false;
        }
    }

    const gridItem = document.getElementById(`${head[0]}|${head[1]}`);
    var elem = document.createElement('img');
    //const rotated = document.getElementById('head');
    if (direction == "up"){
        elem.setAttribute("src", "images/head_up.png");
        elem.setAttribute("alt", "head_up");  
    } 
    else if (direction == "down"){
        elem.setAttribute("src", "images/head_down.png");
        elem.setAttribute("alt", "head_down");  
    }
    else if (direction == "right"){
        elem.setAttribute("src", "images/head_right.png");
        elem.setAttribute("alt", "head_right");  
    }
    else if (direction == "left")
    {
        elem.setAttribute("src", "images/head_left.png");
        elem.setAttribute("alt", "head_left");  
    }
    
    elem.setAttribute("height", "30");
    elem.setAttribute("width", "30");
    
    elem.style.mixBlendMode = "multiply";
    elem.id="head";

    gridItem.appendChild(elem);
    //gridItem.style.backgroundColor='red';
    if (tail != []){
        let x = tail.length - 1;
        if (tail.length == 1){

            if (elem.alt == "head_left"){
            const gridItem2 = document.getElementById(`${tail[x][0]}|${tail[x][1]}`);
            while (gridItem2.firstChild) {
                gridItem2.removeChild(gridItem2.lastChild);
            }
            var elem2 = document.createElement('img');
            elem2.setAttribute("src", "images/tail_right.png");
            elem2.setAttribute("height", "30");
            elem2.setAttribute("width", "30");
            elem2.setAttribute("alt", "Tail");
            elem2.style.mixBlendMode = "multiply";
            gridItem2.appendChild(elem2);
        }
        else if (elem.alt == "head_right"){
            const gridItem2 = document.getElementById(`${tail[x][0]}|${tail[x][1]}`);
            while (gridItem2.firstChild) {
                gridItem2.removeChild(gridItem2.lastChild);
            }
            var elem2 = document.createElement('img');
            elem2.setAttribute("src", "images/tail_left.png");
            elem2.setAttribute("height", "30");
            elem2.setAttribute("width", "30");
            elem2.setAttribute("alt", "Tail");
            elem2.style.mixBlendMode = "multiply";
            gridItem2.appendChild(elem2);
        }
        else if (elem.alt == "head_up"){
            const gridItem2 = document.getElementById(`${tail[x][0]}|${tail[x][1]}`);
            while (gridItem2.firstChild) {
                gridItem2.removeChild(gridItem2.lastChild);
            }
            var elem2 = document.createElement('img');
            elem2.setAttribute("src", "images/tail_down.png");
            elem2.setAttribute("height", "30");
            elem2.setAttribute("width", "30");
            elem2.setAttribute("alt", "Tail");
            elem2.style.mixBlendMode = "multiply";
            gridItem2.appendChild(elem2);
        }
        else if (elem.alt == "head_down"){
            const gridItem2 = document.getElementById(`${tail[x][0]}|${tail[x][1]}`);
            while (gridItem2.firstChild) {
                gridItem2.removeChild(gridItem2.lastChild);
            }
            var elem2 = document.createElement('img');
            elem2.setAttribute("src", "images/tail_up.png");
            elem2.setAttribute("height", "30");
            elem2.setAttribute("width", "30");
            elem2.setAttribute("alt", "Tail");
            elem2.style.mixBlendMode = "multiply";
            gridItem2.appendChild(elem2);
        }
    }
        else if (tail.length >= 2){
            let tailDirection;
            switch (direction){
                case "up":
                    tailDirection = "down";
                break;
                case "down":
                    tailDirection = "up";
                break;
                case "right":
                    tailDirection = "left";
                break;
                case "left":
                    tailDirection = "right";
                break;
            }
            const array = [3,4,5,6];
            for (let i = 0; i < x; i++){
                if (tail[i][2] == 3 && tailDirection == "up") tailDirection = "left";
                else if (tail[i][2] == 3 && tailDirection == "right") tailDirection = "down"; 
                else if (tail[i][2] == 4 && tailDirection == "up") tailDirection = "right"; 
                else if (tail[i][2] == 4 && tailDirection == "left") tailDirection = "down"; 
                else if (tail[i][2] == 5 && tailDirection == "right") tailDirection = "up"; 
                else if (tail[i][2] == 5 && tailDirection == "down") tailDirection = "left"; 
                else if (tail[i][2] == 6 && tailDirection == "down") tailDirection = "right"; 
                else if (tail[i][2] == 6 && tailDirection == "left") tailDirection = "up"; 
            }

            switch(tailDirection){
                case "up":
                    const gridItem10 = document.getElementById(`${tail[x][0]}|${tail[x][1]}`);
                    while (gridItem10.firstChild) {
                        gridItem10.removeChild(gridItem10.lastChild);
                    }
                    var elem2 = document.createElement('img');
                    elem2.setAttribute("src", "images/tail_up.png");
                    elem2.setAttribute("height", "30");
                    elem2.setAttribute("width", "30");
                    elem2.setAttribute("alt", "Tail");
                    elem2.style.mixBlendMode = "multiply";
                    gridItem10.appendChild(elem2);
                break;
                case "down":
                    const gridItem11 = document.getElementById(`${tail[x][0]}|${tail[x][1]}`);
                    while (gridItem11.firstChild) {
                        gridItem11.removeChild(gridItem11.lastChild);
                    }
                    var elem2 = document.createElement('img');
                    elem2.setAttribute("src", "images/tail_down.png");
                    elem2.setAttribute("height", "30");
                    elem2.setAttribute("width", "30");
                    elem2.setAttribute("alt", "Tail");
                    elem2.style.mixBlendMode = "multiply";
                    gridItem11.appendChild(elem2);
                break;
                case "right":
                    const gridItem12 = document.getElementById(`${tail[x][0]}|${tail[x][1]}`);
                    while (gridItem12.firstChild) {
                        gridItem12.removeChild(gridItem12.lastChild);
                    }
                    var elem2 = document.createElement('img');
                    elem2.setAttribute("src", "images/tail_right.png");
                    elem2.setAttribute("height", "30");
                    elem2.setAttribute("width", "30");
                    elem2.setAttribute("alt", "Tail");
                    elem2.style.mixBlendMode = "multiply";
                    gridItem12.appendChild(elem2);
                break;
                case "left":
                    const gridItem13 = document.getElementById(`${tail[x][0]}|${tail[x][1]}`);
                    while (gridItem13.firstChild) {
                        gridItem13.removeChild(gridItem13.lastChild);
                    }
                    var elem2 = document.createElement('img');
                    elem2.setAttribute("src", "images/tail_left.png");
                    elem2.setAttribute("height", "30");
                    elem2.setAttribute("width", "30");
                    elem2.setAttribute("alt", "Tail");
                    elem2.style.mixBlendMode = "multiply";
                    gridItem13.appendChild(elem2);
                break;
                
            }

            switch (tail[0][2]){
                case 3:
                        const gridItem3 = document.getElementById(`${tail[0][0]}|${tail[0][1]}`);
                        while (gridItem3.firstChild) {
                            gridItem3.removeChild(gridItem3.lastChild);
                        }
                        var elem2 = document.createElement('img');
                        elem2.setAttribute("src", "images/3.png");
                        elem2.setAttribute("height", "30");
                        elem2.setAttribute("width", "30");
                        elem2.setAttribute("alt", "horizontal");
                        elem2.style.mixBlendMode = "multiply";
                        gridItem3.appendChild(elem2);
                    break;
                    case 4:
                        const gridItem4 = document.getElementById(`${tail[0][0]}|${tail[0][1]}`);
                        while (gridItem4.firstChild) {
                            gridItem4.removeChild(gridItem4.lastChild);
                        }
                        var elem2 = document.createElement('img');
                        elem2.setAttribute("src", "images/4.png");
                        elem2.setAttribute("height", "30");
                        elem2.setAttribute("width", "30");
                        elem2.setAttribute("alt", "horizontal");
                        elem2.style.mixBlendMode = "multiply";
                        gridItem4.appendChild(elem2);
                    break;
                    case 5:
                        const gridItem5 = document.getElementById(`${tail[0][0]}|${tail[0][1]}`);
                        while (gridItem5.firstChild) {
                            gridItem5.removeChild(gridItem5.lastChild);
                        }
                        var elem2 = document.createElement('img');
                        elem2.setAttribute("src", "images/5.png");
                        elem2.setAttribute("height", "30");
                        elem2.setAttribute("width", "30");
                        elem2.setAttribute("alt", "horizontal");
                        elem2.style.mixBlendMode = "multiply";
                        gridItem5.appendChild(elem2);
                    break;
                    case 6:
                        const gridItem6 = document.getElementById(`${tail[0][0]}|${tail[0][1]}`);
                        while (gridItem6.firstChild) {
                            gridItem6.removeChild(gridItem6.lastChild);
                        }
                        var elem2 = document.createElement('img');
                        elem2.setAttribute("src", "images/6.png");
                        elem2.setAttribute("height", "30");
                        elem2.setAttribute("width", "30");
                        elem2.setAttribute("alt", "horizontal");
                        elem2.style.mixBlendMode = "multiply";
                        gridItem6.appendChild(elem2);
                    break;
                    case 9:
                        if (direction == "up" || direction == "down"){
                            const gridItem8 = document.getElementById(`${tail[0][0]}|${tail[0][1]}`);
                            while (gridItem8.firstChild) {
                                gridItem8.removeChild(gridItem8.lastChild);
                            }
                            var elem2 = document.createElement('img');
                            elem2.setAttribute("src", "images/2.png");
                            elem2.setAttribute("height", "30");
                            elem2.setAttribute("width", "30");
                            elem2.setAttribute("alt", "horizontal");
                            elem2.style.mixBlendMode = "multiply";
                            gridItem8.appendChild(elem2);
                        }
                        else{
                            const gridItem8 = document.getElementById(`${tail[0][0]}|${tail[0][1]}`);
                            while (gridItem8.firstChild) {
                                gridItem8.removeChild(gridItem8.lastChild);
                            }
                            var elem2 = document.createElement('img');
                            elem2.setAttribute("src", "images/1.png");
                            elem2.setAttribute("height", "30");
                            elem2.setAttribute("width", "30");
                            elem2.setAttribute("alt", "horizontal");
                            elem2.style.mixBlendMode = "multiply";
                            gridItem8.appendChild(elem2);
                        }
                    break;
                }
            }
            
            
    }
    body = 9;
    moved = true;
}

function createApple(){
    if (appleCreated){
        const myNode = document.getElementById(`${apple[0]}|${apple[1]}`);
        if (myNode.firstChild) {
            myNode.removeChild(myNode.lastChild);
        }
        appleCreated = false;
        apple = [];
        clearInterval(interval2);
        interval2 = setInterval(createApple, 3000);
        return 0;
    }
    clearInterval(interval2);
    interval2 = setInterval(createApple, 4000);
    apple = [Math.floor((Math.random() * 20) + 1 ), Math.floor((Math.random() * 30) + 1)]
    let id = apple[0]+ '|' + apple[1];
    const gridItem = document.getElementById(id);
    // gridItem.style.backgroundColor='red';
    var elem = document.createElement('img');
    elem.setAttribute("src", "images/apple.png");
    elem.setAttribute("height", "30");
    elem.setAttribute("width", "30");
    elem.setAttribute("alt", "Apple");
    elem.style.mixBlendMode = "multiply";
    gridItem.appendChild(elem);
    appleCreated = true;
}
