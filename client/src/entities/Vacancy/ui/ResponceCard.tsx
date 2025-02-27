import React from 'react';
import type { VacancyWithStatusType } from '@/entities/Vacancy/model/types/vacancyTypes';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router';

type Props = {
  resp: VacancyWithStatusType;
};

export default function ResponceCard({ resp }: Props): React.JSX.Element {
  const navigate = useNavigate();
  return (
    <div>
      <h2>{resp.Vacancy.title}</h2>
      <p>{resp.Vacancy.description}</p>
      <p>{resp.Vacancy.location}</p>
      <div style={{ display: 'flex', alignItems: 'center', gap: '3vh' }}>
        {resp.status === 'accepted' ? (
          <div>
            <h5>Поздравляем ваше реюме одобрено!</h5>
            <Button onClick={() => navigate('/chat')}>Начать чат с HR</Button>
          </div>
        ) : (
          <h5>{resp.status}</h5>
        )}
      </div>
    </div>
  );
}
