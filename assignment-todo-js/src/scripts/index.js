import '../styles/todo-lists.scss';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { fetchData } from './api';
import { renderTasks } from './render';
import { addBtnClickHandler } from './eventHandler';
import { taskList } from './variable';

const addBtn = document.querySelector('#add-todo');

fetchData().then((data) => {
  data.forEach((v) => taskList.push(v));
  renderTasks(taskList);
});

addBtn.addEventListener('click', addBtnClickHandler);
