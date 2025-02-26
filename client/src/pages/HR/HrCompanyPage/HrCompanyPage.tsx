import { getCompany } from '@/entities/Company/model/redux/companyThanks';
// import { getVacancies } from '@/entities/Vacancy/model/redux/vacancyThunk';
import { useAppDispatch, useAppSelector } from '@/shared/api/hooks/hooks';
import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';

export default function HrCompanyPage(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const { company, loading, error } = useAppSelector((store) => store.company);
  // console.log(company)
  // const { vacancies } = useAppSelector((store) => store.vacancies);
  const [activeTab, setActiveTab] = useState<'company' | 'vacancies'>('company'); // управление кнопками

  useEffect(() => {
    void dispatch(getCompany());
    // void dispatch(getVacancies());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <span className="visually-hidden">Загрузка...</span>
      </div>
    );
  }

  if (error) {
    return <div className="d-flex justify-content-center align-items-center vh-100">error</div>;
  }

  return (
    <Container fluid className="vh-100 p-0">
      <Row className="g-0 h-100">
        <Col xs={12} className="h-100">
          <div className="d-flex flex-column h-100 p-4">
            <div className="d-flex align-items-center mb-4">
              <img
                src={`http://localhost:3000/${company?.logo}`}
                alt={company?.title}
                className="rounded-circle me-3"
                style={{ width: '80px', height: '80px', objectFit: 'cover' }}
              />
              <div>
                <span className="text-muted" style={{ fontSize: '0.9rem', opacity: 0.7 }}>
                  Организация
                </span>
                <h2 className="mb-0">{company?.title}</h2>
              </div>

              <div className="ms-auto d-flex gap-2">
                <Button
                  variant={activeTab === 'company' ? 'primary' : 'outline-primary'}
                  onClick={() => setActiveTab('company')}
                >
                  О компании
                </Button>
                <Button
                  variant={activeTab === 'vacancies' ? 'primary' : 'outline-primary'}
                  onClick={() => setActiveTab('vacancies')}
                >
                  Вакансии
                </Button>
              </div>
            </div>

            {/* <div className="flex-grow-1">
                {activeTab === 'company' && (
                  <div>
                    <p style={{ whiteSpace: 'pre-line' }}>{company.description}</p>
                    <p>
                      <strong>Локация:</strong> {company.location}
                    </p>
                  </div>
                )}

                {activeTab === 'vacancies' && (
                  <div className="mt-4">
                    {vacancies.length > 0 ? (
                      <div>
                        {vacancies.map((vacancy) => (
                          <div
                            key={vacancy.id}
                            className="border rounded p-3 mb-3"
                            style={{ backgroundColor: '#f8f9fa' }}
                          >
                            <h3>{vacancy.title}</h3>
                            <p><strong>Описание:</strong> {vacancy.description}</p>
                            <p><strong>Локация:</strong> {vacancy.location}</p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-center">Нет доступных вакансий.</p>
                    )}
                  </div>
                )}
              </div> */}
          </div>
        </Col>
      </Row>
    </Container>
  );
}
