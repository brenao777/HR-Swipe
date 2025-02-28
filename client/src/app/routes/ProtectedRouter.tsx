import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import type { RootState } from '@/app/store/store'; // Импортируйте ваш RootState
import { useAppSelector } from '@/shared/api/hooks/hooks';
import Spinner from 'react-bootstrap/Spinner';

type ProtectedRouteProps = {
  allowedStatuses: ('logged' | 'guest' | 'loading')[];
  redirectTo: string;
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedStatuses, redirectTo }) => {
  const userStatus = useAppSelector((state: RootState) => state.user.status);

  if (userStatus === 'loading') {
    return <Spinner style={{ position: 'absolute', top: '50%', left: '50%' }} animation="grow"/>;
  }

  return allowedStatuses.includes(userStatus) ? <Outlet /> : <Navigate to={redirectTo} replace />;
};

export default ProtectedRoute;
