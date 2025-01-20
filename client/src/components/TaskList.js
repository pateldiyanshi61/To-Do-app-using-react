import React from 'react';
import TodoForm from './TodoForm';

const TaskList = ({ title, tasks, onCreateTask, onDeleteTask }) => {
  return (
    <div className="container p-2 mx-auto sm:p-4 text-gray-800">
      <h1 className="mb-4 text-2xl font-semibold leading-tight">TODO: {title}</h1>
      <header className="p-4 bg-gray-100 text-gray-800">
        <div className="container flex justify-between h-16 mx-auto">
          <TodoForm onSubmit={onCreateTask} placeholder="task..." buttonText="Add Task" />
        </div>
      </header>
      <div className="overflow-x-auto shadow-md">
        <table className="min-w-full text-xs text-center">
          <thead className="bg-gray-300">
            <tr className="text-left">
              <th className="p-3">Task</th>
              <th className="p-3">Delete</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task, index) => (
              <tr key={index} className="border-b border-opacity-20 border-gray-300 bg-gray-50">
                <td className="p-3"><p>{task}</p></td>
                <td className="p-3">
                  <button onClick={() => onDeleteTask(task)} className="px-3 py-1 font-semibold rounded-md bg-indigo-600 text-gray-50">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TaskList;