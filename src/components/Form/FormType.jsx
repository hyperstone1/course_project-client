import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import { useSelector, useDispatch } from 'react-redux';
import { setLogin } from '../../store/slices/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaUserAlt } from 'react-icons/fa';
import './index.scss';
import { SiVk } from 'react-icons/si';
import { popoverPass } from '../../utils/passHint';
import { popoverEmail } from '../../utils/emailHint';
import { IoKey } from 'react-icons/io5';
import { MdAlternateEmail } from 'react-icons/md';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { setUser } from '../../store/slices/user/userSlice';
import { login, registration } from '../../http/userAPI';
import Swal from 'sweetalert2';

const FormType = () => {
  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});
  const [showPass, setShowPass] = useState(false);
  const isLogin = useSelector((state) => state.auth.isLogin);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRegister = () => {
    dispatch(setLogin({ isLogin: false }));
    navigate('/register');
  };
  const handleLogin = () => {
    dispatch(setLogin({ isLogin: true }));
    navigate('/login');
  };

  const setField = (field, value) => {
    setForm({
      ...form,
      [field]: value,
    });
    if (!!errors[field]) {
      setErrors({
        ...errors,
        [field]: null,
      });
    }
  };

  const validateForm = () => {
    const { email, pass } = form;
    const newErrors = {};
    if (!email || email === '') newErrors.email = 'Please enter your email';
    else if (
      !email.match(/^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/)
    ) {
      newErrors.email = 'Invalid email';
    }
    if (!pass || pass === '') newErrors.pass = 'Please enter your pass';
    else if (!pass.match(/^(?=.*[a-zA-Z])(?=.*[0-9]).{6,20}/g)) {
      newErrors.pass = 'Invalid password';
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
    } else {
      if (isLogin) {
        try {
          const response = await login(form.email, form.pass);
          localStorage.setItem('email', response.email);
          const token = localStorage.getItem('token');
          dispatch(setUser({ email: response.email, id: response.id, token, name: response.name }));
          Swal.fire({
            icon: 'success',
            text: 'You have successfully logged',
            showConfirmButton: false,
            timer: 2000,
          });
          navigate('/profile');
        } catch ({ response }) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: `${response.data.message}`,
          });
        }
      } else {
        try {
          const response = await registration(form.name, form.email, form.pass);
          localStorage.setItem('email', response.email);
          const token = localStorage.getItem('token');
          dispatch(setUser({ email: response.email, id: response.id, token, name: response.name }));
          Swal.fire({
            icon: 'success',
            text: 'You have successfully logged',
            showConfirmButton: false,
            timer: 2000,
          });
          navigate('/profile');
        } catch ({ response }) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: `${response.data.message}`,
          });
          console.log(response);
        }
      }
      console.log('form submitted');
    }
    console.log(form);
  };

  const handleShowPass = () => {
    setShowPass(!showPass);
  };

  useEffect(() => {
    console.log(form.email);
  }, [form]);

  return (
    <Form>
      {isLogin ? (
        <>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>

            <Form.Control
              className={!!errors.email && 'red-border'}
              value={form.email}
              onChange={(e) => setField('email', e.target.value)}
              type="email"
              placeholder="Enter email"
              isInvalid={!!errors.email}
            />
            <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
          </Form.Group>
          <Form.Group
            style={{ position: 'relative' }}
            className="mb-3"
            controlId="formBasicPassword"
          >
            <Form.Label>Password</Form.Label>

            <Form.Control
              value={form.pass}
              onChange={(e) => setField('pass', e.target.value)}
              type={showPass ? 'text' : 'password'}
              placeholder="Password"
              isInvalid={!!errors.pass}
            />
            {showPass ? (
              <AiFillEyeInvisible
                style={{
                  position: 'absolute',
                  top: '42px',
                  right: '10px',
                  width: '20px',
                  height: '20px',
                }}
                onClick={handleShowPass}
              />
            ) : (
              <AiFillEye
                style={{
                  position: 'absolute',
                  top: '42px',
                  right: '10px',
                  width: '20px',
                  height: '20px',
                }}
                onClick={handleShowPass}
              />
            )}
          </Form.Group>

          <Button onClick={handleSubmit} variant="primary" type="submit">
            Log In
          </Button>

          <Form.Group
            style={{ display: 'flex', flexDirection: 'column', marginTop: '40px' }}
            className="mb-3"
            controlId="formBasicEmail"
          >
            <Form.Label style={{ textAlign: 'center' }} onClick={handleRegister}>
              Or Sign Up Using
            </Form.Label>
            <Form.Text style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
              <SiVk className="icons_vk" />

              <FaTwitter className="icons_twitter" />
              <FaFacebook className="icons_facebook" />
            </Form.Text>
          </Form.Group>

          <Form.Group
            style={{
              display: 'flex',
              flexDirection: 'column',
              textAlign: 'center',
              marginTop: '60px',
            }}
            className="mb-3"
            controlId="formBasicEmail"
          >
            <Form.Label>Have not account yet?</Form.Label>
            <Form.Text onClick={handleRegister} className="sign_in">
              Sign Up
            </Form.Text>
          </Form.Group>
        </>
      ) : (
        <>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Name</Form.Label>
            <InputGroup className="mb-2">
              <InputGroup.Text>
                <FaUserAlt style={{ width: '20px', height: '20px' }} />
              </InputGroup.Text>
              <Form.Control
                value={form.name}
                onChange={(e) => setField('name', e.target.value)}
                type="text"
                placeholder="Enter your name"
                isInvalid={!!errors.name}
              />
            </InputGroup>
            <Form.Text className="text-muted"></Form.Text>
          </Form.Group>
          <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <InputGroup className="mb-2">
              <OverlayTrigger trigger="click" placement="left" overlay={popoverEmail}>
                <InputGroup.Text style={{ cursor: 'pointer' }}>
                  <MdAlternateEmail style={{ width: '20px', height: '20px' }} />
                </InputGroup.Text>
              </OverlayTrigger>
              <Form.Control
                value={form.email}
                onChange={(e) => setField('email', e.target.value)}
                type="email"
                placeholder="Enter your email"
                isInvalid={!!errors.email}
              />
              <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
            </InputGroup>

            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <InputGroup className="mb-2">
              <OverlayTrigger trigger="click" placement="left" overlay={popoverPass}>
                <InputGroup.Text style={{ cursor: 'pointer' }}>
                  <IoKey style={{ width: '20px', height: '20px' }} />
                </InputGroup.Text>
              </OverlayTrigger>
              <Form.Control
                value={form.pass}
                onChange={(e) => setField('pass', e.target.value)}
                type={showPass ? 'text' : 'password'}
                placeholder="Password"
                isInvalid={!!errors.pass}
              />
              {showPass ? (
                <AiFillEyeInvisible
                  style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    width: '20px',
                    height: '20px',
                  }}
                  onClick={handleShowPass}
                />
              ) : (
                <AiFillEye
                  style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    width: '20px',
                    height: '20px',
                  }}
                  onClick={handleShowPass}
                />
              )}
              <Form.Control.Feedback type="invalid">{errors.pass}</Form.Control.Feedback>
            </InputGroup>
          </Form.Group>

          <Button onClick={handleSubmit} variant="primary" type="submit">
            Sign Up
          </Button>

          <Form.Group
            style={{
              display: 'flex',
              flexDirection: 'column',
              textAlign: 'center',
              marginTop: '60px',
            }}
            className="mb-3"
            controlId="formBasicEmail"
          >
            <Form.Label>You are already have an account?</Form.Label>
            <Form.Text onClick={handleLogin} className="sign_in">
              Sign In
            </Form.Text>
          </Form.Group>
        </>
      )}
    </Form>
  );
};

export default FormType;
