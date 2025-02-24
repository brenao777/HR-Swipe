import type { ResumeType } from '@/entities/Resume/model/types/resumeTypes';
import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import styles from './ResumeList.module.scss';

type Props = {
  resume: ResumeType;
};

export default function ResumeList({ resume }: Props): React.JSX.Element {
  return (
    <div className={styles.container}>
      <Card>
        <Card.Header>
          <h3>{resume.specialty}</h3>
        </Card.Header>
        <Card.Img
          className={styles.photo}
          variant="top"
          src={`http://localhost:3000/${resume.photo}`}
          alt={resume.User.firstName}
        />
        <Card.Body>
          <Card.Text>
            <h3>
              {resume.User.firstName} {resume.User.secondName}
            </h3>
          </Card.Text>
          <Card.Text>Возраст - {resume.age}</Card.Text>
          <Card.Text>Город - {resume.location}</Card.Text>
          <div className={styles.btns}>
            <Button variant="primary">Подробнее</Button>
            <Button variant="primary">Приглашение</Button>
            <Button variant="primary">Отказ</Button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}
