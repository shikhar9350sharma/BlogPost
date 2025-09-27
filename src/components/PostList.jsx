import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  const fetchPosts = async () => {
    try {
      const res = await fetch('https://blog-post-backend-1h11.onrender.com/api/blog/user', {
        method: 'GET',
        credentials: 'include'
      });
      const data = await res.json();
      if (res.ok) {
        setPosts(data);
      } else {
        toast.error(data.message || 'Failed to load posts');
      }
    } catch {
      toast.error('Server error');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;

    try {
      const res = await fetch(`https://blog-post-backend-1h11.onrender.com/api/blog/${id}`, {
        method: 'DELETE',
        credentials: 'include'
      });
      const data = await res.json();
      if (res.ok) {
        toast.success('Post deleted');
        setPosts(posts.filter(post => post._id !== id));
      } else {
        toast.error(data.message || 'Delete failed');
      }
    } catch {
      toast.error('Server error');
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-[#1f1f1f] text-white shadow-lg rounded border border-gray-700">
      <h2 className="text-2xl font-bold mb-4 text-white">🗂️ Your Blog Posts</h2>
      <ToastContainer />
      {posts.length === 0 ? (
        <p className="text-gray-400">You haven't written any blogs yet.</p>
      ) : (
        <ul className="space-y-4">
          {posts.map(post => (
            <li key={post._id} className="border border-gray-600 p-4 rounded shadow-sm bg-[#2c2c2c]">
              <h3 className="text-lg font-semibold text-white">{post.title}</h3>
              <p className="text-sm text-gray-400">{new Date(post.createdAt).toLocaleString()}</p>
              <div className="mt-2 flex gap-4">
                <button
                  onClick={() => handleEdit(post._id)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition"
                >
                  ✏️ Edit
                </button>
                <button
                  onClick={() => handleDelete(post._id)}
                  className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
                >
                  🗑️ Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PostList;