const URL = 'http://localhost:8080/tasks';
export const fetchData = () => fetch(URL).then((response) => response.json());

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
    .then((response) => response.json())
    .catch((error) => {
      console.error('Error:', error);
    });
}
