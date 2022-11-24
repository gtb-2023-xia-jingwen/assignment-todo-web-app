import '../styles/todo-lists.scss';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { fetchData, postNewTask } from './api';
import { renderTasks } from './render';

const inputBox = document.querySelector('#todo-input');
const addBtn = document.querySelector('#add-todo');

let taskList = [];

fetchData().then((data) => {
  taskList = data;
  renderTasks(taskList);
});

function readAndClearInputData() {
  const res = inputBox.value.trim();
  inputBox.value = '';
  return res;
}

function addNewTask() {
  const inputData = readAndClearInputData();
  const task = {
    name: inputData,
    completed: false,
  };
  postNewTask(task).then((newTask) => {
    taskList.push(newTask);
    renderTasks(taskList);
  });
}

addBtn.addEventListener('click', addNewTask);
