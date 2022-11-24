import { postNewTask } from './api';
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
