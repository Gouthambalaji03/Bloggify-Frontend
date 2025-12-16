import React, { useState } from "react";
import api from "../Services/api";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const CreateBlog = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description || !image) {
      setError("All fields are required.");
      return;
    }
   const updatedDescription = description.replace(/<\/?p>/g, "");
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", updatedDescription);
    if (image) formData.append("image", image);
    try {
      const response = await api.post("/posts/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      toast.success(response.data.message);
      navigate("/");
    } catch (error) {
      setError(error.response.data.message);
      toast.error(error.response.data.message);
    }

    setTitle("");
    setDescription("");
    setImage(null);
  };


  return (
    <div className="container mx-auto mt-8">
      <form onSubmit={handleSubmit} className="bg-white shadow-2xl rounded p-8">
        <h2 className="text-2xl font-bold font-serif mb-4 text-center">
          Create a New Blog
        </h2>
        {error && (
          <div className="bg-red-100 p-3 mb-4 text-red-600 rounded">
            {error}
          </div>
        )}
        <p>
          <label className="block font-bold mb-2 font-serif" htmlFor="title">
            Title
          </label>
          <input
            className="w-full p-2 border border-gray-300 mb-4 rounded"
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter Your Blog Title"
          />
        </p>
        <ReactQuill
          theme="snow"
          value={description}
          onChange={setDescription}
        />
        <p>
          <label htmlFor="image" className="block font-bold mb-2 font-serif">
            Image
          </label>
          <input
            type="file"
            name="image"
            id="image"
            placeholder="Upload Your blog image"
            accept="image/*"
            className="w-full p-2 border border-gray-300 mb-4 rounded cursor-pointer"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </p>
        <button
          type="submit"
          className="bg-blue-500 text-white rounded font-bold font-serif px-2 py-4 mt-8 text-xl"
        >
          Create Blog
        </button>
      </form>
    </div>
  );
};

export default CreateBlog;
