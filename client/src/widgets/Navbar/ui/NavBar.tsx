import { useUser } from '@/entities/user/hooks/userHook';
import { useAppSelector } from '@/shared/api/hooks/hooks';
import React from 'react';
import { Button, NavItem } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router';

export default function NavBar(): React.JSX.Element {
  const status = useAppSelector((store) => store.user.status);
  const { logoutHandler } = useUser();

  const logout = async (): Promise<void> => {
    await logoutHandler();
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand as={Link} to="/">
          HR-Swipe
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {status === 'logged' && (
              <>
                <Nav.Link as={Link} to="/">
                  Вакансии
                </Nav.Link>
                <Nav.Link as={Link} to="/responses">
                  Отклики
                </Nav.Link>
                <Nav.Link as={Link} to="/cabinet">
                  Личный кабинет
                </Nav.Link>
                <Nav.Link as={Link} to="/company">
                  Компания
                </Nav.Link>
                <NavItem>
                  <Button onClick={logout}>Выход</Button>
                </NavItem>
              </>
            )}
            {status === 'guest' && (
              <>
                <Nav.Link as={Link} to="/login">
                  Войти
                </Nav.Link>
                <Nav.Link as={Link} to="/register">
                  Регистрация
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
