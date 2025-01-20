import React, { useState, useEffect } from 'react';
import Modal from './EditModal'; 

const TodoList = ({ todos, onDelete, onEdit, onTaskClick, onSort }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [filteredTodos, setFilteredTodos] = useState(todos); 
  const [originalTodos, setOriginalTodos] = useState(todos); 

  useEffect(() => {
    setOriginalTodos(todos); 
    setFilteredTodos(todos);  
  }, [todos]);

 
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem('completedTodos')) || {};
    const updatedTodos = todos.map(todo => ({
      ...todo,
      isCompleted: storedTodos[todo._id] || false,  
    }));
    setFilteredTodos(updatedTodos);
  }, [todos]);


  const handleCompletionToggle = (id) => {
    const updatedTodos = filteredTodos.map(todo => {
      if (todo._id === id) {
        todo.isCompleted = !todo.isCompleted;
      
        const storedTodos = JSON.parse(localStorage.getItem('completedTodos')) || {};
        storedTodos[id] = todo.isCompleted;
        localStorage.setItem('completedTodos', JSON.stringify(storedTodos));
      }
      return todo;
    });
    setFilteredTodos(updatedTodos);
  };

  const handleEditClick = (todo) => {
    setSelectedTodo(todo);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedTodo(null);
  };

  const onSearch = (searchTerm) => {
    const lowercasedSearchTerm = searchTerm.toLowerCase();
    const filtered = originalTodos.filter(todo =>
      todo.title.toLowerCase().includes(lowercasedSearchTerm)
    );
    setFilteredTodos(filtered);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const newTodo = e.target.newTodo.value;
    if (newTodo && selectedTodo) {
      await onEdit(selectedTodo._id, newTodo); 
      closeModal(); 
    }
  };

  return (
    <div className="bg-gray-100 container mx-auto p-6 sm:p-8 md:p-10 lg:p-12 max-w-4xl mt-10">
      <h2 className="mb-4 text-center md:text-left text-2xl font-semibold leading-tight">Todos</h2>
      
     
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search tasks..."
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>

      <ul className='list-none mx-auto md:mx-0 flex flex-row w-full justify-evenly text-center items-center font-semibold m-3'>
        Sort by Date:
        <li className='cursor-pointer border rounded-lg shadow-md p-1 border-gray-500 bg-indigo-600 text-white' onClick={() => onSort(1)}>Oldest</li>
        <li className='cursor-pointer border rounded-lg shadow-md p-1 border-gray-500 bg-indigo-600 text-white' onClick={() => onSort(-1)}>Newest</li>
      </ul>
      
      <div className="overflow-x-auto shadow-md">
        <table className="min-w-full text-xs">
          <thead className="bg-gray-300">
            <tr className="text-left">
            <th className="p-4 text-lg">Completed</th>
              <th className="p-4 text-lg">Todos</th>
              <th className="p-4 text-lg">Created At</th>
              <th className="p-4 text-lg">Updated At</th>
             
              <th className="p-4 text-lg">Tasks</th>
              <th className="p-4 text-lg">Delete</th>
              <th className="p-4 text-lg">Edit</th>
            </tr>
          </thead>
          <tbody>
            {filteredTodos.map(todo => (
              <tr key={todo._id} className="border-b border-opacity-20 border-gray-300 bg-gray-50">
              <td className="p-4">
            
                  <input
                    type="checkbox"
                    checked={todo.isCompleted}
                    onChange={() => handleCompletionToggle(todo._id)}
                  />
                </td>
                <td className="p-4"><p className="text-md">{todo.title}</p></td>
                <td className="p-4"><p className="text-md">{new Date(todo.createdAt).toDateString()}</p></td>
                <td className="p-4"><p className="text-md">{new Date().toGMTString(todo.updatedAt)}</p></td>
               
                <td className="p-4">
                  <button onClick={() => onTaskClick(todo._id)} className="px-4 py-2 font-semibold rounded-md bg-indigo-600 text-gray-50">
                    <span>Tasks: {todo.tasks.length}</span>
                  </button>
                </td>
                <td className="p-4">
                  <button onClick={() => onDelete(todo._id)} className="px-4 py-2 font-semibold rounded-md bg-red-600 text-gray-50">
                    <span>Delete</span>
                  </button>
                </td>
                <td className="p-4">
                  <button onClick={() => handleEditClick(todo)} className="px-4 py-2 font-semibold rounded-md bg-green-600 text-gray-50">
                    <span>Edit</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={handleEditSubmit}
        defaultValue={selectedTodo?.title}
      />
    </div>
  );
};

export default TodoList;
