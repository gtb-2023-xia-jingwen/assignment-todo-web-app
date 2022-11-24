import '../styles/todo-lists.scss';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { fetchData, postNewTask } from './api';
import { renderCompletedList, renderTodoList } from './render';

fetchData().then((data) => {
  renderTodoList(data);
  renderCompletedList(data);
});

const addBtn = document.querySelector('#add-todo');
const inputBox = document.querySelector('#todo-input');

function readInputData() {
  const res = inputBox.value;
  inputBox.value = '';
  return res;
}

function addNewTask() {
  const inputData = readInputData();
  postNewTask(inputData);
}

addBtn.addEventListener('click', addNewTask);
