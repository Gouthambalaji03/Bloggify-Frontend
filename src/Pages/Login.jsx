import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import api from "../Services/api";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/auth/login", {
        email, 
        password
        });
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("role", response.data.role);
      toast.success(response.data.message);
      setError(null);
      navigate("/");
    } catch (error) {
      setError(error.response.data.message);
      toast.error(error.response.data.message);
    }
    setEmail("");
    setPassword("");
  };
  return (
    <div className="container mx-auto mt-8">
      <form
        className="max-w-md mx-auto bg-white p-8 shadow-lg"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl mb-4 font-bold font-serif text-center">
          Login
        </h2>
        {error && (
          <div className="bg-red-100 p-3 mb-4 text-red-600 rounded">
            {error}
          </div>
        )}
        <p>
          <label className="block mb-2 font-bold font-serif" htmlFor="email">
            Email:
          </label>
          <input
            className="w-full p-2 border border-gray-300 mb-4 rounded font-serif"
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter Your Email"
          />
        </p>
        <p>
          <label className="block mb-2 font-bold font-serif" htmlFor="password">
            Password:
          </label>
          <input
            className="w-full p-2 border border-gray-300 mb-4 rounded font-serif"
            type={showPassword ? "text" : "password"}
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter Your Password"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="text-sm text-blue-500 underline mb-4 font-serif font-bold"
          >
            {showPassword ? "Hide" : "Show"} Password
          </button>
        </p>
        <button
          type="button"
          onClick={() => navigate("/forgot-password")}
          className="text-sm text-blue-500 underline mb-4 font-serif font-bold"
        >
          Forgot Password
        </button>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white rounded font-bold p-2 font-serif text-xl hover:bg-blue-600"
        >
          Login
        </button>
        <div className="mt-4 text-center font-bold font-serif rounded ">
          Don't have an account?{" "}
          <a href="/register" className="text-blue-500 underline font-serif">
            Register
          </a>
        </div>
      </form>
    </div>
  );
};

export default Login;
