import React, { useState, useEffect } from 'react';
import BestReviews from '../../components/BestReviews/BestReviews';
import LastReviews from '../../components/LastReviews/LastReviews';
import Filter from '../../components/Filter/Filter';

import './index.scss';
import { getAllReviews } from '../../http/reviewsAPI';
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';

import { AiOutlineArrowRight } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { setReviewLikes } from '../../store/slices/reviewSlice/review';
import { userAllLikes } from '../../http/userAPI';
import { setUserLikes } from '../../store/slices/reviewSlice/review';
import { getUsers } from '../../http/userAPI';

const Feed = () => {
  const dispatch = useDispatch();
  const filter = useSelector((state) => state.filter.filterValue);
  const userId = useSelector((state) => state.user.id);
  const navigate = useNavigate();
  const [reviews, setReviews] = useState([]);
  const [likesByUser, setLikesByUser] = useState([]);
  const { existRating } = useSelector((state) => state.review);
  const [users, setUsers] = useState([]);
  const lang = useSelector((state) => state.header.language);

  useEffect(() => {
    const fetchUsers = async () => {
      const allUsers = await getUsers();
      setUsers(allUsers);
    };
    fetchUsers();
  }, [existRating]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const allReviews = await getAllReviews();
        setReviews(allReviews);
      } catch ({ response }) {
        Swal.fire({
          title: 'Oops...',
          text: response.data.message,
        });
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchLikes = async () => {
      if (userId) {
        const likesByUser = await userAllLikes(userId);
        setLikesByUser(likesByUser);
      }
    };
    fetchLikes();
  }, [userId]);

  useEffect(() => {
    if (reviews.length > 0) {
      reviews.map((item) => dispatch(setReviewLikes({ id: item.id, likes: item.likes })));
    }
    if (likesByUser.length > 0) {
      likesByUser.map((item) => dispatch(setUserLikes({ id: item.idReview })));
    }
  }, [reviews, likesByUser, dispatch]);

  const handleClickShow = () => {
    navigate(`${filter}/`);
  };

  return (
    <>
      <div className="container_feed">
        <div className="best_reviews">
          <h4>{lang === 'eng' ? 'Best reviews' : 'Лучшие обзоры'}</h4>
          <BestReviews users={users} />
        </div>

        <div className="filter">
          <h4>{lang === 'eng' ? 'Review type' : 'Тип обзора'}</h4>
          <Filter reviews={reviews} users={users} />
          <div className="filter_cards">
            <div className="show_more" onClick={handleClickShow}>
              {lang === 'eng' ? 'Show more' : 'Показать больше'} <AiOutlineArrowRight />
            </div>
          </div>
        </div>

        <div className="last_reviews" >
          <h4> {lang === 'eng' ? 'Last reviews' : 'Последние обзоры'}</h4>
          <LastReviews reviews={reviews} users={users} />
        </div>
      </div>
    </>
  );
};

export default Feed;
