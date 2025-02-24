import { getCompany } from '@/entities/Company/model/redux/companyThanks';
import { useAppDispatch, useAppSelector } from '@/shared/api/hooks/hooks';
import HrVacancyModal from '@/widgets/Modal/HrVacancyModal/HrVacancyModal';
import React, { useEffect, useState } from 'react';
import { Card, Container, Row, Col, Button } from 'react-bootstrap';

export default function HrCompanyPage(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const { companys, loading, error } = useAppSelector((store) => store.company);

  const [showModal, setShowModal] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState<null | { id: number; title: string;}>(null);

  useEffect(() => {
    void dispatch(getCompany());
  }, [dispatch]);

  const handleOpenModal = (company: { id: number; title: string;  }): void => {
    setSelectedCompany(company);
    setShowModal(true);
  };

  const handleCloseModal = (): void => {
    setShowModal(false);
    setSelectedCompany(null);
  };

  if (loading) {
    return <div className="text-center mt-5">Загрузка...</div>;
  }

  if (error) {
    return <div className="text-center text-danger mt-5">Ошибка: {error}</div>;
  }

  return (
    <Container className="mt-5">
      <h2 className="text-center mb-4">Моя компания</h2>
      <Row xs={1} md={1} lg={1} className="g-4">
        {companys.map((company) => (
          <Col key={company.id}>
            <Card style={{ width: '36rem', height: '40rem' }} className="shadow-lg p-3 mb-5 bg-white rounded">
              <Card.Img
                variant="top"
                src={company.logo}
                alt={company.title}
                style={{ height: '200px', objectFit: 'cover', marginBottom: '20px' }}
              />
              <Card.Body>
                <Card.Title className="fs-3">{company.title}</Card.Title>
                <Card.Text className="fs-5" style={{ whiteSpace: 'pre-line' }}>
                  {company.description}
                </Card.Text>
                <Card.Text className="mt-3 fs-6">
                  <strong>Локация:</strong> {company.location}
                </Card.Text>
                <Button
                  variant="primary"
                  className="mt-4 w-100"
                  onClick={() => handleOpenModal({ id: company.id, title: company.title })}
                >
                  Создать вакансию
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Модальное окно для создания вакансии */}
      <HrVacancyModal
        show={showModal}
        onHide={handleCloseModal}
        company={selectedCompany}
      />
    </Container>
  );
}