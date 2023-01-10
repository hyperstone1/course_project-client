import React, { useState, useEffect } from 'react';
import Header from '../../components/Header/Header';
import MoviesMenu from '../../components/MoviesMenu/MoviesMenu';
import { RiEqualizerLine } from 'react-icons/ri';
import { CiSearch } from 'react-icons/ci';
import Row from 'react-bootstrap/Row';
import CardReview from '../../components/CardReview/CardReview';
import { Link } from 'react-router-dom';
import { getAllGames } from '../../http/reviewsAPI';
import { getUsers } from '../../http/userAPI';
import { useSelector } from 'react-redux';
import Search from '../../components/Search/Search';

const Games = () => {
  const [openEqualizer, setOpenEqualizer] = useState(false);
  const [search, setSearch] = useState(false);
  const [games, setGames] = useState([]);
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
    const getGames = async () => {
      const { data } = await getAllGames();
      setGames(data);
      console.log(data);
    };
    getGames();
  }, []);

  return (
    <>
      <Header />
      <div className="container">
        <div className="container_movies">
          <div className="title">
            <h4>{lang === 'eng' ? 'Game reviews' : 'Обзоры игр'}</h4>
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
            {games && games.map((game) => <CardReview {...game} users={users} />)}
          </Row>
        </div>
      </div>
    </>
  );
};

export default Games;
