import { useState, useEffect, useCallback, useRef } from "react";
import api from "../Services/api";

const Blog = () => {
    const [blogs, setBlogs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSearching, setIsSearching] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchInput, setSearchInput] = useState("");
    const [pagination, setPagination] = useState({
        currentPage: 1,
        totalPages: 1,
        totalPosts: 0,
        hasNextPage: false,
        hasPrevPage: false,
    });
    const searchInputRef = useRef(null);
    const debounceTimerRef = useRef(null);

    useEffect(() => {
        fetchBlogs();
    }, [pagination.currentPage, searchQuery]);

    // Keyboard shortcut: Press "/" to focus search
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "/" && document.activeElement !== searchInputRef.current) {
                e.preventDefault();
                searchInputRef.current?.focus();
            }
        };
        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, []);

    const fetchBlogs = async () => {
        setIsLoading(true);
        try {
            const response = await api.get(
                `/posts/getpost?page=${pagination.currentPage}&limit=9&search=${encodeURIComponent(searchQuery)}`
            );
            setBlogs(response.data.posts);
            setPagination(prev => ({
                ...prev,
                ...response.data.pagination,
            }));
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
            setIsSearching(false);
        }
    };

    // Debounced search - triggers after user stops typing
    const debouncedSearch = useCallback((value) => {
        if (debounceTimerRef.current) {
            clearTimeout(debounceTimerRef.current);
        }
        setIsSearching(true);
        debounceTimerRef.current = setTimeout(() => {
            setSearchQuery(value);
            setPagination(prev => ({ ...prev, currentPage: 1 }));
        }, 500);
    }, []);

    const handleInputChange = (e) => {
        const value = e.target.value;
        setSearchInput(value);
        debouncedSearch(value);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        // Clear any pending debounce and search immediately
        if (debounceTimerRef.current) {
            clearTimeout(debounceTimerRef.current);
        }
        setSearchQuery(searchInput);
        setPagination(prev => ({ ...prev, currentPage: 1 }));
    };

    const handleKeyDown = (e) => {
        if (e.key === "Escape") {
            clearSearch();
            searchInputRef.current?.blur();
        }
    };

    const clearSearch = () => {
        if (debounceTimerRef.current) {
            clearTimeout(debounceTimerRef.current);
        }
        setSearchInput("");
        setSearchQuery("");
        setIsSearching(false);
        setPagination(prev => ({ ...prev, currentPage: 1 }));
    };

    const goToPage = (page) => {
        setPagination(prev => ({ ...prev, currentPage: page }));
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const renderPageNumbers = () => {
        const pages = [];
        const { currentPage, totalPages } = pagination;

        let startPage = Math.max(1, currentPage - 2);
        let endPage = Math.min(totalPages, currentPage + 2);

        if (currentPage <= 3) {
            endPage = Math.min(5, totalPages);
        }
        if (currentPage >= totalPages - 2) {
            startPage = Math.max(1, totalPages - 4);
        }

        for (let i = startPage; i <= endPage; i++) {
            pages.push(
                <button
                    key={i}
                    onClick={() => goToPage(i)}
                    className={`w-10 h-10 rounded-lg font-medium transition-all duration-200 ${
                        currentPage === i
                            ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30"
                            : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                    }`}
                >
                    {i}
                </button>
            );
        }
        return pages;
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
            {/* Hero Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8">
                <div className="text-center max-w-3xl mx-auto">
                    <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
                        Discover Stories
                    </h1>
                    <p className="text-lg text-gray-600 mb-8">
                        Explore ideas, perspectives, and knowledge from writers on any topic
                    </p>

                    {/* Search Bar */}
                    <form onSubmit={handleSearch} className="max-w-xl mx-auto">
                        <div className="relative flex items-center">
                            <div className="absolute left-4 text-gray-400">
                                {isSearching ? (
                                    <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                ) : (
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                )}
                            </div>
                            <input
                                ref={searchInputRef}
                                type="text"
                                value={searchInput}
                                onChange={handleInputChange}
                                onKeyDown={handleKeyDown}
                                placeholder="Search blogs by title or content... (Press / to focus)"
                                className="w-full pl-12 pr-24 py-4 rounded-2xl border border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all duration-200 text-gray-900 placeholder-gray-400 shadow-sm"
                            />
                            {searchInput && (
                                <button
                                    type="button"
                                    onClick={clearSearch}
                                    className="absolute right-20 text-gray-400 hover:text-gray-600 transition-colors"
                                    title="Clear search (Esc)"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            )}
                            <button
                                type="submit"
                                disabled={isSearching}
                                className="absolute right-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium rounded-xl transition-all duration-200"
                            >
                                {isSearching ? "..." : "Search"}
                            </button>
                        </div>
                    </form>

                    {/* Search Results Info */}
                    {searchQuery && (
                        <div className="mt-4 flex items-center justify-center gap-2">
                            <span className="text-gray-600">
                                {pagination.totalPosts} result{pagination.totalPosts !== 1 ? 's' : ''} for
                            </span>
                            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                                "{searchQuery}"
                            </span>
                            <button
                                onClick={clearSearch}
                                className="text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Blog Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
                {isLoading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="animate-pulse">
                                <div className="bg-gray-200 rounded-2xl h-52 mb-4"></div>
                                <div className="bg-gray-200 h-6 rounded-lg w-3/4 mb-3"></div>
                                <div className="bg-gray-200 h-4 rounded-lg w-1/2 mb-2"></div>
                                <div className="bg-gray-200 h-4 rounded-lg w-full"></div>
                            </div>
                        ))}
                    </div>
                ) : blogs.length === 0 ? (
                    <div className="text-center py-16">
                        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                            {searchQuery ? "No results found" : "No blogs yet"}
                        </h3>
                        <p className="text-gray-500">
                            {searchQuery
                                ? "Try different keywords or clear the search"
                                : "Be the first to share your story"}
                        </p>
                        {searchQuery && (
                            <button
                                onClick={clearSearch}
                                className="mt-4 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-all duration-200"
                            >
                                Clear search
                            </button>
                        )}
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            {blogs.map((blog) => (
                                <article
                                    key={blog._id}
                                    className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100"
                                >
                                    <div className="relative overflow-hidden">
                                        <img
                                            src={blog.image}
                                            alt={blog.title}
                                            className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    </div>
                                    <div className="p-6">
                                        <h2 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors duration-200">
                                            {blog.title}
                                        </h2>
                                        <div className="flex items-center gap-2 mb-3">
                                            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center">
                                                <span className="text-white text-sm font-medium">
                                                    {blog.user.name.charAt(0).toUpperCase()}
                                                </span>
                                            </div>
                                            <span className="text-sm font-medium text-gray-700">
                                                {blog.user.name}
                                            </span>
                                        </div>
                                        <p className="text-gray-500 text-sm line-clamp-2 leading-relaxed">
                                            {blog.description}
                                        </p>
                                    </div>
                                </article>
                            ))}
                        </div>

                        {/* Pagination */}
                        {pagination.totalPages > 1 && (
                            <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
                                <button
                                    onClick={() => goToPage(pagination.currentPage - 1)}
                                    disabled={!pagination.hasPrevPage}
                                    className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                    </svg>
                                    Previous
                                </button>

                                <div className="flex items-center gap-2">
                                    {pagination.currentPage > 3 && pagination.totalPages > 5 && (
                                        <>
                                            <button
                                                onClick={() => goToPage(1)}
                                                className="w-10 h-10 rounded-lg font-medium bg-white text-gray-700 hover:bg-gray-100 border border-gray-200 transition-all duration-200"
                                            >
                                                1
                                            </button>
                                            <span className="text-gray-400">...</span>
                                        </>
                                    )}

                                    {renderPageNumbers()}

                                    {pagination.currentPage < pagination.totalPages - 2 && pagination.totalPages > 5 && (
                                        <>
                                            <span className="text-gray-400">...</span>
                                            <button
                                                onClick={() => goToPage(pagination.totalPages)}
                                                className="w-10 h-10 rounded-lg font-medium bg-white text-gray-700 hover:bg-gray-100 border border-gray-200 transition-all duration-200"
                                            >
                                                {pagination.totalPages}
                                            </button>
                                        </>
                                    )}
                                </div>

                                <button
                                    onClick={() => goToPage(pagination.currentPage + 1)}
                                    disabled={!pagination.hasNextPage}
                                    className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                                >
                                    Next
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>
                            </div>
                        )}

                        {/* Page Info */}
                        <div className="mt-4 text-center text-sm text-gray-500">
                            Showing {blogs.length} of {pagination.totalPosts} posts
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Blog;
