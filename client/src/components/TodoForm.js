import React, { useState } from 'react';

const TodoForm = ({ onSubmit, placeholder = "todo...", buttonText = "Add Todo" }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(input);
    setInput('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex space-x-2 flex-row md:items-center md:space-x-4 mx-auto">
      <div className="relative">
        <input
          required
          value={input}
          onChange={(e) => setInput(e.target.value)}
          type="text"
          name="Search"
          placeholder={placeholder}
          className="w-48 py-2 pl-10 text-sm rounded-md sm:w-auto focus:outline-none bg-gray-100 text-gray-800 border border-gray-300 focus:bg-gray-50"
        />
      </div>
      <button type="submit" className="px-6 py-2 font-semibold rounded lg:block bg-indigo-600 text-gray-50">{buttonText}</button>
    </form>
  );
};

export default TodoForm;