import type { ResumeType } from '@/entities/Resume/model/types/resumeTypes';
import React from 'react';
import Card from 'react-bootstrap/Card';
import styles from './MyResumesList.module.scss';

type Props = {
  resume: ResumeType;
};

export default function MyResumesList({ resume }: Props): React.JSX.Element {
  return (
    <Card className={styles.card}>
      <Card.Img
        className={styles.photo}
        variant="top"
        src={`http://localhost:3000/${resume.photo}`}
        alt={resume.User.firstName}
      />
      <Card.Body className={styles.cardBody}>
        <Card.Title className={styles.cardTitle}>
          {resume.User.firstName} {resume.User.secondName}
        </Card.Title>
        <Card.Text className={styles.cardText}>{resume.specialty}</Card.Text>
        <Card.Text className={styles.cardText}>Возраст - {resume.age} лет</Card.Text>
        <Card.Text className={styles.cardText}>Город - {resume.location}</Card.Text>
        <Card.Text className={styles.cardText}>Опыт работы - {resume.experience}</Card.Text>
        <Card.Text className={styles.cardText}>Номер телефона - {resume.number}</Card.Text>
        <Card.Text className={styles.cardText}>{resume.coverLetter}</Card.Text>
      </Card.Body>
    </Card>
  );
}
