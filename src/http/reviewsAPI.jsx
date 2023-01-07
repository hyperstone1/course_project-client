import axios from 'axios';
import { host } from '../utils/constants';

export const getAllGames = async () => {
  const { data } = await axios.get(`${host}/api/reviews/games`);
  return data;
};

export const getAllBooks = async () => {
  const { data } = await axios.get(`${host}/api/reviews/books`);
  return data;
};

export const getAllMusic = async () => {
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
  id,
  name,
  reviewType,
  title,
  tags,
  headers,
  texts,
  rating,
  bufferImgs,
  bufferCover,
) => {
  const { data } = await axios.post(`${host}/api/reviews/create`, {
    id,
    name,
    reviewType,
    title,
    tags,
    headers,
    texts,
    rating,
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
export const getReview = async (reviewId) => {
  const { data } = await axios.post(`${host}/api/reviews/id`, { reviewId });
  console.log(data);
  return data;
};
export const getAllReviews = async (reviewId) => {
  const { data } = await axios.get(`${host}/api/reviews/get_all`);
  console.log(data);
  return data;
};

export const getReviewByUser = async (id) => {
  const { data } = await axios.post(`${host}/api/reviews/user_reviews`, { id });
  console.log(data);
  return data;
};
export const updateReview = async (
  id,
  name,
  reviewType,
  title,
  tags,
  headers,
  texts,
  rating,
  bufferImgs,
  bufferCover,
) => {
  const { data } = await axios.post(`${host}/api/reviews/update_review`, {
    id,
    name,
    reviewType,
    title,
    tags,
    headers,
    texts,
    rating,
    bufferImgs,
    bufferCover: [...bufferCover],
  });
  console.log(data);
  return data;
};
