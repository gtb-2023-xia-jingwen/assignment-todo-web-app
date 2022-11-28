const URL = 'http://localhost:8080/tasks';

export const fetchData = () =>
  // eslint-disable-next-line no-return-assign
  fetch(URL).then((response) => response.json());

export const postNewTask = (task) =>
  fetch(URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(task),
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error('Error:', error);
    });

export const deleteTask = (id) =>
  fetch(`${URL}/${id}`, {
    method: 'DELETE',
  })
    .then((response) => response)
    .catch((error) => {
      console.error('Error:', error);
    });

export const putTask = (id, task) =>
  fetch(`${URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(task),
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error('Error:', error);
    });
