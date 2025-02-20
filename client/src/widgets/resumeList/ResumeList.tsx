import type { ResumeType } from '@/entities/Resume/model/types/resumeTypes';
import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

type Props = {
  resume: ResumeType;
};

export default function ResumeList({ resume }: Props): React.JSX.Element {
  return (
    <Card>
      <Card.Header>{resume.specialty}</Card.Header>
      <Card.Body>
        <Card.Text>
          {resume.User.firstName}
          {' '}
          {resume.User.secondName}
        </Card.Text>
        <Card.Title>{resume.age}</Card.Title>
        <Card.Text>{resume.location}</Card.Text>
        <Button variant="primary">Подробнее</Button>
      </Card.Body>
    </Card>
  );
}
