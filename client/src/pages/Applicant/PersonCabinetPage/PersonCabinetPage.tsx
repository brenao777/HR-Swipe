import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useAppDispatch, useAppSelector } from '@/shared/api/hooks/hooks';
import { addResume } from '@/entities/Resume/model/redux/resumeThunks';
import ResponceCard from '@/entities/Vacancy/ui/ResponceCard';
import {
  getVacanciesWithStatus,
} from '@/entities/Vacancy/model/redux/vacancyThunk';
import { useNavigate } from 'react-router';

export default function PersonCabinetPage(): React.JSX.Element {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const handleClose = (): void => setShow(false);
  const handleShow = (): void => setShow(true);
  const dispatch = useAppDispatch();
  const respones = useAppSelector((store) => store.vacancies.vacanciesWithStatus);

  useEffect(() => {
    void dispatch(getVacanciesWithStatus());
  }, []);

  const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    void dispatch(addResume(formData));
    handleClose();
  };

  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Создать резюме</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={onSubmit}>
            <input type="number" placeholder="Возраст" name="age" />
            <input type="text" placeholder="Должность" name="specialty" />
            <input type="text" placeholder="Опыт работы" name="experience" />
            <input type="text" placeholder="Местоположение" name="location" />
            <input type="number" placeholder="Номер" name="number" />
            <input type="text" placeholder="Сопроводительное письмо" name="coverLetter" />
            <input type="file" placeholder="Сопроводительное письмо" name="photo" />
            <button type="submit">Опубликовать резюме</button>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <button onClick={handleClose}>Закрыть</button>
        </Modal.Footer>
      </Modal>
      <Button onClick={handleShow}>Создать резюме</Button>
      <Button onClick={() => navigate('/myResumes')}>Мои резюме</Button>
      <div>
        {respones.map((resp) => (
          <ResponceCard key={resp.id} resp={resp} />
        ))}
      </div>
    </div>
  );
}
