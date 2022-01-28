/* eslint-disable no-plusplus */
/* eslint-disable no-unused-vars */
/* eslint-disable prefer-const */
/* eslint-disable camelcase */


// main tabs
const navTabs = document.querySelector(".nav-tabs");
const navTabButton = document.querySelectorAll(".nav-tab");
const mainContents = document.querySelectorAll(".main-content");
const tabsSwitcher = (e, tabs, contents) => {
  const {
    id
  } = e.target.dataset;
  if (id) {
    tabs.forEach(btn => {
      btn.classList.remove("active");
    });
    e.target.classList.add("active");
    contents.forEach(content => {
      content.classList.remove("active");
    });
    const element = document.getElementById(id);
    element.classList.add("active");
  };
};
navTabs.addEventListener('click', (e) => tabsSwitcher(e, navTabButton, mainContents));
// phase diagramm
const fillDiagramms = (diagramm) => {
  for (let i = 20; i >= 0; i--) {
    const scale = document.createElement("DIV");
    const node = document.createElement("DIV");
    scale.append(node);
    scale.setAttribute('class', 'd-flex justify-content-end '); // шкала
    node.setAttribute('data-value', i * 10); // атрибут для текущего значения
    if (i === 20) {
      scale.insertAdjacentHTML('afterbegin', '<div class="phase-scale ">200</div>');
    }
    if (i === 10) {
      scale.insertAdjacentHTML('afterbegin', '<div class="phase-scale">100</div>');
    }
    if (i === 7) {
      scale.insertAdjacentHTML('afterbegin', '<div class="phase-scale">80</div>');
    }
    if (i === 0) {
      scale.insertAdjacentHTML('afterbegin', '<div class="phase-scale">0</div>');
    }
    if (i > 10) {
      node.setAttribute("class", " phase phase-high ");
    }
    if (i <= 10 && i >= 8) {
      node.setAttribute("class", " phase phase-mid");
    }
    if (i < 8) {
      node.setAttribute("class", " phase phase-low");
    }
    node.innerHTML = '&nbsp;';
    diagramm.append(scale);
  }
};
const phaseDiagramms = [...document.querySelectorAll('.phase-diagramm')];
phaseDiagramms.forEach(fillDiagramms); // draw diagramm
const markElemInDiagramm = (diagrammId, value) => {
  const AllPhases = [...document.querySelectorAll('.phase')];
  const exactDiagrammPhases = AllPhases.filter(el => el.closest(diagrammId));
  const elem = exactDiagrammPhases.filter(el => +el.dataset.value <= value && +el.dataset.value + 10 > value);
  elem[0].classList.add('phase-active', 'blink');

  // return elem;
};
// specific el add style
markElemInDiagramm('#phaseDiagrammA', 49); //  0012 амперы?
markElemInDiagramm('#phaseDiagrammB', 119); //  0014
markElemInDiagramm('#phaseDiagrammC', 89); // 0016

const oscilloViewbtn = document.getElementById('oscilloViewbtn');
oscilloViewbtn.addEventListener('click', () => {
  navTabButton.forEach(btn => {
    btn.classList.remove("active");
  });
  document.getElementById('oscillograms-tab').classList.add("active");
  mainContents.forEach(content => {
    content.classList.remove("active");
  });
  document.getElementById('oscillograms').classList.add("active");
});

// measurments tab
const measurmentsTabs = document.querySelector('.measurments-tabs');
const measurmentTab = document.querySelectorAll('.measurment-tab');
const measurmentsContent = document.querySelectorAll('.measurments-content');
const measurementsAllTab = document.querySelector('#measurements-all');
const measurementsSwitchTab = document.querySelector('#measurements-switch');
measurmentsTabs.addEventListener('click', (e) => tabsSwitcher(e, measurmentTab, measurmentsContent));

const measurementsAllTableBody = document.getElementById('measurementsAllTableBody');
const measurementsSwitchTableBody = document.getElementById('measurementsSwitchTableBody');
const refreshMeasurmentsTableData = document.getElementById('refreshMeasurmentsTableData'); // доббавить обновление data

let measurmentsTableCurrentObj = {
  '0201': null,
  '0204': null,
  '0205': null,
  '0206': null,
  '0207': null,
  '0208': null,
  '0209': null,
  '0210': null,
  '0211': null,
  '0212': null,
  '0213': null,
  '0214': null,
  '0215': null,
  '0216': null,
  '0217': null,
  '0218': null,
  '0219': null,
  '0220': null,
  '0221': null,
  '0222': null,
  '0223': null,
  '0224': null,
  '0225': null,
  '0226': null,
  '0227': null,
  '0228': null,


};

const addRowToMeasurmentsTable = (table, obj) => {
  table.insertAdjacentHTML("afterbegin", `
  <tr>
    <td>${obj['0201']}</td> 
    <td>
      ${obj['0206']}.${obj['0205']}.${obj['0204']}
      ${obj['0207']}:${obj['0208']}:${obj['0209']}.${obj['0210']}
    </td>
    <td>${obj['0211']}</td>
    <td>${obj['0212']}</td>
    <td>${obj['0213']}</td>
    <td>${obj['0214']}</td>
    <td>${obj['0215']}</td>
    <td>${obj['0216']}</td>
    <td>${obj['0217']}</td>
    <td>${obj['0218']}</td>
    <td>${obj['0219']}</td>
    <td>${obj['0220']}</td>
    <td>${obj['0221']}</td>
    <td>${obj['0222']}</td>
    <td>${obj['0223']}</td>
    <td>${obj['0224']}</td>
    <td>${obj['0225']}</td>
    <td>${obj['0226']}</td>
    <td>${obj['0227']}</td>
    <td>${obj['0228']}</td>
  </tr>
`);
};

