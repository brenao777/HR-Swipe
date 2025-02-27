import React, { useState, useEffect } from 'react';
import { animated, to } from '@react-spring/web';
import { useAppDispatch, useAppSelector } from '@/shared/api/hooks/hooks';
import type { VacancyType } from '../model/types/vacancyTypes';
import { useSwipeAnimation } from '@/shared/api/hooks/useSwipeAnimation';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import styles from './VacancyCard.module.scss';
import { applyToVacancy, hideVacancy } from '@/entities/Vacancy/model/redux/vacancySlice';
import { createResponse } from '@/entities/vacancyStatus/model/redux/vacancyStatusThunk';
import { getCompany } from '@/entities/Company/model/redux/companyThanks';
import { Link } from 'react-router';

type VacancyCardProps = {
  vacancy: VacancyType;
};

export default function VacancyCard({ vacancy }: VacancyCardProps): React.JSX.Element {
  const dispatch = useAppDispatch();
  const [showModal, setShowModal] = useState(false);
  const [isSwiped, setIsSwiped] = useState(false);

  const handleApply = async (): Promise<void> => {
    console.log('Applying to vacancy:', vacancy.id);
    dispatch(applyToVacancy(vacancy.id));
    await dispatch(createResponse(vacancy.id));
    setIsSwiped(true);
  };
  const handleHide = () => {
    console.log('Hiding vacancy:', vacancy.id);
    dispatch(hideVacancy(vacancy.id));
    setIsSwiped(true);
  };
  const { props, api, bind } = useSwipeAnimation(handleApply, handleHide);

  const handleShowDetails = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

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
        <p className={styles.location}>Местоположение: {vacancy.location}</p>
        <Button variant="primary" onClick={handleShowDetails} className={styles.detailsButton}>
          Подробнее
        </Button>
        <div className={styles.instructions}>Свайп влево — откликнуться, вправо — скрыть</div>
      </animated.div>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{vacancy.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>

        <p>
        <strong>Компания:</strong> 
          <img src={`http://localhost:3000/${vacancy.Company.logo}`}/>
          <Link to={`/company`} style={{ textDecoration: 'none', color: 'inherit' }}>
              {vacancy.Company.title}
            </Link>
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
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Закрыть
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
