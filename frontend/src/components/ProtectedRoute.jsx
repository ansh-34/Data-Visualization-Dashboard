import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500">
        <div className="relative">
          <div className="w-20 h-20 border-4 border-white/30 rounded-full"></div>
          <div className="w-20 h-20 border-4 border-white rounded-full animate-spin border-t-transparent absolute top-0"></div>
        </div>
        <p className="mt-6 text-white text-xl font-semibold animate-pulse">Loading your dashboard...</p>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
