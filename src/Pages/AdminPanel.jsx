import { useEffect, useState } from 'react';
import api from '../Services/api';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminPanel = () => {
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState(null);

    useEffect(() => {
        fetchUnapprovedPosts();
    }, []);

    const fetchUnapprovedPosts = async () => {
        try {
            const response = await api.get("/posts/unapprovedpost");
            setPosts(response.data.posts);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    const approveBlog = async (id) => {
        setActionLoading(id);
        try {
            const response = await api.patch(`/posts/${id}/approve`);
            setPosts(posts.filter((post) => post._id !== id));
            toast.success(response.data.message);
        } catch (error) {
            setError(error.response.data.message);
            toast.error(error.response.data.message);
        } finally {
            setActionLoading(null);
        }
    };

    const rejectBlog = async (id) => {
        setActionLoading(id);
        try {
            const response = await api.delete(`/posts/delete/${id}`);
            setPosts(posts.filter((post) => post._id !== id));
            toast.success(response.data.message);
        } catch (error) {
            setError(error.response.data.message);
            toast.error(error.response.data.message);
        } finally {
            setActionLoading(null);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
            {/* Header */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8">
                <div className="flex items-center justify-center gap-3 mb-2">
                    <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl flex items-center justify-center shadow-lg">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                    </div>
                    <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
                        Admin Panel
                    </h1>
                </div>
                <p className="text-center text-gray-500">Review and moderate pending blog submissions</p>

                {/* Stats Badge */}
                <div className="flex justify-center mt-6">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-50 border border-amber-200 rounded-full">
                        <span className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></span>
                        <span className="text-sm font-medium text-amber-700">
                            {posts.length} pending {posts.length === 1 ? 'review' : 'reviews'}
                        </span>
                    </div>
                </div>
            </div>

            {/* Error Message */}
            {error && (
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
                    <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl flex items-center gap-2">
                        <svg className="w-5 h-5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                        <span className="text-sm">{error}</span>
                    </div>
                </div>
            )}

            {/* Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
                {isLoading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[...Array(3)].map((_, i) => (
                            <div key={i} className="animate-pulse bg-white rounded-2xl p-6 border border-gray-100">
                                <div className="bg-gray-200 rounded-xl h-48 mb-4"></div>
                                <div className="bg-gray-200 h-6 rounded-lg w-3/4 mb-3"></div>
                                <div className="bg-gray-200 h-4 rounded-lg w-1/2 mb-4"></div>
                                <div className="flex gap-3">
                                    <div className="bg-gray-200 h-10 rounded-lg flex-1"></div>
                                    <div className="bg-gray-200 h-10 rounded-lg flex-1"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : posts.length === 0 ? (
                    <div className="text-center py-16">
                        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">All caught up!</h3>
                        <p className="text-gray-500">No pending posts to review right now</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {posts.map((post) => (
                            <article
                                key={post._id}
                                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100"
                            >
                                <div className="relative">
                                    <img
                                        src={post.image}
                                        alt={post.title}
                                        className="w-full h-48 object-cover"
                                    />
                                    <div className="absolute top-3 left-3">
                                        <span className="px-3 py-1 bg-amber-500 text-white text-xs font-medium rounded-full">
                                            Pending Review
                                        </span>
                                    </div>
                                </div>
                                <div className="p-5">
                                    <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                                        {post.title}
                                    </h3>
                                    <div className="flex items-center gap-2 mb-3">
                                        <div className="w-7 h-7 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center">
                                            <span className="text-white text-xs font-medium">
                                                {post.user.name.charAt(0).toUpperCase()}
                                            </span>
                                        </div>
                                        <span className="text-sm text-gray-600">
                                            {post.user.name}
                                        </span>
                                    </div>
                                    <p className="text-gray-500 text-sm line-clamp-2 mb-4">
                                        {post.description}
                                    </p>
                                    <div className="flex gap-3">
                                        <button
                                            onClick={() => approveBlog(post._id)}
                                            disabled={actionLoading === post._id}
                                            className="flex-1 py-2.5 px-4 bg-green-500 hover:bg-green-600 text-white font-medium rounded-xl transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                        >
                                            {actionLoading === post._id ? (
                                                <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                            ) : (
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                            )}
                                            Approve
                                        </button>
                                        <button
                                            onClick={() => rejectBlog(post._id)}
                                            disabled={actionLoading === post._id}
                                            className="flex-1 py-2.5 px-4 bg-red-500 hover:bg-red-600 text-white font-medium rounded-xl transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                            Reject
                                        </button>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminPanel;
