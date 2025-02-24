import React, { useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';

interface HrVacancyModalProps {
  show: boolean;
  onHide: () => void;
  company?: { id: number; title: string; } | null;
}

const HrVacancyModal: React.FC<HrVacancyModalProps> = ({ show, onHide, company }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  if (!company) {
    return null;
  }

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    console.log('Создание вакансии:', {
      companyId: company.id,
      title,
      description,
    });

    // Здесь можно отправить данные на сервер

    setTitle('');
    setDescription('');
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Создание новой вакансии</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formCompanyName">
            <Form.Label>Название компании</Form.Label>
            <Form.Control type="text" defaultValue={company.title} readOnly />
          </Form.Group>

          
          <Form.Group controlId="formLocation" className="mt-3">
            <Form.Label>Местонахождение компании</Form.Label>
            <Form.Control type="text" value={title} readOnly />
          </Form.Group>

          <Form.Group controlId="formVacancyTitle" className="mt-3">
            <Form.Label>Название вакансии</Form.Label>
            <Form.Control
              type="text"
              placeholder="Введите название вакансии"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="formVacancyDescription" className="mt-3">
            <Form.Label>Описание вакансии</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              placeholder="Введите описание вакансии"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </Form.Group>

          <div className="d-flex justify-content-end mt-3">
            <Button variant="secondary" onClick={onHide} className="me-2">
              Отмена
            </Button>
            <Button variant="primary" type="submit">
              Создать
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default HrVacancyModal;