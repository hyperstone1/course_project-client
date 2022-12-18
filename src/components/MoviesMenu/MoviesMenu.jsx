import React, { useState, useRef, useEffect } from 'react';
import './index.scss';
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';
import Select from 'react-select';

const MoviesMenu = ({ openEqualizer }) => {
  const [open, setOpen] = useState();
  const refContainer = useRef(null);
  const refMenu = useRef(null);

  useEffect(() => {
    const container = refContainer.current;
    const menu = refMenu.current;
    setOpen(openEqualizer);
    if (openEqualizer) {
      container.classList.add('active');
      menu.style.display = 'block';
    } else {
      container.classList.add('closing');
      setTimeout(() => {
        menu.style.display = 'none';
        container.classList.remove('closing');
        container.classList.remove('active');
      }, 1000);
    }
    console.log(openEqualizer);
    console.log(open);
  }, [openEqualizer]);

  const filterGenres = [
    { value: 'horror', label: 'Horror' },
    { value: 'comedy', label: 'Comedy' },
    { value: 'scienceFiction', label: 'Science Fiction' },
    { value: 'science', label: 'Science' },
    { value: 'drama', label: 'Drama' },
    { value: 'thriller', label: 'Thriller' },
    { value: 'action', label: 'Action' },
    { value: 'psychology', label: 'Psychology' },
    { value: 'romantic', label: 'Romantic' },
    { value: 'western', label: 'Western' },
    { value: 'biography', label: 'Biography' },
    { value: 'cosmos', label: 'Cosmos' },
  ];

  const filterRating = [
    { value: 'all', label: 'All' },
    { value: 'withoutRating', label: 'Without rating' },
    { value: 'atLeastFive', label: 'at least 5' },
    { value: 'atLeastFour', label: 'at least 4' },
    { value: 'atLeastThree', label: 'at least 3' },
  ];

  const filterDate = [
    { value: 'all', label: 'All' },
    { value: 'month', label: 'month' },
    { value: 'threeMonth', label: '3 month' },
    { value: 'sixMonth', label: '6 month' },
    { value: 'year', label: '1 year' },
    { value: 'moreThanYear', label: 'more than 1 year' },
  ];

  const sortBy = [
    { value: 'byDateAdded', label: 'By date added' },
    { value: 'byBookRating', label: 'By rating' },
    { value: 'mostPopular', label: 'Most popular' },
    { value: 'mostDiscussed', label: 'Most Discussed' },
  ];

  const customStyles = {
    container: (styles) => {
      return {
        ...styles,
        width: '30%',
      };
    },
    menu: (styles) => {
      return {
        ...styles,
        position: 'absolute',
        zIndex: '99999999 !important',
        overflow: 'visible',
      };
    },
    menuList: (styles) => {
      return {
        ...styles,
        display: 'block',
        zIndex: '999999999 !important',
      };
    },
  };

  return (
    <div ref={refMenu} className="movies_menu">
      <div ref={refContainer} className="container_menu">
        <div className="filter_sort">
          <div className="filter">
            <Select
              menuPortalTarget={document.querySelector('body')}
              styles={customStyles}
              options={filterGenres}
              placeholder="Genre"
            />
            <Select
              menuPortalTarget={document.querySelector('body')}
              styles={customStyles}
              options={filterRating}
              placeholder="Rating"
            />
            <Select
              menuPortalTarget={document.querySelector('body')}
              styles={customStyles}
              options={filterDate}
              placeholder="Date"
            />
          </div>
          <div className="sort_and_search">
            <Select
              menuPortalTarget={document.querySelector('body')}
              styles={customStyles}
              options={sortBy}
              placeholder="Sort by ..."
            />
            <button className="search_button">Search</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoviesMenu;
