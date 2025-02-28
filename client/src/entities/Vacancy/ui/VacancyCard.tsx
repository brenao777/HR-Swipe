import React, { useState, useEffect, useCallback } from 'react';
import type { SpringValue } from '@react-spring/web';
import { animated, to } from '@react-spring/web';
import { useAppDispatch, useAppSelector } from '@/shared/api/hooks/hooks';
import type { VacancyType } from '../model/types/vacancyTypes';
import { useSwipeAnimation } from '@/shared/api/hooks/useSwipeAnimation';
import Modal from 'react-bootstrap/Modal';
import styles from './VacancyCard.module.scss';
import { applyToVacancy, hideVacancy } from '@/entities/Vacancy/model/redux/vacancySlice';
import { createResponse } from '@/entities/vacancyStatus/model/redux/vacancyStatusThunk';

type VacancyCardProps = {
  vacancy: VacancyType;
  onBackgroundChange?: (style: { backgroundColor: SpringValue<string> }) => void;
};

function VacancyCard({ vacancy, onBackgroundChange }: VacancyCardProps): React.JSX.Element {
  const dispatch = useAppDispatch();
  const [showModal, setShowModal] = useState(false);
  const [isSwiped, setIsSwiped] = useState(false);
  const company = useAppSelector((store) => store.company.company);

  console.log('MY COMPANY ==========>', company);

  const handleApply = async (): Promise<void> => {
    console.log('Applying to vacancy:', vacancy.id);
    dispatch(applyToVacancy(vacancy.id));
    await dispatch(createResponse(vacancy.id));
    setIsSwiped(true);
  };

  const handleHide = (): void => {
    console.log('Hiding vacancy:', vacancy.id);
    dispatch(hideVacancy(vacancy.id));
    setIsSwiped(true);
  };

  const { props, api, bind, backgroundStyle } = useSwipeAnimation(handleApply, handleHide);

  const handleBackgroundChange = useCallback(() => {
    if (onBackgroundChange) {
      onBackgroundChange(backgroundStyle);
    }
  }, [backgroundStyle, onBackgroundChange]);

  useEffect(() => {
    handleBackgroundChange();
  }, [handleBackgroundChange]);

  useEffect(() => {
    if (isSwiped) {
      api.set({ x: 0 });
      api.start({ opacity: 1, rotate: 0 });
      setIsSwiped(false);
    }
  }, [isSwiped]);

  const handleShowDetails = (): void => setShowModal(true);
  const handleCloseModal = (): void => setShowModal(false);

  return (
    <>
      <animated.div
        className={styles.vacancyCard}
        style={{
          transform: to(
            [props.x, props.rotate],
            (x, rotate) => `translateX(${x}px) rotate(${rotate}deg)`,
          ),
          opacity: props.opacity,
        }}
        {...bind}
      >
        <h2 className={styles.title}>{vacancy.title}</h2>
        <p className={styles.description}>{vacancy.description}</p>
        <p className={styles.workDuration}>Требуемый опыт (лет): {vacancy.workDuration}</p>
        <p className={styles.salary}>от {vacancy.from}₽</p>
        <p className={styles.location}>Город: {vacancy.location}</p>
        <p className={styles.experience}>
          <strong>Требования:</strong> {vacancy.experience}
        </p>
        <div className={styles.instructions}>Свайп влево — откликнуться, вправо — скрыть</div>
        <button onClick={handleShowDetails} className={styles.detailsButton}>
          Подробнее
        </button>
      </animated.div>

      <Modal show={showModal} onHide={handleCloseModal} className={styles.modal}>
        <Modal.Header closeButton className={styles.modalHeader}>
          <Modal.Title className={styles.modalTitle}>{vacancy.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body className={styles.modalBody}>
          <p>
            <strong>Компания:</strong> {company?.title || 'Не указана'}
          </p>
          <p>
            <strong>Описание:</strong> {vacancy.description}
          </p>
          <p>
            <strong>Местоположение:</strong> {vacancy.location}
          </p>
          <p>
            <strong>Требуемый опыт:</strong> {vacancy.experience}
          </p>
          <p>
            <strong>Формат:</strong> {vacancy.format}
          </p>
          <p>
            <strong>График:</strong> {vacancy.schedule}
          </p>
          <p>
            От <strong>{vacancy.from}₽</strong> до <strong>{vacancy.before}₽</strong>
          </p>
        </Modal.Body>
        <Modal.Footer className={styles.modalFooter}>
          <button onClick={handleCloseModal} className={styles.modalCloseButton}>
            Закрыть
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default React.memo(VacancyCard);