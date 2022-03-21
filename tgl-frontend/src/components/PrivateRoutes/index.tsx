import React, { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from 'store/hooks';
import { selectAuth } from 'features/auth/loginSlice';

type PrivateRouteProps = {
  children: JSX.Element;
};

export const PrivateRoutes = ({ children }: PrivateRouteProps) => {
  const token = localStorage.getItem('tgl:token');
  const { isAuthenticated } = useAppSelector(selectAuth);
  const location = useLocation();

  if (!token && !isAuthenticated) {
    return <Navigate to='/auth' state={{ from: location }} replace />;
  }

  return children;
};
