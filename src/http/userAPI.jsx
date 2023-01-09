import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { host } from '../utils/constants';

export const login = async (email, password) => {
  const { data } = await axios.post(`${host}/api/user/login`, {
    email: email,
    password: password,
  });
  localStorage.setItem('token', data.token);

  return jwt_decode(data.token);
};
export const registration = async (name, email, password) => {
  const { data } = await axios.post(`${host}/api/user/registration`, {
    email,
    password,
    name,
  });
  localStorage.setItem('token', data.token);

  return jwt_decode(data.token);
};

export const likeReview = async (id, userId) => {
  const { data } = await axios.post(`${host}/api/user/like`, {
    id,
    idUser: userId,
  });
  return data;
};

export const userAllLikes = async (userId) => {
  const { data } = await axios.post(`${host}/api/user/user_likes`, {
    userId: userId,
  });
  return data;
};

export const getUsers = async () => {
  const { data } = await axios.get(`${host}/api/user/users`);
  return data;
};
export const getUser = async (idUser) => {
  const { data } = await axios.post(`${host}/api/user/user`, { idUser });
  return data;
};
