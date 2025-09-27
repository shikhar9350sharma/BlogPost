// import React, { useEffect, useState } from 'react';
// import { toast, ToastContainer } from 'react-toastify';
// import { useNavigate } from 'react-router-dom';
// import 'react-toastify/dist/ReactToastify.css';

// const Dashboard = () => {
//   const [user, setUser] = useState(null);
//   const [blogs, setBlogs] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const checkAuth = async () => {
//       try {
//         const res = await fetch('http://localhost:5001/api/auth/check', {
//           method: 'GET',
//           credentials: 'include'
//         });
//         const data = await res.json();
//         if (res.ok) {
//           setUser(data);
//           fetchBlogs(); // ✅ Fetch blogs after auth
//         } else {
//           toast.error('Unauthorized. Please login.');
//           navigate('/login');
//         }
//       } catch {
//         toast.error('Server error');
//       }
//     };

//     const fetchBlogs = async () => {
//       try {
//         const res = await fetch('http://localhost:5001/api/blog/user', {
//           method: 'GET',
//           credentials: 'include'
//         });
//         const data = await res.json();
//         if (res.ok) {
//           setBlogs(data);
//         } else {
//           toast.error(data.message || 'Failed to load blogs');
//         }
//       } catch {
//         toast.error('Server error');
//       }
//     };

//     checkAuth();
//   }, [navigate]);

//   return (
//     <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow rounded">
//       <ToastContainer />
//       {user && <h2 className="text-2xl font-bold mb-4">Welcome, {user.fullName}</h2>}

//       <div className="mb-6">
//         <button
//           onClick={() => navigate('/create')}
//           className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//         >
//           ➕ Create New Blog
//         </button>
//       </div>

//       <h3 className="text-xl font-semibold mb-2">Your Blogs</h3>
//       {blogs.length === 0 ? (
//         <p className="text-gray-600">You haven't written any blogs yet.</p>
//       ) : (
//         <ul className="space-y-4">
//           {blogs.map(blog => (
//             <li key={blog._id} className="border p-4 rounded shadow-sm">
//               <h4 className="text-lg font-semibold">{blog.title}</h4>
//               <p className="text-sm text-gray-500">{new Date(blog.createdAt).toLocaleString()}</p>
//               <p className="mt-2 text-gray-700">{blog.content.slice(0, 100)}...</p>
//               <div className="mt-2 flex gap-4">
//                 <button
//                   onClick={() => navigate(`/edit/${blog._id}`)}
//                   className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
//                 >
//                   ✏️ Edit
//                 </button>
//                 <button
//                   onClick={() => navigate('/posts')}
//                   className="bg-gray-600 text-white px-3 py-1 rounded hover:bg-gray-700"
//                 >
//                   Manage All
//                 </button>
//               </div>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default Dashboard;
import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch('http://localhost:5001/api/auth/check', {
          method: 'GET',
          credentials: 'include'
        });
        const data = await res.json();
        if (res.ok) {
          setUser(data);
          fetchBlogs();
        } else {
          toast.error('Unauthorized. Please login.');
          navigate('/login');
        }
      } catch {
        toast.error('Server error');
      }
    };

    const fetchBlogs = async () => {
      try {
        const res = await fetch('http://localhost:5001/api/blog/user', {
          method: 'GET',
          credentials: 'include'
        });
        const data = await res.json();
        if (res.ok) {
          setBlogs(data);
        } else {
          toast.error(data.message || 'Failed to load blogs');
        }
      } catch {
        toast.error('Server error');
      }
    };

    checkAuth();
  }, [navigate]);

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-[#1f1f1f] text-white shadow-lg rounded border border-gray-700">
      <ToastContainer />
      {user && (
        <h2 className="text-2xl font-bold mb-4 text-white">
          Welcome, {user.fullName}
        </h2>
      )}

      <div className="mb-6">
        <button
          onClick={() => navigate('/create')}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          ➕ Create New Blog
        </button>
      </div>

      <h3 className="text-xl font-semibold mb-2 text-white">Your Blogs</h3>
      {blogs.length === 0 ? (
        <p className="text-gray-400">You haven't written any blogs yet.</p>
      ) : (
        <ul className="space-y-4">
          {blogs.map(blog => (
            <li
              key={blog._id}
              className="border border-gray-600 p-4 rounded shadow-sm bg-[#2c2c2c]"
            >
              <h4 className="text-lg font-semibold text-white">{blog.title}</h4>
              <p className="text-sm text-gray-400">
                {new Date(blog.createdAt).toLocaleString()}
              </p>
              <p className="mt-2 text-gray-300">
                {blog.content.slice(0, 100)}...
              </p>
              <div className="mt-2 flex gap-4">
                <button
                  onClick={() => navigate(`/edit/${blog._id}`)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition"
                >
                  ✏️ Edit
                </button>
                <button
                  onClick={() => navigate('/posts')}
                  className="bg-gray-700 text-white px-3 py-1 rounded hover:bg-gray-800 transition"
                >
                  Manage All
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dashboard;