addRowToMeasurmentsTable(measurementsAllTableBody,measurmentsTableCurrentObj);
// добавить фильтр переключений
addRowToMeasurmentsTable(measurementsSwitchTableBody,measurmentsTableCurrentObj);


// events tab
let eventsTableCurrentObj = {
  '0301': null,
  '0303': null,
  '0304': null,
  '0305': null,
  '0306': null,
  '0307': null,
  '0308': null,
  '0309': null,
  '0310': null,
  '0311': null,
};
const addCurrentEntryToEventsTable = ()=> {
  const eventsTableBody = document.querySelector('#eventsTableBody');
  const obj = eventsTableCurrentObj;
  eventsTableBody.insertAdjacentHTML("beforeend", `
  <tr>
    <td>${obj['0301']}</td>
    <td>
      ${obj['0305']}.${obj['0304']}.${obj['0303']}
      ${obj['0306']}:${obj['0307']}:${obj['0308']}.${obj['0309']}
      </td>
    </td>
    <td>${obj['0310'] === null ? obj['0310'] + ' (пришло)' : obj['0310'] + ' (ушло)' }</td>
    <td>${obj['0311']}</td>
    <td>нужна таблица расшифровки</td>
  </tr>`);
};

// addCurrentEntryToEventsTable();


// oscillograms tab
const oscillogramsTabs = document.querySelector('.oscillograms-tabs');
const oscillogramTab = document.querySelectorAll('.oscillograms-tab');
const oscillogramsContent = document.querySelectorAll('.oscillograms-content');
oscillogramsTabs.addEventListener('click', (e) => tabsSwitcher(e, oscillogramTab, oscillogramsContent));


const addOptToOscilloSelect = (data)=> {
  let opt = document.createElement('option');
  const val = (num)=> Object.values(data.info[num]);
  let str = `${+val(0) === 1 ? 'ВКЛ' : 'ОТКЛ'} ${val(4)}.${val(3)}.${val(2)} ${val(5)}:${val(6)}:${val(7)}.${val(8)}.${val(9)}`;// on? y.m.d h:m:sss
  opt.value = val(1); // номер (рег 0603)
  opt.innerHTML = str;
  document.getElementById('oscillogramsSelect').appendChild(opt);
};


// oscillogram Canvas
let oscilloCanvas=document.getElementById("oscilloCanvas");
let osCtx=oscilloCanvas.getContext("2d");


const padding = {x: 60, y: 20};
const dotRadius = 2;

const osData = {
  info: [{f:1},{1: 666},{2:2022},{3:11},{4:2},{5:16},{6:20},{7:1},{8:999},{9:0}],
  a: { values:[
    { X: 0, Y: 140000 },
    { X: 1, Y: 0 },
    { X: 2, Y: -20000 },
    { X: 3, Y: 28000 },
    { X: 4, Y: 10034 },
    { X: 5, Y: 14000 },
    { X: 6, Y: -20000 },
    { X: 7, Y: 28000 },
    { X: 8, Y: 10034 },
    { X: 9, Y: 14000 },
  ]},
  
  b: { values:[
    { X: 0, Y: -30000 },
    { X: 1, Y: -110500 },
    { X: 2, Y: 27000 },
    { X: 3, Y: 1034 },
    { X: 4, Y: 14000 },
    { X: 5, Y: 2000 },
  ]},
  
  c: { values:[
    { X: 0, Y: -30000 },
    { X: 1, Y: -110000 },
    { X: 2, Y: 22000 },
    { X: 3, Y: 1034 },
    { X: 4, Y: 14000 },
    { X: 5, Y: 151320 },
  ]},
  bk: { values:[
    { X: 0, Y: 1 },
    { X: 1, Y: 1 },
    { X: 2, Y: 0 },
    { X: 3, Y: 1 },
    { X: 4, Y: 1 },
    { X: 5, Y: 1 },
  ]},
};

addOptToOscilloSelect(osData);

const oscilorgamsTableBody = document.getElementById('oscilorgamsTableBody');
const addRowsToOscilorgamsTableBody = ()=> {

  for(let i = osData.a.values[0].X; i < osData.a.values.length; i++) {
    oscilorgamsTableBody.insertAdjacentHTML('beforeend',`
    <tr>
      <td>${i}</td>     
      <td>${osData.bk.values[i] ? osData.bk.values[i].Y : "-"}</td>
      <td>${osData.a.values[i].Y}</td>
      <td>${osData.b.values[i] ? osData.b.values[i].Y : "-"}</td>
      <td>${osData.c.values[i] ? osData.c.values[i].Y : "-"}</td>
    </tr>
    `);
  }

  
   
  
};
addRowsToOscilorgamsTableBody();

function mapRange(value, sourceLow, sourceHigh, mappedLow, mappedHigh) {
  return mappedLow + (mappedHigh - mappedLow) * (value - sourceLow) / (sourceHigh - sourceLow);
}
// максимальные значения XY
function calcSourceMinMax(prop, ...arr){
  let min=Infinity;
  let max=-Infinity;
  arr.forEach(a => {
    for(let i=0;i<a.length;i++){
      const value=a[i][prop];
      if(value<min){min=value;}
      if(value>max){max=value;}
    }
  });
  return({min,max});
}

let rangeY=calcSourceMinMax('Y',osData.a.values,osData.b.values, osData.c.values);
let rangeX=calcSourceMinMax('X',osData.a.values,osData.b.values, osData.c.values);


// calc the drawable graph boundaries
const graphLeft=padding.x;
const graphRight=oscilloCanvas.width-padding.x;
const graphTop=padding.y;
const graphBottom=oscilloCanvas.height-padding.y;

function getDisplayXY(valueX,valueY){
  const x = mapRange(valueX,rangeX.min,rangeX.max,graphLeft,graphRight);
  const y = mapRange(valueY,rangeY.min,rangeY.max,graphBottom,graphTop);
  return({displayX:x,displayY:y});
}

