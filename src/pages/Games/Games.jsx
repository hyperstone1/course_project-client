import React, { useState, useRef, useEffect } from 'react';
import Header from '../../components/Header/Header';
import MoviesMenu from '../../components/MoviesMenu/MoviesMenu';
import { RiEqualizerLine } from 'react-icons/ri';
import { CiSearch } from 'react-icons/ci';
import Row from 'react-bootstrap/Row';
import CardReview from '../../components/CardReview/CardReview';
import { Link } from 'react-router-dom';
import { getAllGames } from '../../http/reviewsAPI';

const Games = () => {
  const [openEqualizer, setOpenEqualizer] = useState(false);
  const [search, setSearch] = useState(false);
  const [games, setGames] = useState([]);
  const ref = useRef(null);

  const animationSearch = () => {
    setSearch(!search);
  };

  useEffect(() => {
    const getGames = async () => {
      const { data } = await getAllGames();
      setGames(data);
      console.log(data);
    };
    getGames();
  }, []);

  useEffect(() => {
    const input = ref.current;
    if (search) {
      input.classList.add('active');
    } else {
      input.classList.add('closing');
      setTimeout(() => {
        input.classList.remove('active');

        input.classList.remove('closing');
      }, 1000);
    }
  }, [search]);

  return (
    <>
      <Header />
      <div className="container">
        <div className="container_movies">
          <div className="title">
            <h4>Game reviews</h4>
            <div ref={ref} className={'search_input'}>
              <input type="text" placeholder="Search..." />
            </div>
            <div className="options">
              <button className="create_review">
                <Link to="/movies/add"> Create review</Link>
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
            {games && games.map((game) => <CardReview {...game} />)}
          </Row>
        </div>
      </div>
    </>
  );
};

export default Games;
