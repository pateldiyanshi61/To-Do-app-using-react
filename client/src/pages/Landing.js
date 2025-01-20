
import React, { useEffect, useState } from 'react';
import TodoList from '../components/TodoList';
import TaskList from '../components/TaskList';
import TodoForm from '../components/TodoForm';
import Modal from '../components/Modal'; 
import { loadTodos, createTodo, deleteTodo, editTodo, createTask, deleteTask, sortTodos } from '../utils/api';
import { showToast } from '../utils/toast';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Landing = () => {

  const [todos, setTodos] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [showTask, setShowTask] = useState(false);
  const [taskId, setTaskId] = useState(null);
  const [title, setTitle] = useState('');

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const { todos} = await loadTodos();
   
      setTodos(todos);
    } catch (error) {
      showToast(error.message, 'error');
    }
  };

  const handleCreateTodo = async (todo) => {
    try {
      const response = await createTodo(todo);
      showToast(response.message, response.success ? 'success' : 'error');
      if (response.success) fetchTodos();
    } catch (error) {
      showToast(error.message, 'error');
    }
  };

  const handleDeleteTodo = async (id) => {
    try {
      const response = await deleteTodo(id);
      showToast(response.message, response.success ? 'success' : 'error');
      if (response.success) fetchTodos();
    } catch (error) {
      showToast(error.message, 'error');
    }
  };
  const handleEditTodo = async (id, newTodo) => {
    try {
      if (newTodo) {
        const response = await editTodo(id, newTodo); 
        showToast(response.message, response.success ? 'success' : 'error');
        if (response.success) fetchTodos(); 
      }
    } catch (error) {
      showToast(error.message, 'error');
    }
  };

  const handleTaskClick = async (id) => {
    try {
      const response = await loadTodos(id);
      setTasks(response.todo.tasks);
      setShowTask(true);
      setTaskId(id);
      setTitle(response.todo.title);
    } catch (error) {
      showToast(error.message, 'error');
    }
  };

  const handleCreateTask = async (task) => {
    try {
      const response = await createTask(taskId, task);
      showToast(response.message, response.success ? 'success' : 'error');
      if (response.success) {
        const updatedTodo = await loadTodos(taskId);
        setTasks(updatedTodo.todo.tasks);
      }
    } catch (error) {
      showToast(error.message, 'error');
    }
  };

  const handleDeleteTask = async (taskString) => {
    try {
      const response = await deleteTask(taskId, taskString);
      showToast(response.message, response.success ? 'success' : 'error');
      if (response.success) {
        const updatedTodo = await loadTodos(taskId);
        setTasks(updatedTodo.todo.tasks);
      }
    } catch (error) {
      showToast(error.message, 'error');
    }
  };

  const handleSort = async (order) => {
    try {
      const sortedTodos = await sortTodos(order);
      setTodos(sortedTodos);
    } catch (error) {
      showToast(error.message, 'error');
    }
  };
  const handleModalClose = () => {
    setShowTask(false);
    window.location.reload(); 
  };

  return (
 <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <header className="p-4 bg-gray-100 text-gray-800">
        <div className="container flex flex-col md:flex-row text-center space-y-2 md:space-y-0 justify-between h-16 mx-auto">
          <TodoForm onSubmit={handleCreateTodo} />
        </div>
      </header>
      <div>
      <TodoList
        todos={todos}
        onDelete={handleDeleteTodo}
        onEdit={handleEditTodo}
        onTaskClick={handleTaskClick}
        onSort={handleSort}
      />
   
      <Modal isOpen={showTask}  onClose={handleModalClose}>
        <TaskList
          title={title}
          tasks={tasks}
          onCreateTask={handleCreateTask}
          onDeleteTask={handleDeleteTask}
        />
      </Modal>
      </div>
    </>
  );
};

export default Landing;