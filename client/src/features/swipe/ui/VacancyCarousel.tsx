import React from 'react';
import { useAppSelector } from '@/shared/api/hooks/hooks';
import type { RootState } from '@/app/store/store';
import VacancyCard from '@/entities/Vacancy/ui/VacancyCard';
import styles from './VacancyCarousel.module.scss';
import type { SpringValue } from '@react-spring/web';

type VacancyCarouselProps = {
  onBackgroundChange?: (style: { backgroundColor: SpringValue<string> }) => void;
};

export default function VacancyCarousel({
  onBackgroundChange,
}: VacancyCarouselProps): React.JSX.Element {
  const { vacancies, hiddenVacancies, currentIndex } = useAppSelector(
    (state: RootState) => state.vacancies,
  );

  const visibleVacancies = vacancies.filter((vacancy) => !hiddenVacancies.includes(vacancy.id));

  if (currentIndex >= visibleVacancies.length) {
    return <div className={styles.noVacancies}>Вакансий больше нет!</div>;
  }

  const currentVacancy = visibleVacancies[currentIndex];
  console.log('All Vacancies:', vacancies);
  console.log('Current Index:', currentIndex);
  console.log('Current Vacancy:', currentVacancy);

  return (
    <>
      {vacancies.length < 40 && (
        <h3 className={styles.findedVacancies}>Найдено: {vacancies.length} вакансии</h3>
      )}
      <div className={styles.carouselContainer}>
        <VacancyCard vacancy={currentVacancy} onBackgroundChange={onBackgroundChange} />
      </div>
    </>
  );
}
