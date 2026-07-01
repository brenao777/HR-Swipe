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
  const { vacancies, hiddenVacancies, currentIndex, loading } = useAppSelector(
    (state: RootState) => state.vacancies,
  );

  const visibleVacancies = vacancies.filter((vacancy) => !hiddenVacancies.includes(vacancy.id));
  const remaining = visibleVacancies.length - currentIndex;

  if (loading) {
    return <div className={styles.status}>Загружаем вакансии…</div>;
  }

  if (remaining <= 0) {
    return (
      <div className={styles.empty}>
        <div className={styles.emptyEmoji}>🎉</div>
        <h3>Вакансии закончились!</h3>
        <p>Загляните позже или измените фильтры.</p>
      </div>
    );
  }

  const currentVacancy = visibleVacancies[currentIndex];

  return (
    <div className={styles.wrapper}>
      <span className={styles.counter}>Осталось: {remaining}</span>
      <div className={styles.carouselContainer}>
        <VacancyCard vacancy={currentVacancy} onBackgroundChange={onBackgroundChange} />
      </div>
    </div>
  );
}
