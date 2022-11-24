import { postNewTask, deleteTask, fetchData, putTask } from './api';
import { renderTasks } from './render';
import { taskList } from './variable';

const inputBox = document.querySelector('#todo-input');
const errP = document.querySelector('#input-error');

function readAndClearInputData() {
  const res = inputBox.value.trim();
  inputBox.value = '';
  return res;
}

function showErrMsg() {
  errP.style.display = 'block';
}

function hiddenErrMsg() {
  errP.style.display = 'none';
}

export function addBtnClickHandler() {
  const inputData = readAndClearInputData();
  if (inputData === '') {
    showErrMsg();
  } else {
    const task = {
      name: inputData,
      completed: false,
    };
    postNewTask(task).then((newTask) => {
      taskList.push(newTask);
      renderTasks(taskList);
      hiddenErrMsg();
    });
  }
}

export function showListHandler() {
  fetchData().then((data) => {
    taskList.splice(0, taskList.length);
    data.forEach((v) => taskList.push(v));
    renderTasks(taskList);
  });
}

export function delBtnClickHandler(event) {
  const { target } = event;
  if (target.getAttribute('class') !== 'bi-trash') {
    return;
  }
  const { id } = target.dataset;
  deleteTask(id).then(() => showListHandler());
}

export function checkBoxClickHandler(event) {
  const { target } = event;
  if (target.getAttribute('class') !== 'input-checkbox') {
    return;
  }
  const pNode = target.parentNode;
  const ppNode = pNode.parentNode;
  const label = pNode.querySelector('label');
  let status = false;
  if (ppNode.getAttribute('id') === 'todo-lists') {
    status = true;
  }
  const task = {
    name: label.textContent,
    completed: status,
  };
  const { id } = label.dataset;
  putTask(id, task).then(() => {
    // eslint-disable-next-line no-shadow
    let task = null;
    let i = 0;
    for (; i < taskList.length; i++) {
      if (taskList[i].id === parseInt(id, 10)) {
        task = taskList[i];
        task.completed = status;
        break;
      }
    }
    taskList.splice(i, 1);
    taskList.splice(0, 0, task);
    renderTasks(taskList);
  });
}
