import React from 'react';
import type { VacancyType } from '@/entities/Vacancy/model/types/vacancyTypes';

type Props = {
  resp: VacancyType;
};

export default function ResponceCard({ resp }: Props): React.JSX.Element {
  return (
    <div>
      <h2>{resp.title}</h2>
      <p>{resp.description}</p>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span>Статус:</span>
        <span style={{ marginLeft: 'auto' }}>{resp.}</span> {/* Добавляем статус */}
      </div>
    </div>
  );
}
