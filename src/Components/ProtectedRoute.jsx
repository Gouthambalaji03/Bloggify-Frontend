import React from 'react';
import { Navigate } from 'react-router-dom';
import PageNotFound from '../pages/PageNotFound';


const ProtectedRoute = ({ children, adminOnly=false }) => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    if (!token) {
        return <Navigate to="/login"/>;
    }
    if (adminOnly && role !== 'admin') {
        return <PageNotFound />;
    }
    return children;
};

export default ProtectedRoute;