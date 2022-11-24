const todoContainer = document.querySelector('#todo-lists');
const completedContainer = document.querySelector('#completed-lists');

function getHtmlTxtList(data, isDone) {
  return data
    .reverse()
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
}

function renderTodoList(data) {
  todoContainer.innerHTML = getHtmlTxtList(data, false);
}

function renderCompletedList(data) {
  completedContainer.innerHTML = getHtmlTxtList(data, true);
}

// eslint-disable-next-line import/prefer-default-export
export function renderTasks(data) {
  renderTodoList(data);
  renderCompletedList(data);
}
