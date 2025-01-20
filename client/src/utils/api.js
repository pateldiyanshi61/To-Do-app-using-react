import axios from 'axios';

const api = axios.create({
  baseURL: '/todo',
  headers: {
    'Authorization': `Bearer ${localStorage.getItem('token')}`,
  },
});

export const loadTodos = async (id = '') => {
  const response = await api.get(id ? `/gettodo/${id}` : '/gettodos');
  return response.data;
};

export const createTodo = async (title) => {
  const response = await api.post('/createtodo', { title, createdAt: Date.now() });
  return response.data;
};

export const deleteTodo = async (id) => {
  const response = await api.delete(`/deletetodo/${id}`);
  return response.data;
};

export const editTodo = async (id, title) => {
  const response = await api.put(`/edittodo/${id}`, { title });
  return response.data;
};

export const createTask = async (todoId, task) => {
  const response = await api.post(`/createtask/${todoId}`, { task });
  return response.data;
};

export const deleteTask = async (todoId, taskString) => {
  const response = await api.delete(`/deletetask/${todoId}`, { data: { taskString } });
  return response.data;
};

export const sortTodos = async (order) => {
  const response = await api.get('/sortTodo', { params: { order } });
  return response.data.todos;
};