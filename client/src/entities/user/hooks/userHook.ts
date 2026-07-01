import { useAppDispatch, useAppSelector } from '@/shared/api/hooks/hooks';
import { useEffect } from 'react';
import type { RootState } from '@/app/store/store';
import { fetchUser, loginHandler, logoutHandler, submitHandler } from '../model/redux/userThunk';
import type { LoginCredentials, RegisterFormData } from '../model/types/types';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const useUser = () => {
  const dispatch = useAppDispatch();
  const { data, status, error } = useAppSelector((state: RootState) => state.user);

  useEffect(() => {
    void dispatch(fetchUser());
  }, [dispatch]);

  return {
    user: { data, status },
    error,
    loginHandler: (credentials: LoginCredentials) => dispatch(loginHandler(credentials)),
    logoutHandler: () => dispatch(logoutHandler()),
    submitHandler: (registerData: RegisterFormData) => dispatch(submitHandler(registerData)),
  };
};
