import '../styles/todo-lists.scss';
import 'bootstrap-icons/font/bootstrap-icons.css';
import {
  addBtnClickHandler,
  delBtnClickHandler,
  showListHandler,
  checkBoxClickHandler,
} from './eventHandler';

const addBtn = document.querySelector('#add-todo');
const main = document.querySelector('main');

showListHandler();

addBtn.addEventListener('click', addBtnClickHandler);
main.addEventListener('click', delBtnClickHandler);
main.addEventListener('click', checkBoxClickHandler);
