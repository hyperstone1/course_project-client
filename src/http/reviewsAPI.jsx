import axios from 'axios';
import { host } from '../utils/constants';

export const getMovies = async () => {
  const { data } = await axios.get(`${host}/api/reviews/movies`);
  return data;
};

export const getGames = async () => {
  const { data } = await axios.get(`${host}/api/reviews/games`);
  return data;
};

export const getBooks = async () => {
  const { data } = await axios.get(`${host}/api/reviews/books`);
  return data;
};

export const getMusic = async () => {
  const { data } = await axios.get(`${host}/api/reviews/music`);
  return data;
};

export const getAllReviews = async () => {
  const { data } = await axios.get(`${host}/api/reviews/best`);
  return data;
};

export const getBestReviews = async () => {
  const { data } = await axios.get(`${host}/api/reviews/best`);
  return data;
};

export const getLatestReviews = async () => {
  const { data } = await axios.get(`${host}/api/reviews/latest`);
  return data;
};
