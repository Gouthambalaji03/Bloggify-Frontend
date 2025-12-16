import React from 'react';
import { Link, useNavigate } from 'react-router-dom';



const Navbar = () => {
    const navigate = useNavigate();
    const isAuthenticated = localStorage.getItem('token');
    const isAdmin = localStorage.getItem('role') === 'admin';

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        navigate('/login');
    };

    
    return (
        <nav className="bg-gray-800 p-4 text-white">
      <div className="container mx-auto flex justify-between">
        <Link to={"/"} className="text-xl font-bold font-serif">
          Bloggify
        </Link>
        <div>
          <Link to={"/"} className="mr-4">
            Home
          </Link>
          {isAuthenticated ? (
            <>
              <Link to={"/create"} className="mr-4">
                Create Blog
              </Link>
              <button onClick={handleLogout} className="text-blue-500 cursor-pointer">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to={"/login"} className="mr-4">
                Login
              </Link>
              <Link to={"/register"} className="mr-4">
                Register
              </Link>
            </>
          )}
          {isAdmin && (
            <Link to={"/admin"} className="ml-4">
              Admin panel
            </Link>
          )}
        </div>
      </div>
    </nav>
            
       
    );
};

export default Navbar;