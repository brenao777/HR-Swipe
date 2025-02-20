import { useUser } from '@/entities/user/hooks/userHook';
import React from 'react';
import { Button, NavItem } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router';

export default function NavBar(): React.JSX.Element {
  const { logoutHandler } = useUser();

  const logout = async (): Promise<void> => {
    await logoutHandler();
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">HR-Swipe</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/login">
              Войти
            </Nav.Link>
            <Nav.Link as={Link} to="/register">
              Регистрация
            </Nav.Link>
            <NavItem>
              <Button onClick={logout}>Выход</Button>
            </NavItem>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
