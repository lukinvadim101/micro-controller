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

// measurments tab
const measurmentsTabs = document.querySelector('.measurments-tabs');
const measurmentTab = document.querySelectorAll('.measurment-tab');
const measurmentsContent = document.querySelectorAll('.measurments-content');
const measurementsAllTab = document.querySelector('#measurements-all');
const measurementsSwitchTab = document.querySelector('#measurements-switch');
measurmentsTabs.addEventListener('click', (e) => tabsSwitcher(e, measurmentTab, measurmentsContent));

// генерировать таблицы измерений
measurementsAllTab.insertAdjacentHTML("afterbegin", `
<table class="mt-4">
  <thead>
    <th>все записи</th>
  </thead>
  <tbody>
    <tr>
      <td>111</td>
    </tr>
  </tbody>
</table>`);

measurementsSwitchTab.insertAdjacentHTML("afterbegin", `
<table class="mt-4">
  <thead>
    <th>записи переключений</th>
  </thead>
  <tbody>
    <tr>
      <td>222</td>
    </tr>
  </tbody>
</table>`);

// events tab

const eventsTable = document.querySelector('#events-all');

eventsTable.insertAdjacentHTML("afterbegin", `
<table class="mt-4">
  <thead>
    <th>записи событий</th>
  </thead>
  <tbody>
    <tr>
      <td>333</td>
    </tr>
  </tbody>
</table>`);

// oscillograms tab
const oscillogramsTabs = document.querySelector('.oscillograms-tabs');
const oscillogramTab = document.querySelectorAll('.oscillograms-tab');
const oscillogramsContent = document.querySelectorAll('.oscillograms-content');
oscillogramsTabs.addEventListener('click', (e) => tabsSwitcher(e, oscillogramTab, oscillogramsContent));

// oscillogram Canvas
let oscilloCanvas=document.getElementById("oscilloCanvas");
let ctx=oscilloCanvas.getContext("2d");
oscilloCanvas.width = document.querySelector('#oscilloCanvasContainer').offsetWidth - 150;
oscilloCanvas.height = document.querySelector('#oscilloCanvasContainer').offsetHeight;;

const padding = {x: 60, y: 20};
const dotRadius = 2;

const aData = { values:[
  { X: 0, Y: 140000 },
  { X: 1, Y: 0 },
  { X: 2, Y: -20000 },
  { X: 3, Y: 28000 },
  { X: 4, Y: 10034 },
  { X: 5, Y: 14000 },
  { X: 6, Y: 82000 },
  { X: 7, Y: 82000 },
  { X: 8, Y: 140000 },
  { X: 9, Y: 0 },
  { X: 10, Y: -20000 },
  { X: 11, Y: 28000 },
  { X: 12, Y: 10034 },
  { X: 13, Y: 14000 },
  { X: 14, Y: 82000 },
  { X: 15, Y: 82000 },
  { X: 16, Y: 140000 },
  { X: 17, Y: 0 },
  { X: 18, Y: -20000 },
  { X: 19, Y: 28000 },
  { X: 20, Y: 10034 },
  { X: 21, Y: 14000 },
  { X: 22, Y: 82000 },
  { X: 23, Y: 82000 },
]};

const bData = { values:[
  { X: 0, Y: -30000 },
  { X: 1, Y: -110500 },
  { X: 2, Y: 27000 },
  { X: 3, Y: 1034 },
  { X: 4, Y: 14000 },
  { X: 5, Y: 2000 },
]};

const cData = { values:[
  { X: 0, Y: -30000 },
  { X: 1, Y: -110000 },
  { X: 2, Y: 22000 },
  { X: 3, Y: 1034 },
  { X: 4, Y: 14000 },
  { X: 5, Y: 151320 },
  { X: 6, Y: 22000 },
]};


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

let rangeY=calcSourceMinMax('Y',aData.values,bData.values, cData.values);
let rangeX=calcSourceMinMax('X',aData.values,bData.values, cData.values);


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

