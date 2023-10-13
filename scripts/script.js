'use strict';

const table = document.querySelector('.todo-table');
const addToListBtn = document.querySelector('.todo-btn-add');
const inp = document.querySelector('.todo-inp');
const searchListBtn = document.querySelector('.todo-btn-search');

const form = document.querySelector('.todo');

let allTask = [];
let taskNum = 0;
let rows;

const calcData = function () {
  const now = new Date();
  const options = {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
  };

  return new Intl.DateTimeFormat('en-US', options).format(now);
};

const addToTable = function (task, data, status = 'not check', actData = '-') {
  const html = `<tr class="todo-table-row todo-table-row-${taskNum}">
            <td class="todo-table-item">${taskNum + 1}</td>
            <td class="todo-table-item todo-table-item-${taskNum}">${task}</td>
            <td class="todo-table-item">${data}</td>
            <td class="todo-table-item todo-table-item-${taskNum}">
                <button type="button" class="todo-btn todo-btn-check">✔</button>
                <button type="button" class="todo-btn todo-btn-not-check">✖</button>
            </td>
            <td class="todo-table-item todo-table-status">${status}</td>
            <td class="todo-table-item todo-table-act-data-${taskNum}">${actData}</td>
        </tr>`;

  table.insertAdjacentHTML('beforeend', html);

  taskNum++;

  allTask.push([task, data, status, actData]);

  const checkBtns = document.querySelectorAll('.todo-btn-check');
  const notCheckBtns = document.querySelectorAll('.todo-btn-not-check');
  rows = document.querySelectorAll('.todo-table-row');

  checkBtns.forEach(checkBtn =>
    checkBtn.addEventListener('click', function () {
      const td = this.closest('td');
      allTask[td.classList[1].slice(-1)][2] = 'done';
      addToLocale();
      td.closest('tr').children[4].textContent = 'Done✔';

      const data = calcData();
      td.closest('tr').children[5].textContent = data;
      allTask[td.classList[1].slice(-1)][3] = data;
      addToLocale();
    })
  );

  notCheckBtns.forEach(notCheckBtn =>
    notCheckBtn.addEventListener('click', function () {
      const td = this.closest('td');
      allTask[td.classList[1].slice(-1)][2] = 'undone';
      addToLocale();
      td.closest('tr').children[4].textContent = 'Undone✖';

      const data = calcData();
      td.closest('tr').children[5].textContent = data;
      allTask[td.classList[1].slice(-1)][3] = data;
      addToLocale();
    })
  );

  addToLocale();
};

const addToLocale = function () {
  if (localStorage.getItem('tasks')) {
    // localStorage.removeItem('tasks');
    localStorage.setItem('tasks', JSON.stringify(allTask));
  } else {
    localStorage.setItem('tasks', JSON.stringify(allTask));
  }
};

const getFromLocale = function () {
  allTask = JSON.parse(localStorage.getItem('tasks'));
  if (allTask) {
    allTask.forEach(task => {
      addTable(...task);
    });
  } else {
    allTask = [];
  }
  //   localStorage.removeItem('tasks');
};

const addTable = function (task, data, status, actData) {
  const html = `<tr class="todo-table-row todo-table-row-${taskNum}">
    <td class="todo-table-item">${taskNum + 1}</td>
    <td class="todo-table-item todo-table-item-${taskNum}">${task}</td>
    <td class="todo-table-item">${data}</td>
    <td class="todo-table-item todo-table-item-${taskNum}">
        <button type="button" class="todo-btn todo-btn-check">✔</button>
        <button type="button" class="todo-btn todo-btn-not-check">✖</button>
    </td>
    <td class="todo-table-item todo-table-status">${status}</td>
    <td class="todo-table-item todo-table-act-data-${taskNum}">${actData}</td>
</tr>`;

  table.insertAdjacentHTML('beforeend', html);

  taskNum++;

  const checkBtns = document.querySelectorAll('.todo-btn-check');
  const notCheckBtns = document.querySelectorAll('.todo-btn-not-check');
  rows = document.querySelectorAll('.todo-table-row');

  checkBtns.forEach(checkBtn =>
    checkBtn.addEventListener('click', function () {
      const td = this.closest('td');
      allTask[td.classList[1].slice(-1)][2] = 'done';
      addToLocale();
      td.closest('tr').children[4].textContent = 'Done✔';

      const data = calcData();
      td.closest('tr').children[5].textContent = data;
      allTask[td.classList[1].slice(-1)][3] = data;
      addToLocale();
    })
  );

  notCheckBtns.forEach(notCheckBtn =>
    notCheckBtn.addEventListener('click', function () {
      const td = this.closest('td');
      allTask[td.classList[1].slice(-1)][2] = 'undone';
      addToLocale();
      td.closest('tr').children[4].textContent = 'Undone✖';

      const data = calcData();
      td.closest('tr').children[5].textContent = data;
      allTask[td.classList[1].slice(-1)][3] = data;
      addToLocale();
    })
  );
};

addToListBtn.addEventListener('click', function () {
  const task = inp.value;

  if (task !== '') {
    const data = calcData();

    addToTable(task, data);

    inp.value = '';
  }
});

form.addEventListener('submit', e => {
  e.preventDefault();

  const task = inp.value;

  if (task !== '') {
    const now = new Date();
    const options = {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
    };

    const data = new Intl.DateTimeFormat('en-US', options).format(now);

    addToTable(task, data);

    inp.value = '';
  }
});

searchListBtn.addEventListener('click', function () {
  allTask.forEach((task, i) => {
    if (!task[0].includes(inp.value)) {
      rows[i].classList.add('hidden');
    }
  });
});

getFromLocale();
inp.value = '';
// localStorage.removeItem('tasks');
