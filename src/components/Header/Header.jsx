import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { FaRegUserCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './index.scss';

const Header = () => {
  const [clickUser, setClickUser] = useState();

  const handleClickUser = () => {
    setClickUser(!clickUser);
  };

  return (
    <Navbar id="header" bg="light" expand="lg">
      <Container fluid>
        <Link to="/">
          <Navbar.Brand href="#">HonestlyCO</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
            <Nav.Link href="#action1">Home</Nav.Link>
            <Nav.Link href="#action2">Movies</Nav.Link>
            <Nav.Link href="#action3">Games</Nav.Link>
            <Nav.Link href="#action4">Books</Nav.Link>
            <Nav.Link href="#action5">Music</Nav.Link>
          </Nav>
          <Form className="d-flex">
            <Form.Control type="search" placeholder="Search" className="me-2" aria-label="Search" />
            <Button variant="outline-success">Search</Button>
          </Form>
          <Nav style={{ marginLeft: '50px' }}>
            <FaRegUserCircle
              style={{ position: 'relative', top: '5px', width: '30px', height: '30px' }}
            />
            <NavDropdown title="user" id="navbarScrollingDropdown">
              <NavDropdown.Item>
                <Link to="/profile">Profile</Link>
              </NavDropdown.Item>

              <NavDropdown.Item>Log out</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
