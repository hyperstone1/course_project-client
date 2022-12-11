import React, { useEffect } from 'react';
import './scss/index.scss';
import Login from './pages/Login/Login';
import Registration from './pages/Registration/Registration';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import { useDispatch, useSelector } from 'react-redux';
import { setLogin } from './store/slices/auth/authSlice';

function App() {
  const isLogin = useSelector((state) => state.auth.isLogin);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(window.location.pathname);
    if (window.location.pathname === '/login') {
      dispatch(setLogin({ isLogin: true }));
    } else {
      dispatch(setLogin({ isLogin: false }));
    }
  }, [isLogin, dispatch]);

  return (
    <div className="App">
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
