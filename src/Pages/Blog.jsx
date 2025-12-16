
import React, {useState, useEffect} from "react";
import api from "../Services/api";

const Blog = () => {

    const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetchBlogs();
  },[]);

  const fetchBlogs = async () => {
    try {
      const response = await api.get("/posts/getpost");
      setBlogs(response.data.posts);
    } catch (error) {
      console.log(error);
    }
  };

    return (
         <div className=" mx-auto py-12 px-4 md:px-16 lg:px-24">
      <h2 className="text-2xl font-bold mb-6 text-center font-serif">Blogs</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 cursor-pointer">
        {blogs.map((blog) => {
          return (
            <div
              key={blog._id}
              className="bg-white p-4 shadow rounded  relative border tranform transition-transform duration-300 hover:scale-105"
            >
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-48 object-contain mb-4"
              />
              <h2 className="text-lg font-semibold font-serif">{blog.title}</h2>
              <p className=" font-bold font-serif">Author: {blog.user.name}</p>
              <p className="text-gray-500 font-serif">{blog.description}</p>
            </div>
          );
        })}
      </div>
    </div>
    );
};

export default Blog;