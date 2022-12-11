import React, { useState, useEffect } from 'react';
import FormType from '../../components/Form/FormType';
import { useDispatch, useSelector } from 'react-redux';
import { setLogin, setRegister } from '../../store/slices/auth/authSlice';
import { FaUserTie } from 'react-icons/fa';
const Login = () => {
  return (
    <div className="login_register_container">
      <div className="container_center">
        <div className="icon">
          <FaUserTie />
        </div>

        <h2>Login</h2>
        <FormType style={{ margin: '0 auto' }} />
      </div>
    </div>
  );
};

export default Login;
