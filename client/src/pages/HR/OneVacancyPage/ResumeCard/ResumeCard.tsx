import React, { useState, useEffect } from 'react';
import { animated, to } from '@react-spring/web';
import { useAppDispatch } from '@/shared/api/hooks/hooks';
import type { ResumeType } from '@/entities/Resume/model/types/resumeTypes';
import { useSwipeAnimation } from '@/shared/api/hooks/useSwipeAnimation';
import { imageUrl } from '@/shared/lib/imageUrl';
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

  const handleApply = (): void => {
    void dispatch(
      updateResumeStatus({ status: 'accepted', resumeId: resume.id, vacancyId: Number(vacancyId) }),
    );
    dispatch(applyToResume(resume.id));
    setIsSwiped(true);
  };

  const handleHide = (): void => {
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

  const handleShowDetails = (): void => setShowModal(true);
  const handleCloseModal = (): void => setShowModal(false);

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
        <span className={`${styles.hint} ${styles.hintApply}`}>Пригласить</span>
        <span className={`${styles.hint} ${styles.hintSkip}`}>Отказать</span>

        <img
          className={styles.responsePhoto}
          src={imageUrl(resume.photo)}
          alt={resume.User.firstName}
        />
        <h2 className={styles.name}>
          {resume.User.firstName} {resume.User.secondName}
        </h2>
        <div className={styles.specialty}>{resume.specialty}</div>

        <div className={styles.meta}>
          <span className={styles.chip}>Возраст: {resume.age}</span>
          <span className={styles.chip}>{resume.location}</span>
        </div>
        <p className={styles.contacts}>{resume.number}</p>

        <Button onClick={handleShowDetails} className={styles.detailsButton}>
          Подробнее
        </Button>

        <div className={styles.instructions}>← пригласить&nbsp;&nbsp;·&nbsp;&nbsp;отказать →</div>
      </animated.div>

      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            {resume.User.firstName} {resume.User.secondName}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className={styles.modalBody}>
          <img
            className={styles.responseModalPhoto}
            src={imageUrl(resume.photo)}
            alt={resume.User.firstName}
          />
          <p>
            <strong>Телефон:</strong> {resume.number}
          </p>
          <p>
            <strong>Возраст:</strong> {resume.age}
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
