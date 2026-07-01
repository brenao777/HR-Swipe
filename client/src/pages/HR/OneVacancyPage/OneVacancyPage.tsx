import { findVacancyById } from '@/entities/Vacancy/model/redux/vacancyThunk';
import { useAppDispatch, useAppSelector } from '@/shared/api/hooks/hooks';
import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import ResumeCarousel from './ResumeCarousel/ResumeCarousel';
import styles from './OneVacancyPage.module.scss';

export default function OneVacancyPage(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { vacancyId } = useParams();
  const { error } = useAppSelector((state) => state.resume);

  useEffect(() => {
    if (vacancyId) {
      void dispatch(findVacancyById(Number(vacancyId)));
    }
  }, [dispatch, vacancyId]);

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <button className={styles.back} onClick={() => navigate('/hrCabinet')}>
          ← Назад
        </button>
        <h1 className={styles.title}>Отклики на вакансию</h1>
        <p className={styles.subtitle}>Свайп влево — пригласить, вправо — отказать</p>
      </div>

      {error ? <div className={styles.error}>Ошибка: {error}</div> : <ResumeCarousel />}
    </div>
  );
}
