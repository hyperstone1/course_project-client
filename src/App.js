import React, { useState, useEffect } from 'react';
import './scss/index.scss';
import Login from './pages/Login/Login';
import Registration from './pages/Registration/Registration';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import { useDispatch, useSelector } from 'react-redux';
import { setLogin } from './store/slices/auth/authSlice';
import Profile from './pages/Profile/Profile';
import Movies from './pages/Movies/Movies';
import AddReview from './pages/AddReview/AddReview';
import Review from './pages/Review/Review';
import jwtDecode from 'jwt-decode';
import { setUser } from './store/slices/user/userSlice';
import { useLocation } from 'react-router-dom';
import { clearReviewState } from './store/slices/addReviewSlice/addReview';
import Games from './pages/Games/Games';
import Books from './pages/Books/Books';
import Music from './pages/Music/Music';
import SearchTag from './pages/SearchTag/SearchTag';

function App() {
  const isLogin = useSelector((state) => state.auth.isLogin);
  const [path, setPath] = useState();
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    setPath(location.pathname);
    console.log('path: ', path);
    if (path) {
      const urlAdd = path.slice(path.length - 3, path.length);
      if (urlAdd === 'add') {
        dispatch(clearReviewState());
      }
    }
  }, [location, dispatch, path]);

  useEffect(() => {
    console.log(window.location.pathname);
    if (window.location.pathname === '/login') {
      dispatch(setLogin({ isLogin: true }));
    } else {
      dispatch(setLogin({ isLogin: false }));
    }
  }, [isLogin, dispatch]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const user = jwtDecode(localStorage.getItem('token'));
      dispatch(setUser({ id: user.id, email: user.email, token }));
    }
  }, [isLogin, dispatch]);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies/add" element={<AddReview />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/games" element={<Games />} />
        <Route path="/books" element={<Books />} />
        <Route path="/music" element={<Music />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path={`reviews/:id`} element={<Review />} />
        <Route path={`/tag/:tag`} element={<SearchTag />} />
      </Routes>
    </div>
  );
}

export default App;
