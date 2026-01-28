import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const isAuthenticated = localStorage.getItem('token');
    const isAdmin = localStorage.getItem('role') === 'admin';

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        setIsMenuOpen(false);
        navigate('/login');
    };

    const closeMenu = () => setIsMenuOpen(false);

    return (
        <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center space-x-2 group">
                        <div className="w-9 h-9 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow duration-300">
                            <span className="text-white font-bold text-lg">B</span>
                        </div>
                        <span className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                            Bloggify
                        </span>
                    </Link>

                    {/* Mobile hamburger button */}
                    <button
                        className="md:hidden flex flex-col justify-center items-center w-10 h-10 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label="Toggle navigation menu"
                        aria-expanded={isMenuOpen}
                    >
                        <span
                            className={`block w-5 h-0.5 bg-gray-600 transition-all duration-300 ${
                                isMenuOpen ? 'rotate-45 translate-y-1.5' : ''
                            }`}
                        />
                        <span
                            className={`block w-5 h-0.5 bg-gray-600 my-1 transition-all duration-300 ${
                                isMenuOpen ? 'opacity-0' : ''
                            }`}
                        />
                        <span
                            className={`block w-5 h-0.5 bg-gray-600 transition-all duration-300 ${
                                isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''
                            }`}
                        />
                    </button>

                    {/* Desktop navigation */}
                    <div className="hidden md:flex items-center space-x-1">
                        <Link
                            to="/"
                            className="px-4 py-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-all duration-200 font-medium"
                        >
                            Home
                        </Link>
                        {isAuthenticated ? (
                            <>
                                <Link
                                    to="/create"
                                    className="px-4 py-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-all duration-200 font-medium"
                                >
                                    Create Blog
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="ml-2 px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition-all duration-200 font-medium"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link
                                    to="/login"
                                    className="px-4 py-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-all duration-200 font-medium"
                                >
                                    Login
                                </Link>
                                <Link
                                    to="/register"
                                    className="ml-2 px-5 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 font-medium shadow-md hover:shadow-lg"
                                >
                                    Register
                                </Link>
                            </>
                        )}
                        {isAdmin && (
                            <Link
                                to="/admin"
                                className="ml-2 px-4 py-2 rounded-lg bg-amber-100 text-amber-700 hover:bg-amber-200 transition-all duration-200 font-medium"
                            >
                                Admin
                            </Link>
                        )}
                    </div>
                </div>
            </div>

            {/* Mobile navigation menu */}
            <div
                className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out bg-white border-t border-gray-100 ${
                    isMenuOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'
                }`}
            >
                <div className="px-4 py-3 space-y-1">
                    <Link
                        to="/"
                        onClick={closeMenu}
                        className="block px-4 py-3 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-all duration-200 font-medium"
                    >
                        Home
                    </Link>
                    {isAuthenticated ? (
                        <>
                            <Link
                                to="/create"
                                onClick={closeMenu}
                                className="block px-4 py-3 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-all duration-200 font-medium"
                            >
                                Create Blog
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="w-full text-left px-4 py-3 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-all duration-200 font-medium"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link
                                to="/login"
                                onClick={closeMenu}
                                className="block px-4 py-3 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-all duration-200 font-medium"
                            >
                                Login
                            </Link>
                            <Link
                                to="/register"
                                onClick={closeMenu}
                                className="block px-4 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-center font-medium"
                            >
                                Register
                            </Link>
                        </>
                    )}
                    {isAdmin && (
                        <Link
                            to="/admin"
                            onClick={closeMenu}
                            className="block px-4 py-3 rounded-lg bg-amber-100 text-amber-700 font-medium"
                        >
                            Admin Panel
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
