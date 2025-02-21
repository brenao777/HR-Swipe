import { getVacancies } from '@/entities/Vacancy/model/redux/vacancyThunk';
import VacancyCarousel from '@/features/swipe/ui/VacancyCarousel';
import { useAppDispatch, useAppSelector } from '@/shared/api/hooks/hooks';
import React, { useEffect } from 'react';

export default function VacancyPage(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.vacancies);

  useEffect(() => {
    void dispatch(getVacancies());
  }, [dispatch]);

  if (loading) {
    return <div>Загрузка вакансий...</div>;
  }

  if (error) {
    return <div>Ошибка: {error}</div>;
  }

  return (
    <div>
      <VacancyCarousel />
    </div>
  );
}

// нужно сделать кнопку подробнее при котором будет открываться DetailsModal с подробным описание вакансии компании
