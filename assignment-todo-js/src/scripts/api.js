const URL = 'http://localhost:8080/tasks';
export const fetchData = () => fetch(URL).then((response) => response.json());
