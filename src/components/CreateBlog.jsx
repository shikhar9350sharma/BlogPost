import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateBlog = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isPublished, setIsPublished] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5001/api/blog/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({ title, content, isPublished })
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('✅ Blog created successfully!');
        setTitle('');
        setContent('');
        setIsPublished(false);
      } else {
        toast.error(data.message || '❌ Something went wrong');
      }
    } catch (error) {
      console.error('Error creating blog:', error);
      toast.error('❌ Server error');
    }
  };

  return (
    // <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
    //   <h2 className="text-2xl font-bold mb-6 text-gray-800">📝 Create a New Blog</h2>

    //   <form onSubmit={handleSubmit} className="space-y-6">
    //     <div>
    //       <label className="block text-sm font-medium text-gray-700">Title</label>
    //       <input
    //         type="text"
    //         value={title}
    //         onChange={(e) => setTitle(e.target.value)}
    //         required
    //         className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
    //         placeholder="Enter blog title"
    //       />
    //     </div>

    //     <div>
    //       <label className="block text-sm font-medium text-gray-700">Content</label>
    //       <textarea
    //         value={content}
    //         onChange={(e) => setContent(e.target.value)}
    //         required
    //         rows="6"
    //         className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
    //         placeholder="Write your blog content here..."
    //       />
    //     </div>

    //     <div className="flex items-center">
    //       <input
    //         type="checkbox"
    //         checked={isPublished}
    //         onChange={(e) => setIsPublished(e.target.checked)}
    //         className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
    //       />
    //       <label className="ml-2 block text-sm text-gray-700">Publish Now</label>
    //     </div>

    //     <button
    //       type="submit"
    //       className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200"
    //     >
    //       🚀 Create Blog
    //     </button>
    //   </form>

    //   <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
    // </div>
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-[#1f1f1f] text-white shadow-lg rounded-lg border border-gray-700">
      <h2 className="text-2xl font-bold mb-6 text-white">📝 Create a New Blog</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-300">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            placeholder="Enter blog title"
            className="mt-1 block w-full px-4 py-2 bg-[#2c2c2c] text-white border border-gray-600 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300">Content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            rows="6"
            placeholder="Write your blog content here..."
            className="mt-1 block w-full px-4 py-2 bg-[#2c2c2c] text-white border border-gray-600 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            checked={isPublished}
            onChange={(e) => setIsPublished(e.target.checked)}
            className="h-4 w-4 accent-blue-600 border-gray-600 rounded focus:ring-blue-500"
          />
          <label className="ml-2 block text-sm text-gray-300">Publish Now</label>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200"
        >
          🚀 Create Blog
        </button>
      </form>

      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
    </div>
  );
};

export default CreateBlog;