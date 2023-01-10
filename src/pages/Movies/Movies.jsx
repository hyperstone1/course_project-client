import React, { useState, useEffect } from 'react';
import Header from '../../components/Header/Header';
import MoviesMenu from '../../components/MoviesMenu/MoviesMenu';
import { RiEqualizerLine } from 'react-icons/ri';
import Row from 'react-bootstrap/Row';
import CardReview from '../../components/CardReview/CardReview';
import { Link } from 'react-router-dom';
import './index.scss';
import { getAllMovies } from '../../http/reviewsAPI';
import { getUsers } from '../../http/userAPI';
import { useSelector } from 'react-redux';
import Search from '../../components/Search/Search';
import { CiSearch } from 'react-icons/ci';

const Movies = () => {
  const [openEqualizer, setOpenEqualizer] = useState(false);
  const [search, setSearch] = useState(false);
  const [movies, setMovies] = useState([]);
  const [users, setUsers] = useState([]);
  const { existRating } = useSelector((state) => state.review);
  const lang = useSelector((state) => state.header.language);

  const animationSearch = () => {
    setSearch(!search);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      const allUsers = await getUsers();
      console.log(allUsers);
      setUsers(allUsers);
    };
    fetchUsers();
  }, [existRating]);

  useEffect(() => {
    const getMovies = async () => {
      const { data } = await getAllMovies();
      setMovies(data);
      console.log(data);
    };
    getMovies();
  }, []);

  return (
    <>
      <Header />
      <div className="container">
        <div className="container_movies">
          <div className="title">
            <h4>{lang === 'eng' ? 'Movie reviews' : 'Обзоры кино'}</h4>
            <Search search={search} />
            <div className="options">
              <button className="create_review">
                <Link to="/movies/add"> {lang === 'eng' ? 'Create review' : 'Создать обзор'}</Link>
              </button>
              <div onClick={animationSearch} className="search">
                <CiSearch />
              </div>

              <div
                onClick={() => setOpenEqualizer(!openEqualizer)}
                className={openEqualizer ? 'equalizer shown' : 'equalizer'}
              >
                <RiEqualizerLine />
              </div>
            </div>
          </div>
          <MoviesMenu openEqualizer={openEqualizer} />
          <Row xs={1} md={2} className="g-4">
            {movies && movies.map((movie) => <CardReview {...movie} users={users} />)}
          </Row>
        </div>
      </div>
    </>
  );
};

export default Movies;
