import React from 'react';
import { useAppSelector } from '@/shared/api/hooks/hooks';
import type { RootState } from '@/app/store/store';
import VacancyCard from '@/entities/Vacancy/ui/VacancyCard';
import styles from './VacancyCarousel.module.scss';

export default function VacancyCarousel(): React.JSX.Element {
  const { vacancies, hiddenVacancies, currentIndex } = useAppSelector(
    (state: RootState) => state.vacancies,
  );

  const visibleVacancies = vacancies.filter((vacancy) => !hiddenVacancies.includes(vacancy.id));

  if (currentIndex >= visibleVacancies.length) {
    return <div className={styles.noVacancies}>Вакансий больше нет!</div>;
  }

  const currentVacancy = visibleVacancies[currentIndex];
  // console.log('All Vacancies:', vacancies);
  console.log('Current Index:', currentIndex);
  console.log('Current Vacancy:', currentVacancy);

  return (
    <div className={styles.carouselContainer}>
      <VacancyCard vacancy={currentVacancy} />
    </div>
  );
}
