import React from 'react';
import { useAppSelector } from '@/shared/api/hooks/hooks';
import type { RootState } from '@/app/store/store';
import ResumeCard from '../ResumeCard/ResumeCard';
import styles from './ResumeCarousel.module.scss';

export default function ResumeCarousel(): React.JSX.Element {
  const { resumesById, hiddenResumes, currentResumeIndex, loading } = useAppSelector(
    (state: RootState) => state.resume,
  );

  const visibleResumes = resumesById.filter((resume) => !hiddenResumes.includes(resume.id));

  if (loading) {
    return <div className={styles.status}>Загружаем отклики…</div>;
  }

  if (currentResumeIndex >= visibleResumes.length) {
    return (
      <div className={styles.empty}>
        <div className={styles.emptyEmoji}>📭</div>
        <h3>Откликов больше нет</h3>
        <p>Все кандидаты по этой вакансии рассмотрены.</p>
      </div>
    );
  }

  const currentResume = visibleResumes[currentResumeIndex];

  return (
    <div className={styles.carouselContainer}>
      <ResumeCard resume={currentResume} />
    </div>
  );
}