function connector(ctx,starting,ending,color){
  ctx.beginPath();
  ctx.lineWidth = 2;
  ctx.moveTo(starting.displayX,starting.displayY);
  ctx.lineTo(ending.displayX,ending.displayY);
  ctx.strokeStyle=color;
  ctx.stroke();
}
function dot(ctx,position,radius){
  ctx.beginPath();
  ctx.moveTo(position.displayX,position.displayY);
  ctx.arc(position.displayX,position.displayY,radius,0,Math.PI*2);
  ctx.closePath();
  ctx.fill();
}

const osciloCanvasDots = document.getElementById('osciloCanvasDots');
const osciloCanvasDotsVal = document.getElementById('osciloCanvasDotsVal');

const drawContent = (ctx,data, color, coefBk = 1) => {
  let starting=getDisplayXY(data.values[0].X,data.values[0].Y * coefBk);
  ctx.setLineDash([]);

  if (osciloCanvasDots.checked) {
    dot(ctx,starting,dotRadius);
  }

  for(let i=1;i<=data.values.length-1;i++){
    const ending=getDisplayXY(data.values[i].X,data.values[i].Y * coefBk);
    if (osciloCanvasDotsVal.checked) {
      ctx.fillText(data.values[i-1].Y,starting.displayX, starting.displayY-5);
    }
    connector(ctx,starting,ending, color);
    if (osciloCanvasDots.checked) {
      dot(ctx,ending,dotRadius);
    }
    starting=ending;
  }
  if (osciloCanvasDotsVal.checked) {
    ctx.fillText(data.values[data.values.length-1].Y,starting.displayX-5, starting.displayY-5);
  }

};


// axes
const drawAxes = (ctx)=> {
  ctx.beginPath();
  ctx.moveTo(graphLeft,graphTop);
  ctx.lineTo(graphLeft,graphBottom);
  ctx.moveTo(graphLeft,graphBottom);
  ctx.lineTo(graphRight,graphBottom);
  ctx.strokeStyle='gray';
  ctx.stroke();
};

// scale
const drawDashedLine = (ctx,fromX, toX, fromY, toY)=> {
  ctx.beginPath();
  ctx.setLineDash([8, 4]);
  ctx.moveTo(fromX, fromY);
  ctx.lineTo(toX, toY);
  ctx.stroke();
};

const drawLine = (ctx,fromX, toX, fromY, toY)=> {
  ctx.beginPath();
  ctx.setLineDash([]);
  ctx.moveTo(fromX, fromY);
  ctx.lineTo(toX, toY);
  ctx.stroke();
};

// helper округление
function roundToMultiple(num, multiple) {
  return Math.round(num/multiple)*multiple;
}

const drawYScale = (ctx)=> {

  const maxRound10 = roundToMultiple(rangeY.max, 10);
  const minRound10 = roundToMultiple( Math.abs(rangeY.min), 10);

  const yValuePositiveGap = (maxRound10) / 5; // 5 я часть значения оси Y+
  const yValueNegativeGap = (minRound10) / 5; // 5 я часть значения оси Y-

  ctx.textAlign='right';
  ctx.textBaseline='middle';


  for (let i = rangeY.max; i >= 0 ; i-=yValuePositiveGap) {
    let scaleVal = roundToMultiple(i, 1000);
    let scaleValPosY = getDisplayXY(graphLeft-10, scaleVal).displayY;
    ctx.fillText(new Intl.NumberFormat('ru-RU').format(scaleVal),graphLeft-10,scaleValPosY);
    if ( i === 0) {
      drawLine(osCtx,graphLeft, graphRight, scaleValPosY, scaleValPosY); // сетка  X+
    } else {
      drawDashedLine(osCtx,graphLeft, graphRight, scaleValPosY, scaleValPosY); // сетка  X+
    }
  }

  for (let i = 0; i >= rangeY.min ; i-=yValueNegativeGap) {
    let scaleVal = roundToMultiple(i, 1000);
    let scaleValPosY = getDisplayXY(graphLeft-10, scaleVal).displayY;
    ctx.fillText(new Intl.NumberFormat('ru-RU').format(scaleVal),graphLeft-10,scaleValPosY);
    if ( i === 0) {
      drawLine(osCtx,graphLeft, graphRight, scaleValPosY, scaleValPosY); // сетка  X+
    }else {
      drawDashedLine(osCtx,graphLeft, graphRight, scaleValPosY, scaleValPosY); // сетка  X+
    }
  }
};

const drawXScale = (ctx)=> {
  ctx.textAlign='center';

  for (let i = rangeX.min; i <= rangeX.max; i++) {

    if (i/5 % 1 === 0 ) { // 200 мс
      let scaleValPosX = getDisplayXY(i,graphBottom + 10).displayX;
      ctx.fillText(i/5 ,scaleValPosX, graphBottom + 10);

      if (i !== 0) {
        drawDashedLine(ctx, scaleValPosX, scaleValPosX, graphBottom, graphTop); // сетка   Y
      }
      ctx.setLineDash([]);
    }
  }
};

// clear
const clearCanvas = (ctx, canvas)=> { ctx.clearRect(0, 0, canvas.width, canvas.height);};


const drawOscilloCanvas = (ctx)=> {
  
  clearCanvas(ctx, oscilloCanvas);
  ctx.lineWidth = 1;
  drawAxes(ctx);
  drawXScale(ctx);
  drawYScale(ctx);
};

const oscilloInitrender = (ctx)=> {
  drawOscilloCanvas(ctx);
  drawContent(ctx,osData.a, 'red');
  drawContent(ctx,osData.b, 'blue');
  drawContent(ctx,osData.c, 'green');
  drawContent(ctx,osData.bk, 'purple', rangeY.max / 2);
};

