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
    if (user?.id && !loading) {
      void dispatch(findCompanyById(user.id));
    }
  }, [dispatch, user?.id, loading]);

  console.log('User:', user);
  console.log('My Company:', myCompany);
  console.log('My Vacancies:', myCompany?.Vacancies);

  const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    console.log('Raw FormData:', Object.fromEntries(formData.entries()));
    if (!myCompany?.id) {
      alert('Компания не найдена!');
      return;
    }
    void dispatch(createVacancy({ formData, companyId: myCompany.id }));
    if (!user?.id) {
      alert('Компания не найдена!');
      return;
    }
    void dispatch(findCompanyById(user.id));
    handleClose();
  };

  if (loading) return <div className={styles.loading}>Загрузка...</div>;
  if (error) return <div className={styles.error}>Ошибка: {error}</div>;
  if (!myCompany) return <div className={styles.error}>Компания не найдена</div>;

  return (
    <div className={styles.container}>
      <Button onClick={handleShow} className={styles.createVacancyBtn}>
        Создать вакансию
      </Button>
      <Modal show={show} onHide={handleClose} className={styles.modal}>
        <Modal.Header closeButton className={styles.modalHeader}>
          <Modal.Title className={styles.modalTitle}>Создать вакансию</Modal.Title>
        </Modal.Header>
        <Modal.Body className={styles.modalBody}>
          <Form onSubmit={onSubmit} className={styles.form}>
            <div className={styles.formGroup}>
              <input
                type="text"
                placeholder="Название вакансии"
                name="title"
                className={styles.formControl}
              />
            </div>
            <div className={styles.formGroup}>
              <input
                type="text"
                placeholder="Описание"
                name="description"
                className={styles.formControl}
              />
            </div>
            <div className={styles.formGroup}>
              <input
                type="text"
                placeholder="Город"
                name="location"
                className={styles.formControl}
              />
            </div>
            <div className={styles.formGroup}>
              <input
                type="text"
                placeholder="Опыт работы"
                name="experience"
                className={styles.formControl}
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Требуемый опыт работы:</label>
              <div className={styles.radioGroup}>
                <label>
                  <input type="radio" name="workDuration" value="1-3" /> 1-3 года
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
              <label className={styles.label}>Формат работы:</label>
              <div className={styles.radioGroup}>
                <label>
                  <input type="radio" name="format" value="Удаленно" /> Удаленно
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
              <label className={styles.label}>График работы:</label>
              <div className={styles.radioGroup}>
                <label>
                  <input type="radio" name="schedule" value="Полная" /> Полная
                </label>
                <label>
                  <input type="radio" name="schedule" value="Частичная" /> Частичная
                </label>
                <label>
                  <input type="radio" name="schedule" value="Проектная" /> Проектная
                </label>
              </div>
            </div>
            <div className={styles.formGroup}>
              <input
                type="number"
                placeholder="Зарплата от"
                name="from"
                className={styles.formControl}
              />
            </div>
            <div className={styles.formGroup}>
              <input
                type="number"
                placeholder="Зарплата до"
                name="before"
                className={styles.formControl}
              />
            </div>
            <Button type="submit" className={styles.submitBtn}>
              Опубликовать вакансию
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer className={styles.modalFooter}>
          <Button onClick={handleClose} className={styles.closeBtn}>
            Закрыть
          </Button>
        </Modal.Footer>
      </Modal>
      <div className={styles.companyDetails}>
        <h1 className={styles.companyName}>{myCompany.title}</h1>
        <p className={styles.companyDescription}>{myCompany.description}</p>
        <h3 className={styles.vacanciesTitle}>Вакансии:</h3>
        <div className={styles.vacanciesList}>
          {myCompany.Vacancies.map((vacancy) => (
            <div key={vacancy.id} className={styles.vacancyItem}>
              <h4 className={styles.vacancyTitle}>{vacancy.title}</h4>
              <p className={styles.vacancyDescription}>{vacancy.description}</p>
              <p className={styles.vacancyLocation}>Местоположение: {vacancy.location}</p>
              <button onClick={() => dispatch(deleteVacancy(vacancy.id))} className={styles.delBtn}>
                ❌
              </button>
              <Button
                onClick={() => navigate(`/oneVacancyPage/${vacancy.id.toString()}`)}
                className={styles.responsesBtn}
              >
                Отклики
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
