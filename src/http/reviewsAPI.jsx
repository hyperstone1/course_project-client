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

export const getAllMovies = async () => {
  const { data } = await axios.get(`${host}/api/reviews/movies`);
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

export const getAllTags = async () => {
  const { data } = await axios.get(`${host}/api/reviews/tags`);
  return data;
};

export const createReview = async (
  reviewType,
  title,
  tags,
  headers,
  texts,
  previewCover,
  reviewImages,
  coverImage,
  bufferImgs,
  bufferCover,
) => {
  const { data } = await axios.post(`${host}/api/reviews/create`, {
    reviewType,
    title,
    tags,
    headers,
    texts,
    previewCover,
    reviewImages,
    coverImage,
    bufferImgs,
    bufferCover: [...bufferCover],
  });
  console.log(data);
  return data;
};

export const uploadImg = async (uint8Array) => {
  try {
    const response = await axios({
      method: 'post',
      url: `${host}/api/reviews/create`,
      data: [...uint8Array], 
    });

    console.log(response);
  } catch (e) {
    console.error(e.message, 'function handleSubmit');
  }
};

export const getCoverImages = async (coverURL) => {
  const { data } = await axios.post(`${host}/api/reviews/cover_image`, { url: coverURL });
  console.log(data);
  return data;
};
