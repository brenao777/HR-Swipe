import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { Form } from 'react-bootstrap';
import { useAppDispatch } from '@/shared/api/hooks/hooks';
import { addResume } from '@/entities/Resume/model/redux/resumeThunks';

export default function PersonCabinetPage(): React.JSX.Element {
  const [show, setShow] = useState(false);

  const handleClose = (): void => setShow(false);
  const handleShow = (): void => setShow(true);
  const dispatch = useAppDispatch();

  const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    // console.log(Object.fromEntries(formData));
    void dispatch(addResume(formData));
    // handleClose();
  };

  return (
    <>
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Создать резюме</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={onSubmit}>
            {/* <input type="text" placeholder="Имя" name="name" /> */}
            <input type="number" placeholder="Возраст" name="age" />
            <input type="text" placeholder="Должность" name="specialty" />
            <input type="text" placeholder="Опыт работы" name="experience" />
            <input type="text" placeholder="Местоположение" name="location" />
            <input type="number" placeholder="Номер" name="number" />
            <input type="text" placeholder="Сопроводительное письмо" name="coverLetter" />
            <button type="submit">Опубликовать резюме</button>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <button onClick={handleClose}>Закрыть</button>
        </Modal.Footer>
      </Modal>
      <Button onClick={handleShow}>Создать резюме</Button>
    </div>
    <div>
      <h1>Мои резюме</h1>
      
    </div>
    </>
  );
}

// нужно сделать кнопку для создания резюме при котором будет открываться ResumeModal
