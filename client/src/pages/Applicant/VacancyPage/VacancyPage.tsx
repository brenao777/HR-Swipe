import { getVacancies } from '@/entities/Vacancy/model/redux/vacancyThunk';
import VacancyCarousel from '@/features/swipe/ui/VacancyCarousel';
import { useAppDispatch, useAppSelector } from '@/shared/api/hooks/hooks';
import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';

export default function VacancyPage(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.vacancies);
  const [show, setShow] = useState(false);
  const handleClose = (): void => setShow(false);
  const handleShow = (): void => setShow(true);

  useEffect(() => {
    void dispatch(getVacancies());
  }, [dispatch]);

  if (loading) {
    return <div>Загрузка вакансий...</div>;
  }

  if (error) {
    return <div>Ошибка: {error}</div>;
  }

  return (
    <div>
      <Button onClick={handleShow}>Фильтр</Button>
      <VacancyCarousel />
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Создать вакансию</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <input type="text" name="title" />
            {/* <input type="radio" name="" /> */}
            <Button type="submit">Опубликовать вакансию</Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClose}>Закрыть</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

// нужно сделать кнопку подробнее при котором будет открываться DetailsModal с подробным описание вакансии компании