document.getElementById('oscillograms-tab').addEventListener('click', ()=> {
  oscilloInitrender(osCtx);
});
oscilloViewbtn.addEventListener('click', ()=> {
  oscilloInitrender(osCtx);
});
const osciloCanvasRegim = document.getElementById('osciloCanvasRegim');

const chooseOsciloCanvasRegim = (val)=> {
  switch(val) {
  case 'a':
    rangeY=calcSourceMinMax('Y',osData.a.values);
    rangeX=calcSourceMinMax('X',osData.a.values);
    drawOscilloCanvas(osCtx);
    drawContent(osCtx,osData.a, 'red');
    drawContent(osCtx,osData.bk, 'purple', rangeY.max / 2);
    break;
  case 'b':
    rangeY=calcSourceMinMax('Y',osData.b.values);
    rangeX=calcSourceMinMax('X',osData.b.values);
    drawOscilloCanvas(osCtx);
    drawContent(osCtx,osData.b, 'blue');
    drawContent(osCtx,osData.bk, 'purple', rangeY.max / 2);
    break;
  case 'c':
    rangeY=calcSourceMinMax('Y',osData.c.values);
    rangeX=calcSourceMinMax('X',osData.c.values);
    drawOscilloCanvas(osCtx);
    drawContent(osCtx,osData.c, 'green');
    drawContent(osCtx,osData.bk, 'purple', rangeY.max / 2);
    break;
  default:
    rangeY=calcSourceMinMax('Y',osData.a.values,osData.b.values, osData.c.values);
    rangeX=calcSourceMinMax('X',osData.a.values,osData.b.values, osData.c.values);
    drawOscilloCanvas(osCtx);
    drawContent(osCtx,osData.a, 'red');
    drawContent(osCtx,osData.b, 'blue');
    drawContent(osCtx,osData.c, 'green');
    drawContent(osCtx,osData.bk, 'purple', rangeY.max / 2);

  }
};
osciloCanvasRegim.addEventListener('change', (e) => {

  drawOscilloCanvas(osCtx);
  chooseOsciloCanvasRegim(e.target.value);
});

osciloCanvasDots.addEventListener('change',()=> {
  drawOscilloCanvas(osCtx);
  chooseOsciloCanvasRegim(osciloCanvasRegim.value);
});

osciloCanvasDotsVal.addEventListener('change',()=> {
  drawOscilloCanvas(osCtx);
  chooseOsciloCanvasRegim(osciloCanvasRegim.value);
});


// measurementsDB-tab
const measurmentsDBTabs = document.querySelector('.measurmentsDB-tabs');
const measurmentDBTab = document.querySelectorAll('.measurmentDB-tab');
const measurmentsDBContent = document.querySelectorAll('.measurmentsDB-content');
measurmentsDBTabs.addEventListener('click', (e) => tabsSwitcher(e, measurmentDBTab, measurmentsDBContent));
// TrendsCanvas
let trendsCanvas = document.getElementById('trendsCanvas');
let trCtx = trendsCanvas.getContext("2d");

let trData = {
  a: {
    values: [
      { X: 0, Y: 0 },
      { X: 1, Y: 9 },
      { X: 2, Y: 2.20 },
      { X: 3, Y: 4 }, ],
    dates: [
      '11.11.1111 01:01:01.1111',
      '22.22.2222 02:02:02.2222',
      '33.33.3333 03:03:03.3333',
      '44.44.4444 44:44:44.4444'],
  },
  b: {values: [
    { X: 1, Y: 4.20 },
    { X: 2, Y: 1.2 },
  ]},
  c: {values: [
    { X: 1, Y: 3.20 },
    { X: 2, Y: 1 },
  ]}
};

let trRangeY=calcSourceMinMax('Y',trData.a.values,trData.b.values,trData.c.values);
let trRangeX=calcSourceMinMax('X',trData.a.values,trData.b.values,trData.c.values);

const trPadding = {y:100};

const trGraph = {
  Left:padding.x,
  Rigth:trendsCanvas.width-padding.x,
  Top: padding.y,
  Bottom: trendsCanvas.height-trPadding.y,
};

const drawTrAxes = (ctx, graph)=> {
  ctx.beginPath();
  ctx.moveTo(graph.Left,graph.Top);
  ctx.lineTo(graph.Left,graph.Bottom);
  ctx.moveTo(graph.Left,graph.Bottom);
  ctx.lineTo(graph.Rigth,graph.Bottom);
  ctx.strokeStyle='gray';
  ctx.stroke();
};

function getTrDisplayXY(valueX,valueY){
  const x = mapRange(valueX,trRangeX.min,trRangeX.max,trGraph.Left,trGraph.Rigth);
  const y = mapRange(valueY,trRangeY.min,trRangeY.max,trGraph.Bottom,trGraph.Top);
  return({displayX:x,displayY:y});
}

const trCanvasDots = document.getElementById('trCanvasDots');
const trCanvasDotsVal = document.getElementById('trCanvasDotsVal');
const trCanvasDates = document.getElementById('trCanvasDates');


const drawTrContent = (ctx,data, color) => {
  let starting=getTrDisplayXY(data.values[0].X,data.values[0].Y);
  ctx.setLineDash([]);

  if (trCanvasDots.checked) {
    dot(ctx,starting,dotRadius);
  }
  
  for(let i=1;i<=data.values.length-1;i++){
    const ending=getTrDisplayXY(data.values[i].X,data.values[i].Y);
    if (trCanvasDotsVal.checked) {
      ctx.fillText(data.values[i-1].Y,starting.displayX, starting.displayY-5);
    }
    
    connector(ctx,starting,ending, color);
    if (trCanvasDots.checked) {
      dot(ctx,ending,dotRadius);
    }

    starting=ending;
  }
  if (trCanvasDotsVal.checked) {
    ctx.fillText(data.values[data.values.length-1].Y,starting.displayX, starting.displayY-5);
  }
};

