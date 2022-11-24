const URL = 'http://localhost:8080/tasks';

// eslint-disable-next-line import/no-mutable-exports
let dat = [];

export const fetchData = () =>
  // eslint-disable-next-line no-return-assign
  fetch(URL).then((response) => (dat = response.json()));

export function postNewTask(title) {
  const task = {
    name: title,
    completed: false,
  };
  fetch(URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(task),
  })
    .then((response) => dat.push(response.json()))
    .catch((error) => {
      console.error('Error:', error);
    });
}
