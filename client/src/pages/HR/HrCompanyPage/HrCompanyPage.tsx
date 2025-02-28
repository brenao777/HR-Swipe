import { findCompanyById, getCompany } from '@/entities/Company/model/redux/companyThanks';
import { useAppDispatch, useAppSelector } from '@/shared/api/hooks/hooks';
import React, { useEffect, useState } from 'react';
import styles from './HrCompanyPage.module.scss';

export default function HrCompanyPage(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const { myCompany, loading, error } = useAppSelector((store) => store.company);
  const user = useAppSelector((store) => store.user.data);

  const [activeTab, setActiveTab] = useState<'company' | 'vacancies'>('company');

  // Вызов getCompany только при монтировании
  useEffect(() => {
    void dispatch(getCompany());
  }, [dispatch]);

  // Вызов findCompanyById при изменении user.id и loading
  useEffect(() => {
    if (user?.id && !loading && !myCompany) {
      void dispatch(findCompanyById(user.id));
    }
  }, [dispatch, user?.id, loading, myCompany]);

  if (loading) {
    return (
      <div className={styles.loading}>
        <span className={styles.loadingText}>Загрузка...</span>
      </div>
    );
  }

  if (error) {
    return <div className={styles.error}>Ошибка: {error}</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.companyInfo}>
          <img
            src={`http://localhost:3000/${myCompany?.logo}`}
            alt={myCompany?.title}
            className={styles.logo}
          />
          <div className={styles.companyDetails}>
            <span className={styles.label}>Организация</span>
            <h2 className={styles.companyTitle}>{myCompany?.title}</h2>
          </div>
        </div>
        <div className={styles.tabs}>
          <button
            className={`${styles.tabBtn} ${activeTab === 'company' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('company')}
          >
            О компании
          </button>
          <button
            className={`${styles.tabBtn} ${activeTab === 'vacancies' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('vacancies')}
          >
            Вакансии
          </button>
        </div>
      </div>

      <div className={styles.content}>
        {activeTab === 'company' && (
          <div className={styles.companyContent}>
            <p className={styles.description}>{myCompany?.description}</p>
            <p className={styles.location}>
              <strong>Локация:</strong> {myCompany?.location}
            </p>
          </div>
        )}

        {activeTab === 'vacancies' && (
          <div className={styles.vacanciesContent}>
            {myCompany?.Vacancies.length > 0 ? (
              myCompany.Vacancies.map((vacancy) => (
                <div key={vacancy.id} className={styles.vacancyCard}>
                  <h3 className={styles.vacancyTitle}>{vacancy.title}</h3>
                  <p className={styles.salary}>
                    <strong>Описание:</strong> {vacancy.description}
                  </p>
                  <p className={styles.salary}>
                    <strong>Локация:</strong> {vacancy.location}
                  </p>
                  <p className={styles.salary}>
                    <strong>Требования:</strong> {vacancy.experience}
                  </p>
                  <p className={styles.salary}>
                    <strong>Формат:</strong> {vacancy.format}
                  </p>
                  <p className={styles.salary}>
                    <strong>Опыт работы (лет):</strong> {vacancy.workDuration}
                  </p>
                  <p className={styles.salary}>
                    <strong>Зарплата:</strong> от {vacancy.from}₽ до {vacancy.from}₽
                  </p>
                </div>
              ))
            ) : (
              <p className={styles.noVacancies}>Нет доступных вакансий.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
