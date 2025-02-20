import Layout from '@/pages/Layout/Layout';
import LoginPage from '@/pages/LoginPage/LoginPage';
import MainPage from '@/pages/MainPage/MainPage';
import RegisterPage from '@/pages/RegisterPage/RegisterPage';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router';
// import ProtectedRoute from './ProtectedRouter';

export default function RouterProvider(): React.JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* <Route element={<ProtectedRoute allowedStatuses={['guest']} redirectTo="/login" />}> */}
            <Route index element={<MainPage />} />
          {/* </Route> */}
          {/* <Route element={<ProtectedRoute allowedStatuses={['guest']} redirectTo="/login" />}> */}
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
          {/* </Route> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