const drawTrYScale = () => {
  const maxRound = Math.ceil(trRangeY.max);
  const yValueGap = maxRound / 5;

  trCtx.textAlign='right';
  trCtx.textBaseline='middle';

  for (let i = trRangeY.max; i >= 0 ; i-=yValueGap) {
    let scaleVal = Math.ceil(i);
    let scaleValPosY = getTrDisplayXY(trGraph.Left-10, scaleVal).displayY;
    trCtx.fillText(scaleVal,trGraph.Left-10,scaleValPosY);
    
    drawDashedLine(trCtx,trGraph.Left, trGraph.Rigth, scaleValPosY, scaleValPosY); // сетка  X+
  }
};

const drawTrXScale = (ctx)=> {
  ctx.textAlign='center';

  for (let i = trRangeX.min; i <= trRangeX.max; i++) {
 
    let scaleValPosX = getTrDisplayXY(i,trGraph.Bottom + 10).displayX;
  
    if (trCanvasDates.checked) {
      // ctx.save();
      // ctx.rotate(90*Math.PI/ 180);
      // ctx.translate(-30, -400);
      ctx.fillText(trData.a.dates[i] ,scaleValPosX, trGraph.Bottom + 10);
      // ctx.restore();
    } else {
      ctx.fillText(i ,scaleValPosX, trGraph.Bottom + 10);
    }
   
    
    if (i !== 0 ) {
      drawDashedLine(ctx, scaleValPosX, scaleValPosX, trGraph.Bottom, trGraph.Top); // сетка   Y
    }
    ctx.setLineDash([]);
    
  }
};

drawTrAxes(trCtx, trGraph);
drawTrYScale();
drawTrXScale(trCtx);
drawTrContent(trCtx,trData.a, 'red');
drawTrContent(trCtx,trData.b, 'blue');

const drawTrCanvas = () => {
  clearCanvas(trCtx, trendsCanvas);
  trCtx.lineWidth = 1;
  drawTrAxes(trCtx, trGraph);
  drawTrYScale();
  drawTrXScale(trCtx);
};
const trendsCanvasPhaseA = document.getElementById('trendsCanvasPhaseA');
const trendsCanvasPhaseB = document.getElementById('trendsCanvasPhaseB');
const trendsCanvasPhaseC = document.getElementById('trendsCanvasPhaseC');


const trendsCanvasRegim = document.getElementById('trendsCanvasRegim');
trendsCanvasRegim.addEventListener('change', ()=> {
  let a = trendsCanvasPhaseA.checked;
  let b = trendsCanvasPhaseB.checked;
  let c = trendsCanvasPhaseC.checked;
  if (a){
    console.log(1);
  }
  
});

const trendsInitRender = ()=> {
  drawTrContent(trCtx,trData.a, 'red');
  drawTrContent(trCtx,trData.b, 'blue');
};

trCanvasDates.addEventListener('change',()=> {
  drawTrCanvas();
  trendsInitRender();
  // + дата режим
});

trCanvasDotsVal.addEventListener('change',()=> {
  drawTrCanvas();
  trendsInitRender();
  // + дата режим
});
trCanvasDots.addEventListener('change',()=> {
  drawTrCanvas();
  trendsInitRender();
  // + дата режим
});




// eventsDB
// oscilogramsDB
// configyration-tab
const configurationTabs = document.querySelector('.configuration-tabs');
const configurationTab = document.querySelectorAll('.configuration-tab');
const configurationContent = document.querySelectorAll('.configuration-content');
configurationTabs.addEventListener('click', (e) => tabsSwitcher(e, configurationTab, configurationContent));

function addZero(value) {
  if (value < 10) {
    // eslint-disable-next-line no-param-reassign
    value = '0' + value;
  }
  return value;
}

function pcTime() {
  const currentDatetime = new Date();
  const day = addZero(currentDatetime.getDate());
  const month = addZero(currentDatetime.getMonth() + 1);
  const year = currentDatetime.getFullYear();
  const hours = addZero(currentDatetime.getHours());
  const minutes = addZero(currentDatetime.getMinutes());
  const seconds = addZero(currentDatetime.getSeconds());

  return {day, month, year, hours, minutes, seconds};
}
setInterval(() => {
  document.getElementById('current_date_time_block').innerHTML = `
  ${pcTime().day}.${pcTime().month}.${pcTime().year}
  ${pcTime().hours}:${pcTime().minutes}:${pcTime().seconds}`;
}, 1000);

const setHadleTimeInput = ()=> {
  document.getElementById('handleDay').value = pcTime().day;
  document.getElementById('handleMounth').value = pcTime().month;
  document.getElementById('handleYear').value = pcTime().year;
  document.getElementById('handleHour').value = pcTime().hours;
  document.getElementById('handleMin').value = pcTime().minutes;
};
setHadleTimeInput();

setInterval(()=>setHadleTimeInput(),30000);


// modal
const modal = document.getElementById("myModal");
const modalBtn = document.getElementById("modalBtn");
const closeModal = document.getElementsByClassName("close")[0];

closeModal.onclick = () => {modal.style.display = "none";};

// window.onclick = (event)=> { // закрыть модалльное окно при клике вне окна
//   if (event.target === modal) {
//     modal.style.display = "none";
//   }
// };
const setModalContent = (HTMLcontent) => {
  const modalContent = document.querySelector('.modal-content');
  modalContent.removeChild(modalContent.children[1]); // удалить предидущее сообщение об ошибке
  modalContent.insertAdjacentHTML('beforeend', HTMLcontent);
  modal.style.display = "block";
};

