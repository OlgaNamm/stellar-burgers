import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../services/store';

interface ProtectedRouteProps {
  onlyUnauth?: boolean;
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  onlyUnauth = false,
  children
}) => {
  const { user, isAuthChecked } = useSelector((state: RootState) => state.auth);
  const location = useLocation();

  if (!isAuthChecked) {
    return <div>Проверка авторизации...</div>;
  }

  // если авторизован
  if (onlyUnauth && user) {
    const from = location.state?.from || { pathname: '/' };
    return <Navigate to={from} replace />;
  }

  // если не авторизован
  if (!onlyUnauth && !user) {
    return <Navigate to='/login' state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
