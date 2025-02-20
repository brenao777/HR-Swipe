import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import type { RootState } from '@/app/store/store'; // Импортируйте ваш RootState
import { useAppSelector } from '@/shared/api/hooks/hooks';

type ProtectedRouteProps = {
  allowedStatuses: ('logged' | 'guest' | 'loading')[];
  redirectTo: string;
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedStatuses, redirectTo }) => {
  const userStatus = useAppSelector((state: RootState) => state.user.status);

  if (userStatus === 'loading') {
    return <div>Loading...</div>;
  }

  return allowedStatuses.includes(userStatus) ? <Outlet /> : <Navigate to={redirectTo} replace />;
};

export default ProtectedRoute;
