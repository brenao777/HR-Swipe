import { getCompany } from '@/entities/Company/model/redux/companyThanks';
import { useAppDispatch, useAppSelector } from '@/shared/api/hooks/hooks';
import React, { useEffect } from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap'; 

export default function HrCompanyPage(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const { companys, loading, error } = useAppSelector((store) => store.company);

  useEffect(() => {
    void dispatch(getCompany());
  }, [dispatch]);

  if (loading) {
    return <div className="text-center mt-5">Загрузка...</div>;
  }

  if (error) {
    return <div className="text-center text-danger mt-5">Ошибка: {error}</div>;
  }

  return (
    <Container className="mt-5">
      <h2 className="text-center mb-4">Список компаний</h2>
      <Row xs={1} md={2} lg={3} className="g-4"> 
        {companys.map((company) => (
          <Col key={company.id}>
            <Card style={{ width: '18rem' }} className="h-100 shadow-sm">
              <Card.Img variant="top" src={company.logo} alt={company.title} style={{ height: '150px', objectFit: 'cover' }} />
              <Card.Body>
                <Card.Title>{company.title}</Card.Title>
                <Card.Text>{company.description.slice(0, 100)}...</Card.Text>
              </Card.Body>
              <Card.Footer className="text-muted">
                <strong>Локация:</strong> {company.location}
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}