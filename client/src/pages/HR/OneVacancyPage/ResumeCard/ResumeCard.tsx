import React, { useState, useEffect } from 'react';
import { animated, to } from '@react-spring/web';
import { useAppDispatch } from '@/shared/api/hooks/hooks';
import type { ResumeType } from '@/entities/Resume/model/types/resumeTypes';
import { useSwipeAnimation } from '@/shared/api/hooks/useSwipeAnimation';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import styles from './ResumeCard.module.scss';
import { applyToResume, hideResume } from '@/entities/Resume/model/redux/resumeSlice';
import { updateResumeStatus } from '@/entities/Resume/model/redux/resumeThunks';
import { useParams } from 'react-router';

type ResumeCardProps = {
  resume: ResumeType;
};

export default function ResumeCard({ resume }: ResumeCardProps): React.JSX.Element {
  const dispatch = useAppDispatch();
  const [showModal, setShowModal] = useState(false);
  const [isSwiped, setIsSwiped] = useState(false);
  const { vacancyId } = useParams();

  console.log(vacancyId);

  // Обработчики свайпа
  const handleApply = () => {
    console.log('Приглашение:', resume.id);
    void dispatch(
      updateResumeStatus({ status: 'accepted', resumeId: resume.id, vacancyId: Number(vacancyId) }),
    );
    dispatch(applyToResume(resume.id));
    setIsSwiped(true);
  };

  const handleHide = () => {
    console.log('Отказ:', resume.id);
    void dispatch(
      updateResumeStatus({
        status: 'rejection',
        resumeId: resume.id,
        vacancyId: Number(vacancyId),
      }),
    );
    dispatch(hideResume(resume.id));
    setIsSwiped(true);
  };

  const { props, api, bind } = useSwipeAnimation(handleApply, handleHide);

  const handleShowDetails = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  // Сброс анимации после свайпа
  useEffect(() => {
    if (isSwiped) {
      api.set({ x: 0 });
      api.start({ opacity: 1, rotate: 0 });
      setIsSwiped(false);
    }
  }, [isSwiped, api]);

  return (
    <>
      <animated.div
        className={styles.resumeCard}
        style={{
          transform: to(
            [props.x, props.rotate],
            (x, rotate) => `translateX(${x}px) rotate(${rotate}deg)`,
          ),
          opacity: props.opacity,
        }}
        {...bind}
      >
        <h2 className={styles.name}>
          {resume.User.firstName} {resume.User.secondName}
        </h2>
        <img
          className={styles.responsePhoto}
          src={`http://localhost:3000/${resume.photo}`}
          alt={resume.User.firstName}
        />
        <p className={styles.experience}>Опыт: {resume.experience}</p>
        <p className={styles.age}>Возраст: {resume.age}</p>
        <p className={styles.number}>Контакты: {resume.number}</p>
        <Button variant="primary" onClick={handleShowDetails} className={styles.detailsButton}>
          Подробнее
        </Button>
      </animated.div>


      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            {' '}
            {resume.User.firstName} {resume.User.secondName}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img
            className={styles.responseModalPhoto}
            src={`http://localhost:3000/${resume.photo}`}
            alt={resume.User.firstName}
          />
          <p>
            <strong>ФИО:</strong> {resume.User.firstName} {resume.User.secondName}
          </p>
          <p></p>
          <p>
            <strong>Номер телефона:</strong> {resume.number}
          </p>
          <p>
            <strong>Age:</strong> {resume.age}
          </p>
          <p>
            <strong>Местоположение:</strong> {resume.location}
          </p>
          <p>
            <strong>Специальность:</strong> {resume.specialty}
          </p>
          <p>
            <strong>Опыт работы:</strong> {resume.experience}
          </p>
          <p>
            <strong>О себе:</strong> {resume.coverLetter}
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Закрыть
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
