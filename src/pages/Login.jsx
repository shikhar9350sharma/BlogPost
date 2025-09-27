import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const navigate = useNavigate();
  const { fetchUser } = useContext(AuthContext);

  const togglePass = (e) => {
    e.preventDefault();
    setShowPass(!showPass);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('https://blog-post-backend-1h11.onrender.com/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();
      if (res.ok) {
        await fetchUser();
        toast.success('✅ Login successful');
        setTimeout(() => {
          navigate('/dashboard');
        }, 1000);
      } else {
        toast.error(data.message || 'Login failed');
      }
    } catch {
      toast.error('Server error');
    }
  };

  return (
    <section className="flex flex-col md:flex-row items-center justify-center h-full md:min-h-screen w-full px-4 py-4 md:px-20 bg-[#2c2c2c]">
      {/* Heading */}
      <div className="w-full md:w-1/2 px-4 flex flex-col items-center md:items-start space-y-2">
        <h1 className=" py-0 md:py-3 font-bold text-3xl md:text-6xl capitalize bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 bg-clip-text text-transparent">
          Blogify
        </h1>
        <h2 className=" py-0 md:py-3 font-bold text-2xl md:text-5xl bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
          Your Own Blog Platform
        </h2>
        <h2 className=" py-0 md:py-3 capitalize font-bold text-xl md:text-3xl bg-gradient-to-r from-lime-400 via-emerald-500 to-indigo-600 bg-clip-text text-transparent">
          Publish your blogs on easy tips
        </h2>
      </div>

      {/* Form */}
      <div className="w-full max-w-md mx-auto mt-10 bg-[#1f1f1f] p-6 shadow-lg rounded border border-gray-700 text-white">
        <h2 className="text-xl font-bold mb-4 text-center">Login to Your Blog</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full bg-[#2c2c2c] text-white border border-gray-600 px-4 py-2 rounded placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="relative">
            <input
              type={showPass ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-[#2c2c2c] text-white border border-gray-600 px-4 py-2 pr-12 rounded placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={togglePass}
              aria-label={showPass ? 'Hide password' : 'Show password'}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-sm text-gray-400 hover:text-white px-2 py-1"
            >
              {showPass ? 'Hide' : 'Show'}
            </button>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>

        {/* Signup Redirect */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-400">New here?</p>
          <button
            onClick={() => navigate('/signup')}
            className="mt-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
          >
            Create an Account
          </button>
        </div>

        <ToastContainer />
      </div>
    </section>
  );
};

export default Login;