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

type BackgroundStyle = { backgroundColor: SpringValue<string> | string };

const emptyFilters: VacancySearchType = {
  title: '',
  from: '',
  before: '',
  format: '',
  schedule: '',
  location: '',
  experience: '',
  workDuration: '',
};

export default function VacancyPage(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const error = useAppSelector((state) => state.vacancies.error);
  const openModal = useAppSelector((state) => state.vacancies.openModal);
  const [backgroundStyle, setBackgroundStyle] = useState<BackgroundStyle>({
    backgroundColor: 'rgba(0, 0, 0, 0)',
  });
  const [filters, setFilters] = useState<VacancySearchType>(emptyFilters);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
    setFilters((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleApplyFilters = (): void => {
    void dispatch(getVacancies(filters));
    dispatch(handleShow());
  };

  const handleResetFilters = (): void => {
    setFilters(emptyFilters);
    void dispatch(getVacancies(emptyFilters));
    dispatch(handleShow());
  };

  const handleBackgroundChange = useCallback((style: BackgroundStyle) => {
    setBackgroundStyle(style);
  }, []);

  useEffect(() => {
    void dispatch(getVacancies(emptyFilters));
  }, [dispatch]);

  if (error) {
    return <div className={styles.error}>Ошибка: {error}</div>;
  }

  return (
    <animated.div style={backgroundStyle} className={styles.stage}>
      <VacancyCarousel onBackgroundChange={handleBackgroundChange} />

      <Modal show={openModal} onHide={() => dispatch(handleShow())} centered>
        <Modal.Header closeButton>
          <Modal.Title>Фильтр вакансий</Modal.Title>
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
              type="text"
              name="location"
              placeholder="Город"
              value={filters.location}
              onChange={handleFilterChange}
            />
            <div className={styles.row}>
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
            </div>
            <select name="format" value={filters.format} onChange={handleFilterChange}>
              <option value="">Формат работы</option>
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
            <select name="workDuration" value={filters.workDuration} onChange={handleFilterChange}>
              <option value="">Требуемый опыт</option>
              <option value="1-3">1-3 года</option>
              <option value="3-6">3-6 лет</option>
              <option value="6+">6+ лет</option>
            </select>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="light" onClick={handleResetFilters}>
            Сбросить
          </Button>
          <Button onClick={handleApplyFilters}>Применить</Button>
        </Modal.Footer>
      </Modal>
    </animated.div>
  );
}
