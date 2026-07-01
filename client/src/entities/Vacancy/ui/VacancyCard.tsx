import React, { useState, useEffect, useCallback } from 'react';
import type { SpringValue } from '@react-spring/web';
import { animated, to } from '@react-spring/web';
import { useAppDispatch } from '@/shared/api/hooks/hooks';
import type { VacancyType } from '../model/types/vacancyTypes';
import { useSwipeAnimation } from '@/shared/api/hooks/useSwipeAnimation';
import { imageUrl } from '@/shared/lib/imageUrl';
import Modal from 'react-bootstrap/Modal';
import styles from './VacancyCard.module.scss';
import { applyToVacancy, hideVacancy } from '@/entities/Vacancy/model/redux/vacancySlice';
import { createResponse } from '@/entities/vacancyStatus/model/redux/vacancyStatusThunk';

type VacancyCardProps = {
  vacancy: VacancyType;
  onBackgroundChange?: (style: { backgroundColor: SpringValue<string> }) => void;
};

const money = (value: number): string => value.toLocaleString('ru-RU');

function VacancyCard({ vacancy, onBackgroundChange }: VacancyCardProps): React.JSX.Element {
  const dispatch = useAppDispatch();
  const [showModal, setShowModal] = useState(false);
  const [isSwiped, setIsSwiped] = useState(false);

  const handleApply = async (): Promise<void> => {
    dispatch(applyToVacancy(vacancy.id));
    await dispatch(createResponse(vacancy.id));
    setIsSwiped(true);
  };

  const handleHide = (): void => {
    dispatch(hideVacancy(vacancy.id));
    setIsSwiped(true);
  };

  const { props, api, bind, backgroundStyle } = useSwipeAnimation(handleApply, handleHide);

  const handleBackgroundChange = useCallback(() => {
    onBackgroundChange?.(backgroundStyle);
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
  }, [isSwiped, api]);

  const handleShowDetails = (): void => setShowModal(true);
  const handleCloseModal = (): void => setShowModal(false);

  const shortExperience =
    vacancy.experience.length > 160 ? `${vacancy.experience.slice(0, 160)}…` : vacancy.experience;

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
        <span className={`${styles.hint} ${styles.hintApply}`}>Откликнуться</span>
        <span className={`${styles.hint} ${styles.hintSkip}`}>Скрыть</span>

        <div className={styles.companyRow}>
          {vacancy.Company?.logo ? (
            <img className={styles.logo} src={imageUrl(vacancy.Company.logo)} alt="" />
          ) : (
            <span className={styles.logoFallback}>{(vacancy.Company?.title ?? 'HR')[0]}</span>
          )}
          <div>
            <div className={styles.companyName}>{vacancy.Company?.title ?? 'Компания'}</div>
            <div className={styles.location}>{vacancy.location}</div>
          </div>
        </div>

        <h2 className={styles.title}>{vacancy.title}</h2>
        <div className={styles.salary}>
          {money(vacancy.from)} – {money(vacancy.before)} ₽
        </div>

        <div className={styles.tags}>
          <span className={styles.tag}>{vacancy.format}</span>
          <span className={styles.tag}>{vacancy.schedule}</span>
          <span className={styles.tag}>Опыт: {vacancy.workDuration}</span>
        </div>

        <p className={styles.description}>{vacancy.description}</p>
        <p className={styles.experience}>
          <strong>Требования:</strong> {shortExperience}
        </p>

        <button onClick={handleShowDetails} className={styles.detailsButton}>
          Подробнее
        </button>

        <div className={styles.instructions}>← откликнуться&nbsp;&nbsp;·&nbsp;&nbsp;скрыть →</div>
      </animated.div>

      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>{vacancy.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body className={styles.modalBody}>
          <p>
            <strong>Компания:</strong> {vacancy.Company?.title ?? 'Не указана'}
          </p>
          <p>
            <strong>Описание:</strong> {vacancy.description}
          </p>
          <p>
            <strong>Местоположение:</strong> {vacancy.location}
          </p>
          <p>
            <strong>Требования:</strong> {vacancy.experience}
          </p>
          <p>
            <strong>Формат:</strong> {vacancy.format}
          </p>
          <p>
            <strong>График:</strong> {vacancy.schedule}
          </p>
          <p>
            <strong>Опыт:</strong> {vacancy.workDuration}
          </p>
          <p className={styles.modalSalary}>
            {money(vacancy.from)} – {money(vacancy.before)} ₽
          </p>
        </Modal.Body>
        <Modal.Footer>
          <button onClick={handleCloseModal} className={styles.modalCloseButton}>
            Закрыть
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default React.memo(VacancyCard);
