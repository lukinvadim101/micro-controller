const canvas=document.getElementById("canvas");
const ctx=canvas.getContext("2d");

const padding = {x: 60, y: 20};
const dotRadius = 1;

const aData = { values:[
  { X: 0, Y: 140000 },
  { X: 0, Y: -140000 },
  { X: 1, Y: -30000 },
  { X: 2, Y: -110000 },
  { X: 3, Y: 28000 },
  { X: 4, Y: 10034 },
  { X: 5, Y: 14000 },
  { X: 136, Y: 82000 },
]};

const bData = { values:[
  { X: 0, Y: 120000 },
  { X: 0, Y: -140000 },
  { X: 1, Y: -30000 },
  { X: 2, Y: -110000 },
  { X: 3, Y: 27000 },
  { X: 4, Y: 1034 },
  { X: 5, Y: 14000 },
  { X: 16, Y: 2000 },
]};

const cData = { values:[
  { X: 0, Y: -140000 },
  { X: 1, Y: -30000 },
  { X: 2, Y: -110000 },
  { X: 3, Y: 22000 },
  { X: 4, Y: 1034 },
  { X: 5, Y: 14000 },
  { X: 10, Y: 130000 },
  { X: 26, Y: 22000 },
]};


// map source values into a designated range
function mapRange(value, sourceLow, sourceHigh, mappedLow, mappedHigh) {
  return mappedLow + (mappedHigh - mappedLow) * (value - sourceLow) / (sourceHigh - sourceLow);
}
// mapping helper function
function calcSourceMinMax(a,prop){
  let min=Infinity;
  let max=-Infinity;
  for(let i=0;i<a.length;i++){
    const value=a[i][prop];
    if(value<min){min=value;}
    if(value>max){max=value;}
  }
  return({min,max});
}

// calc the min & max values of data.values (calc both X & Y ranges)
const rangeX=calcSourceMinMax(aData.values,'X');
const rangeY=calcSourceMinMax(aData.values,'Y');


// calc the drawable graph boundaries
const graphLeft=padding.x;
const graphRight=canvas.width-padding.x;
const graphTop=padding.y;
const graphBottom=canvas.height-padding.y;

function getDisplayXY(valueX,valueY){
  // calc the display X & Y from data.values[i]
  const x = mapRange(valueX,rangeX.min,rangeX.max,graphLeft,graphRight);
  // Note: canvas y values increase going downward so swap graphTop & graphBottom
  const y = mapRange(valueY,rangeY.min,rangeY.max,graphBottom,graphTop);
  return({displayX:x,displayY:y});
}

function connector(starting,ending,color){
  ctx.beginPath();
  ctx.moveTo(starting.displayX,starting.displayY);
  ctx.lineTo(ending.displayX,ending.displayY);
  ctx.strokeStyle=color;
  ctx.stroke();
}
function dot(position,radius){
  ctx.beginPath();
  ctx.moveTo(position.displayX,position.displayY);
  ctx.arc(position.displayX,position.displayY,radius,0,Math.PI*2);
  ctx.closePath();
  
  ctx.fill();
}

// // draw the graph content
// let starting=getDisplayXY(data.values[0].X,data.values[0].Y);
// dot(starting,dotRadius);
// for(let i=1;i<data.values.length;i++){
//   const ending=getDisplayXY(data.values[i].X,data.values[i].Y);
//   connector(starting,ending);
//   dot(ending,dotRadius);
//   starting=ending;
// }

const drawContent = (data, color) => {
  let starting=getDisplayXY(data.values[0].X,data.values[0].Y);
  dot(starting,dotRadius);
 
  for(let i=1;i<data.values.length;i++){
    const ending=getDisplayXY(data.values[i].X,data.values[i].Y);
    
    connector(starting,ending, color);
    dot(ending,dotRadius);
    starting=ending;
  }
};

// drawContent(aData, 'red');
// drawContent(bData, 'blue');
drawContent(cData, 'green');

// axes
const y0=getDisplayXY(graphLeft,0).displayY;
ctx.beginPath();
ctx.moveTo(graphLeft,graphTop);
ctx.lineTo(graphLeft,graphBottom);
ctx.moveTo(graphLeft,graphBottom);
ctx.lineTo(graphRight,graphBottom);
ctx.moveTo(graphLeft,y0);
ctx.lineTo(graphRight,y0);
ctx.strokeStyle='gray';
ctx.stroke();

// scale
const drawDashedLine = (fromX, toX, fromY, toY)=> {
  ctx.beginPath();
  ctx.setLineDash([8, 4]);
  ctx.moveTo(fromX, fromY);
  ctx.lineTo(toX, toY);
  ctx.stroke();
};

const drawYScale = ()=> {
  const yScale = [];
  const yValueGap = (Math.abs(rangeY.min) + rangeY.max) / 14; // значения оси Y
  const yScaleGap = (graphBottom - graphTop) / 14;

  ctx.textAlign='right';
  ctx.textBaseline='middle';

  for (let j = graphTop; j < graphBottom; j+= yScaleGap) {
    yScale.push(j);
    if (Math.ceil(j) !== graphBottom && Math.ceil(j) !== y0) {
      drawDashedLine(graphLeft, graphRight, j, j); // сетка  X
    } 
  }
  
  for (let i = rangeY.max; i >= rangeY.min; i-= yValueGap) {
    const scalePoint = yScale.shift();
    ctx.fillText(new Intl.NumberFormat('ru-RU').format(i),graphLeft-10,scalePoint);
  }

};

drawYScale();

const drawXScale = ()=> {
  const xValueGap = (graphRight - graphLeft) /rangeX.max;

  ctx.textAlign='center';
  let xVal = rangeX.min;
  for (let i = graphLeft; i <= graphRight; i+= xValueGap) {
    if (xVal % 20 === 0) {
      ctx.fillText(xVal,i, graphBottom + 10);
      drawDashedLine( i, i, 430, 20); // сетка   Y
    }
   
    xVal++;
  }
};
console.log('b', graphBottom);
drawXScale();