function connector(starting,ending,color){
  ctx.beginPath();
  ctx.lineWidth = 2;
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

const osciloCanvasDots = document.getElementById('osciloCanvasDots');
const osciloCanvasDotsVal = document.getElementById('osciloCanvasDotsVal');

const drawContent = (data, color) => {
  let starting=getDisplayXY(data.values[0].X,data.values[0].Y);
 
  ctx.setLineDash([]);
 
  for(let i=1;i<=data.values.length -1;i++){
    const ending=getDisplayXY(data.values[i].X,data.values[i].Y);
    if (osciloCanvasDotsVal.checked) {
      ctx.fillText(data.values[i-1].Y,starting.displayX, starting.displayY-5);
    }   
    connector(starting,ending, color);
    if (osciloCanvasDots.checked) {
      dot(ending,dotRadius);
    }
    starting=ending;
  }
  if (osciloCanvasDotsVal.checked) {
    ctx.fillText(data.values[data.values.length-1].Y,starting.displayX-5, starting.displayY-5);
  }

};


const y0=getDisplayXY(graphLeft,0).displayY;

// axes
const drawAxes = ()=> {
  oscilloCanvas.width = document.querySelector('#oscilloCanvasContainer').offsetWidth - 150;
  oscilloCanvas.height = document.querySelector('#oscilloCanvasContainer').offsetHeight;
  ctx.beginPath();
  ctx.moveTo(graphLeft,graphTop);
  ctx.lineTo(graphLeft,graphBottom);
  ctx.moveTo(graphLeft,graphBottom);
  ctx.lineTo(graphRight,graphBottom);
  ctx.strokeStyle='gray';
  ctx.stroke();
};

// scale
const drawDashedLine = (fromX, toX, fromY, toY)=> {
  ctx.beginPath();
  ctx.setLineDash([8, 4]);
  ctx.moveTo(fromX, fromY);
  ctx.lineTo(toX, toY);
  ctx.stroke();
};

const drawLine = (fromX, toX, fromY, toY)=> {
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

const drawYScale = ()=> {

  const maxRound1000 = roundToMultiple(rangeY.max, 10);
  const minRound1000 = roundToMultiple( Math.abs(rangeY.min), 10);

  const yValuePositiveGap = (maxRound1000) / 5; // 5 я часть значения оси Y+
  const yValueNegativeGap = (minRound1000) / 5; // 5 я часть значения оси Y-

  ctx.textAlign='right';
  ctx.textBaseline='middle';

   
  for (let i = rangeY.max; i >= 0 ; i-=yValuePositiveGap) {
    let scaleVal = roundToMultiple(i, 1000);
    let scaleValPosY = getDisplayXY(graphLeft-10, scaleVal).displayY;
    ctx.fillText(new Intl.NumberFormat('ru-RU').format(scaleVal),graphLeft-10,scaleValPosY);
    if ( i === 0) {
      drawLine(graphLeft, graphRight, scaleValPosY, scaleValPosY); // сетка  X+
    } else {
      drawDashedLine(graphLeft, graphRight, scaleValPosY, scaleValPosY); // сетка  X+
    }
  }
  
  for (let i = 0; i >= rangeY.min ; i-=yValueNegativeGap) {
    let scaleVal = roundToMultiple(i, 1000);
    let scaleValPosY = getDisplayXY(graphLeft-10, scaleVal).displayY;
    ctx.fillText(new Intl.NumberFormat('ru-RU').format(scaleVal),graphLeft-10,scaleValPosY);
    if ( i=== 0) {
      drawLine(graphLeft, graphRight, scaleValPosY, scaleValPosY); // сетка  X+
    }else {
      drawDashedLine(graphLeft, graphRight, scaleValPosY, scaleValPosY); // сетка  X+
    }
  }
};

const drawXScale = ()=> {
  ctx.textAlign='center';
    
  for (let i = rangeX.min; i <= rangeX.max; i++) {

    if (i/5 % 1 === 0 ) { // 200 мс 
      let scaleValPosX = getDisplayXY(i,graphBottom + 10).displayX;
      ctx.fillText(i/5 ,scaleValPosX, graphBottom + 10);

      if (i !== 0) {
        drawDashedLine( scaleValPosX, scaleValPosX, graphBottom, graphTop); // сетка   Y
      }
      ctx.setLineDash([]);
    }
  }
};

// clear
const clearCanvas = (ctx, canvas)=> { ctx.clearRect(0, 0, canvas.width, canvas.height);};

const drawOscilloCanvas = ()=> {
  clearCanvas(ctx, oscilloCanvas);
  ctx.lineWidth = 1;
  
  drawAxes();  
  drawXScale();
  drawYScale();
};

drawOscilloCanvas();
drawContent(aData, 'red');
drawContent(bData, 'blue');
drawContent(cData, 'green');

const osciloCanvasRegim = document.getElementById('osciloCanvasRegim');

const chooseOsciloCanvasRegim = (val)=> {
  switch(val) {
  case 'a':
    rangeY=calcSourceMinMax('Y',aData.values);
    rangeX=calcSourceMinMax('X',aData.values);
    drawOscilloCanvas();
    drawContent(aData, 'red');
    break;
  case 'b':
    rangeY=calcSourceMinMax('Y',bData.values);
    rangeX=calcSourceMinMax('X',bData.values);
    drawOscilloCanvas();
    drawContent(bData, 'blue');
    break;
  case 'c':
    rangeY=calcSourceMinMax('Y',cData.values);
    rangeX=calcSourceMinMax('X',cData.values);
    drawOscilloCanvas();
    drawContent(cData, 'green');
    break;
  default:
    rangeY=calcSourceMinMax('Y',aData.values,bData.values, cData.values);
    rangeX=calcSourceMinMax('X',aData.values,bData.values, cData.values);
    drawOscilloCanvas();
    drawContent(aData, 'red');
    drawContent(bData, 'blue');
    drawContent(cData, 'green');
    
  }
};
osciloCanvasRegim.addEventListener('change', (e) => {
  
  drawOscilloCanvas();
  chooseOsciloCanvasRegim(e.target.value);
});

osciloCanvasDots.addEventListener('change',()=> {
  drawOscilloCanvas();
  chooseOsciloCanvasRegim(osciloCanvasRegim.value);
});

osciloCanvasDotsVal.addEventListener('change',()=> {
  drawOscilloCanvas();
  chooseOsciloCanvasRegim(osciloCanvasRegim.value);
});

// fix resize
window.addEventListener('resize', (event)=> {
   
  oscilloCanvas.width = document.querySelector('#oscilloCanvasContainer').offsetWidth - 150;
  oscilloCanvas.height = document.querySelector('#oscilloCanvasContainer').offsetHeight;
  drawOscilloCanvas();
  chooseOsciloCanvasRegim(osciloCanvasRegim.value);

});














// measurementsDB-tab
const measurmentsDBTabs = document.querySelector('.measurmentsDB-tabs');
const measurmentDBTab = document.querySelectorAll('.measurmentDB-tab');
const measurmentsDBContent = document.querySelectorAll('.measurmentsDB-content');
measurmentsDBTabs.addEventListener('click', (e) => tabsSwitcher(e, measurmentDBTab, measurmentsDBContent));
// canvas
class Chart {
  constructor(con) {
    this.canvas = document.getElementById(con.canvasId);
    this.minX = con.minX;
    this.minY = con.minY;
    this.maxX = con.maxX;
    this.maxY = con.maxY;
    this.unitsPerTickX = con.unitsPerTickX;
    this.unitsPerTickY = con.unitsPerTickY;
    // constants  
    this.padding = 10;
    this.tickSize = 10;
    this.axisColor = "#555";
    this.pointRadius = 4;
    this.fontHeight = 12;
    // relationships       
    this.context = this.canvas.getContext("2d");
    this.rangeX = this.maxX - this.minY;
    this.rangeY = this.maxY - this.minY;
    this.numXTicks = Math.round(this.rangeX / this.unitsPerTickX);
    this.numYTicks = Math.round(this.rangeY / this.unitsPerTickY);
    this.x = this.getLongestValueWidth() + this.padding * 2;
    this.y = this.padding * 2;
    this.width = this.canvas.width - this.x - this.padding * 2;
    this.height = this.canvas.height - this.y - this.padding - this.fontHeight;
    this.scaleX = this.width / this.rangeX;
    this.scaleY = this.height / this.rangeY;
  }

  drawXAxis() {
    this.context.save();
    this.context.beginPath();
    this.context.moveTo(this.x, this.y + this.height);
    this.context.lineTo(this.x + this.width, this.y + this.height);
    this.context.strokeStyle = this.axisColor;
    this.context.lineWidth = 2;
    this.context.stroke();
    // draw tick marks  
    for (let n = 0; n < this.numXTicks; n++) {
      this.context.beginPath();
      this.context.moveTo((n + 1) * this.width / this.numXTicks + this.x, this.y + this.height);
      this.context.lineTo((n + 1) * this.width / this.numXTicks + this.x, this.y + this.height - this.tickSize);
      this.context.stroke();
    }
    // draw labels  
    this.context.fillStyle = "black";
    this.context.textAlign = "center";
    this.context.textBaseline = "middle";
    for (let n = 0; n < this.numXTicks; n++) {
      const label = Math.round((n + 1) * this.maxX / this.numXTicks);
      this.context.save();
      this.context.translate((n + 1) * this.width / this.numXTicks + this.x, this.y + this.height + this.padding);
      this.context.fillText(label, 0, 0);
      this.context.restore();
    }
    this.context.restore();
  };

  drawYAxis() {
    const {context} = this;
    context.save();
    context.save();
    context.beginPath();
    context.moveTo(this.x, this.y);
    context.lineTo(this.x, this.y + this.height);
    context.strokeStyle = this.axisColor;
    context.lineWidth = 2;
    context.stroke();
    context.restore();
    // draw tick marks  
    for (let n = 0; n < this.numYTicks; n++) {
      context.beginPath();
      context.moveTo(this.x, n * this.height / this.numYTicks + this.y);
      context.lineTo(this.x + this.tickSize, n * this.height / this.numYTicks + this.y);
      context.stroke();
    }
    // draw values  
    context.fillStyle = "black";
    context.textAlign = "right";
    context.textBaseline = "middle";
    for (let n = 0; n < this.numYTicks; n++) {
      const value = Math.round(this.maxY - n * this.maxY / this.numYTicks);
      context.save();
      context.translate(this.x - this.padding, n * this.height / this.numYTicks + this.y);
      context.fillText(value, 0, 0);
      context.restore();
    }
    context.restore();
  };

  getLongestValueWidth() {
    this.context.font = this.font;
    let longestValueWidth = 0;
    for (let n = 0; n <= this.numYTicks; n++) {
      const value = this.maxY - (n * this.unitsPerTickY);
      longestValueWidth = Math.max(longestValueWidth, this.context.measureText(value).width);
    }
    return longestValueWidth;
  };

  drawLine(data, color, width) {
    const {
      context
    } = this;
    context.save();
    this.transformContext();
    context.lineWidth = width;
    context.strokeStyle = color;
    context.fillStyle = color;
    context.beginPath();
    context.moveTo(data[0].x * this.scaleX, data[0].y * this.scaleY);
    for (let n = 0; n < data.length; n++) {
      const point = data[n];
      // draw segment  
      context.lineTo(point.x * this.scaleX, point.y * this.scaleY);
      context.stroke();
      context.closePath();
      context.beginPath();
      context.arc(point.x * this.scaleX, point.y * this.scaleY, this.pointRadius, 0, 2 * Math.PI, false);
      context.fill();
      context.closePath();
      // position for next segment  
      context.beginPath();
      context.moveTo(point.x * this.scaleX, point.y * this.scaleY);
    }
    context.restore();
  };

  transformContext() {
    // move context to center of canvas  
    this.context.translate(this.x, this.y + this.height);
    // invert the y scale so that that increments  
    // as you move upwards  
    this.context.scale(1, -1);
  };
}
window.onload = () => {
  const myLineChart = new Chart({
    canvasId: "myCanvas",
    minX: 0,
    minY: 0,
    maxX: 160,
    maxY: 100,
    unitsPerTickX: 10,
    unitsPerTickY: 10
  });
  const data1 = [{
    x: 0,
    y: 0
  }, {
    x: 20,
    y: 10
  }, {
    x: 40,
    y: 15
  }, {
    x: 60,
    y: 40
  }, {
    x: 80,
    y: 60
  }, {
    x: 100,
    y: 50
  }, {
    x: 120,
    y: 85
  }, {
    x: 140,
    y: 100
  }];
  myLineChart.drawLine(data1, "blue", 3);
  myLineChart.drawXAxis();
  myLineChart.drawYAxis();
  const data2 = [{
    x: 20,
    y: 85
  }, {
    x: 40,
    y: 75
  }, {
    x: 60,
    y: 75
  }, {
    x: 80,
    y: 45
  }, {
    x: 100,
    y: 65
  }, {
    x: 120,
    y: 40
  }, {
    x: 120,
    y: 35
  }];
  myLineChart.drawLine(data2, "red", 3);
};
// eventsDB
// oscilogramsDB
// configyration-tab
const configurationTabs = document.querySelector('.configuration-tabs');
const configurationTab = document.querySelectorAll('.configuration-tab');
const configurationContent = document.querySelectorAll('.configuration-content');
configurationTabs.addEventListener('click', (e) => tabsSwitcher(e, configurationTab, configurationContent));

function addZero(value) {
  if (value < 10) {
    value = '0' + value;
  }
  return value;
}

function setDateTime() {
  const currentDatetime = new Date();
  const day = addZero(currentDatetime.getDate());
  const month = addZero(currentDatetime.getMonth() + 1);
  const year = currentDatetime.getFullYear();
  const hours = addZero(currentDatetime.getHours());
  const minutes = addZero(currentDatetime.getMinutes());
  const seconds = addZero(currentDatetime.getSeconds());
  return day + "." + month + "." + year + " " + hours + ":" + minutes + ":" + seconds;
}
setInterval(() => {
  document.getElementById('current_date_time_block').innerHTML = setDateTime();
}, 1000);

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


const serviceModal = () => {
  const HTMLcontent = `<div class="card mt-4">
  <div class="card">
    <h4>Получить данные устройства</h4>
    <div class="row justify-content-center pt-3">
        <button class="py-2 col-3">Получить данные главного окна</button>
        <button class="py-2 col mx-3">Получить данные сигнализации</button>
        <button class="py-2 col ">Получить данные коммутации</button>
        <button class="py-2 col ms-3">Получить все данные устройства</button>
    </div>
  </div>
  <div class="card mt-2">
    <h4>Задание данных устройства устройства</h4>
    <div class="row mt-2 " >
      <div class="col">
       <div>
        <select class="py-1 col-1" name="" id="">
          <option value="">0</option>
       </select>
       <button class="py-1 ms-2">Установить износ фазы А</button>
      </div>
       <div class="my-2">
        <select class="py-1 col-1" name="" id="">
          <option value="">0</option>
        </select>
        <button class="py-1 ms-2">Установить износ фазы B</button>
       </div>
        <div>
          <select   class="py-1 col-1" name="" id="">
            <option value="">0</option>
          </select>
          <button class="py-1 ms-2">Установить износ фазы C</button>
        </div>
        <div class="mt-2">
          <input type="text" name="" id="" class="col-1 py-1">
          <button class="py-1" id="0x108">Установить колличество включений</button>
        </div>
       
        <div class="mt-2">
          <input type="text" name="" id="" class="col-1 py-1">
          <button class="py-1" id="0x109">Установить колличество отключений</button>
        </div>
     </div>
      <div class="col">
        <div> <input type="text" name="" id="448" class="col-1"> Коэффицент А фаза А</div>
        <div> <input type="text" name="" id="450" class="col-1 mt-2"> Коэффицент А фаза B</div>
        <div> <input type="text" name="" id="452" class="col-1 mt-2"> Коэффицент А фаза С</div>
        <div> <input type="text" name="" id="449" class="col-1 mt-2"> Коэффицент B фаза А</div>
        <div> <input type="text" name="" id="451" class="col-1 mt-2"> Коэффицент B фаза B</div>
        <div> <input type="text" name="" id="453" class="col-1 mt-2"> Коэффицент B фаза C</div>
        <div class="row justify-content-start mt-2">
          <button class="col py-1" id="0x10A"> Калибровка 1000 А</button>
          <button class="col py-1 ms-2" id="0x10B"> Калибровка 10000 А</button>
        </div>
      </div>
   </div>
      <div class="row mt-3">
        <button class="col py-2 me-2">Установить сигнализацию</button>
        <button class="col py-2">Сбросить сигнализацию</button>
      </div>
    </div>
    <div class="card mt-2">
      <h4 class="mt-2">Очистка данных устройства и программы</h4>
      <div class="row mt-2 ">
        <button class="col py-2 " id="0x100">  Очистить журнал измерений</button> 
        <button class="col  py-2 mx-2" id="0x101">Очистить журнал событий</button>
        <button class="col py-2 " id="0x102">Очистить данные осцилограмм</button>
      </div>
      <div class="row mt-3 ">
        <button class="col py-2 me-2" id="0x104"> Очистить все данные устройства</button>
        <button class="col py-2" id="0x105">Установить конфигурацию по умолчанию</button>
      </div>
      <div class="row mt-4 ">
        <button class="col py-2 ">  Очистить главное окно</button>
        <button class="col  py-2 ms-2">Прервать опрос устройства</button>
      </div>
      <div class="row mt-3 ">
        <button class="col py-2 me-2"> Очистить БД измерений</button>
        <button class="col py-2 me-2">Очистить БД событий</button>
        <button class="col py-2 ">Очистить БД осцилограмм</button>
      </div>
      <div class="row mt-4 justify-content-center">
        <button class="col-5 ">Очистить данные устройства и БД</button>
      </div>
    </div>
  </div>`;
  setModalContent(HTMLcontent);
  modal.style.display = "block";
};

document.getElementById('serviceModal').addEventListener('click', ()=> serviceModal());

const findReg = (regStr) => document.getElementById(`${regStr}`);
// findReg("0010").textContent = 'zzzz';

// data

function dbg_out(s){console.log(s);}

const socket = new WebSocket("ws://127.0.0.1:8080", 76);
socket.onopen = function(e){};
socket.onmessage = function(e){recv(e.data);};
socket.onclose = function(e){if (e.wasClean){dbg_out("Соединение закрыто нормально");}else{dbg_out("Соединение закрыто экстренно");}};
socket.onerror = function(e){dbg_out("Ошибка соединения: " + e.message);};

let upload_pointer = 0;
let firmware_array = 0;

// let registersHash = {'0010':,
//  '0011',
//   '0012'};

function recv(data){
  const r = new FileReader();
  r.onload = ()=> {
    let int16_array = new Uint16Array(r.result);
    let register = int16_array[1];
    let value = int16_array[2];

    console.log(register);

    // let el = registersArray.filter( num => num === `00${register}`);
    // console.log(el);
    // findReg(el[0]).textContent = value;

    if (register === 10) {document.getElementById(`0010`).textContent = value; }
    if (register === 11) {document.getElementById(`0011`).textContent = value; }
    if (register === 12) {document.getElementById(`0012`).textContent = value; }



    if (int16_array[1] === 398)// #define FIRMWARE_UPLOAD 398
    {
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

function send(operation, register, value){
  let sendArray = new Uint16Array(64);

  sendArray[0] = operation;
  sendArray[1] = register;
  sendArray[2] = value;

  if (socket)
    if (socket.readyState === 1)
      socket.send(sendArray);
}

// function data_read(){
//   send(0, reg.value, val.value);
// }

// function data_write(){
//   send(1, reg.value, val.value);
// }

document.addEventListener('load', ()=> {
  // send(0, 10, 0);
  send(0, 11, 0);
  send(0, 12, 0);
});


function setDate(){
  send(0, 10, 0);
  send(0, 11, 0);
  send(0, 12, 0);
}

document.getElementById('setDate').addEventListener('click', setDate);


function read_file(inp){
  f = inp.files[0];
  r = new FileReader();

  r.onload = function() {
    data_array = new Uint8Array(r.result);
    firmware_array = new Uint8Array(0x10000).fill(0xFF, 0, 0x10000);// #define FIRMWARE_SIZE 0x10000
    firmware_array.set(data_array);

    int8_array = new Uint8Array(512).fill(0, 0, 512);

    for (i = 0; i < f.name.length; i++)
      int8_array[i] = f.name.charCodeAt(i);

    if (socket)
      if (socket.readyState == 1)
        socket.send(int8_array);
  };

  r.readAsArrayBuffer(f);
}