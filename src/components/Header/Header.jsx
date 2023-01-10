import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
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
import { removeUser } from '../../store/slices/user/userSlice';
import { clearLikes } from '../../store/slices/reviewSlice/review';

const Header = () => {
  const dispatch = useDispatch();
  const lang = useSelector((state) => state.header.language);
  const theme = useSelector((state) => state.header.theme);
  const navigate = useNavigate();
  const [isUser, setIsUser] = useState(false);
  const [logout, setLogout] = useState(false);
  const [userName, setUserName] = useState('user');

  useEffect(() => {
    const user = localStorage.getItem('token');
    if (user) {
      setUserName(jwt_decode(user).name);
      setIsUser(true);
    }
  }, [logout, userName]);

  const handleClickLogOut = () => {
    localStorage.clear();
    dispatch(removeUser());
    dispatch(clearLikes());
    navigate('/');
    setLogout(true);
    setUserName('user');
    setIsUser(false);
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
                {lang === 'eng' ? 'Home' : 'Главная'}
              </Link>
            </Nav.Link>

            <Nav.Link>
              <Link className="menu-link" to="/movies">
                {lang === 'eng' ? 'Movies' : 'Кино'}
              </Link>
            </Nav.Link>

            <Nav.Link>
              <Link className="menu-link" to="/games">
                {lang === 'eng' ? 'Games' : 'Игры'}
              </Link>
            </Nav.Link>
            <Nav.Link>
              <Link className="menu-link" to="/books">
                {lang === 'eng' ? 'Books' : 'Книги'}
              </Link>
            </Nav.Link>
            <Nav.Link>
              <Link className="menu-link" to="/music">
                {lang === 'eng' ? 'Music' : 'Музыка'}
              </Link>
            </Nav.Link>
          </Nav>
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
                    {lang === 'eng' ? 'Profile' : 'Профиль'}
                  </Link>
                </NavDropdown.Item>

                <NavDropdown.Item onClick={handleClickLogOut}>
                  {lang === 'eng' ? 'Log out' : 'Выйти'}
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <NavDropdown title="user" id="navbarScrollingDropdown">
                <NavDropdown.Item onClick={handleClickLogin}>
                  {lang === 'eng' ? 'Login' : 'Войти'}
                </NavDropdown.Item>

                <NavDropdown.Item onClick={handleClickSignUp}>
                  {lang === 'eng' ? 'Sign up' : 'Зарегистрироваться'}
                </NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
