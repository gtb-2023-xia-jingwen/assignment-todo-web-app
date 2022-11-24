import { postNewTask, deleteTask, fetchData } from './api';
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
