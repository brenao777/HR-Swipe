import React from 'react';
import { useAppSelector } from '@/shared/api/hooks/hooks';
import type { RootState } from '@/app/store/store';
import VacancyCard from '@/entities/Vacancy/ui/VacancyCard';
import './VacancyCarousel.css';

export default function VacancyCarousel(): React.JSX.Element {
  const { vacancies, hiddenVacancies, currentIndex } = useAppSelector(
    (state: RootState) => state.vacancies,
  );

  const visibleVacancies = vacancies.filter((vacancy) => !hiddenVacancies.includes(vacancy.id));

  if (currentIndex >= visibleVacancies.length) {
    return <div>Вакансий больше нет!</div>;
  }

  const currentVacancy = visibleVacancies[currentIndex];

  return (
    <div className="carousel-container">
      <VacancyCard vacancy={currentVacancy} />
    </div>
  );
}
