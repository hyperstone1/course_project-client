import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { FaRegUserCircle } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import './index.scss';
import flagUsa from '../../images/united-states-flag-icon.svg';
import flagRus from '../../images/russia-flag-icon.svg';
import { useSelector, useDispatch } from 'react-redux';
import { setLang, setTheme } from '../../store/slices/headerSlice/headerSlice';
import { RiPaletteLine, RiPaletteFill } from 'react-icons/ri';
import jwt_decode from 'jwt-decode';
import { setLogin } from '../../store/slices/auth/authSlice';

const Header = () => {
  const dispatch = useDispatch();
  const lang = useSelector((state) => state.header.language);
  const theme = useSelector((state) => state.header.theme);
  const navigate = useNavigate();
  const [clickUser, setClickUser] = useState();
  const [isUser, setIsUser] = useState(false);
  const [logout, setLogout] = useState(false);
  const [userName, setUserName] = useState('user');

  useEffect(() => {
    console.log(lang);
  }, [lang]);

  useEffect(() => {
    const user = localStorage.getItem('token');
    if (user) {
      setUserName(jwt_decode(user).name);
      setIsUser(true);
      console.log('user: ', user);
    }
    // console.log('jwt_decode(user): ', jwt_decode(user).id);
  }, [logout, userName]);

  const handleClickUser = () => {
    setClickUser(!clickUser);
  };
  const handleClickLogOut = () => {
    localStorage.clear();
    navigate('/');
    setLogout(true);
    setUserName('user');
  };

  const handleClickLogin = () => {
    dispatch(setLogin(true));
    navigate('/login');
  };

  const handleClickSignUp = () => {
    dispatch(setLogin(false));
    navigate('/register');
  };

  return (
    <Navbar id="header" bg="light" expand="lg">
      <Container fluid>
        <Link className="brand_link" to="/">
          <Navbar.Brand>HonestlyCO</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
            <Nav.Link>
              <Link className="menu-link" to="/">
                Home
              </Link>
            </Nav.Link>

            <Nav.Link>
              <Link className="menu-link" to="/movies">
                Movies
              </Link>
            </Nav.Link>

            <Nav.Link>
              <Link className="menu-link" to="/games">
                Games
              </Link>
            </Nav.Link>
            <Nav.Link>
              <Link className="menu-link" to="/books">
                Books
              </Link>
            </Nav.Link>
            <Nav.Link>
              <Link className="menu-link" to="/music">
                Music
              </Link>
            </Nav.Link>
          </Nav>
          <Form className="d-flex">
            <Form.Control type="search" placeholder="Search" className="me-2" aria-label="Search" />
            <Button variant="outline-success">Search</Button>
          </Form>
          <Nav style={{ marginLeft: '50px' }}>
            <NavDropdown
              title={
                lang === 'ru' ? (
                  <div>
                    <img style={{ width: '20px', height: '20px' }} src={flagRus} alt="flag rus" />{' '}
                    ru
                  </div>
                ) : (
                  <div>
                    <img style={{ width: '20px', height: '20px' }} src={flagUsa} alt="flag usa" />{' '}
                    en
                  </div>
                )
              }
              id="navbarScrollingDropdown"
            >
              <NavDropdown.Item onClick={() => dispatch(setLang({ language: 'ru' }))}>
                <img style={{ width: '20px', height: '20px' }} src={flagRus} alt="flag rus" /> ru
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => dispatch(setLang({ language: 'eng' }))}>
                <img style={{ width: '20px', height: '20px' }} src={flagUsa} alt="flag usa" /> en
              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown
              style={{ marginRight: '40px' }}
              title={
                theme === 'light' ? (
                  <div>
                    <RiPaletteLine style={{ width: '20px', height: '20px' }} /> theme
                  </div>
                ) : (
                  <div>
                    <RiPaletteLine style={{ width: '20px', height: '20px', color: 'black' }} />{' '}
                    theme
                  </div>
                )
              }
              id="navbarScrollingDropdown"
            >
              <NavDropdown.Item onClick={() => dispatch(setTheme({ theme: 'light' }))}>
                <RiPaletteLine style={{ width: '20px', height: '20px' }} /> light
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => dispatch(setTheme({ theme: 'dark' }))}>
                <RiPaletteFill style={{ width: '20px', height: '20px' }} /> dark
              </NavDropdown.Item>
            </NavDropdown>
            <FaRegUserCircle
              style={{ position: 'relative', top: '5px', width: '30px', height: '30px' }}
            />

            {isUser ? (
              <NavDropdown title={userName} id="navbarScrollingDropdown">
                <NavDropdown.Item>
                  <Link className="link_router" to="/profile">
                    Profile
                  </Link>
                </NavDropdown.Item>

                <NavDropdown.Item onClick={handleClickLogOut}>Log out</NavDropdown.Item>
              </NavDropdown>
            ) : (
              <NavDropdown title="user" id="navbarScrollingDropdown">
                <NavDropdown.Item onClick={handleClickLogin}>Login</NavDropdown.Item>

                <NavDropdown.Item onClick={handleClickSignUp}>Sign up</NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
