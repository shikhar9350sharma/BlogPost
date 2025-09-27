import React, { useEffect, useState, useContext } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from '../context/AuthContext';

const Layout = () => {
  const [showMenu, setShowMenu] = useState(false);
  const { user, setUser, fetchUser } = useContext(AuthContext); // ✅ include setUser
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch('http://localhost:5001/api/auth/check', {
          method: 'GET',
          credentials: 'include'
        });
        if (res.ok) {
          const data = await res.json();
          setUser(data);
        }
      } catch (err) {
        console.warn('Auth check failed:', err);
      }
    };
    checkAuth();
  }, [setUser]);

  const handleLogout = async () => {
    try {
      const res = await fetch('http://localhost:5001/api/auth/logout', {
        method: 'POST',
        credentials: 'include'
      });

      if (res.ok) {
        // Don't rely on body — just show toast and redirect
        await res.json().catch(() => { });
        toast.success('👋 Logged out successfully');
        setUser(null);
        navigate('/login');
      } else {
        const errorData = await res.json().catch(() => ({}));
        toast.error(errorData.message || 'Logout failed');
      }
    } catch (err) {
      console.error('Logout error:', err);
      toast.error('Server error');
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#1f1f1f] text-white">
      <header className="bg-blue-700 text-white py-4 px-6 flex justify-between items-center shadow">
        <div className='flex items-center gap-2'>
          <img loading='eager' className='w-10 h-10 ' src="blog.png" alt="img" />
          <h1 className="text-xl font-bold uppercase">Blogify</h1>
        </div>
        {user && (
          <div className="relative">
            <img
              src="user.png"
              alt="Profile"
              className="w-10 h-10 rounded-full cursor-pointer border-2 border-white"
              onClick={() => setShowMenu(!showMenu)}
            />
            {showMenu && (
              <div className="absolute right-0 mt-2 bg-[#2c2c2c] shadow-lg rounded p-2 z-10 border border-gray-700">
                <button
                  onClick={handleLogout}
                  className="text-red-400 hover:text-red-500 px-4 py-2 text-sm"
                >
                  🚪 Logout
                </button>
              </div>
            )}
          </div>
        )}
      </header>

      <main className="flex-grow p-6 bg-[#1f1f1f]">
        <Outlet />
      </main>

      <footer className="bg-[#2c2c2c] text-center py-4 border-t border-gray-700">
        <p className="text-sm text-gray-400">© 2025 Blog Platform</p>
      </footer>

      <ToastContainer />
    </div>
  );
};

export default Layout;