import NavBar from '@/widgets/Navbar/ui/NavBar';
import React from 'react';
import { Outlet } from 'react-router';
import Spinner from 'react-bootstrap/Spinner';
import { useAppSelector } from '@/shared/api/hooks/hooks';

export default function Layout(): React.JSX.Element {
  const vacancyloading = useAppSelector((store) => store.vacancies.loading);
  const cimpanyLoading = useAppSelector((store) => store.company.loading);

  if (vacancyloading || cimpanyLoading) {
    <Spinner animation="grow" />;
  }

  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
}
