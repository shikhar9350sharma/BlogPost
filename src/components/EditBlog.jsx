import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isPublished, setIsPublished] = useState(false);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await fetch('http://localhost:5001/api/blog/user', {
          method: 'GET',
          credentials: 'include'
        });
        const data = await res.json();
        const blog = data.find(b => b._id === id);
        if (blog) {
          setTitle(blog.title);
          setContent(blog.content);
          setIsPublished(blog.isPublished);
        } else {
          toast.error('Blog not found');
        }
      } catch {
        toast.error('Error fetching blog');
      }
    };
    fetchBlog();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:5001/api/blog/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ title, content, isPublished })
      });
      const data = await res.json();
      if (res.ok) {
        toast.success('Blog updated successfully');
        navigate('/dashboard');
      } else {
        toast.error(data.message || 'Update failed');
      }
    } catch {
      toast.error('Server error');
    }
  };

  return (
    // <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow rounded">
    //   <h2 className="text-xl font-bold mb-4">Edit Blog</h2>
    //   <form onSubmit={handleUpdate} className="space-y-4">
    //     <input
    //       type="text"
    //       value={title}
    //       onChange={(e) => setTitle(e.target.value)}
    //       required
    //       className="w-full border px-4 py-2 rounded"
    //       placeholder="Blog Title"
    //     />
    //     <textarea
    //       value={content}
    //       onChange={(e) => setContent(e.target.value)}
    //       rows="6"
    //       required
    //       className="w-full border px-4 py-2 rounded"
    //       placeholder="Blog Content"
    //     />
    //     <label className="flex items-center">
    //       <input
    //         type="checkbox"
    //         checked={isPublished}
    //         onChange={(e) => setIsPublished(e.target.checked)}
    //         className="mr-2"
    //       />
    //       Publish Now
    //     </label>
    //     <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
    //       Update Blog
    //     </button>
    //   </form>
    //   <ToastContainer />
    // </div>
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-[#1f1f1f] text-white shadow-lg rounded border border-gray-700">
      <h2 className="text-xl font-bold mb-4 text-white">Edit Blog</h2>
      <form onSubmit={handleUpdate} className="space-y-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          placeholder="Blog Title"
          className="w-full bg-[#2c2c2c] text-white border border-gray-600 px-4 py-2 rounded placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows="6"
          required
          placeholder="Blog Content"
          className="w-full bg-[#2c2c2c] text-white border border-gray-600 px-4 py-2 rounded placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <label className="flex items-center text-gray-300">
          <input
            type="checkbox"
            checked={isPublished}
            onChange={(e) => setIsPublished(e.target.checked)}
            className="mr-2 accent-blue-600"
          />
          Publish Now
        </label>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Update Blog
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default EditBlog;