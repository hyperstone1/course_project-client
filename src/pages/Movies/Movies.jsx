import React, { useState, useRef, useEffect } from 'react';
import Header from '../../components/Header/Header';
import MoviesMenu from '../../components/MoviesMenu/MoviesMenu';
import { RiEqualizerLine } from 'react-icons/ri';
import { CiSearch } from 'react-icons/ci';
import Collapse from 'react-bootstrap/Collapse';

import './index.scss';

const Movies = () => {
  const [openEqualizer, setOpenEqualizer] = useState(false);
  const [search, setSearch] = useState(false);
  const ref = useRef(null);

  const animationSearch = () => {
    setSearch(!search);
  };
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
      <div className="container-movies">
        <div className="container">
          <div className="title">
            <h4>Movie reviews</h4>{' '}
            <div ref={ref} className={'search_input'}>
              <input type="text" placeholder="Search..." />
            </div>
            <div onClick={animationSearch} className="search">
              <CiSearch />
            </div>
            <div onClick={() => setOpenEqualizer(!openEqualizer)} className="equalizer">
              <RiEqualizerLine />
            </div>
          </div>
          <MoviesMenu openEqualizer={openEqualizer} />
        </div>
      </div>
    </>
  );
};

export default Movies;
