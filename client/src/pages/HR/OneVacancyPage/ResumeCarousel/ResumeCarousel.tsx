// src/features/swipe/ui/ResumeCarousel.tsx
import React from 'react';
import { useAppSelector } from '@/shared/api/hooks/hooks';
import type { RootState } from '@/app/store/store';
import ResumeCard from '../ResumeCard/ResumeCard';
import styles from './ResumeCarousel.module.scss';

export default function ResumeCarousel(): React.JSX.Element {
  const { resumesById, hiddenResumes, currentResumeIndex } = useAppSelector(
    (state: RootState) => state.resume,
  );

  // Фильтруем видимые резюме, исключая скрытые
  const visibleResumes = resumesById.filter((resume) => !hiddenResumes.includes(resume.id));

  // Если индекс выходит за пределы массива видимых резюме
  if (currentResumeIndex >= visibleResumes.length) {
    return <div className={styles.noResumes}>Резюме больше нет!</div>;
  }

  const currentResume = visibleResumes[currentResumeIndex];
  console.log('Все резюме:', resumesById);
  console.log('Текущий индекс:', currentResumeIndex);
  console.log('Текущее резюме:', currentResume);

  return (
    <div className={styles.carouselContainer}>
      <ResumeCard resume={currentResume} />
    </div>
  );
}