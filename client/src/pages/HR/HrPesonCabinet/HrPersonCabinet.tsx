import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { findCompanyById } from '@/entities/Company/model/redux/companyThanks';
import { useAppDispatch, useAppSelector } from '@/shared/api/hooks/hooks';
import { Form } from 'react-bootstrap';
import styles from './HrPersonCabinet.module.scss';
import { createVacancy, deleteVacancy } from '@/entities/Vacancy/model/redux/vacancyThunk';
import { useNavigate } from 'react-router';

export default function HrPersonCabinet(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const [show, setShow] = useState(false);
  const { myCompany, loading, error } = useAppSelector((store) => store.company);
  const user = useAppSelector((store) => store.user.data);
  const navigate = useNavigate();

  const handleClose = (): void => setShow(false);
  const handleShow = (): void => setShow(true);

  useEffect(() => {
    if (user?.id) {
      void dispatch(findCompanyById(user.id));
    }
  }, [dispatch, user?.id]);

  const onSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (!myCompany?.id || !user?.id) return;
    const formData = new FormData(e.currentTarget);
    await dispatch(createVacancy({ formData, companyId: myCompany.id }));
    await dispatch(findCompanyById(user.id));
    handleClose();
  };

  if (loading) return <div className={styles.loading}>Загрузка…</div>;
  if (error) return <div className={styles.error}>Ошибка: {error}</div>;
  if (!myCompany) return <div className={styles.error}>Компания не найдена</div>;

  return (
    <div className={styles.container}>
      <div className={styles.companyDetails}>
        <div className={styles.companyHeader}>
          <div>
            <h1 className={styles.companyName}>{myCompany.title}</h1>
            <p className={styles.companyDescription}>{myCompany.description}</p>
          </div>
          <Button onClick={handleShow} className={styles.createVacancyBtn}>
            + Создать вакансию
          </Button>
        </div>

        <h3 className={styles.vacanciesTitle}>Вакансии ({myCompany.Vacancies.length})</h3>
        <div className={styles.vacanciesList}>
          {myCompany.Vacancies.map((vacancy) => (
            <div key={vacancy.id} className={styles.vacancyItem}>
              <button
                onClick={() => dispatch(deleteVacancy(vacancy.id))}
                className={styles.delBtn}
                aria-label="Удалить вакансию"
              >
                ✕
              </button>
              <h4 className={styles.vacancyTitle}>{vacancy.title}</h4>
              <p className={styles.vacancyDescription}>{vacancy.description}</p>
              <p className={styles.vacancyLocation}>{vacancy.location}</p>
              <Button
                onClick={() => navigate(`/oneVacancyPage/${vacancy.id.toString()}`)}
                className={styles.responsesBtn}
              >
                Смотреть отклики
              </Button>
            </div>
          ))}
        </div>
      </div>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Создать вакансию</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={onSubmit} className={styles.form}>
            <input type="text" placeholder="Название вакансии" name="title" required />
            <input type="text" placeholder="Описание" name="description" required />
            <input type="text" placeholder="Город" name="location" required />
            <input type="text" placeholder="Требования (напр. React, TS)" name="experience" required />

            <div className={styles.formGroup}>
              <label className={styles.label}>Требуемый опыт</label>
              <div className={styles.radioGroup}>
                <label>
                  <input type="radio" name="workDuration" value="1-3" defaultChecked /> 1-3 года
                </label>
                <label>
                  <input type="radio" name="workDuration" value="3-6" /> 3-6 лет
                </label>
                <label>
                  <input type="radio" name="workDuration" value="6+" /> 6+ лет
                </label>
              </div>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Формат работы</label>
              <div className={styles.radioGroup}>
                <label>
                  <input type="radio" name="format" value="Удаленно" defaultChecked /> Удаленно
                </label>
                <label>
                  <input type="radio" name="format" value="Гибрид" /> Гибрид
                </label>
                <label>
                  <input type="radio" name="format" value="Офис" /> Офис
                </label>
              </div>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>График работы</label>
              <div className={styles.radioGroup}>
                <label>
                  <input type="radio" name="schedule" value="Полная" defaultChecked /> Полная
                </label>
                <label>
                  <input type="radio" name="schedule" value="Частичная" /> Частичная
                </label>
                <label>
                  <input type="radio" name="schedule" value="Проектная" /> Проектная
                </label>
              </div>
            </div>

            <div className={styles.row}>
              <input type="number" placeholder="Зарплата от" name="from" required />
              <input type="number" placeholder="Зарплата до" name="before" required />
            </div>

            <Button type="submit" className={styles.submitBtn}>
              Опубликовать вакансию
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}
