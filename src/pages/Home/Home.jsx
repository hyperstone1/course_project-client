import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';

const Home = () => {
  const [isAuth, setIsAuth] = useState(false);
  return isAuth ? <Navigate to="/profile" /> : <Navigate to="/login" />;
};

export default Home;
