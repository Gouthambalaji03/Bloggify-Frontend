import React, {useEffect, useState } from 'react';
import api from '../Services/api';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const AdminPanel = () => {
  const navigate = useNavigate();
  const [posts, setposts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchunApprovedPosts();
  }, []);

  const fetchunApprovedPosts = async () => {
    try {
      const response = await api.get("/posts/unapprovedpost");
      setposts(response.data.posts);
    } catch (error) {
      console.log(error);
    }
  };

  const approveBlog = async (id) => {
    try {
      const response = await api.patch(`/posts/${id}/approve`);
      setposts(posts.filter((post) => post._id !== id));
      toast.success(response.data.message);
    } catch (error) {
      setError(error.response.data.message);
      toast.error(error.response.data.message);
    }
  };

  const rejectBlog = async (id) => {
    try {
      const response = await api.delete(`/posts/delete/${id}`);
      setposts(posts.filter((post) => post._id !== id));
      toast.success(response.data.message);
    } catch (error) {
      setError(error.response.data.message);
      toast.error(error.response.data.message);
    }
  };
    return (
         <div className="container mx-auto mt-8">
      <h1 className="text-3xl text-center font-bold font-serif underline">
        Admin panel
      </h1>
      {error && (
        <div className="bg-red-100 p-3 mb-4 text-red-600 rounded">{error}</div>
      )}
      <div className=" absolute grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 cursor-pointer mt-8">
        {posts.map((post) => (
          <div
            key={post._id}
            className="bg-white p-4 shadow rounded  relative border tranform transition-transform duration-300 hover:scale-105"
          >
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-48 object-contain mb-4"
            />
            <h3 className="text-lg font-bold font-serif">{post.title}</h3>
            <p className="font-serif font-bold">Author: {post.user.name}</p>
            <p className="text-gray-600 font-serif">{post.description}</p>
            <div className="mt-4 flex gap-2">
              <button
                onClick={() => approveBlog(post._id)}
                className="bg-green-500 text-white py-2 px-4 rounded mt-4 font-serif"
              >
                Approve
              </button>
              <button
                onClick={() => rejectBlog(post._id)}
                className="bg-red-500 text-white py-2 px-4 rounded mt-4 font-serif"
              >
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
    );
};

export default AdminPanel;