import React from 'react';
import type { VacancyWithStatusType } from '@/entities/Vacancy/model/types/vacancyTypes';

type Props = {
  resp: VacancyWithStatusType;
};

export default function ResponceCard({ resp }: Props): React.JSX.Element {
  if (resp.Resumes[0]) {
    console.log(resp);
  }
  return (
    <div>
      <h2>{resp.title}</h2>
      <p>{resp.description}</p>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span>Статус:</span>
        <span style={{ marginLeft: 'auto' }}>{resp.Resumes[0]?.status}</span>{' '}
        {/* Добавляем статус */}
      </div>
    </div>
  );
}