// сигнализации
// status alarm
const statusAlarmSignal = (status) => {
  const statusAlarm = document.querySelector('.status-alarm');
  statusAlarm.classList.remove('d-none');
  // statusAlarm.classList.add('blink');
  if (status === 'warning') {
    statusAlarm.textContent = 'Внимание';
    statusAlarm.classList.add('warning-signal', 'blink');
    document.querySelector('.warnong-signal').classList.add('blink');
  } else {
    statusAlarm.textContent = 'Авария';
    statusAlarm.classList.add('accident-signal', 'blink');
    document.querySelector('.accident-signal').classList.add('blink');
  }
};


const accidentModal = () => {
  const HTMLcontent = `<p class="tac my-5">Произошло срабатывание сигнализации. <br/> Для просмотра более подробной информации нажмите на индикатор "Авария" в Главном окне</p>`;
  setModalContent(HTMLcontent);

  statusAlarmSignal('warning');
};

// accidentModal(); // сигнализация события
const generalAlarm = () => {
  const HTMLcontent = ` <div class="mt-4">
  <h3 class="tac my-3">Общая сигнализация</h3>
    <div class="row card">
      <h4 class="mb-3 tac">События</h4>
      <div class="row card flex-row">
        <div class="col-4 mt-2 me-4">
          <div > <input type="checkbox" name="" id="">  Собственное время отключения </div>
          <div class="mt-1"> <input type="checkbox" name="" id="">  Полное время отключения</div>
          <div class="mt-1"> <input type="checkbox" name="" id="">  Собственное время включения</div>
          <div class="mt-1"> <input type="checkbox" name="" id="">  Время включения </div>
        </div>
        <div class="col mt-2 ms-2">
          <div > <input type="checkbox" name="" id=""> Невыполненная команда на соленоид отключения 1</div>
          <div class="mt-1"> <input type="checkbox" name="" id=""> Невыполненная команда на соленоид отключения 2</div>
          <div class="mt-1"> <input type="checkbox" name="" id=""> Невыполненная команда на соленоид включения</div>
        </div>
      </div>
      <div class="row mt-2">
        <div class="col card">
          <h4 class="mb-2">Колличество операций</h4>
          <div> <input type="checkbox" name="" id="">  Внимание </div>
          <div class="mt-1"> <input type="checkbox" name="" id="">  Авария</div>
        </div>
        <div class="col-4 card ms-2">
          <h4 class="mb-2">Неполнофазный режим работы</h4>
          <div> <input type="checkbox" name="" id="">  Авария</div>
        </div>
        <div class="col ">
          <div class="tac"> <button class="mt-4 ">  Сброс сигналов событий</button></div>
        </div>
      </div>
    </div>
      <h3 class="tac my-3">Cигнализация измерений</h3>
      <div class="row card flex-row mt-2 justify-content-evenly">
        <div class="col card">
          <h3 class="mb-2 tac">Фаза А</h3>
          <div class="row">
            <h4 class="my-3">Износ контактов </h4>
          </div>
          <div class="row">
            <div class="col"> <input type="checkbox" name="" id="">Внимание </div>
            <div class="col"> <input type="checkbox" name="" id="">Авария</div>
          </div>
          <hr class="mt-3">
          <h4 class="my-3">События </h4>
          <div > <input type="checkbox" name="" id="">Время горения дуги</div>
          <div class="mt-1"> <input type="checkbox" name="" id="">Повторное зажигание дуги</div>
        </div>
      <div class="col card mx-2">
        <h3 class="mb-2 tac">Фаза B</h3>
        <div class="row">
          <h4 class="my-3">Износ контактов </h4>
        </div>
        <div class="row">
          <div class="col"> <input type="checkbox" name="" id="">Внимание </div>
          <div class="col"> <input type="checkbox" name="" id="">Авария</div>
        </div>
        <hr class="mt-3">
        <h4 class="my-3">События </h4>
        <div > <input type="checkbox" name="" id="">Время горения дуги</div>
        <div class="mt-1"> <input type="checkbox" name="" id="">Повторное зажигание дуги</div>
      </div>
      <div class="col card">
        <h3 class="mb-2 tac">Фаза C</h3>
        <div class="row">
          <h4 class="my-3">Износ контактов </h4>
        </div>
        <div class="row">
          <div class="col"> <input type="checkbox" name="" id="">Внимание </div>
          <div class="col"> <input type="checkbox" name="" id="">Авария</div>
        </div>
        <hr class="mt-3">
        <h4 class="my-3">События </h4>
        <div > <input type="checkbox" name="" id="">Время горения дуги</div>
        <div class="mt-1"> <input type="checkbox" name="" id="">Повторное зажигание дуги</div>
      </div>
    </div>
  </div>
  `;
  setModalContent(HTMLcontent);
  statusAlarmSignal('accident');
};

// generalAlarm(); // основная сигнализация

const selfDiagnosisAlarm = () => {
  const HTMLcontent = `<div class="mt-4">
    <div class="row justify-content-center card">
      <div class="col ms-5">
        <div><input type="checkbox" name="" id="">Неисправность внутренней FLASH-памяти</div>
        <div class="mt-2 "><input type="checkbox" name="" id="">Неисправность внутренней SRAM-памяти</div>
        <div class="mt-2"><input type="checkbox" name="" id="">Неисправность АЦП</div>
        <div class="mt-2"><input type="checkbox" name="" id="">Ошибка считывания FRAM (энергозависимых данных). Приняты данные по умолчанию</div>
        </div>
      </div>
    </div>
    </div>`;
  setModalContent(HTMLcontent);
  document.querySelector('.self-diagnosis-signal').classList.add('blink');

};
// selfDiagnosisAlarm(); // вызов самодиагностики

document.getElementById('statusAlarm').addEventListener('click', ()=>statusAlarmSignal(''));
document.getElementById('accidentAlarm').addEventListener('click', ()=>accidentModal());
document.getElementById('generalAlarm').addEventListener('click', ()=>generalAlarm());
document.getElementById('selfDiagnosislAlarm').addEventListener('click', ()=>selfDiagnosisAlarm());

