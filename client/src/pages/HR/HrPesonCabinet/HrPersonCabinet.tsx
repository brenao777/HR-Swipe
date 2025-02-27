import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { findCompanyById } from '@/entities/Company/model/redux/companyThanks';
import { useAppDispatch, useAppSelector } from '@/shared/api/hooks/hooks';
import { Form } from 'react-bootstrap';
import styles from './HrPersonCabinet.module.scss';
import { createVacancy } from '@/entities/Vacancy/model/redux/vacancyThunk';
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

  const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    if (!myCompany?.id) {
      alert('Компания не найдена!');
      return;
    }
    void dispatch(createVacancy({ formData, companyId: myCompany.id }));
    handleClose();
  };

  if (loading) return <div>Загрузка...</div>;
  if (error) return <div>Ошибка: {error}</div>;
  if (!myCompany) return <div>Компания не найдена</div>;

  return (
    <div className={styles['company-details']}>
      <h1>Список вакансий</h1>

      {/* Кнопка создания вакансии */}
      <Button onClick={handleShow} className={styles['create-vacancy-btn']}>
        Создать вакансию
      </Button>

      {/* Модальное окно */}
      <Modal show={show} onHide={handleClose} className={styles['modal-content']}>
        <Modal.Header closeButton className={styles['modal-header']}>
          <Modal.Title className={styles['modal-title']}>Создать вакансию</Modal.Title>
        </Modal.Header>
        <Modal.Body className={styles['modal-body']}>
          <Form onSubmit={onSubmit}>
            <div className={styles['form-group']}>
              <input
                type="text"
                placeholder="Название вакансии"
                name="title"
                className={styles['form-control']}
              />
            </div>
            <div className={styles['form-group']}>
              <input
                type="text"
                placeholder="Описание"
                name="description"
                className={styles['form-control']}
              />
            </div>
            <div className={styles['form-group']}>
              <input
                type="text"
                placeholder="Город"
                name="location"
                className={styles['form-control']}
              />
            </div>
            <div className={styles['form-group']}>
              <input
                type="text"
                placeholder="Опыт работы"
                name="experience"
                className={styles['form-control']}
              />
            </div>
            <Button type="submit">Опубликовать вакансию</Button>
          </Form>
        </Modal.Body>
        <Modal.Footer className={styles['modal-footer']}>
          <Button onClick={handleClose} className={styles['modal-footer']}>
            Закрыть
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Список вакансий */}
      <div className={styles['vacancies-list']}>
        {myCompany.Vacancies.map((vacancy) => (
          <div key={vacancy.id} className={styles['vacancy-item']}>
            <h4>{vacancy.title}</h4>
            <p>{vacancy.description}</p>
            <p>Местоположение: {vacancy.location}</p>
            <Button onClick={() => navigate(`/oneVacancyPage/${vacancy.id.toString()}`)}>
              Отклики
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
``