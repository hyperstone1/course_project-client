import React, { useState, useEffect, useMemo } from 'react';
import './index.scss';
import { FaUserAlt } from 'react-icons/fa';
import Select from 'react-select';
import countryList from 'react-select-country-list';
import axios from 'axios';
import { host } from '../../utils/constants';
import { FaSadCry } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { getReviewByUser } from '../../http/reviewsAPI';
import jwtDecode from 'jwt-decode';
import Table from 'react-bootstrap/Table';
import { setUrl } from '../../store/slices/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const ProfileInfo = () => {
  const [userInfo, setUserInfo] = useState();
  const [userReviews, setUserReviews] = useState([]);
  const [name, setName] = useState();
  const [lastName, setLastName] = useState();
  const [secondName, setSecondName] = useState();
  const [country, setCountry] = useState();
  const [city, setCity] = useState();
  const [phone, setPhone] = useState();
  const menuItem = useSelector((state) => state.profile.menuValue);
  const { token } = useSelector((state) => state.user);
  const options = useMemo(() => countryList().getData(), []);
  const dispatch = useDispatch();
  const url = useSelector((state) => state.user.url);
  const navigate = useNavigate();

  const customStyles = {
    input: (styles) => {
      {
        return { ...styles, padding: '12px 0px' };
      }
    },
  };
  const handleLinkReview = (type, id) => {
    // if (type === 'Кино') {
    dispatch(setUrl({ url: 'movies' }));
    navigate(`/reviews/${id}`);
    // }
    // if (type === 'Книги') {
    //   navigate(`/books/${id}`);
    // }
    // if (type === 'Игры') {
    //   navigate(`/games/${id}`);
    // }
    // if (type === 'Музыка') {
    //   navigate(`/music/${id}`);
    // }
  };

  useEffect(() => {
    // const { data } = axios.get(`${host}/api/user/getInfo`);
    // setUserInfo(data);
  }, []);

  useEffect(() => {
    if (token) {
      const { id } = jwtDecode(token);
      const fetchReviews = async () => {
        const data = await getReviewByUser(id);
        setUserReviews(data);
        console.log(data);
      };
      fetchReviews();
    }
  }, [token]);

  useEffect(() => {
    setUserReviews(
      userReviews.map((item) => {
        // console.log(window.location.pathname);
        if (item.type === 'Кино') {
          item.url = '/movies';
          // dispatch(setUrl('/movies'));
          // console.log(document.location.search);
        }
        if (item.type === 'Игры') {
          dispatch(setUrl('/games'));
        }
        if (item.type === 'Книги') {
          dispatch(setUrl('/books'));
        }
        if (item.type === 'Музыка') {
          dispatch(setUrl('/music'));
        }
      }),
    );
  }, []);

  const handleChangeCountry = (value) => {
    setCountry(value);
  };

  const setInfoHandler = async () => {
    // const { data } = await axios.post(`${host}/api/user/setInfo`, {
    //   name,
    //   lastName,
    //   secondName,
    //   country,
    //   city,
    //   phone,
    // });
    // console.log(data);
  };
  return (
    <>
      {menuItem === 'info' && (
        <div className="info">
          <div className="name">
            <FaUserAlt />
            <h3>Welcome, user!</h3>
          </div>
          <div className="userData">
            <h4>Personal information</h4>

            <div className="mainData">
              <div className="containerInput">
                <input onChange={(e) => setName(e.target.value)} value={name} type="text" />
                <label htmlFor="">Name</label>
              </div>

              <div className="containerInput">
                <input onChange={(e) => setLastName(e.target.value)} value={lastName} type="text" />
                <label htmlFor="">LastName</label>
              </div>
              <div className="containerInput">
                <input
                  onChange={(e) => setSecondName(e.target.value)}
                  value={secondName}
                  type="text"
                />
                <label htmlFor="">SecondName</label>
              </div>
              <div className="containerInput">
                <Select
                  styles={customStyles}
                  options={options}
                  value={country}
                  onChange={handleChangeCountry}
                />
                <label htmlFor="">Country</label>
              </div>
              <div className="containerInput">
                <input onChange={(e) => setCity(e.target.value)} value={city} type="text" />
                <label htmlFor="">City</label>
              </div>
              <div className="containerInput">
                <input onChange={(e) => setPhone(e.target.value)} value={phone} type="text" />
                <label htmlFor="">Phone</label>
              </div>
            </div>

            <button onClick={setInfoHandler} className="btnSave">
              Сохранить
            </button>
          </div>
        </div>
      )}
      {menuItem === 'reviews' &&
        (userReviews && userReviews.length > 0 ? (
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th>id</th>
                <th>Review title</th>
                <th>Rating</th>
                <th>Likes</th>
                <th>Link</th>
              </tr>
            </thead>

            <tbody>
              {userReviews.map((item) => (
                <tr>
                  <td>{item.id}</td>
                  <td>{item.title}</td>
                  <td>{item.rating}</td>
                  <td>{item.likes}</td>
                  <td>
                    <span
                      onClick={() => handleLinkReview(item.type, item.id)}
                      style={{ color: 'blue', cursor: 'pointer' }}
                    >
                      Open
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <div className="reviews no_info">
            <div style={{ fontSize: '24px' }}>You don't have any posts</div>
            <FaSadCry style={{ width: '40px', height: '40px' }} />

            <Link to="">click here to create a post</Link>
          </div>
        ))}
      {menuItem === 'comments' && (
        <div className="comments no_info">
          <div style={{ fontSize: '24px' }}>You don't have any comments</div>
          <FaSadCry style={{ width: '40px', height: '40px' }} />
        </div>
      )}
    </>
  );
};

export default ProfileInfo;
