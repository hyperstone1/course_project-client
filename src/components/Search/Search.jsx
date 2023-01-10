import React, { useState, useRef, useEffect, useMemo } from 'react';
import debounce from 'lodash/debounce';
import { useNavigate } from 'react-router-dom';
import { getSearchResult } from '../../http/reviewsAPI';
import './index.scss';

const Search = ({ search }) => {
  const [searchResults, setSearchResults] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const navigate = useNavigate();
  const ref = useRef(null);
  const [isEmpty, setIsEmpty] = useState(false);

  useEffect(() => {
    const input = ref.current;
    if (search) {
      input.classList.add('active');
    } else {
      input.classList.add('closing');
      setSearchResults([]);
      setSearchValue('');
      setTimeout(() => {
        input.classList.remove('active');

        input.classList.remove('closing');
      }, 1000);
    }
  }, [search]);

  useEffect(() => {
    if (searchValue.length < 3) {
      setSearchResults('');
    }
  }, [searchValue]);

  const handleInputChange = useMemo(
    () =>
      debounce(() => {
        if (searchValue.length < 3) return;
        getSearchResult(searchValue).then((data) => {
          console.log(data);
          if (data.length < 1) {
            setIsEmpty(true);
          }
          setSearchResults(data);
        });
      }, 800),
    [searchValue],
  );

  const handleChange = (e) => {
    setIsEmpty(false);
    setSearchValue(e.target.value);
    handleInputChange(e);
  };

  const handleClickResult = (id) => {
    navigate(`/reviews/${id}`);
  };
  return (
    <>
      <div ref={ref} className={'search_input'}>
        <input value={searchValue} onChange={handleChange} type="text" placeholder="Search..." />
      </div>

      <div className="content_result">
        {isEmpty ? <div className="result_empty">По вашему запросу ничего не найдено</div> : null}
        {searchResults.length > 0
          ? searchResults.map((item, id) => (
              <div key={id} className="result" onClick={() => handleClickResult(item.id)}>
                {item.result.length > 30 ? `${item.result.substring(0, 30)}...` : item.result}
              </div>
            ))
          : null}
      </div>
    </>
  );
};

export default Search;
