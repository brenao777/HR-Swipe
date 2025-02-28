import { addCompany } from '@/entities/Company/model/redux/companyThanks';
import { useAppDispatch } from '@/shared/api/hooks/hooks';
import React from 'react';
import { useNavigate } from 'react-router';
import styles from './HrAddCompanyPage.module.scss';

export default function HrAddCompanyPage(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleAddCompany = async (el: React.FormEvent<HTMLFormElement>): Promise<void> => {
    el.preventDefault();
    try {
      const formData = new FormData(el.currentTarget);
      if (!formData.get('title') || !formData.get('description') || !formData.get('location')) {
        throw new Error('All fields are required');
      }
      void dispatch(addCompany(formData));
      void navigate('/hrCabinet');
      window.location.reload();
    } catch (error) {
      console.error('Ошибка при создании компании', error);
    }
  };

  return (
    <main className={styles.main}>
      <form onSubmit={handleAddCompany} className={styles.form}>
      <h1 className={styles.title}>Добавить компанию</h1>
        <div className={styles.formGroup}>
          <label htmlFor="title" className={styles.label}>
            Название
          </label>
          <input type="text" id="title" name="title" className={styles.input} required />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="description" className={styles.label}>
            Описание
          </label>
          <input
            type="text"
            id="description"
            name="description"
            className={styles.input}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="logo" className={styles.label}>
            Логотип
          </label>
          <input type="file" id="logo" name="logo" className={styles.inputFile} required />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="location" className={styles.label}>
            Локация
          </label>
          <input type="text" id="location" name="location" className={styles.input} required />
        </div>
        <button type="submit" className={styles.button}>
          Добавить компанию
        </button>
      </form>
    </main>
  );
}
