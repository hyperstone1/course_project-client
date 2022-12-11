import React, { useEffect, useRef } from 'react';
import './scss/index.scss';
import Login from './pages/Login/Login';
import Registration from './pages/Registration/Registration';
import { Routes, Route, useNavigate, useSearchParams, useParams } from 'react-router-dom';
import Home from './pages/Home/Home';
import qs from 'qs';
import { useDispatch, useSelector } from 'react-redux';
import { setLogin } from './store/slices/auth/authSlice';

function App() {
  const isLogin = useSelector((state) => state.auth.isLogin);
  const dispatch = useDispatch();
  const isMounted = useRef(null);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const params = useParams();

  useEffect(() => {
    console.log(window.location.pathname);
    if (window.location.pathname === '/login') {
      dispatch(setLogin({ isLogin: true }));
    } else {
      dispatch(setLogin({ isLogin: false }));
    }
  }, [isLogin]);

  useEffect(() => {
    if (params) {
      console.log(params);
    }
  }, []);

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
