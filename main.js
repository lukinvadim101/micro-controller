// tabs
const tabs = document.querySelector(".tabs");
const tabButton = document.querySelectorAll(".tab");
const contents = document.querySelectorAll(".content");

tabs.onclick = e => {
  const {id} = e.target.dataset;
  if (id) {
    tabButton.forEach(btn => {
      btn.classList.remove("active");
    });
    e.target.classList.add("active");

    contents.forEach(content => {
      content.classList.remove("active");
    });
    const element = document.getElementById(id);
    element.classList.add("active");
  }
};

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
const measurmentsContent = document.querySelector('.measurments-content');

measurmentsTabs.onclick = e => {
  const {id} = e.target.dataset;
  if (id) {
    measurmentTab.forEach(btn => {
      btn.classList.remove("active");
    });
    e.target.classList.add("active");
  }
  measurmentsContent.insertAdjacentHTML("afterbegin", `
  <table class="mt-4">
    <thead>
      <th>1</th>
      <th>2</th>
      <th>3</th>
      <th>4</th>
      <th>5</th>
      <th>6</th>
      <th>7</th>
      <th>8</th>
    </thead>
    <tbody>
      <tr>
        <td>1</td>
        <td>1</td>
        <td>1</td>
        <td>1</td>
        <td>1</td>
        <td>1</td>
        <td>1</td>
        <td>1</td>
      </tr>
    </tbody>
  </table>`);
};

