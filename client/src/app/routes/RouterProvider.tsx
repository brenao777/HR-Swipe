import PersonCabinetPage from '@/pages/Applicant/PersonCabinetPage/PersonCabinetPage';
import VacancyPage from '@/pages/Applicant/VacancyPage/VacancyPage';
import HrCompanyPage from '@/pages/HR/HrCompanyPage/HrCompanyPage';
import HrResponsesPage from '@/pages/HR/HrResponsesPage/HrResponsesPage';
import Layout from '@/pages/Layout/Layout';
import LoginPage from '@/pages/LoginPage/LoginPage';
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
          <Route index element={<VacancyPage />} />
          <Route path="/responses" element={<HrResponsesPage />} />
          <Route path="/cabinet" element={<PersonCabinetPage />} />
          <Route path="/company" element={<HrCompanyPage />} />
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
