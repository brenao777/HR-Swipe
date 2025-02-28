import { getVacancies } from '@/entities/Vacancy/model/redux/vacancyThunk';
import type { VacancySearchType } from '@/entities/Vacancy/model/types/vacancyTypes';
import VacancyCarousel from '@/features/swipe/ui/VacancyCarousel';
import { useAppDispatch, useAppSelector } from '@/shared/api/hooks/hooks';
import React, { useCallback, useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import styles from './VacancyPage.module.scss';
import type { SpringValue } from '@react-spring/web';
import { animated } from '@react-spring/web';
import { handleShow } from '@/entities/Vacancy/model/redux/vacancySlice';

export default function VacancyPage(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.vacancies);
  const openModal = useAppSelector((state) => state.vacancies.openModal);
  const [backgroundStyle, setBackgroundStyle] = useState<{ backgroundColor: SpringValue<string> }>({
    backgroundColor: 'rgba(0, 0, 0, 0)',
  });
  const [filters, setFilters] = useState<VacancySearchType>({
    title: '',
    from: '',
    before: '',
    format: '',
    schedule: '',
    location: '',
    experience: '',
    workDuration: '',
  });


  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFilters((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleApplyFilters = (): void => {
    void dispatch(getVacancies(filters));
    void dispatch(handleShow());
  };

  // Мемоизация функции для предотвращения лишних рендеров
  const handleBackgroundChange = useCallback((style: { backgroundColor: SpringValue<string> }) => {
    setBackgroundStyle(style);
  }, []);

  useEffect(() => {
    void dispatch(getVacancies(filters));
  }, [dispatch]);

  if (loading) {
    return <div>Загрузка вакансий...</div>;
  }

  if (error) {
    return <div>Ошибка: {error}</div>;
  }

  return (
    <>
      <div className={styles.filterBtnContainer}>
        {/* <Button className={styles.filterBtn} onClick={handleShow}>
          Фильтры
        </Button> */}
      </div>
      <animated.div style={backgroundStyle}>
        <VacancyCarousel onBackgroundChange={handleBackgroundChange} />
        <Modal show={openModal} onHide={() => dispatch(handleShow())} className={styles.modal}>
          <Modal.Header closeButton>
            <Modal.Title className={styles.modalTitle}>Фильтр вакансий</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form className={styles.formElement}>
              <input
                type="text"
                name="title"
                placeholder="Специальность"
                value={filters.title}
                onChange={handleFilterChange}
              />
              <input
                type="number"
                name="experience"
                placeholder="Опыт работы (лет)"
                value={filters.experience}
                onChange={handleFilterChange}
              />
              <input
                type="text"
                name="location"
                placeholder="Город"
                value={filters.location}
                onChange={handleFilterChange}
              />
              <input
                type="number"
                name="from"
                placeholder="Зарплата от"
                value={filters.from}
                onChange={handleFilterChange}
              />
              <input
                type="number"
                name="before"
                placeholder="Зарплата до"
                value={filters.before}
                onChange={handleFilterChange}
              />
              <select name="format" value={filters.format} onChange={handleFilterChange}>
                <option value="">Формат</option>
                <option value="Удаленно">Удаленно</option>
                <option value="Гибрид">Гибрид</option>
                <option value="Офис">Офис</option>
              </select>
              <select name="schedule" value={filters.schedule} onChange={handleFilterChange}>
                <option value="">График</option>
                <option value="Полная">Полная</option>
                <option value="Частичная">Частичная</option>
                <option value="Проектная">Проектная</option>
              </select>
              <select
                name="workDuration"
                value={filters.workDuration}
                onChange={handleFilterChange}
              >
                <option value="1-3">1-3 лет</option>
                <option value="3-6">3-6 лет</option>
                <option value="6+">6+ лет</option>
              </select>
              <Button onClick={handleApplyFilters}>Применить фильтры</Button>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => dispatch(handleShow())}>Закрыть</Button>
          </Modal.Footer>
        </Modal>
      </animated.div>
    </>
  );
}
