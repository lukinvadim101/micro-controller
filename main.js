/* eslint-disable no-return-assign */
/* eslint-disable eqeqeq */
/* eslint-disable no-bitwise */
/* eslint-disable no-constant-condition */
/* eslint-disable no-param-reassign */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-plusplus */
/* eslint-disable prefer-const */
/* eslint-disable camelcase */


const $DataId = (regStr) => document.querySelectorAll(`[data-id='${regStr}']`);
const isEmpty = (obj)=> !Object.values(obj).some(x => x !== null && x !== '');
const $id = ( id ) => document.getElementById( id );
const delAllNodes = (node) => {
  while (node.firstChild) node.removeChild(node.lastChild);
};

$id('header').style.display = 'none';
$id('cnfFooter').style.display = 'none';

// main tabs
const navTabButton = document.querySelectorAll(".nav-tab");
const mainContents = document.querySelectorAll(".main-content");

const tabsSwitcher = (e, tabs, contents) => {
  const {id} = e.target.dataset;
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
$id('nav-tabs').addEventListener('click', (e) => tabsSwitcher(e, navTabButton, mainContents));
// phase diagramm
const fillDiagramms = (diagramm) => {
  for (let i = 20; i >= 0; i--) {
    const scale = document.createElement("DIV");
    const node = document.createElement("DIV");
    scale.append(node);
    scale.setAttribute('class', 'd-flex jcend '); // шкала
    node.setAttribute('data-value', i * 10); // атрибут для текущего значения
    if (i === 20) {
      scale.insertAdjacentHTML('afterbegin', '<div class="ph-scale ">200</div>');
    }
    if (i === 10) {
      scale.insertAdjacentHTML('afterbegin', '<div class="ph-scale">100</div>');
    }
    if (i === 7) {
      scale.insertAdjacentHTML('afterbegin', '<div class="ph-scale">80</div>');
    }
    if (i === 0) {
      scale.insertAdjacentHTML('afterbegin', '<div class="ph-scale">0</div>');
    }
    if (i > 10) {
      node.setAttribute("class", " ph ph-high ");
    }
    if (i <= 10 && i >= 8) {
      node.setAttribute("class", " ph ph-mid");
    }
    if (i < 8) {
      node.setAttribute("class", " ph ph-low");
    }
    node.innerHTML = '&nbsp;';
    diagramm.append(scale);
  }
};
const phaseDiagramms = [...document.querySelectorAll('.ph-diagramm')];
phaseDiagramms.forEach(fillDiagramms); // draw diagramm
const markElemInDiagramm = (diagrammId, value) => {
  const AllPhases = [...document.querySelectorAll('.ph')];
  const exactDiagrammPhases = AllPhases.filter(el => el.closest(diagrammId));
  const elem = exactDiagrammPhases.filter(el => +el.dataset.value <= value && +el.dataset.value + 10 > value);
  elem[0].classList.add('ph-active', 'blink');

  // return elem;
};

$id('oscilloViewbtn').addEventListener('click', () => {
  navTabButton.forEach(btn => {
    btn.classList.remove("active");
  });
  $id('oscillograms-tab').classList.add("active");
  mainContents.forEach(content => {
    content.classList.remove("active");
  });
  $id('oscillograms').classList.add("active");
});

// measurments tab

class Chart {
  constructor(opt, data) {
    this.cnv = $id(opt.canvasId);
    this.ctx = this.cnv.getContext("2d");
    this.data = data;
    this.rangeY = this.calcSourceMinMax('Y',this.data.a.values,this.data.b.values, this.data.c.values);
    this.rangeX = this.calcSourceMinMax('X',this.data.a.values,this.data.b.values, this.data.c.values);
    this.width = this.cnv.width;
    this.height = this.cnv.height;
    this.padding = {x: 60, y: 60};
    this.dotRadius = 2;
    this.left = this.padding.x;
    this.right = this.width-this.padding.x;
    this.top = this.padding.y;
    this.bottom = this.height-this.padding.y;
    this.bk = true;
    this.phClrs = {'a': 'red','b': 'blue','c': 'green',};

    this.dotsCheck = $id(opt.dotsCheck);
    this.dotsValCheck = $id(opt.dotsValCheck);
    this.phRegim = $id(opt.phRegim);
    this.dateTime = false;
  }

  mapRange(value, sourceLow, sourceHigh, mappedLow, mappedHigh) {
    return mappedLow + (mappedHigh - mappedLow) * (value - sourceLow) / (sourceHigh - sourceLow);
  }

  calcSourceMinMax(prop, ...arr){
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

  getDisplayXY(valueX,valueY){
    const x = this.mapRange(valueX,this.rangeX.min,this.rangeX.max,this.left,this.right);
    const y = this.mapRange(valueY,this.rangeY.min,this.rangeY.max,this.bottom,this.top);
    return({displayX:x,displayY:y});
  }

  roundToMultiple(num, multiple) {
    return Math.round(num/multiple)*multiple;
  }

  connector(starting,ending,color){
    const {ctx} = this;
    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.moveTo(starting.displayX,starting.displayY);
    ctx.lineTo(ending.displayX,ending.displayY);
    ctx.strokeStyle=color;
    ctx.stroke();
  }

  dot(position){
    const {ctx} = this;
    ctx.beginPath();
    ctx.moveTo(position.displayX,position.displayY);
    ctx.arc(position.displayX,position.displayY,this.dotRadius,0,Math.PI*2);
    ctx.closePath();
    ctx.fill();
  }

  drawAxes(){
    const {ctx, left, right, top, bottom} = this;
    ctx.beginPath();
    ctx.moveTo(left,top);
    ctx.lineTo(left,bottom);
    ctx.moveTo(left,bottom);
    ctx.lineTo(right,bottom);
    ctx.strokeStyle='gray';
    ctx.stroke();
  };

  drawDashedLine(fromX, toX, fromY, toY){
    const {ctx} = this;
    ctx.beginPath();
    ctx.setLineDash([8, 4]);
    ctx.moveTo(fromX, fromY);
    ctx.lineTo(toX, toY);
    ctx.stroke();
  };

  drawLine (fromX, toX, fromY, toY){
    const {ctx} = this;
    ctx.beginPath();
    ctx.setLineDash([]);
    ctx.moveTo(fromX, fromY);
    ctx.lineTo(toX, toY);
    ctx.stroke();
  };

  drawScaleGrid (from, to, gap) {
    const {ctx, left, right} = this;
    for (let i = from; i > to ; i-=gap) {
      let scaleVal = this.roundToMultiple(i, 1000);
      let scaleValPosY = this.getDisplayXY(left-10, scaleVal).displayY;
      ctx.fillText(new Intl.NumberFormat('ru-RU').format(scaleVal),left-10,scaleValPosY);
      if ( i === 0) {
        this.drawLine(left, right, scaleValPosY, scaleValPosY); 
      } else {
        this.drawDashedLine(left, right, scaleValPosY, scaleValPosY);
      }
    }
  }

  drawYScale () {
    const {ctx, left, right} = this;
    const maxRound10 = this.roundToMultiple(this.rangeY.max, 10);
    const minRound10 = this.roundToMultiple( Math.abs(this.rangeY.min), 10);
    const yValueGapPosGap = (maxRound10) / 5;
    const yValueGapNegGap = (minRound10) / 5;
    
    ctx.textAlign='right';
    ctx.textBaseline='middle';
    const y0 = this.getDisplayXY(left-10, 0).displayY;

    this.drawScaleGrid( this.rangeY.max, 0, yValueGapPosGap );
    if (this.rangeY.min < 0) {
      this.drawScaleGrid( 0, this.rangeY.min, yValueGapNegGap );
    }
    
    ctx.fillText(new Intl.NumberFormat('ru-RU').format(this.rangeY.min),left-10,this.bottom);
    ctx.setLineDash([]);
    this.drawLine(left, right, y0, y0); 

  };


  drawXScale () {
    const {cnv, ctx, bottom, top, dateTime, data} = this;
    ctx.textAlign='center';
    let scaleValPosX;
    if (cnv === $id('osCnv')) {
      for (let i = this.rangeX.min; i <= this.rangeX.max; i++) {
        if (i/5 % 1 === 0 ) { // 200 мс
          scaleValPosX = this.getDisplayXY(i,bottom + 10).displayX;
          ctx.fillText(i/5 ,scaleValPosX, bottom + 10);
        } if (i !== 0) {
          this.drawDashedLine(scaleValPosX, scaleValPosX, bottom, top); // сетка   Y
        }
      }
    } else {
      for (let i = this.rangeX.min; i <= this.rangeX.max; i++) {
        scaleValPosX = this.getDisplayXY(i,bottom + 10).displayX;
        if (dateTime) {
          ctx.fillText(data.time[i] ,scaleValPosX, bottom + 10);
        } else {
          ctx.fillText(i ,scaleValPosX, bottom + 10);
        }
        if (i !== 0) {
          this.drawDashedLine(scaleValPosX, scaleValPosX, bottom, top); // сетка   Y
        }
      }
    }
    ctx.setLineDash([]);
  };

  drawContent (data, color, coefBk = 1) {
    const {ctx} = this;
    let starting=this.getDisplayXY(data.values[0].X,data.values[0].Y * coefBk);
    ctx.setLineDash([]);

    if (this.dotsCheck.checked) {
      this.dot(starting);
    }

    for(let i=1;i<=data.values.length-1;i++){
      const ending = this.getDisplayXY(data.values[i].X,data.values[i].Y * coefBk);

      if (this.dotsValCheck.checked) {
        ctx.fillText(data.values[i-1].Y,starting.displayX, starting.displayY-5);
      }
      this.connector(starting, ending, color);
      if (this.dotsCheck.checked) {
        this.dot(ending);
      }
      starting = ending;
    }

    if (this.dotsValCheck.checked) {
      ctx.fillText(data.values[data.values.length-1].Y,starting.displayX-5, starting.displayY-5);
    }
  };

  clearCanvas() {
    const {ctx} = this;
    ctx.clearRect(0, 0, this.width, this.height);
  };

  drawCanvas () {
    const {ctx} = this;
    this.clearCanvas();
    ctx.lineWidth = 1;
    this.drawAxes();
    this.drawXScale();
    this.drawYScale();
  };

  initRndr(){
    const {data} = this;
    this.rangeY=this.calcSourceMinMax('Y',data.a.values,data.b.values, data.c.values);
    this.rangeX=this.calcSourceMinMax('X',data.a.values,data.b.values, data.c.values);
    this.phRegim.value = 'all';
    this.drawCanvas();
    this.drawContent(data.a, 'red');
    this.drawContent(data.b, 'blue');
    this.drawContent(data.c, 'green');
    if (this.bk) {
      this.drawContent(data.bk, 'purple', this.rangeY.max / 2);
    }
    
  }

  choosePhRegim(val, color) {
    const {data} = this;
    this.rangeY=this.calcSourceMinMax('Y',data[val].values);
    this.rangeX=this.calcSourceMinMax('X',data[val].values);
    this.drawCanvas();
    this.drawContent(data[val], color);
  }

  chooseOsciloCanvasRegim(val) {
    switch(val) {
    case 'all':
      this.initRndr();
      break;
    default:
      this.choosePhRegim(val,this.phClrs[val]);
      if (this.bk) {
        this.drawContent(this.data.bk, 'purple', this.rangeY.max / 2);
      }
      
    }
  };

  eventsListen(){
    this.dotsCheck.addEventListener('change',()=> {
      this.drawCanvas();
      this.chooseOsciloCanvasRegim(this.phRegim.value);
    });

    this.dotsValCheck.addEventListener('change',()=> {
      this.drawCanvas();
      this.chooseOsciloCanvasRegim(this.phRegim.value);
    });

    this.phRegim.addEventListener('change', () => {
      this.drawCanvas();
      this.chooseOsciloCanvasRegim(this.phRegim.value);
    });
  }
}

const measurmentTab = document.querySelectorAll('.measurment-tab');
const measurmentsContent = document.querySelectorAll('.measurments-content');

$id('measurments-tabs').addEventListener('click', (e) => tabsSwitcher(e, measurmentTab, measurmentsContent));

  
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

let measurementsAllRecords = [
  { '0201': 't',
    '0204': 'y1',
    '0205': 'm1',
    '0206': 'd1',
    '0207': 'h',
    '0208': 'm',
    '0209': 's',
    '0210': 'ms',
    '0211': null,
    '0212': '1', // on
    '0213': 'Износ a1',
    '0214': 'Износ b1',
    '0215': 'Износ c1',
    '0216': 'on1',
    '0217': 'off1',
    '0218': 'self on1 / off1',
    '0219': 'full on1 / off1',
    '0220': 'dugi time on/off a1',
    '0221': 'dugi time on/off b1',
    '0222': 'dugi time on/off c1',
    '0223': 'Износ за перкл а1',
    '0224': 'Износ за перкл b1',
    '0225': 'Износ за перкл c1',
    '0226': 'main tok а1',
    '0227': 'main tok b1',
    '0228': 'main tok c1',
  },
  { '0201': 't',
    '0204': 'y2',
    '0205': 'm2',
    '0206': 'd2',
    '0207': 'h',
    '0208': 'm',
    '0209': 's',
    '0210': 'ms',
    '0211': null,
    '0212': '2', // off
    '0213': 'Износ a2',
    '0214': 'Износ b2',
    '0215': 'Износ c2',
    '0216': 'on2',
    '0217': 'off2',
    '0218': 'self on2 / off2',
    '0219': 'full on2 / off2',
    '0220': 'dugi time on/off a2',
    '0221': 'dugi time on/off b2',
    '0222': 'dugi time on/off c2',
    '0223': 'Износ за перкл а2',
    '0224': 'Износ за перкл b2',
    '0225': 'Износ за перкл c2',
    '0226': 'main tok а2',
    '0227': 'main tok b2',
    '0228': 'main tok c2',
  },
];

const addRowToMeasurmentsTable = (obj) => {
  $id('measurementsAllTableBody').insertAdjacentHTML("afterbegin", `
  <tr>
    <td>${obj['0201']}</td> 
    <td>
      ${obj['0206']}.${obj['0205']}.${obj['0204']}
      ${obj['0207']}:${obj['0208']}:${obj['0209']}.${obj['0210']}
    </td>
    <td>${obj['0211']}</td>
    <td>${obj['0212']}</td>
    <td>${obj['0213'] * 0.01}</td>
    <td>${obj['0214'] * 0.01}</td>
    <td>${obj['0215'] * 0.01}</td>
    <td>${obj['0216']}</td>
    <td>${obj['0217']}</td>
    <td>${obj['0218']}</td>
    <td>${obj['0219']}</td>
    <td>${obj['0220']}</td>
    <td>${obj['0221']}</td>
    <td>${obj['0222']}</td>
    <td>${obj['0223'] * 0.01}</td>
    <td>${obj['0224'] * 0.01}</td>
    <td>${obj['0225'] * 0.01}</td>
    <td>${obj['0226']}</td>
    <td>${obj['0227']}</td>
    <td>${obj['0228']}</td>
  </tr>
`);
};

let filtredByTrend = [];

const mesFilter = (param)=> {
  measurementsAllRecords.forEach(obj => {
    let f = Object.fromEntries(Object
      .entries(obj)
      .filter(([key]) => param.includes(key) === true)
    );
    filtredByTrend.push(f);
  });};


let trData = {
  time: [
    '11.11.1111 01:01:01.1111',
    '22.22.2222 02:02:02.2222',
    '33.33.3333 03:03:03.3333',
    '44.44.4444 44:44:44.4444'],
  a: {
    values: [{ X: 0, Y: 0 },
      { X: 1, Y: 18000 },
      { X: 2, Y: 8000 },]},
  b: {values: [
    { X: 0, Y: 28000 },
    { X: 1, Y: 8000 },
    { X: 2, Y: 18000 },
  ]},
  c: {values: [
    { X: 0, Y: 10000 },
  ]}
};

const trChrt = new Chart({
  canvasId: "trndsCnv",
  dotsCheck: 'trCnvDts',
  dotsValCheck: 'trCnvDtsVal',
  phRegim: 'trPhses',
}, trData);

trChrt.dateTime = true;
$id('trCnvDates').addEventListener('change', ()=> {
  trChrt.dateTime = !trChrt.dateTime;

}); 

let newTrendData = {
  time: [],
  a: {values:[]},
  b: {values:[]},
  c: {values:[]},
};

// обработка селекта трендов
const chooseTrend = ()=> {
  const trend = $id('trCnvTrend');
  let [sel] = [...trend.options].filter(opt => opt.selected === true);
  let {reg} = sel.dataset;
  reg = reg.split(' ');
    
  filtredByTrend = [];
  let time = ['0204','0205','0206','0207','0208','0209','0210'];
  let param = [...reg, ...time];

  mesFilter(param); // запись в filtredByTrend
  
  newTrendData = {
    time: [],
    trend: {values: []},
    a: {values:[]},
    b: {values:[]},
    c: {values:[]},
  };

  const phasesTrend = ()=> {
    filtredByTrend.forEach((t, idx) => {
      let v = Object.values(t); 
      newTrendData.time.push(`${v[2]}:${v[1]}:${v[0]} ${v[3]}:${v[4]}:${v[5]}.${v[6]}`);
      newTrendData.a.values.push({x:idx, y:v[v.length-3]});
      newTrendData.b.values.push({x:idx, y:v[v.length-2]});
      newTrendData.c.values.push({x:idx, y:v[v.length-1]});
    });
  };

  const singleTrend = ()=> {
    filtredByTrend.forEach((t, idx) => {
      let v = Object.values(t);
      newTrendData.time.push(`${v[2]}:${v[1]}:${v[0]} ${v[3]}:${v[4]}:${v[5]}.${v[6]}`);
      newTrendData.trend.values.push({x:idx, y:v[v.length-1]});
    });
  };
  $id('trPhses').removeAttribute("disabled");
  switch(trend.value) {
  case 'a':
    phasesTrend();
    trChrt.data = newTrendData;
    trChrt.initRndr();
    break;
  case 'b+':
    filtredByTrend = filtredByTrend.filter( i => +i['0212'] === 1); 
    phasesTrend();
    trChrt.data = newTrendData;
    trChrt.initRndr();
    break;
  case 'b-':
    filtredByTrend = filtredByTrend.filter( i => +i['0212'] === 2); 
    phasesTrend();
    trChrt.data = newTrendData;
    trChrt.initRndr();
    break;
  case 'c+':
    filtredByTrend = filtredByTrend.filter( i => +i['0212'] === 1); 
    singleTrend();
    $id('trPhses').setAttribute("disabled", "disabled");
    trChrt.data = newTrendData;
    trChrt.choosePhRegim('trend', 'red');
    break;
  case 'c-':
    filtredByTrend = filtredByTrend.filter( i => +i['0212'] === 2); 
    singleTrend();
    $id('trPhses').setAttribute("disabled", "disabled");
    trChrt.data = newTrendData;
    trChrt.choosePhRegim('trend', 'red');
    break;
  case 'd':
    singleTrend();
    trChrt.data = newTrendData;
    trChrt.choosePhRegim('trend', 'red');
    break;
  default:
    break;
  }
};

$id('trCnvTrend').addEventListener('change', (e)=> chooseTrend(e));// получить соьытие, парметр
$id('trCnvDates').addEventListener('change', (e)=> chooseTrend(e));

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

let eventsAll = [];

const evtCode = {
  1	:'Рестарт программы',
  2	:'Ошибка считывания конфигурации. Принята конфигурация по умолчанию',
  3	:'Изменена конфигурация',
  4	:'Неисправность внутренней FLASH-памяти',
  5	:'Неисправность внутренней SRAM-памяти',
  6	:'Неисправность АЦП',
  7	:'Неисправность Ethernet',
  8	:'Неисправность датчика температуры внутри модуля',
  9	:'Неисправность датчика температуры ШУ ВВ',
  10:	'Неисправность датчика температуры окружающей среды',
  11:	'Ошибка считывания FRAM (энергонезависимых данных). Приняты данные по умолчанию',
  12:	'Пользователем задано значение расхода коммутационного ресурса ф. А',
  13:	'Пользователем задано значение расхода коммутационного ресурса ф. B',
  14:	'Пользователем задано значение расхода коммутационного ресурса ф. C',
  15:	'Пользователем задано значение количества включений',
  16:	'Пользователем задано значение количества отключений',
  30:	'Количество операций более порогового предупредительного значения',
  31:	'Температура в шкафу управления больше порогового предупредительного значения',
  32:	'Температура в шкафу управления меньше порогового предупредительного значения',
  33:	'Температура внутри блока больше порогового предупредительного значения',
  34:	'Температура внутри блока меньше порогового предупредительного значения',
  35:	'Собственное время отключения более порогового предупредительного значения',
  36:	'Полное время отключения более порогового предупредительного значения',
  37:	'Собственное время включения более порогового предупредительного значения',
  38: 'Время включения более порогового предупредительного значения',
  39: 'Невыполненная команда на соленоид включения',
  40:	"Невыполненная команда на соленоид отключения 1",
  41:	"Невыполненная команда на соленоид отключения 2",
  50:	"Количество операций более порогового аварийного значения",
  51:	"Температура в шкафу управления больше порогового аварийного значения",
  52:	"Температура в шкафу управления меньше порогового аварийного значения",
  53:	"Отказ соленоида",
  54:	"Неполнофазный режим работы",
  100:	"Повторное зажигание дуги для фазы А",
  101:	"Износ контактов более порогового предупредительного значения для фазы А",
  102:	"Время горения дуги более порогового предупредительного значения для фазы А",
  151:	"Износ контактов более порогового аварийного значения для фазы А",
  200:	"Повторное зажигание дуги для фазы В",
  201:	"Износ контактов более порогового предупредительного значения для фазы В",
  202:	"Время горения дуги более порогового предупредительного значения для фазы В",
  251:	"Износ контактов более порогового аварийного значения для фазы В",
  300:	"Повторное зажигание дуги для фазы С",
  301:	"Износ контактов более порогового предупредительного значения для фазы С",
  302:	"Время горения дуги более порогового предупредительного значения для фазы С",
  351:	"Износ контактов более порогового аварийного значения для фазы С",
  1000:	"Ошибка установления связи с устройством",
  1050:	"Связь с устройством установлена",
  17:	"Пользователем сброшены аварии и тревоги",
  18:	"Пользователем установлена сигнализация",
  19:	"Пользователем сброшена сигнализация",
};

const addAllEventsToTable = (arr)=> {
  arr.forEach(obj => {
    $id('eventsTableBody').insertAdjacentHTML("beforeend", `
  <tr>
    <td>${obj['0301']}</td>
    <td>
      ${obj['0305']}.${obj['0304']}.${obj['0303']}
      ${obj['0306']}:${obj['0307']}:${obj['0308']}.${obj['0309']}
      </td>
    </td>
    <td>${obj['0310'] === null ? obj['0310'] + ' (пришло)' : obj['0310'] + ' (ушло)' }</td>
    <td>${obj['0311']}</td>
    <td>${evtCode[obj['0311']]}</td>
  </tr>`);
  });
};


// oscillograms tab

const oscillogramTab = document.querySelectorAll('.oscillograms-tab');
const oscillogramsContent = document.querySelectorAll('.oscillograms-content');
$id('oscillograms-tabs').addEventListener('click', (e) => tabsSwitcher(e, oscillogramTab, oscillogramsContent));

const addOptToOsSelect = (arr)=> {
  arr.forEach(i => {
    let opt = document.createElement('option');
    let str = `${+i['0602'] === 1 ? 'ВКЛ' : 'ОТКЛ'} ${i['0607']}.${i['0606']}.${i['0605']} ${i['0608']}:${i['0609']}:${i['0610']}.${i['0611']}.${i['0612']}`;// on? y.m.d h:m:sss
    opt.innerHTML = str;
    opt.dataset.num = `${i['0603']}`;
    opt.dataset.phase = `${i['0602']}`;
    $id('jsOsSelect').appendChild(opt);
  });
};


let osCurrInfo = {
  '0602': null,
  '0603': null,
  '0605': null,
  '0606': null,
  '0607': null,
  '0608': null,
  '0609': null,
  '0610': null,
  '0611': null,
  '0612': null,
};
let OsAllInfo = [];

let osData = {
  a: { values:[
    { X: 0, Y:'' },
  ]},
  b: { values:[
    { X: 0, Y: 0 },
  ]},
  c: { values:[
    { X: 0, Y: 0 },
  ]},
  bk: { values:[
    { X: 0, Y: 0 },
  ]},
};

let osChrt = new Chart({
  canvasId: "osCnv",
  dotsCheck: 'osCnvDots',
  dotsValCheck: 'osCnvDotsVal',
  phRegim: 'osCnvPh',
}, osData);

const addRowsToOscilorgamsTableBody = (data)=> {
  for(let i = data.a.values[0].X; i < data.a.values.length; i++) {
    $id('oscilorgamsTableBody').insertAdjacentHTML('beforeend',`
    <tr>
      <td>${i}</td>     
      <td>${data.bk.values[i] ? data.bk.values[i].Y : "-"}</td>
      <td>${data.a.values[i].Y}</td>
      <td>${data.b.values[i] ? data.b.values[i].Y : "-"}</td>
      <td>${data.c.values[i] ? data.c.values[i].Y : "-"}</td>
    </tr>
    `);
  }
};



// config-tab
const cnfTabs = document.querySelector('.cnf-tabs');
const cnfTab = document.querySelectorAll('.cnf-tab');
const cnfContent = document.querySelectorAll('.cnf-content');
cnfTabs.addEventListener('click', (e) => tabsSwitcher(e, cnfTab, cnfContent));

function addZero(value) {
  if (value < 10) {
    value = '0' + value;
  }
  return value;
}

function pcTime() {
  const current = new Date();
  const day = addZero(current.getDate());
  const month = addZero(current.getMonth() + 1);
  const year = current.getFullYear();
  const hours = addZero(current.getHours());
  const minutes = addZero(current.getMinutes());
  const seconds = addZero(current.getSeconds());

  return {day, month, year, hours, minutes, seconds};
}
setInterval(() => {
  $id('currentPCTime').textContent = `
    ${pcTime().day}.${pcTime().month}.${pcTime().year}
    ${pcTime().hours}:${pcTime().minutes}:${pcTime().seconds}`;
}, 1000);



const setHadleTimeInput = ()=> {
  $id('day').value = pcTime().day;
  $id('mounth').value = pcTime().month;
  $id('year').value = pcTime().year;
  $id('hour').value = pcTime().hours;
  $id('min').value = pcTime().minutes;
};
setHadleTimeInput();

setInterval(()=>setHadleTimeInput(),30000);

let meTimeArr = [];
let setNewDate = (a) => `${a[0]}.${a[1]}.${a[2]} ${a[3]}:${a[4]}:${a[5]}`; 
let meTimeStr;


const updMachineTime = (dateStr)=> {
  let curent = new Date(dateStr);
  let cSec = curent.getSeconds();

  setInterval(()=> {
    curent.setSeconds(++cSec);
    if( cSec === 60 ) {
      cSec = 0;
    }
    let upd = curent.toLocaleString('ru-RU');
    [...$DataId('currentMeTime')].forEach(i => i.textContent = upd);
  }, 1000);


};

// сигнализации

// status alarm
const statusAlarm = document.querySelector('.status-alarm');
const statusAlarmSignal = (status) => {
  
  statusAlarm.classList.remove('d-none');
  // statusAlarm.classList.add('blink');
  if (status === 'warning') {
    statusAlarm.textContent = 'Внимание';
    statusAlarm.classList.remove('accident-signal');
    statusAlarm.classList.add('warning-signal', 'blink');
    document.querySelector('.warning-signal').classList.add('blink');
  } else {
    statusAlarm.textContent = 'Авария';
    statusAlarm.classList.remove('warning-signal');
    statusAlarm.classList.add('accident-signal', 'blink');
    document.querySelector('.accident-signal').classList.add('blink');
  }
};

// accidentModal(); // сигнализация события
const generalAlarm = () => {
  $id('generalAlarmContent').style.display = "block";
  $id('genClose').addEventListener('click', ()=> {
    $id('generalAlarmContent').style.display = "none";
  });
  statusAlarmSignal('accident');
  $id('alarmMain').addEventListener('click', generalAlarm);
};


const accidentModal = () => {
  $id('accidentAlarmContent').style.display = "block";
  $id('accidentClose').addEventListener('click', ()=> {
    $id('accidentAlarmContent').style.display = "none";
  });
  statusAlarmSignal('warning');
  $id('alarmMain').addEventListener('click', generalAlarm);
};



// generalAlarm(); // основная сигнализация

const selfDiagnosisAlarm = () => {
  $id('selfDiagnosisContent').style.display = "block";
  $id('selfDiagnosisClose').addEventListener('click', ()=> {
    $id('selfDiagnosisContent').style.display = "none";
  });
  
  document.querySelector('.self-diagnosis-signal').classList.add('blink');

};
// selfDiagnosisAlarm(); // вызов самодиагностики

// $id('statusAlarm').addEventListener('click', ()=>statusAlarmSignal());
// $id('accidentAlarm').addEventListener('click', ()=>accidentModal());
// $id('generalAlarm').addEventListener('click', ()=>generalAlarm());
// $id('selfDiagnosislAlarm').addEventListener('click', ()=>selfDiagnosisAlarm());

// servise
const serviceModal = () => {
  const serviceModalContent = $id('serviceModalContent');
  serviceModalContent.style.display = "block";
  $id('serviceClose').addEventListener('click', ()=> {
    serviceModalContent.style.display = "none";
  });
};

$id('serviceModal').addEventListener('click', ()=> serviceModal());


// cmd btns
const resetEventsJournal = $id('0x100');
const resetMeassurmentsJournal = $id('0x101');
const resetOscillogramms = $id('0x102');
const resetAccumulatedMeasurements = $id('0x103');
const setDefaultcnf = $id('0x104');
const calibrationFor1000 = $id('0x10A');
const calibrationFor10000 = $id('0x10B');
const setAlarm = $id('0x10C');
const resetAlarm = $id('0x10D');
// cmd btns with arg
const setPhaseAWear = $id('0x105');
const setPhaseBWear = $id('0x106');
const setPhaseCWear = $id('0x107');
const setNumberOfTurns = $id('0x108');
const setNumberOfShutdowns = $id('0x109');


// +
const comandBtns = [resetEventsJournal, resetMeassurmentsJournal,resetOscillogramms, setDefaultcnf, resetAccumulatedMeasurements, calibrationFor1000, calibrationFor10000, setAlarm, resetAlarm];
const comandBtnsWithArg = [setPhaseAWear, setPhaseBWear, setPhaseCWear, setNumberOfTurns, setNumberOfShutdowns];

// data

// helpers func

const ab2str = (buf) => String.fromCharCode.apply(null, new Uint16Array(buf));
const str2ab = (str) => {
  let buf = new ArrayBuffer(8); // 2 bytes for each char
  let bufView = new Uint16Array(buf);
  for (let i=0, strLen=str.length; i < strLen; i++) {
    bufView[i] = str.charCodeAt(i);
  }
  return buf;
};
const ab2int = (data)=> [].reduce.call(data, (r, a) => (r << 8) + a, 0) & ((1 << 15) - 1);;

// let a = ab2str([0x02, 0x01, 0x03, 0x07]);
// let b = str2ab('z2s');

// let buff = str2ab('4942');
// console.log(buff);
// let data = new Uint16Array(buff);
// console.log(data[0]);


// let view474475 = new Uint8Array([03,4]);
let $0001_0002 = [];
let $411_412 = [];
let $463_464 = [];
let $465_466 = [];
let $474_475 = [];
let $477_478 = [];




// console.log((231232).toString(16));
// console.log(str2ab((231232).toString(16)));
// console.log(ab2str(str2ab((231232).toString(16))));

let view477478 = new DataView(new ArrayBuffer(4));

let setUnload = false;
let unloadArr = [];

let evNum = 0;
let mesNum = 0;
let firmwareStr = '';

let osNumOn = 0;
let osNumOff = 0;
let osNumSum = 0;


function dbg_out(s){console.log(s);}

const socket = new WebSocket("ws://127.0.0.1:8080", 76);

function send(operation, reg, value){
  let sendArray = new Uint16Array(64);

  sendArray[0] = operation;
  sendArray[1] = reg;
  sendArray[2] = value;

  if (socket)
    if (socket.readyState === 1)
      socket.send(sendArray);
}

const sendCommand = (e)=> {
  const code = e.target.id;
  // console.log('code ', code);
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

comandBtns.forEach(btn => btn.addEventListener('click', (e)=> sendCommand(e)));
comandBtnsWithArg.forEach(btn => btn.addEventListener('click', (e)=> sendCommandWithArg(e)));

// контрольные суммы
let crc = {
  484: null,
  485: null,
  486: null,
  487: null,
};

const checkSums = ()=> {
  send(0,484,0);
  send(0,485,0);
  send(0,486,0);
  send(0,487,0);
  
  if(crc[484] !== crc[486] || crc[485] !== crc[487]) {
    throw Error('Контрольные суммы не совпадают');
  }
};



let upload_pointer = 0;
let firmware_array = 0;
// +

const ToByteArray = (long)=> {
  let byteArray = [0, 0, 0, 0,];

  for ( let index = 0; index < byteArray.length; index ++ ) {
    let byte = long & 0xff;
    byteArray [ index ] = byte;
    long = (long - byte) / 256 ;
  }

  return byteArray;
};


const getTime = ['0010', '0011', '0012', '0013', '0014', '0015']; //  время в конфиг
const handleTime = [$id('year'),$id('mounth'),$id('day'),$id('hour'),$id('min')];
handleTime.forEach(i => i.disabled = true);

const regArrayToSetValuesInSpan = [
  '10', '11', '12', // test date
  '0000','0001', '0002', '0003', //  конфиг
  '0109', '0110', '0012', '0014', '0016', // главное окно. выключатель, фазы
  '0251', '0252','0253', '0254', '0255', '0256', '0257', // гл. окно. время последней коммутации
  '0258', '0260', '0261', '0262','0263','0264','0265','0266','0267', // гл. окно. данные последней коммутации
  '414','415', // конфиг 
];
// +
const regArrayToSetValuesInSpanDataId = [ // встречается дважды id атрибут
  '0200', // записей в журнале измерений
  '0300', // записей в журнале событий
]; 

// +
const regArrayToSetValuesInInput = [
  410, 413, 432, 433, 434, 435, 442, 443, 444, 445, 446, 447,
  448, 449, 450, 451, 452, 453, // service
  454, 455, 456, 457, 458, 459, 460, 461, 462, 467, 468, 471, 473, 476, // cnf control
];

const cnfInp = [410, '411-412', '472a', '472b', '472c', 454, 470,471, '477-478', 455, '465-466', '463-464', 467, 473,'474-475',476, 459, 460, 461, 456, 457, 458, 462, 468, 432, 433, 434, 435, 442, 443, 444, 445, 446, 447];
cnfInp.forEach(i => $id(i).disabled = true);

const regArrayToSetValuesFromBuff = ['0001', '0002', 411, 412, 463, 464, 465, 466, 474,475, 477, 478];

// +
const regToFirmwareArray = [
  484,485,486,487 ,488 ,489 ,490 ,491 ,492 ,493 ,494 
  ,495 ,496 ,497 ,498 ,499 ,500 ,501 ,502 ,503 ,504 ,
  505 ,506 ,507 ,508 ,509,510 ,511 ,512 ,513 ,514 ,515 
  ,516 ,517 ,518 ,519]; 
// +
const regArrayToSetValuesIfElse = [
  '0111', '0259',
];
// +
const phasesCoefficent = [
  '0113', '0115', '0117', //   расход ресурса фаз в %
];

// +
const measurementsJournal = ['0201','0204','0206', '0207','0208','0209','0210','0211','0212','0213','0214','0215','0216','0217','0218','0219','0220','0221','0222','0223','0224','0225','0226','0227','0228'];
// +
const eventsJournal = ['0301','0303','0304','0305','0306','0307','0308','0309','0310','0311'];
// принадлежность к фазе осцилограмм
const oscilloPhaseASign = [1, 5, 9, 13, 17, 21, 25, 29, 33, 37, 41, 45, 49, 53, 57, 61, 65, 69, 73, 77, 81, 85, 89, 93, 97];
const oscilloPhaseCSign = [3, 7, 11, 15, 19, 23, 27, 31, 35, 39, 43, 47, 51, 55, 59, 63, 67, 71, 75, 79, 83, 87, 91, 95, 99];
// +
const osciloCurrentInfo = ['0602', '0603', '0605', '0606','0607','0608','0609','0610','0611','0612'];

function recv(data){
  const r = new FileReader();
  r.onload = ()=> {
    let int16_array = new Uint16Array(r.result);
    let reg = int16_array[1];
    let val = int16_array[2];

    console.log(reg);
    if (setUnload) {
      unloadArr.push({reg:val});
    }
    

    if (getTime.includes(`${reg}`)) {
      meTimeArr.push(val);
      if (meTimeArr.length === 6) {
        meTimeStr = setNewDate(meTimeArr);
        updMachineTime(meTimeStr);
      }
    }

    if (regArrayToSetValuesInSpan.includes(`${reg}`)) {
      if (reg === '0265' || '0265' || '0267') {
        $id(`${reg}`).textContent = val * 0.01;
      }
      $id(`${reg}`).textContent = val;
    }

 
    if (regArrayToSetValuesInSpanDataId.includes(`${reg}`)) {
      [...$DataId(`${reg}`)].forEach(t=> {t.textContent = val;});
      if (reg === '0200') {
        mesNum = val;
      }
      if (reg === '0300') {
        evNum = val;
      }
    }

    if (reg === '0111' && val === 1) {
      $id(`${reg}`).textContent = 'Включено';
    }
    if (reg === '0111' && val === 2) {
      $id(`${reg}`).textContent = 'Отключено';
    }

    if (phasesCoefficent.includes(`${reg}`)) { //  износ ресурса фаз
      $id(`${reg}`).textContent = (val * 0.01).toFixed(2);
      if (reg === '0113') {
        markElemInDiagramm('#phaseDiagrammA', val * 0.01);
      }
      if (reg === '0115') {
        markElemInDiagramm('#phaseDiagrammB', val * 0.01);
      }
      if (reg === '0117') {
        markElemInDiagramm('#phaseDiagrammC', val * 0.01);
      }
    }


    if (reg === '0259' && val === 1) {
      $id(`${reg}`).textContent = 'ВКЛ.';
    }
    if (reg === '0259' && val === 2) {
      $id(`${reg}`).textContent = 'ОТКЛ.';
    }

    if (eventsJournal.includes(reg)) {
      eventsTableCurrentObj[`${reg}`] = val; // записать значение в поле объекта
      if(!isEmpty(eventsTableCurrentObj)) { // когда все значения по текущей записи получены
        eventsAll.push(eventsTableCurrentObj); // отправить в массив всех записей
        eventsTableCurrentObj = {
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
        }; // обнулить контэйнер по текущей записи
      }
    }

    if (measurementsJournal.includes(reg)) {
      measurmentsTableCurrentObj[`${reg}`] = val;
      if(!isEmpty(measurmentsTableCurrentObj)) {
        measurementsAllRecords.push(measurmentsTableCurrentObj);
        measurmentsTableCurrentObj = {
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
      }
    }

    // переписать
    if (regArrayToSetValuesFromBuff.includes(reg)) {
      if (reg === '0001') $0001_0002[0] = val; // ст
      if (reg === '0002') {
        $0001_0002[1] = val;
        $id('0001-0002').textContent = ab2int($0001_0002);
      }

      if (reg === 411) $411_412[0] = val; // c
      if (reg === 412) {
        $411_412[1] = val;
        $id('411-412').val = ab2int($411_412);
      }

      if (reg === 463) $463_464[0] = val; // c
      if (reg === 464) {
        $463_464[1] = val;
        $id('463-464').value = ab2int($463_464);
      }

      if (reg === 465) $465_466[0] = val; // c
      if (reg === 466) {
        $465_466[1] = val;
        $id('465-466').value = ab2int($465_466);
      }

      if (reg === 474) $474_475[0] = val; // c
      if (reg === 475) {
        $474_475[1] = val;
        $id('474-475').value = ab2int($474_475);
      }

      if (reg === 477) $477_478[0] = val; // c
      if (reg === 478) {
        $477_478[1] = val;
        $id('477-478').value = ab2int($477_478);
      }
    }

    if(regArrayToSetValuesInInput.includes(reg)) {
      if (reg === 448 ||450 || 452) {
        val *= 0.001;
      }
      if (reg >= 456 &&reg <= 461 ) {
        val *= 0.1;
      }
      $id(`${reg}`).value = val;
    }

    if (reg === 472) {
      let arr = `${val}`.split('');
      $id('472a').checked = arr[0];
      $id('472b').checked = arr[1];
      $id('472c').checked = arr[2];     
    }


    if (regToFirmwareArray.includes(reg)) {
      firmwareStr += val;
      $id('484-519').textContent = firmwareStr;
    }

    if (reg === '0600' || reg === '0601' ) { // число осцилограмм
      if (reg === '0600') {
        osNumOn = +val;
      }
      osNumOff = +val;
      
      osNumSum = osNumOn + osNumOff;
      $id("0600-0601").textContent = osNumSum; }

    if (osciloCurrentInfo.includes(reg)) {
      osCurrInfo[`${reg}`] = val;
      if(!isEmpty(osCurrInfo)) {
        OsAllInfo.push(osCurrInfo);
      }
      osCurrInfo = {
        '0602': null,
        '0603': null,
        '0605': null,
        '0606': null,
        '0607': null,
        '0608': null,
        '0609': null,
        '0610': null,
        '0611': null,
        '0612': null,
      };
    }

    
    if (reg >= 613 && reg <= 4616) {

      if ( oscilloPhaseASign.includes(Number(val.toString().slice(-2))) )
        osData.a.values.push({x:osData.a.values.length, y: val*10});
      
      if(reg%2 === 0 && reg%4 !== 0) {
        osData.b.values.push({x:osData.b.values.length, y: val*10});
      }
          
      if ( oscilloPhaseCSign.includes(Number(val.toString().slice(-2))) )
        osData.c.values.push({x:osData.c.values.length, y: val*10});
      
      if (reg%4 === 0) {
        osData.bk.values.push({x:osData.bk.values.length, y: val});
      }
    } 
    // admin
    
   
    if (reg === 399) {
     
      if (val === '0xABCD') { // on
        $id('header').style.display = 'flex';
        $id('cnfFooter').style.display = 'flex';
        $id('adminStatus').textContent = 'администратор';
        cnfInp.forEach( i => $id(i).disabled = false);
        handleTime.forEach(i => i.disabled = false);
        [...$DataId('os-upld-tab')].forEach( i=> i.style.display = 'inline-flex');
      } else { // off
        $id('header').style.display = 'none';
        $id('cnfFooter').style.display = 'none';
        $id('adminStatus').textContent = 'пользователь';
        cnfInp.forEach( i => $id(i).disabled = true);
        handleTime.forEach(i => i.disabled = true);
        [...$DataId('os-upld-tab')].forEach( i=> i.style.display = 'none');
      }
      checkSums();
    }

    //  контрольные суммы 
    if (reg >= 484 && reg <= 487) {
      crc[reg] = val;
    } 

    

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


const getMainData = ()=> {
  // данные главного окна
  regArrayToSetValuesInSpan.forEach( i => send (0, i, 0)); // данные гл. окна при старте
  phasesCoefficent.forEach( i => send (0, i, 0)); // диагнаммы гл. она и сигнализация
  regArrayToSetValuesIfElse.forEach( i => send (0, i, 0)); 
  getTime.forEach( i => send (0, i, 0));
};

socket.onopen = ()=>{ 
  getMainData();
};

socket.onmessage = (e)=>{recv(e.data);};
socket.onclose = (e)=>{if (e.wasClean){dbg_out("Соединение закрыто нормально");}else{dbg_out("Соединение закрыто экстренно");}};
socket.onerror = (e)=>{dbg_out("Ошибка соединения: " + e.message);};


const getCnfData = () => {
  regArrayToSetValuesInInput.forEach(j => send(0, j, 0));
  regToFirmwareArray.forEach(j => send(0, j, 0));
  regArrayToSetValuesFromBuff.forEach(j => send(0, j, 0));
  send(0,472,0);
  send(0, 399, 0); // admin
};

// при переходе на вкладку конфигурация и кнопке прочитать
[...$DataId('cnf')].forEach(i=> {
  i.addEventListener('click', getCnfData);
});

// записать новую конфигуарциюю

$id('sendCnf').addEventListener('click', ()=> {
  const regInp = [410, 454, 471, 470, 455, 467, 473, 476, 459, 460, 461, 456, 457, 458, 468, 462, 432, 433, 434,435, 442, 443, 444, 445, 446, 447];
  const buffInp = ['411-412', '477-478', '463-464','465-466', '474-475'];
  const checkInp = ['472a', '472b', '472c'];

  regInp.forEach(i=> send(1, i, $id(i).value));

 
  buffInp.forEach(i => {
    let val = $id(i).value;
    let [major, minor] = i.split('-');
    let [majorVal, minorVal] = ToByteArray(val);

    send(1, major, majorVal);
    send(1, minor, minorVal);
  });

 
  let checStr = [];
  checkInp.forEach(i=> {
    if ($id(i).checked) {
      checStr.push(1);
    } else {
      checStr.push(0);
    }
  });
  let val = checStr.join('');
  send(1, 472, val);


});



// значения по умолчанию
$id('cnfDflt').addEventListener('click', ()=>{
  send(1, 551, '0x104');
  send(1, 550, '0x104');
  checkSums();
});


// переключение прав администратора
$id('adminBtn').addEventListener('click', ()=> {
  let param = $id('adminParam').value;
  send(1, 399, param);
  send(0, 399, 0);
});


// вкладка осцилогамм

// прочитать 613-4616
async function getOsFullData() {
  for (let i = 613; i <= 4616; i++) {
    if (i<= 999) {
      send(0,`0${i}`,0);
    } else {
      send(0,i,0);
    }
  }
};

const getAllOscillInfo = ()=> {
  for (let i = 1; i <= osNumOn; i++){
    send(1, '0602', 1); // записать признак включения
    send(1,'0603', i); // записать номер текущей осцилограмм
    osciloCurrentInfo.forEach(j => send(0,j,0)); // считать инфо о дате записи
    if (setUnload) {
      getOsFullData();
    }
  
  } // получены даты всех  осцилогамм вкл

  for (let i = 1; i <= osNumOff; i++){
    send(1, '0602', 2); 
    send(1,'0603', i); 
    osciloCurrentInfo.forEach(j => send(0,j,0));
    if (setUnload) {
      getOsFullData();
    }
  } // повторить для осцилогамм откл

  checkSums();
  OsAllInfo = [];
  addOptToOsSelect(OsAllInfo); // добавить все опции в селект
};

const getOsTabData = ()=> {
  osNumSum = 0;
  send(0,'0600',0);
  send(0,'0601',0);
  delAllNodes($id('jsOsSelect')); 
  getAllOscillInfo(); // получить все опции
};

// при переходе на вкладку и по кнопке обновить
[...$DataId('oscillograms')].forEach(tab => {
  tab.addEventListener('click', getOsTabData);
});



// обработчик события выбора
$id('jsOsSelect').addEventListener('click', (e)=> {
  if (e.target.nodeName === 'OPTION') {
    const {num, phase} = e.target.dataset;
    // запрос на чтение выбранной осцил
    send(1, '0602', phase);
    send(1, '0603', num);
    getOsFullData().then(()=>{
      osChrt.data = osData;
      osChrt.initRndr();
      osChrt.eventsListen();
      delAllNodes($id('oscilorgamsTableBody'));
      addRowsToOscilorgamsTableBody(osData); 
    });;
  }
});


// загузить новую ос
$id('newOsUpld').addEventListener('click', ()=> {
  const val = $id('newOsData').value;
  const data = $id('newOsData').value.split('\n');
  let reg = 5613;
  if (val) {
    data.forEach(i=> {
      if (i.includes(',')===true) {
        i.replace(',','.');
      }
      send(1,reg,+i);
      reg++;
    });
  }
  send(1,5000,1);
  checkSums();
});

const getEvtData = ()=> {
  send(0,'0300',0); // получить число всех записей
  for (let i = 1; i <= evNum; i++) { // цикл по числу записей 
    // старт с нуля или единицы?
    send(1, '0301', i); // записать индекс записи как текущий
    eventsJournal.forEach( reg => {
      send(0, reg, 0); // считать значения регистров текущей записи
    });
  }
};
// журнал событий
const getAlleventsRecords = ()=> {
  delAllNodes($id('eventsTableBody')); // обнулить записи в таблице
  eventsAll = []; // обнулить массив
  
  getEvtData();
 
  // все значения по всем записям получены
  // сформировать таблицу
  addAllEventsToTable(eventsAll);
};

// при клике на вкладку журнала событий или кнопку обновить получить все записи и сформировать таблицу
$id('events-tab').addEventListener('click', ()=> getAlleventsRecords());
$id('refreshEventsTable').addEventListener('click', ()=> getAlleventsRecords());



// журнал измерений

const getMesData = ()=> {
  send(0, '0200', 0); // получить число записей
    
  for (let i = 1; i <= mesNum; i++) {
    send(1, '0201', i); // записать индекс как текущий
    measurementsJournal.forEach( reg => {
      send(0, reg, 0); // считать значения регистров текущей записи
    });
  } // считаны все записи
};

[...$DataId('measurements')].forEach(tab => {
  tab.addEventListener('click', ()=> {
    delAllNodes($id('measurementsAllTableBody')); // очистить таблицу
    measurementsAllRecords = []; // очистить хранилище записей
    
    getMesData();

    measurementsAllRecords.forEach(rec => {
      addRowToMeasurmentsTable(rec);
    }); // добавить все записи в таблицу
  });
});
trChrt.bk = false;
$id('trPhses').setAttribute("disabled", "disabled");
trChrt.eventsListen();


// date time
function getDate(){
  meTimeArr = [];
  getTime.forEach(i => send(0, i, 0));
}
$id('getDate').addEventListener('click', getDate);

const setDate = ()=> {
  send(1, '0010', $id('year').value);
  send(1, '0011', $id('mounth').value);
  send(1, '0012', $id('day').value);
  send(1, '0013', $id('hour').value);
  send(1, '0014', $id('min').value);
};


$id('setDate').addEventListener('click', setDate);


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


$id('file').addEventListener('change', ()=> {
  read_file(this);
});

$id('unloading').addEventListener('click', ()=> {
  setUnload = true;

  getMainData();
  getMesData();
  getEvtData();
  getOsTabData();
  getCnfData();

  // let pre = [{reg:1,UserName:"Sam Smith"},{"Id":2,"UserName":"Sam Smith"}];
  // let json = pre;

  let json = unloadArr;

  let fields = Object.keys(json[0]);
  let replacer = (key, value) => value === null ? '' : value; 
  let csv = json.map((row)=> fields.map((fieldName)=> JSON.stringify(row[fieldName], replacer)).join(','));
  csv.unshift(fields.join(',')); // add header column
  csv = csv.join('\r\n');
  // console.log(csv);
  
  let link = document.createElement("a");
  let blob = new Blob(["\ufeff", csv]);
  let url = URL.createObjectURL(blob);
  link.href = url;
  link.download = `data.csv`;

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  unloadArr = [];
  setUnload = false;
});