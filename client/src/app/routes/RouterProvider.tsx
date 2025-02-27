import MyResumesPage from '@/pages/Applicant/MyResumesPage/MyResumesPage';
import PersonCabinetPage from '@/pages/Applicant/PersonCabinetPage/PersonCabinetPage';
import VacancyPage from '@/pages/Applicant/VacancyPage/VacancyPage';
import HrCompanyPage from '@/pages/HR/HrCompanyPage/HrCompanyPage';
import Layout from '@/pages/Layout/Layout';
import LoginPage from '@/pages/LoginPage/LoginPage';
import RegisterPage from '@/pages/RegisterPage/RegisterPage';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router';
import ProtectedRoute from './ProtectedRouter';
import FilterModal from '@/widgets/Modal/FilterModal/FilterModal';
import Test from '@/entities/test/Test';
import Chat from '@/widgets/Chat/ui/Chat';
import HrPersonCabinet from '@/pages/HR/HrPesonCabinet/HrPersonCabinet';
import HrAddCompanyPage from '@/pages/HR/HrAddCompanyPage/HrAddCompanyPage';
import OneVacancyPage from '@/pages/HR/OneVacancyPage/OneVacancyPage';

export default function RouterProvider(): React.JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route element={<ProtectedRoute allowedStatuses={['logged']} redirectTo="/" />}>
            <Route index element={<VacancyPage />} />
            <Route path="/oneVacancyPage/:vacancyId" element={<OneVacancyPage />} />
            <Route path="/hrCabinet" element={<HrPersonCabinet />} />
            <Route path="/addcompany" element={<HrAddCompanyPage />} />
            <Route path="/cabinet" element={<PersonCabinetPage />} />
            <Route path="/filter" element={<FilterModal />} />
            <Route path="/company" element={<HrCompanyPage />} />
            <Route path="/myResumes" element={<MyResumesPage />} />
            <Route path="/test" element={<Test />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/modal" element={<HrResponesModalPage />} />

          </Route>
          <Route element={<ProtectedRoute allowedStatuses={['guest']} redirectTo="/login" />}>
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
