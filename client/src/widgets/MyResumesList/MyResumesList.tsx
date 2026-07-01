import type { ResumeType } from '@/entities/Resume/model/types/resumeTypes';
import { imageUrl } from '@/shared/lib/imageUrl';
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
        src={imageUrl(resume.photo)}
        alt={resume.User.firstName}
      />
      <Card.Body className={styles.cardBody}>
        <Card.Title className={styles.cardTitle}>
          {resume.User.firstName} {resume.User.secondName}
        </Card.Title>
        <Card.Text className={styles.specialty}>{resume.specialty}</Card.Text>
        <Card.Text className={styles.cardText}>Возраст — {resume.age} лет</Card.Text>
        <Card.Text className={styles.cardText}>Город — {resume.location}</Card.Text>
        <Card.Text className={styles.cardText}>Опыт — {resume.experience}</Card.Text>
        <Card.Text className={styles.cardText}>Телефон — {resume.number}</Card.Text>
        <Card.Text className={styles.cover}>{resume.coverLetter}</Card.Text>
      </Card.Body>
    </Card>
  );
}
