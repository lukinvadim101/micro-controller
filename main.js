// tabs
const navTabs = document.querySelector(".nav-tabs");
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

navTabs.addEventListener('click', (e)=> tabsSwitcher(e, navTabButton, mainContents));



// modal 
const modal = document.getElementById("myModal");
const modalBtn = document.getElementById("modalBtn");

const closeModal = document.getElementsByClassName("close")[0];

modalBtn.onclick = ()=> {
  modal.style.display = "block";
};

closeModal.onclick = ()=> {
  modal.style.display = "none";
};

window.onclick = (event)=> {
  if (event.target === modal) {
    modal.style.display = "none";
  }
};

const modalContent = document.querySelector('.modal-content');

// phase diagramm

const fillDiagramms = (diagramm)=> {
  for (let i = 20; i >= 0; i--) {
    const scale = document.createElement("DIV");
    const node = document.createElement("DIV");
    scale.append(node);
    scale.setAttribute('class', 'd-flex justify-content-end '); // шкала
    node.setAttribute('data-value', i*10); // атрибут для текущего значения
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
    if ( i <= 10 && i >= 8 ) {
      node.setAttribute("class", " phase phase-mid");
    } 
    if (i < 8) {
      node.setAttribute("class", " phase phase-low");
    }
    node.innerHTML = '&nbsp;' ;
    diagramm.append(scale);
  }

};
const phaseDiagramms = [...document.querySelectorAll('.phase-diagramm')];
phaseDiagramms.forEach(fillDiagramms); // draw diagramm
 
const markElemInDiagramm = (diagrammId, value)=> {
  const AllPhases = [...document.querySelectorAll('.phase')];
  const exactDiagrammPhases = AllPhases.filter(el => el.closest(diagrammId));
  const elem = exactDiagrammPhases.filter(el => +el.dataset.value <= value && +el.dataset.value + 10 > value);
  elem[0].classList.add('phase-active');
  // return elem;
};

markElemInDiagramm('#phaseDiagrammA', 49); // specific el
markElemInDiagramm('#phaseDiagrammB', 119); // add style 
markElemInDiagramm('#phaseDiagrammC', 89); 

const accidentModal = ()=> {
  
  modalContent.insertAdjacentHTML('beforeend', `<p class="tac my-5">Произошло срабатывание сигнализации. <br/> Для просмотра более подробной информации нажмите на индикатор "Авария" в Главном окне</p>`);
};

accidentModal();

// status alarm
const statusAlarmSignal = (status)=> {
  const statusAlarm = document.querySelector('.status-alarm');
  statusAlarm.classList.remove('d-none');
  // statusAlarm.classList.add('blink');
  if (status === 'warning') {
    statusAlarm.textContent ='Внимание';
    statusAlarm.classList.add('warning-signal');
  } else {
    statusAlarm.textContent ='Авария';
    statusAlarm.classList.add('accident-signal');
  }
};

statusAlarmSignal('warning');

const generalAlarm = ()=> {
  modalContent.removeChild(modalContent.children[1]); // удалить предидущее сообщение об ошибке
  modalContent.insertAdjacentHTML('beforeend', 
    ` <div class="mt-4">
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
    `);
};

generalAlarm(); // основная сигнализация

const selfDiagnosisAlarm = ()=> {
  modalContent.removeChild(modalContent.children[1]); // удалить предидущее сообщение об ошибке
  modalContent.insertAdjacentHTML('beforeend', `
  <div class="mt-4">
  <div class="row justify-content-center">
    <div class="col-6 card">
      <div><input type="checkbox" name="" id="">Неисправность внутренней FLASH-памяти</div>
      <div class="mt-2 "><input type="checkbox" name="" id="">Неисправность внутренней SRAM-памяти</div>
      <div class="mt-2"><input type="checkbox" name="" id="">Неисправность АЦП</div>
      <div class="mt-2"><input type="checkbox" name="" id="">Ошибка считывания FRAM (энергозависимых данных). <br>
        <div style="margin-left: 1.2em;">Приняты данные по умолчанию</div> 
      </div>
      <div class="mt-3 tac"> <button class="px-5">OK</button></div>
    </div>
  </div>
</div>`);
};

selfDiagnosisAlarm();

// measurments tab
const measurmentsTabs = document.querySelector('.measurments-tabs');
const measurmentTab = document.querySelectorAll('.measurment-tab');
const measurmentsContent = document.querySelectorAll('.measurments-content');

