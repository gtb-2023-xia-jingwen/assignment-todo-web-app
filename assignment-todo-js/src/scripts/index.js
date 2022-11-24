import '../styles/todo-lists.scss';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { fetchData } from './api';
import { renderCompletedList, renderTodoList } from './render';

fetchData().then((data) => {
  renderTodoList(data);
  renderCompletedList(data);
});
