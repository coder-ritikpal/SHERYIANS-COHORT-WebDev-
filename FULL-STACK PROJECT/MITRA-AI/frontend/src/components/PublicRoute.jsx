import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const PublicRoute = ({ children }) => {
  const { isLoggedIn } = useSelector(state => state.auth);

  if (isLoggedIn) {
    // Logged-in user should not see login/register → redirect to home
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PublicRoute;
