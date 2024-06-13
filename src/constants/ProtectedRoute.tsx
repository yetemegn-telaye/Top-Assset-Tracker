import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../redux/store';
import { selectIsAuthenticated } from '../features/auth/AuthSlice';

interface ProtectedRouteProps {
  element: React.ReactElement;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  return isAuthenticated ? element : <Navigate to="/" />;
};

export default ProtectedRoute;
