import React, { useState, useEffect } from 'react';
import BestReviews from '../../components/BestReviews/BestReviews';
import LastReviews from '../../components/LastReviews/LastReviews';
import Filter from '../../components/Filter/Filter';
import CardReview from '../../components/CardReview/CardReview';
import Row from 'react-bootstrap/Row';
import './index.scss';
import { getLatestReviews, getBestReviews, getAllReviews } from '../../http/reviewsAPI';
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
import jwtDecode from 'jwt-decode';
import { setUser } from '../../store/slices/user/userSlice';
import { AiOutlineArrowRight } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { setReviewLikes } from '../../store/slices/reviewSlice/review';
import { userAllLikes } from '../../http/userAPI';
import { setUserLikes } from '../../store/slices/reviewSlice/review';

const Feed = () => {
  const dispatch = useDispatch();
  const filter = useSelector((state) => state.filter.filterValue);
  const userId = useSelector((state) => state.user.id);
  const navigate = useNavigate();
  const [reviews, setReviews] = useState([]);
  const [latestReviews, setLatestReviews] = useState();
  const [likesByUser, setLikesByUser] = useState([]);
  const { reviewLikes, userLikes } = useSelector((state) => state.review);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const bestReviews = await getBestReviews();
        // const latestReviews = await getLatestReviews();
        console.log('userId: ', userId);
        const allReviews = await getAllReviews();
        console.log(allReviews);

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
      reviews.map((item) => {
        console.log(item.id);
        dispatch(setReviewLikes({ id: item.id, likes: item.likes }));
      });
    }
    if (likesByUser.length > 0) {
      console.log(likesByUser);
      likesByUser.map((item) => {
        dispatch(setUserLikes({ id: item.idReview }));
      });
    }
  }, [reviews, likesByUser]);

  const handleClickShow = () => {
    navigate(`${filter}/`);
  };

  return (
    <>
      <div className="container_feed">
        <div className="best_reviews">
          <h4>Best reviews</h4>
          <BestReviews />
        </div>

        <div className="filter">
          <h4>Review type</h4>

          {/* <Row xs={1} md={2} className="g-4 grid">
            {Array.from({ length: 4 }).map(() => (
              <CardReview />
            ))}
          </Row> */}
          <Filter reviews={reviews} />
          <div className="filter_cards">
            <div className="show_more" onClick={handleClickShow}>
              Show more <AiOutlineArrowRight />
            </div>
          </div>
        </div>

        <div className="last_reviews">
          <h4>Last reviews</h4>
          <LastReviews reviews={reviews} />
        </div>
      </div>
    </>
  );
};

export default Feed;
