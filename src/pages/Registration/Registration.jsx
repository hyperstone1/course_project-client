import React from 'react';
import FormType from '../../components/Form/FormType';
import { FaUserTie } from 'react-icons/fa';

const Registration = () => {
  return (
    <div className="login_register_container">
      <div className="container_center">
        <div className="icon">
          <FaUserTie />
        </div>
        <h2>Registration</h2>
        <FormType />
      </div>
    </div>
  );
};

export default Registration;
