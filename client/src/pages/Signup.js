

import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate();
  const [cred, setcred] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [darkMode, setDarkMode] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    submitdata();
    setcred({
      name: '',
      email: '',
      password: ''
    });
  };

  const submitdata = async () => {
    try {
      const res = await axios.post('/user/signup', cred);
      const response = res.data;
      if (response.success) {
        toast.success(response.message, {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: darkMode ? 'dark' : 'light',
        });
        setTimeout(() => {
          navigate('/login');
        }, 1000);
      } else {
        toast.error(response.message, {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: darkMode ? 'dark' : 'light',
        });
      }
    } catch (error) {
      toast.error(error.message, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: darkMode ? 'dark' : 'light',
      });
    }
  };

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`${darkMode ? 'dark' : ''} h-screen`}>

      <nav className={`flex justify-between items-center p-4 ${darkMode ? 'bg-gray-900' : 'bg-gray-200'}`}>
        <h1 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Signup Page</h1>
        <button
          onClick={toggleTheme}
          className={`px-4 py-2 rounded ${darkMode ? 'bg-indigo-500 text-white' : 'bg-indigo-600 text-white'}`}
        >
          {darkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
      </nav>


      <div className={`flex flex-col md:flex-row h-full ${darkMode ? 'bg-black text-white' : 'bg-white text-gray-900'}`}>


        <div className="flex-1 flex flex-col justify-center items-center text-left p-8 md:p-12">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5O7USxTaagqI0sX3Nake5TEzIlD9Qf0pDTg&s"
            alt="Descriptive Graphic"
            className="mb-6 max-w-full h-auto"
          />
        </div>


        <div className="flex-1 flex flex-col justify-center items-center p-8 md:p-12">
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
            theme={darkMode ? 'dark' : 'light'}
          />
          <h1 className="text-2xl md:text-3xl font-semibold mb-8">
            Signup for an account
          </h1>
          <form onSubmit={handleSubmit} className="w-full max-w-md space-y-6">
            <div className="flex flex-col space-y-5">
              <input
                required
                value={cred.name}
                onChange={(e) => setcred({ ...cred, name: e.target.value })}
                type="text"
                placeholder="Name"
                className={`p-3 rounded-md border ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-900'}`}
              />
              <input
                required
                value={cred.email}
                onChange={(e) => setcred({ ...cred, email: e.target.value })}
                type="email"
                placeholder="Email address"
                className={`p-3 rounded-md border ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-900'}`}
              />
              <input
                required
                value={cred.password}
                onChange={(e) => setcred({ ...cred, password: e.target.value })}
                type="password"
                placeholder="Password"
                className={`p-3 rounded-md border ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-900'}`}
              />
            </div>
            <div className="flex items-center justify-between mt-4">
              <Link to="/login" className={`text-sm ${darkMode ? 'text-indigo-400' : 'text-indigo-600'}`}>
                Already have an account? Login
              </Link>
            </div>
            <button
              type="submit"
              className={`w-full py-3 mt-4 rounded-md ${darkMode ? 'bg-indigo-500 text-white' : 'bg-indigo-600 text-white'}`}
            >
              Signup
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
