const canvas=document.getElementById("canvas");
const ctx=canvas.getContext("2d");

const xPadding = 30;
const yPadding = 10;


const data = { values:[
  { X: 0, Y: -180 },
  { X: 2, Y: -8 },
  { X: 3, Y: 18 },
  { X: 4, Y: 34 },
  { X: 5, Y: 40 },
  { X: 6, Y: 80 },
  { X: 7, Y: 180 }
]};

// map source values into a designated range
function mapRange(value, sourceLow, sourceHigh, mappedLow, mappedHigh) {
  return mappedLow + (mappedHigh - mappedLow) * (value - sourceLow) / (sourceHigh - sourceLow);
}
// mapping helper function
function calcSourceMinMax(a,prop){
  let min=1000000;
  let max=-1000000;
  for(let i=0;i<a.length;i++){
    const value=a[i][prop];
    if(value<min){min=value;}
    if(value>max){max=value;}
  }
  return({min,max});
}

// calc the min & max values of data.values (calc both X & Y ranges)
const rangeX=calcSourceMinMax(data.values,'X');
const rangeY=calcSourceMinMax(data.values,'Y');


// calc the drawable graph boundaries
const graphLeft=xPadding;
const graphRight=canvas.width-xPadding;
const graphTop=yPadding;
const graphBottom=canvas.height-yPadding;

function getDisplayXY(valueX,valueY){
  // calc the display X & Y from data.values[i]
  const x = mapRange(valueX,rangeX.min,rangeX.max,graphLeft,graphRight);
  // Note: canvas y values increase going downward
  // so swap graphTop & graphBottom
  const y = mapRange(valueY,rangeY.min,rangeY.max,graphBottom,graphTop);
  return({displayX:x,displayY:y});
}

// graph styling
const dotRadius=3;



// draw the graph content
let starting=getDisplayXY(data.values[0].X,data.values[0].Y);
dot(starting,dotRadius);
for(let i=1;i<data.values.length;i++){
  const ending=getDisplayXY(data.values[i].X,data.values[i].Y);
  connector(starting,ending);
  dot(ending,dotRadius);
  starting=ending;
}

// draw the graph axes
const y0=getDisplayXY(graphLeft,0).displayY;
ctx.beginPath();
ctx.moveTo(graphLeft,graphTop);
ctx.lineTo(graphLeft,graphBottom);
ctx.moveTo(graphLeft,y0);
ctx.lineTo(graphRight,y0);
ctx.strokeStyle='gray';
ctx.stroke();

// draw the graph legends
ctx.textAlign='right';
ctx.textBaseline='middle';
const yMin=getDisplayXY(graphLeft,rangeY.min).displayY;
const yMax=getDisplayXY(graphLeft,rangeY.max).displayY;
const xMax=getDisplayXY(graphRight,rangeX.max).displayX;
ctx.fillText(rangeY.min,graphLeft-10,yMin);
ctx.fillText(0,graphLeft-10,y0);
ctx.fillText(rangeY.max,graphLeft-10,yMax);
ctx.fillText(rangeX.max,graphRight+10,y0);

// for (let n = 0; n < graphRight; n++) {
//   const value = Math.round(xMax - n * xMax/ 10000);
//   console.log(value);
//   ctx.save();
//   ctx.translate(this.x - this.padding, n * this.height / this.numYTicks + this.y);
//   ctx.fillText(value, 50, 225);
//   ctx.restore();
// }
// ctx.restore();





function drawYAxis() {

  ctx.beginPath();
  ctx.moveTo(this.x, this.y);
  ctx.lineTo(this.x, this.y + this.height);
  ctx.strokeStyle = this.axisColor;
  ctx.lineWidttx;
  ctx.stroke();
  ctx.restore();
  // draw tick marks  
  for (let n = 0; n < this.numYTicks; n++) {
    ctx.beginPath();
    ctx.moveTo(this.x, n * this.height / this.numYTicks + this.y);
    ctx.lineTo(this.x + this.tickSize, n * this.height / this.numYTicks + this.y);
    ctx.stroke();
  }
  // draw values  
  ctx.fillStyle = "black";
  ctx.textAlign = "right";
  ctx.textBaseline = "middle";
  for (let n = 0; n < this.numYTicks; n++) {
    const value = Math.round(this.maxY - n * this.maxY / this.numYTicks);
    ctx.save();
    ctx.translate(this.x - this.padding, n * this.height / this.numYTicks + this.y);
    ctx.fillText(value, 0, 0);
    ctx.restore();
  }
  ctx.restore();
};

drawYAxis();
//
function connector(starting,ending){
  ctx.beginPath();
  ctx.moveTo(starting.displayX,starting.displayY);
  ctx.lineTo(ending.displayX,ending.displayY);
  ctx.stroke();
}
//
function dot(position,radius){
  ctx.beginPath();
  ctx.moveTo(position.displayX,position.displayY);
  ctx.arc(position.displayX,position.displayY,radius,0,Math.PI*2);
  ctx.closePath();
  ctx.fill();
}




