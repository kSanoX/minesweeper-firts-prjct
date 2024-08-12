import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { auth } = useAuth(); // Используем хук для проверки аутентификации

  return auth ? <>{children}</> : <Navigate to="/login" />;
};

export default PrivateRoute;
