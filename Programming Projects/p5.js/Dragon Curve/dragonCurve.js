/*
Heighway Dragon by Tim Matista

This project displays the Heighway Dragon, also known as the Dragon Curve. User input can pause the animation, toggle lines to show the full dragon, and reset the canvas. By changing the parameter for the paperStrip fuction, the number of iterations in the fractal design can be adjusted. This will automatically reshape the canvas.


To learn more about these designs and how they are made, the sources below were a major asset to this project. 
https://larryriddle.agnesscott.org/ifs/heighway/heighway.htm
https://en.wikipedia.org/wiki/Dragon_curve
*/

let activePoints = [ [0, 0] ]; //array of coordinate pairs for each point, initialized at (0,0)
let dia = 5; //dot diameter, used to visualize points
let len = 5; //distance between points
let fr = 0;  //frame, initialized at 0

//init max and min coordinates for points, will be used to set canvas size
let xMax = 0;
let xMin = 0;
let yMax = 0;
let yMin = 0;

let folds = paperStrip(12); // string representing turns of dragon curve

function setup() {
  //generate points of the dragon curve
  for (let n = 0; n < folds.length; n++){               //for each fold
    dir = turtleDirection(activePoints);                //current turtle direction
    newPoint = turnTurtle(activePoints, folds[n], dir); //find next point using direction and fold
    activePoints.push(newPoint);
    
    //check if this will require changing the canvas dimensions
    if (newPoint[0] > xMax){
      xMax = newPoint[0];
    } else if (newPoint[0] < xMin){
      xMin = newPoint[0];
    }
    if (newPoint[1] > yMax){
      yMax = newPoint[1];
    } else if (newPoint[1] < yMin){
      yMin = newPoint[1];
    }
  }
  
  createCanvas(xMax-xMin+10, yMax-yMin+10); //
  background(220);


  
  //initialize draw and show modes
  showMode = 0  // disable route plan, showLines, or showPoints
  drawMode = true // disable or enable drawing a new circle each frame
}


function draw() {
  drawText()
  coords('cart');
  translate(-(xMax+xMin)/2, -(yMax+yMin)/2)

  if (fr < activePoints.length){
    if (showMode === true){
      showLines(activePoints);  
    }
    if (drawMode === true){
      circle(activePoints[fr][0], activePoints[fr][1], dia);
    }
  } else{
    fr = 0;
    background(220);
  }
  if (drawMode){
    fr++;
  }
}


function turnTurtle(points, fold, dir){
  prevPoint = points[points.length - 1];
  if (dir === 'right'){
    if (fold === 'R'){
      newX = prevPoint[0];
      newY = prevPoint[1] - len; 
    } else if (fold === 'L'){
      newX = prevPoint[0];
      newY = prevPoint[1] + len; 
    }
  } else if (dir === 'left'){
    if (fold === 'R'){
      newX = prevPoint[0];
      newY = prevPoint[1] + len; 
    } else if (fold === 'L'){
      newX = prevPoint[0];
      newY = prevPoint[1] - len; 
    }
  } else if (dir === 'up'){
    if (fold === 'R'){
      newX = prevPoint[0] + len;
      newY = prevPoint[1]; 
    } else if (fold === 'L'){
      newX = prevPoint[0] - len;
      newY = prevPoint[1]; 
    }
  } else if (dir === 'down'){
    if (fold === 'R'){
      newX = prevPoint[0] - len;
      newY = prevPoint[1]; 
    } else if (fold === 'L'){
      newX = prevPoint[0] + len;
      newY = prevPoint[1]; 
    }
  }
  return [newX, newY];
}


function turtleDirection(points){
  //return current direction of turtle head
  let dir;
  if (points.length > 1){
    p_1 = points[points.length-1]; //most recent point
    p_2 = points[points.length-2]; //previous point
    if (p_1[0] > p_2[0]){
      dir = 'right';               //turtle points right 
    } else if (p_1[1] > p_2[1]){
      dir = 'up';                //turtle points down 
    } else if (p_1[0] < p_2[0]){
      dir = 'left';                //turtle points left 
    } else if (p_1[1] < p_2[1]){
      dir = 'down';                  // turtle points up
    }
  } else {              
    dir = 'up';        //initial direction
  }
  return dir;
}



function showPoints(points) {
  for (let p = 0; p < points.length; p++){
    point(points[p][0], points[p][1]);        
  }
}

function drawPoints(points,fr) {
  for (let p = 0; p < fr; p++){
    point(points[p][0], points[p][1]);        
  }
}

function showLines(points) { //draw lines between dots
  if (points){
    for (let p = 1; p < points.length; p++){
      line(points[p-1][0], points[p-1][1], points[p][0], points[p][1]);
    }
  }
}


function paperStrip(n){
  let prev = 'R';
  let cur;
  if (n > 1){
    for (let i = 1; i < n; i++){
      cur = prev + 'R' + revNSwap(prev);
      prev = cur;
    }
    return cur;
  } else if (n === 1){
    return prev;
    }
}

function revNSwap(str){
  let rev = str.split('').reverse();
  for (let c in rev){
    if (rev[c] === 'R'){
      rev[c] = 'L';
    } else if (rev[c] === 'L'){
      rev[c] = 'R';
    }
  }
  return rev.join('');
}


function drawText(){
  textSize(12);
  text('Heighway Dragon By Tim Matista', 3, 3, 110,40);
  textSize(15);
  text("'p' to pause      'k' to toggle lines 'o' to reset" , width-120, height-65, 115, 60);
}

function keyPressed() {
  if (key === 'p') {
    drawMode = !drawMode;
  } 
  if (key === 'o'){
    fr = 0;
    background(220);
  }
  if (key === 'k') {
    showMode = !showMode;

  }
}

function coords(style){
  switch(style) {
    case 'default':
      break
    case 'cart':
      translate(width/2, height/2);
      scale(1, -1);
      break
    case 'botL':
      translate(0, height);
      scale(1, -1);
      break
    case 'midL':
      translate(0, height/2);
      scale(1, -1);
      break
  }
}

