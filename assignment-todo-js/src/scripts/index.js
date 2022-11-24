import '../styles/todo-lists.scss';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { fetchData, postNewTask } from './api';
import { renderCompletedList, renderTodoList } from './render';

let taskList = [];

fetchData().then((data) => {
  taskList = data;
  renderTodoList(taskList);
  renderCompletedList(taskList);
});

const addBtn = document.querySelector('#add-todo');
const inputBox = document.querySelector('#todo-input');

function readAndClearInputData() {
  const res = inputBox.value;
  inputBox.value = '';
  return res;
}

function renderNewTask(data) {
  renderTodoList(data);
  renderCompletedList(data);
}

function addNewTask() {
  const inputData = readAndClearInputData();
  const task = {
    name: inputData,
    completed: false,
  };
  postNewTask(task).then((newTask) => {
    taskList.push(newTask);
    renderNewTask(taskList);
  });
}

addBtn.addEventListener('click', addNewTask);