// servise
const serviceModal = () => {
  const serviceModalContent = document.getElementById('serviceModalContent');
  serviceModalContent.style.display = "block";
  document.getElementById('serviceClose').addEventListener('click', ()=> {
    serviceModalContent.style.display = "none";
  });
};

document.getElementById('serviceModal').addEventListener('click', ()=> serviceModal());


// cmd btns
const resetEventsJournal = document.getElementById('0x100');
const resetMeassurmentsJournal = document.getElementById('0x101');
const resetOscillogramms = document.getElementById('0x102');
const resetAccumulatedMeasurements = document.getElementById('0x103');
const setDefaultConfiguration = document.getElementById('0x104');
const calibrationFor1000 = document.getElementById('0x10A');
const calibrationFor10000 = document.getElementById('0x10B');
const setAlarm = document.getElementById('0x10C');
const resetAlarm = document.getElementById('0x10D');
// cmd btns with arg
const setPhaseAWear = document.getElementById('0x105');
const setPhaseBWear = document.getElementById('0x106');
const setPhaseCWear = document.getElementById('0x107');
const setNumberOfTurns = document.getElementById('0x108');
const setNumberOfShutdowns = document.getElementById('0x109');


const sendCommand = (e)=> {
  const code = e.target.id;
  console.log('code ', code);
  send(1, 551, code);
  send(1, 550, code);
};

const sendCommandWithArg = (e)=> {
  const code = e.target.id;

  const val = document.querySelector(`[data-id='${code}']`).value;
  console.log('code arg', code);
  console.log('val arg', val);
  send(1, 551, code);
  send(1, 550, val);
};

const comandBtns = [resetEventsJournal, resetMeassurmentsJournal,resetOscillogramms, setDefaultConfiguration, resetAccumulatedMeasurements, calibrationFor1000, calibrationFor10000, setAlarm, resetAlarm];

const comandBtnsWithArg = [setPhaseAWear, setPhaseBWear, setPhaseCWear, setNumberOfTurns, setNumberOfShutdowns];

comandBtns.forEach(btn => btn.addEventListener('click', (e)=> sendCommand(e)));

comandBtnsWithArg.forEach(btn => btn.addEventListener('click', (e)=> sendCommandWithArg(e)));


// data

// helpers func
const findReg = (regStr) => document.getElementById(`${regStr}`);
const findRegDataId = (regStr) => document.querySelectorAll(`[data-id='${regStr}']`);


const isEmpty = (obj)=> !Object.values(obj).some(x => x !== null && x !== '');

let view474475 = new DataView(new ArrayBuffer(4));
let view477478 = new DataView(new ArrayBuffer(4));

let firmwareStr = '';
let oscilloNumSum = 0;


function dbg_out(s){console.log(s);}

const socket = new WebSocket("ws://127.0.0.1:8080", 76);

function send(operation, register, value){
  let sendArray = new Uint16Array(64);

  sendArray[0] = operation;
  sendArray[1] = register;
  sendArray[2] = value;

  if (socket)
    if (socket.readyState === 1)
      socket.send(sendArray);
}

socket.onopen = (e)=>{

  console.log('o');
  send(0, 10, 0);
  send(0, 11, 0);
  send(0, 12, 0);

};


let upload_pointer = 0;
let firmware_array = 0;

const regArrayToSetValuesInSpan = [
  '10', '11', '12', // test date
  '0000','0001', '0002', '0003', //  конфиг
  '0010', '0011', '0012', '0013', '0014', '0015', //  время в конфиг
  '0109', '0110', '0012', '0014', '0016', // главное окно. выключатель, фазы
  '0251', '0252','0253', '0254', '0255', '0256', '0257', // гл. окно. время последней коммутации
  '0258', '0260', '0261', '0262','0263','0264','0265','0266','0267', // гл. окно. данные последней коммутации
  '414','415', // конфиг 
];

const regArrayToSetValuesInSpanDataId = [ // встречается дважды id атрибут
  '0200', // записи в журнале измерений
  '0300' // записи в журнале событий
]; 

const regArrayToSetValuesInInput = [
  410, 411, 413, 432, 433, 434, 435, 442, 443, 444, 445, 446, 447,
  448, 449, 450, 451, 452, 453, // service
  454, 455, 456, 457, 458, 459, 460, 461, 462, 467, 468, 471, 473, 476, // configuration control
];
const regArrayToSetValuesTo32 = [474,475];
const regToFirmwareArray = [
  484,485,486,487 ,488 ,489 ,490 ,491 ,492 ,493 ,494 
  ,495 ,496 ,497 ,498 ,499 ,500 ,501 ,502 ,503 ,504 ,
  505 ,506 ,507 ,508 ,509,510 ,511 ,512 ,513 ,514 ,515 
  ,516 ,517 ,518 ,519]; 

const regArrayToSetValuesIfElse = [
  '0111', '0259',
];

const regArrayToSetValuesWithCoefficent = [
  '0113', '0115', '0117', //   расход ресурса фаз в %
];


const measurementsJournal = ['0201','0204','0206', '0207','0208','0209','0210','0211','0212','0213','0214','0215','0216','0217','0218','0219','0220','0221','0222','0223','0224','0225','0226','0227','0228'];

const eventsJournal = ['0301','0303','0304','0305','0306','0307','0308','0309','0310','0311'];

const oscilloPhaseASign = [1, 5, 9, 13, 17, 21, 25, 29, 33, 37, 41, 45, 49, 53, 57, 61, 65, 69, 73, 77, 81, 85, 89, 93, 97];

const oscilloPhaseCSign = [3, 7, 11, 15, 19, 23, 27, 31, 35, 39, 43, 47, 51, 55, 59, 63, 67, 71, 75, 79, 83, 87, 91, 95, 99];

