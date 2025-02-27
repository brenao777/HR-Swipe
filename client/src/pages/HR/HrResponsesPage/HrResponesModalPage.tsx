import { getResumes } from '@/entities/Resume/model/redux/resumeThunks';
import { useAppDispatch, useAppSelector } from '@/shared/api/hooks/hooks';
import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


export default function HrResponesModalPage(): React.JSX.Element {
  const [showModal, setShowModal] = useState(false);

  const dispatch = useAppDispatch();
    const resumes = useAppSelector((store) => store.resume.resumes);
    console.log(resumes)
  
    useEffect(() => {
      void dispatch(getResumes());
    }, [dispatch]);

  const handleShowDetails = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  return (
    <>
      <p>Modal</p>
      <Button variant="primary" onClick={handleShowDetails}>
        Подробнее
      </Button>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
           {resumes[0].photo}
           <p>
            <strong>ФИО:</strong> {resumes[0].User.firstName} {resumes[0].User.secondName}
          </p>
          <p>
          </p>
          <p>
            <strong>Номер телефона:</strong> {resumes[0].number}
          </p>
          <p>
            <strong>Age:</strong> {resumes[0].age}
          </p>
          <p>
            <strong>Местоположение:</strong> {resumes[0].location}
          </p>
          <p>
            <strong>Специальность:</strong> {resumes[0].specialty}
          </p>
          <p>
            <strong>Опыт работы:</strong> {resumes[0].experience}
          </p>
          <p>
            <strong>О себе:</strong> {resumes[0].coverLetter}
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Закрыть
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
