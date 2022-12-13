import React, { useState, useEffect, useMemo } from 'react';
import './index.scss';
import { FaUserAlt } from 'react-icons/fa';
import Select from 'react-select';
import countryList from 'react-select-country-list';
import axios from 'axios';
import { host } from '../../utils/constants';
import { useSelector } from 'react-redux';
import { FaSadCry } from 'react-icons';
const ProfileInfo = () => {
  const [userInfo, setUserInfo] = useState();
  const [name, setName] = useState();
  const [lastName, setLastName] = useState();
  const [secondName, setSecondName] = useState();
  const [country, setCountry] = useState();
  const [city, setCity] = useState();
  const [phone, setPhone] = useState();
  const menuItem = useSelector((state) => state.profile.menuValue);
  const options = useMemo(() => countryList().getData(), []);

  const customStyles = {
    input: (styles) => {
      {
        return { ...styles, padding: '12px 0px' };
      }
    },
  };

  useEffect(() => {
    const { data } = axios.get(`${host}/api/user/getInfo`);
    setUserInfo(data);
  }, []);

  const handleChangeCountry = (value) => {
    setCountry(value);
  };

  const setInfoHandler = async () => {
    const { data } = await axios.post(`${host}/api/user/setInfo`, {
      name,
      lastName,
      secondName,
      country,
      city,
      phone,
    });
    console.log(data);
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
      {menuItem === reviews && (
        <div className="reviews">
          <div>You don't have any posts</div>
          <FaSadCry />
          <span>click here to create a post</span>
        </div>
      )}
      {menuItem === comments && (
        <div className="comments">
          <div>You don't have any comments</div>
          <FaSadCry />
        </div>
      )}
    </>
  );
};

export default ProfileInfo;