const oscillosJournal = ['0600', '0601' ];

const osciloCurrentInfo = ['0602', '0603', '0605', '0606','0607','0608','0609','0610','0611','0612'];

function recv(data){
  const r = new FileReader();
  r.onload = ()=> {
    let int16_array = new Uint16Array(r.result);
    let register = int16_array[1];
    let value = int16_array[2];

    console.log(register);

    if (regArrayToSetValuesInSpan.includes(`${register}`)) {
      findReg(`${register}`).textContent = value;
    }

    if (regArrayToSetValuesInSpanDataId.includes(`${register}`)) {
      [...findRegDataId(`${register}`)].forEach(t=> {t.textContent = value;});
    }

    if (register === '0111' && value === 1) {
      findReg(`${register}`).textContent = 'Включено';
    }
    if (register === '0111' && value === 2) {
      findReg(`${register}`).textContent = 'Отключено';
    }

    if (register === '0113' ||register === '0115' || register ==='0017') { //  износ ресурса фаз
      findReg(`${register}`).textContent = (value * 0.01).toFixed(2);
    }

    if (register === '0259' && value === 1) {
      findReg(`${register}`).textContent = 'ВКЛ.';
    }
    if (register === '0259' && value === 2) {
      findReg(`${register}`).textContent = 'ОТКЛ.';
    }

    if (eventsJournal.includes(register)) {
      eventsTableCurrentObj[`${register}`] = value;
      if(!isEmpty(eventsTableCurrentObj)) {
        addCurrentEntryToEventsTable();
      }
    }

    if (measurementsJournal.includes(register)) {
      measurmentsTableCurrentObj[`${register}`] = value;
      if(!isEmpty(measurmentsTableCurrentObj)) {
        addCurrentEntryToEventsTable();
      }
    }

    if (regArrayToSetValuesTo32.includes(register)) {
      if (register === 474) {view474475.setInt16(0, value, false); }
      if (register === 475) {
        view474475.setInt16(2, value, false);
        findReg('474-475').value = view474475.getFloat32(0, false);
      }

      if (register === 477) {view477478.setInt16(0, value, false); }
      if (register === 478) {
        view477478.setInt16(2, value, false);
        findReg('477-478').value = view477478.getFloat32(0, false);
      }
    }

    if (regToFirmwareArray.includes(register)) {
      firmwareStr += value;
      document.getElementById('484-519').textContent = firmwareStr;
    }
    if (register === '0600' || register === '0601' ) { // число осцилограмм
      oscilloNumSum += value;
      findReg("600-601").textContent = oscilloNumSum; }
    if (osciloCurrentInfo.includes(register)) {
      osData.info.push({register:value}); 
    }

    if (register >= 613 && register <= 4616) {

      if ( oscilloPhaseASign.includes(Number(value.toString().slice(-2))) )
        osData.a.values.push({x:osData.a.values.length, y: value});
      
      if(register%2 === 0 && register%4 !== 0) {
        osData.b.values.push({x:osData.b.values.length, y: value});
      }
          
      if ( oscilloPhaseCSign.includes(Number(value.toString().slice(-2))) )
        osData.c.values.push({x:osData.c.values.length, y: value});
      
      if (register%4 === 0) {
        osData.bk.values.push({x:osData.bk.values.length, y: value});
      }
    } 
    
    // if (register === 474) {findReg("0011").textContent = value; }
    // if (register === 12) {findReg("0012").textContent = value; }


    if (int16_array[1] === 398)// #define FIRMWARE_UPLOAD 398
    {
      // eslint-disable-next-line no-bitwise
      upload_pointer = int16_array[2] + (int16_array[3] << 16);

      if (upload_pointer < 0x10000) {// #define FIRMWARE_SIZE 0x10000
        if (socket)
          if (socket.readyState === 1)
            socket.send(firmware_array.subarray(upload_pointer, upload_pointer + 512));
      }
      else
        upload_pointer = 0;
    }
  };
  r.readAsArrayBuffer(data);

}

socket.onmessage = (e)=>{recv(e.data);};
socket.onclose = (e)=>{if (e.wasClean){dbg_out("Соединение закрыто нормально");}else{dbg_out("Соединение закрыто экстренно");}};
socket.onerror = (e)=>{dbg_out("Ошибка соединения: " + e.message);};


const fff = ()=> {
  for (let i=10; i <= 12; i++) {
    send (0, i, 0);
  }
};



const script = document.getElementById('script');
script.onload = ()=> {
  // send(0, 10, 0);
  // send(0, 11, 0);
  // send(0, 12, 0);
  fff();
};


function setDate(){
  send(0, 10, 0);
  send(0, 11, 0);
  send(0, 12, 0);
}

document.getElementById('setDate').addEventListener('click', setDate);


function read_file(inp){
  const f = inp.files[0];
  const r = new FileReader();

  r.onload = ()=> {
    let data_array = new Uint8Array(r.result);
    let firmwareArray = new Uint8Array(0x10000).fill(0xFF, 0, 0x10000);// #define FIRMWARE_SIZE 0x10000
    firmwareArray.set(data_array);

    let int8_array = new Uint8Array(512).fill(0, 0, 512);

    for (let i = 0; i < f.name.length; i++)
      int8_array[i] = f.name.charCodeAt(i);

    if (socket)
      if (socket.readyState === 1)
        socket.send(int8_array);
  };

  r.readAsArrayBuffer(f);
}


// function d2h(d) { return (+d).toString(16).toUpperCase(); }
// function h2d(h) { return (+d).toString(16).toUpperCase(); }


// console.log(d2h(29));


// console.log('hexString', (251).toString(16));
// console.log('hex2dec',parseInt(101, 16));



const file = document.getElementById('file');
file.addEventListener('change', ()=> {
  read_file(this);
});
