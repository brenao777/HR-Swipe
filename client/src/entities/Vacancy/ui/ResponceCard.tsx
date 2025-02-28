import React from 'react';
import type { VacancyWithStatusType } from '@/entities/Vacancy/model/types/vacancyTypes';
import { useNavigate } from 'react-router';
import styles from './ResponceCard.module.scss';

type Props = {
  resp: VacancyWithStatusType;
};

export default function ResponceCard({ resp }: Props): React.JSX.Element {
  const navigate = useNavigate();

  const renderStatusContent = () => {
    if (resp.status === 'accepted') {
      return (
        <div className={styles.statusAccepted}>
          <h5 className={styles.statusText} data-status="accepted">
            Поздравляем, ваше резюме одобрено!
          </h5>
          <button onClick={() => navigate('/chat')} className={styles.chatButton}>
            Начать чат с HR
          </button>
        </div>
      );
    }
    if (resp.status === 'pending') {
      return (
        <h5 className={styles.statusText} data-status="pending">
          На рассмотрении...
        </h5>
      );
    }
    if (resp.status === 'rejection') {
      return (
        <h5 className={styles.statusText} data-status="rejection">
          Отказ
        </h5>
      );
    }
    return null;
  };

  return (
    <div className={styles.card}>
      <h2 className={styles.title}>{resp.Vacancy.title}</h2>
      <p className={styles.description}>{resp.Vacancy.description}</p>
      <p className={styles.experience}>{resp.Vacancy.experience}</p>
      <p className={styles.location}>Город - {resp.Vacancy.location}</p>
      <div className={styles.statusContainer}>{renderStatusContent()}</div>
    </div>
  );
}
