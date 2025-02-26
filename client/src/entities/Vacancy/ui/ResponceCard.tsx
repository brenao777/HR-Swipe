import React from 'react';
import type { VacancyWithStatusType } from '@/entities/Vacancy/model/types/vacancyTypes';

type Props = {
  resp: VacancyWithStatusType;
};

export default function ResponceCard({ resp }: Props): React.JSX.Element {
console.log('ResponceCard ==================>', resp)
  return (
    <div>
      <h2>{resp.title}</h2>
      <p>{resp.description}</p>
      <p>{resp.location}</p>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h5>Статус: {resp.Resumes[0]?.status}</h5>
        {/* Добавляем статус */}
      </div>
    </div>
  );
}
