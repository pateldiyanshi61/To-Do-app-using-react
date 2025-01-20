
import React from 'react';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
       
        <button
          className="absolute top-4 right-4 text-gray-600 text-2xl" 
          onClick={onClose}
        >
          &times; 
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
