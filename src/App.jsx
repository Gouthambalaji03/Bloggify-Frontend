import React from "react";
import { ToastContainer } from "react-toastify";
import Navbar from "./components/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./Pages/Login";
import Blog from "./Pages/Blog";
import ForgotPassword from "./Pages/ForgotPassword";
import ResetPassword from "./Pages/ResetPassword";
import CreateBlog from "./Pages/CreateBlog";
import PageNotFound from "./pages/PageNotFound";
import AdminPanel from "./pages/AdminPanel";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  return (
    <div>
      <div>
        <ToastContainer />
      </div>
      <BrowserRouter>
        <div>
          <Navbar />
        </div>

        <Routes>
          <Route path="/" element={<Blog />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route
            path="/reset-password/:id/:token"
            element={<ResetPassword />}
          />
          <Route
            path="/create"
            element={
              <ProtectedRoute>
                <CreateBlog />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<PageNotFound />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute adminOnly>
                <AdminPanel />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
