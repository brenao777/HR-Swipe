import { findCompanyById } from '@/entities/Company/model/redux/companyThanks';
import { useAppDispatch, useAppSelector } from '@/shared/api/hooks/hooks';
import { imageUrl } from '@/shared/lib/imageUrl';
import React, { useEffect, useState } from 'react';
import styles from './HrCompanyPage.module.scss';

const money = (value: number): string => value.toLocaleString('ru-RU');

export default function HrCompanyPage(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const { myCompany, loading, error } = useAppSelector((store) => store.company);
  const user = useAppSelector((store) => store.user.data);

  const [activeTab, setActiveTab] = useState<'company' | 'vacancies'>('company');

  useEffect(() => {
    if (user?.id) {
      void dispatch(findCompanyById(user.id));
    }
  }, [dispatch, user?.id]);

  if (loading) {
    return <div className={styles.loading}>Загрузка…</div>;
  }

  if (error) {
    return <div className={styles.error}>Ошибка: {error}</div>;
  }

  if (!myCompany) {
    return <div className={styles.error}>Компания не найдена</div>;
  }

  const vacancies = myCompany.Vacancies ?? [];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.companyInfo}>
          <img src={imageUrl(myCompany.logo)} alt={myCompany.title} className={styles.logo} />
          <div className={styles.companyDetails}>
            <span className={styles.label}>Организация</span>
            <h2 className={styles.companyTitle}>{myCompany.title}</h2>
            <span className={styles.location}>{myCompany.location}</span>
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
            Вакансии ({vacancies.length})
          </button>
        </div>
      </div>

      <div className={styles.content}>
        {activeTab === 'company' && (
          <div className={styles.companyContent}>
            <p className={styles.description}>{myCompany.description}</p>
            <p className={styles.metaLine}>
              <strong>Локация:</strong> {myCompany.location}
            </p>
          </div>
        )}

        {activeTab === 'vacancies' && (
          <div className={styles.vacanciesContent}>
            {vacancies.length > 0 ? (
              vacancies.map((vacancy) => (
                <div key={vacancy.id} className={styles.vacancyCard}>
                  <h3 className={styles.vacancyTitle}>{vacancy.title}</h3>
                  <p className={styles.salary}>
                    от {money(vacancy.from)} ₽ до {money(vacancy.before)} ₽
                  </p>
                  <p className={styles.metaLine}>{vacancy.description}</p>
                  <div className={styles.vacancyTags}>
                    <span className={styles.tag}>{vacancy.location}</span>
                    <span className={styles.tag}>{vacancy.format}</span>
                    <span className={styles.tag}>Опыт: {vacancy.workDuration}</span>
                  </div>
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
