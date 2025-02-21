import React from 'react';
import { animated } from 'react-spring';
// eslint-disable-next-line fsd-layers/no-import-from-top
import { applyToVacancy, hideVacancy } from '@/entities/Vacancy/model/redux/vacancySlice';
import { useAppDispatch } from '@/shared/api/hooks/hooks';
import type { VacancyType } from '../model/types/vacancyTypes';
import { useSwipeAnimation } from '@/shared/api/hooks/useSwipeAnimation';
import '../../../features/swipe/ui/VacancyCarousel.css';

type VacancyCardProps = {
  vacancy: VacancyType;
};

export default function VacancyCard({ vacancy }: VacancyCardProps): React.JSX.Element {
  const dispatch = useAppDispatch();

  // Действия для свайпов
  const handleApply = () => dispatch(applyToVacancy(vacancy.id));
  const handleHide = () => dispatch(hideVacancy(vacancy.id));

  // Используем хук анимации
  const { props, bind } = useSwipeAnimation(handleApply, handleHide);

  return (
    <animated.div
      className="vacancy-card"
      style={{
        transform: props.x.to((x: number) => `translateX(${x}px) rotate(${props.rotate}deg)`),
      }}
      {...bind}
    >
      <h2>{vacancy.title}</h2>
      <p>{vacancy.description}</p>
      <p>Местоположение: {vacancy.location}</p>
      <div className="instructions">Свайп влево — откликнуться, вправо — скрыть</div>
    </animated.div>
  );
}
