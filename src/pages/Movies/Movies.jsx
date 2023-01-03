import React, { useState, useRef, useEffect } from 'react';
import Header from '../../components/Header/Header';
import MoviesMenu from '../../components/MoviesMenu/MoviesMenu';
import { RiEqualizerLine } from 'react-icons/ri';
import { CiSearch } from 'react-icons/ci';
import Row from 'react-bootstrap/Row';
import CardReview from '../../components/CardReview/CardReview';
import { Link } from 'react-router-dom';
import './index.scss';
import { getAllMovies } from '../../http/reviewsAPI';
import Skeleton from './Skeleton';

const Movies = () => {
  const [openEqualizer, setOpenEqualizer] = useState(false);
  const [search, setSearch] = useState(false);
  const [movies, setMovies] = useState([]);
  const ref = useRef(null);

  const animationSearch = () => {
    setSearch(!search);
  };

  useEffect(() => {
    const getMovies = async () => {
      const { data } = await getAllMovies();
      setMovies(data);
      console.log(data);
    };
    getMovies();
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

  const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />);

  return (
    <>
      <Header />
      <div className="container">
        <div className="container_movies">
          <div className="title">
            <h4>Movie reviews</h4>
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
            {movies && movies.map((movie) => <CardReview {...movie} />)}
          </Row>
        </div>
      </div>
    </>
  );
};

export default Movies;
