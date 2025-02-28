import { findVacancyById } from '@/entities/Vacancy/model/redux/vacancyThunk';
import { useAppDispatch, useAppSelector } from '@/shared/api/hooks/hooks';
import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import ResumeCarousel from './ResumeCarousel/ResumeCarousel';

export default function OneVacancyPage(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const { vacancyId } = useParams();
  const { resumesById, loading, error } = useAppSelector((state) => state.resume);

  console.log('Резюме:', resumesById);

  useEffect(() => {
    if (vacancyId) {
      void dispatch(findVacancyById(Number(vacancyId)));
    }
  }, [dispatch, vacancyId]);

  if (loading) {
    return <div>Загрузка резюме...</div>;
  }

  if (error) {
    return <div>Ошибка: {error}</div>;
  }

  return (
    <div>
      <ResumeCarousel />
    </div>
  );
}
