import React, { useState,  useEffect } from 'react';
import Header from '../../components/Header/Header';
import MoviesMenu from '../../components/MoviesMenu/MoviesMenu';
import { RiEqualizerLine } from 'react-icons/ri';
import { CiSearch } from 'react-icons/ci';
import Row from 'react-bootstrap/Row';
import CardReview from '../../components/CardReview/CardReview';
import { Link } from 'react-router-dom';
import { getAllMusic } from '../../http/reviewsAPI';
import { getUsers } from '../../http/userAPI';
import { useSelector } from 'react-redux';
import Search from '../../components/Search/Search';


const Music = () => {
  const [openEqualizer, setOpenEqualizer] = useState(false);
  const [search, setSearch] = useState(false);
  const [music, setMusic] = useState([]);

  const [users, setUsers] = useState([]);
  const { existRating } = useSelector((state) => state.review);

  useEffect(() => {
    const fetchUsers = async () => {
      const allUsers = await getUsers();
      console.log(allUsers);
      setUsers(allUsers);
    };
    fetchUsers();
  }, [existRating]);

  const animationSearch = () => {
    setSearch(!search);
  };

  useEffect(() => {
    const getMusic = async () => {
      const { data } = await getAllMusic();
      setMusic(data);
      console.log(data);
    };
    getMusic();
  }, []);


  return (
    <>
      <Header />
      <div className="container">
        <div className="container_movies">
          <div className="title">
            <h4>Music reviews</h4>
            <Search search={search} />
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
            {music && music.map((item) => <CardReview {...item} users={users} />)}
          </Row>
        </div>
      </div>
    </>
  );
};

export default Music;
