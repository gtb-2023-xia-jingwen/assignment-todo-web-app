const todoContainer = document.querySelector('#todo-lists');
const completedContainer = document.querySelector('#completed-lists');

function getHtmlTxtList(data, isDone) {
  const htmlTxt = data
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
  return htmlTxt;
}

export function renderTodoList(data) {
  todoContainer.innerHTML = getHtmlTxtList(data, false);
}

export function renderCompletedList(data) {
  completedContainer.innerHTML = getHtmlTxtList(data, true);
}
