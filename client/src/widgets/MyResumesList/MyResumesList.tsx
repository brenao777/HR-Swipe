import type { ResumeType } from '@/entities/Resume/model/types/resumeTypes';
import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import styles from './MyResumesList.module.scss';
type Props = {
  resume: ResumeType;
};

export default function MyResumesList({ resume }: Props): React.JSX.Element {
  return (
    <div className={styles.container}>
      <Card>
        <Card.Header>{resume.specialty}</Card.Header>
        <Card.Img
          className={styles.photo}
          variant="top"
          src={`http://localhost:3000/${resume.photo}`}
          // alt={resume.User.firstName}
        />
        <Card.Body>
          <Card.Title>{resume.specialty}</Card.Title>
          <Card.Title>Возраст - {resume.age} лет</Card.Title>
          <Card.Text>Город - {resume.location}</Card.Text>
          <Card.Text>Опыт работы - {resume.experience}</Card.Text>
          <Card.Text>Номер телефона - {resume.number}</Card.Text>
          <Card.Text>{resume.coverLetter}</Card.Text>
          <Button variant="primary">Подробнее</Button>
        </Card.Body>
      </Card>
    </div>
  );
}
