import React, { useState, useEffect } from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import { getReviewsByTag } from '../../http/reviewsAPI';
import { getUsers, userAllLikes } from '../../http/userAPI';
import { useParams } from 'react-router-dom';
import CardReview from '../../components/CardReview/CardReview';
import Row from 'react-bootstrap/Row';
import { useSelector, useDispatch } from 'react-redux';
import { setReviewLikes, setUserLikes } from '../../store/slices/reviewSlice/review';

const SearchTag = () => {
  const [reviews, setReviews] = useState([]);
  const [likesByUser, setLikesByUser] = useState([]);
  const [users, setUsers] = useState([]);
  const userId = useSelector((state) => state.user.id);
  const dispatch = useDispatch();

  const params = useParams();
  const tag = params.tag;

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

  useEffect(() => {
    const fetchUsers = async () => {
      const allUsers = await getUsers();
      setUsers(allUsers);
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchReviews = async () => {
      const tagReviews = await getReviewsByTag(tag);
      setReviews(tagReviews);
      console.log('tagReviews: ', tagReviews);
    };
    fetchReviews();
  }, [tag]);

  return (
    <div>
      <Header />
      <div className="content container">
        <h4 style={{ textAlign: 'center' }}>Search by {tag}</h4>
        <div className="review_cards">
          <Row xs={1} md={2} className="g-4">
            {reviews.map((review) => (
              <CardReview {...review} users={users} />
            ))}
          </Row>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SearchTag;
