
import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [cred, setcred] = useState({
    email: '',
    password: ''
  });
  const [darkMode, setDarkMode] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    submitdata();
    setcred({
      email: '',
      password: ''
    });
  };

  const submitdata = async () => {
    try {
      const res = await axios.post('/user/login', cred);
      const response = res.data;
      if (response.success) {
        localStorage.setItem('token', response.token);
        toast.success(response.message, {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
        setTimeout(() => {
          navigate('/landing');
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
          theme: 'light',
        });
      }
    } catch (error) {
      toast.error('User not found', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    }
  };

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`${darkMode ? 'dark bg-gray-900 text-white' : 'bg-white text-gray-900'} h-screen transition-all`}>

      <nav className={`flex justify-between items-center p-4 ${darkMode ? 'bg-gray-800' : 'bg-gray-200'}`}>
        <h1 className="text-xl font-bold">Login Page</h1>
        <button
          onClick={toggleTheme}
          className="bg-indigo-600 text-white px-4 py-2 rounded"
        >
          {darkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
      </nav>

      <div className="flex flex-col md:flex-row h-full">

        <div className={`flex-1 flex flex-col justify-center items-center p-8 ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfjfrVblG8xbtCcZGnMMnvYUo7t9-RZZm555A1MYNCQe6WuOgy0jtwnFzRyBQDexIew1c&usqp=CAU"
            alt="Descriptive Graphic"
            className="mb-6 w-full md:max-w-sm"
          />
        </div>


        <div className={`flex-1 flex flex-col justify-center items-center p-6 md:p-12 ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
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
          <h1 className="text-2xl md:text-3xl font-semibold mb-8">
            Login to your account
          </h1>
          <form onSubmit={handleSubmit} className="w-full max-w-md space-y-6">
            <div className="flex flex-col space-y-5">
              <input
                required
                value={cred.email}
                onChange={(e) => setcred({ ...cred, email: e.target.value })}
                type="email"
                placeholder="Email address"
                className={`p-3 rounded-md border ${darkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'}`}
              />
              <input
                required
                value={cred.password}
                onChange={(e) => setcred({ ...cred, password: e.target.value })}
                type="password"
                placeholder="Password"
                className={`p-3 rounded-md border ${darkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'}`}
              />
            </div>
            <div className="flex items-center justify-between mt-4">
              <Link to="/" className={`text-sm ${darkMode ? 'text-indigo-400' : 'text-indigo-600'}`}>
                Don't have an account? Signup
              </Link>
            </div>
            <button
              type="submit"
              className={`w-full py-3 mt-4 rounded-md ${darkMode ? 'bg-indigo-500 hover:bg-indigo-400' : 'bg-indigo-600 hover:bg-indigo-500'} text-white`}
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
