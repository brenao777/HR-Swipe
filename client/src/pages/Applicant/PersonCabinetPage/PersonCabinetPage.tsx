import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useAppDispatch, useAppSelector } from '@/shared/api/hooks/hooks';
import { addResume } from '@/entities/Resume/model/redux/resumeThunks';
import ResponceCard from '@/entities/Vacancy/ui/ResponceCard';
import { getVacanciesWithStatus } from '@/entities/Vacancy/model/redux/vacancyThunk';
import { useNavigate } from 'react-router';
import styles from './PersonCabinetPage.module.scss';

export default function PersonCabinetPage(): React.JSX.Element {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const responses = useAppSelector((store) => store.vacancies.vacanciesWithStatus);


  useEffect(() => {
    void dispatch(getVacanciesWithStatus());
  }, [dispatch]);

  const handleClose = (): void => setShow(false);
  const handleShow = (): void => setShow(true);

  const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    void dispatch(addResume(formData));
    handleClose();
  };

  return (
    <div className={styles.container}>
      <div className={styles.buttonContainer}>
        <Button onClick={handleShow} className={styles.createResumeBtn}>
          Создать резюме
        </Button>
        <Button onClick={() => navigate('/myResumes')} className={styles.myResumesBtn}>
          Мои резюме
        </Button>
      </div>
      <Modal show={show} onHide={handleClose} className={styles.modal}>
        <Modal.Header closeButton>
          <Modal.Title className={styles.modalTitle}>Создать резюме</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={onSubmit} className={styles.resumeForm}>
            <input type="number" placeholder="Возраст" name="age" className={styles.formInput} />
            <input
              type="text"
              placeholder="Должность"
              name="specialty"
              className={styles.formInput}
            />
            <input
              type="text"
              placeholder="Опыт работы"
              name="experience"
              className={styles.formInput}
            />
            <input
              type="text"
              placeholder="Местоположение"
              name="location"
              className={styles.formInput}
            />
            <input type="number" placeholder="Номер" name="number" className={styles.formInput} />
            <input
              type="text"
              placeholder="Сопроводительное письмо"
              name="coverLetter"
              className={styles.formInput}
            />
            <input type="file" name="photo" className={styles.formInput} />
            <button type="submit" className={styles.submitBtn}>
              Опубликовать резюме
            </button>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <button onClick={handleClose} className={styles.closeBtn}>
            Закрыть
          </button>
        </Modal.Footer>
      </Modal>
      {responses.length <= 0 ? (
        <h1 className={styles.NoRes}>У вас пока нет откликов на вакансии.</h1>
      ) : (
        <>
          <h1 className={styles.titleRes}>Ваши отклики</h1>
          <div className={styles.responses}>
            {responses.map((resp) => (
              <ResponceCard key={resp.Vacancy.id} resp={resp} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
