import '../styles/todo-lists.scss';
import 'bootstrap-icons/font/bootstrap-icons.css';

const URL = 'http://localhost:8080/tasks';

const fetchData = () => fetch(URL).then((response) => response.json());

const todoContainer = document.querySelector('#todo-lists');
const completedContainer = document.querySelector('#completed-lists');

function getHtmlTxtList(data, isDone) {
  const htmlTxt = data
    .filter((dat) => dat.completed === isDone)
    .map(
      ({
        id,
        name,
      }) => `<li><input id="${id}" class="input-checkbox" type="checkbox" ${
        isDone ? 'checked' : ''
      }/>
            <label data-id="${id}"> ${name} </label>
            <i class="bi-trash" data-id="${id}"></i></li>`
    )
    .join('');
  return htmlTxt;
}

function renderTodoList(data) {
  todoContainer.innerHTML = getHtmlTxtList(data, false);
}

function renderCompletedList(data) {
  completedContainer.innerHTML = getHtmlTxtList(data, true);
}

fetchData().then((data) => {
  renderTodoList(data);
  renderCompletedList(data);
});