const measurementsAllTab = document.querySelector('#measurements-all'); 
const measurementsSwitchTab = document.querySelector('#measurements-switch');

measurmentsTabs.addEventListener('click', (e)=> tabsSwitcher(e, measurmentTab, measurmentsContent));

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

oscillogramsTabs.addEventListener('click', (e)=> tabsSwitcher(e, oscillogramTab, oscillogramsContent));


// measurementsDB-tab
const measurmentsDBTabs = document.querySelector('.measurmentsDB-tabs');
const measurmentDBTab = document.querySelectorAll('.measurmentDB-tab');
const measurmentsDBContent = document.querySelectorAll('.measurmentsDB-content');

measurmentsDBTabs.addEventListener('click', (e)=> tabsSwitcher(e, measurmentDBTab, measurmentsDBContent));

// eventsDB-tab

// canvas
function LineChart(con) {  
  // user defined properties  
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
  this.pointRadius = 5;  
  this.font = "12pt Calibri";  

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

  // draw x y axis and tick marks  
  this.drawXAxis();  
  this.drawYAxis();  
}  

LineChart.prototype.getLongestValueWidth = function () {  
  this.context.font = this.font;  
  let longestValueWidth = 0;  
  for (let n = 0; n <= this.numYTicks; n++) {  
    const value = this.maxY - (n * this.unitsPerTickY);  
    longestValueWidth = Math.max(longestValueWidth, this.context.measureText(value).width);  
  }  
  return longestValueWidth;  
};  

LineChart.prototype.drawXAxis = function () {  
  const {context} = this;  
  context.save();  
  context.beginPath();  
  context.moveTo(this.x, this.y + this.height);  
  context.lineTo(this.x + this.width, this.y + this.height);  
  context.strokeStyle = this.axisColor;  
  context.lineWidth = 2;  
  context.stroke();  

  // draw tick marks  
  for (var n = 0; n < this.numXTicks; n++) {  
    context.beginPath();  
    context.moveTo((n + 1) * this.width / this.numXTicks + this.x, this.y + this.height);  
    context.lineTo((n + 1) * this.width / this.numXTicks + this.x, this.y + this.height - this.tickSize);  
    context.stroke();  
  }  

  // draw labels  
  context.font = this.font;  
  context.fillStyle = "black";  
  context.textAlign = "center";  
  context.textBaseline = "middle";  

  for (var n = 0; n < this.numXTicks; n++) {  
    const label = Math.round((n + 1) * this.maxX / this.numXTicks);  
    context.save();  
    context.translate((n + 1) * this.width / this.numXTicks + this.x, this.y + this.height + this.padding);  
    context.fillText(label, 0, 0);  
    context.restore();  
  }  
  context.restore();  
};  

LineChart.prototype.drawYAxis = function () {  
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
  for (var n = 0; n < this.numYTicks; n++) {  
    context.beginPath();  
    context.moveTo(this.x, n * this.height / this.numYTicks + this.y);  
    context.lineTo(this.x + this.tickSize, n * this.height / this.numYTicks + this.y);  
    context.stroke();  
  }  

  // draw values  
  context.font = this.font;  
  context.fillStyle = "black";  
  context.textAlign = "right";  
  context.textBaseline = "middle";  

  for (var n = 0; n < this.numYTicks; n++) {  
    const value = Math.round(this.maxY - n * this.maxY / this.numYTicks);  
    context.save();  
    context.translate(this.x - this.padding, n * this.height / this.numYTicks + this.y);  
    context.fillText(value, 0, 0);  
    context.restore();  
  }  
  context.restore();  
};  

LineChart.prototype.drawLine = function (data, color, width) {  
  const {context} = this;  
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

LineChart.prototype.transformContext = function () {  
  const {context} = this;  

  // move context to center of canvas  
  this.context.translate(this.x, this.y + this.height);  

  // invert the y scale so that that increments  
  // as you move upwards  
  context.scale(1, -1);  
};  

window.onload = function () {  
  const myLineChart = new LineChart({  
    canvasId: "myCanvas",  
    minX: 0,  
    minY: 0,  
    maxX: 140,  
    maxY: 100,  
    unitsPerTickX: 10,  
    unitsPerTickY: 10  
  });  

  var data = [{  
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

  myLineChart.drawLine(data, "blue", 3);  

  var data = [{  
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
    x: 140,  
    y: 35  
  }];  

  myLineChart.drawLine(data, "red", 3);  
};  