import React, { useState, useEffect } from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import moment from 'moment';
import { getReview, ratingByUser } from '../../http/reviewsAPI';
import { useParams } from 'react-router-dom';
import './index.scss';
import { AiFillHeart } from 'react-icons/ai';
import { BsBookmark } from 'react-icons/bs';
import StarRating from '../../components/StarRating/StarRating';
import { AiFillStar } from 'react-icons/ai';
import { useSelector, useDispatch } from 'react-redux';
import EditReview from '../EditReview/EditReview';
import { ratingReview } from '../../http/reviewsAPI';
import {
  clearRating,
  setExistRating,
  setHover,
  setTypeRating,
} from '../../store/slices/reviewSlice/review';

const Review = () => {
  const [content, setContent] = useState();
  const [like, setLike] = useState();
  const userId = useSelector((state) => state.user.id);
  const [edit, setEdit] = useState(false);
  const { token } = useSelector((state) => state.user);
  const [review, setReview] = useState();
  const params = useParams();
  const reviewId = params.id;
  const { rating, existRating } = useSelector((state) => state.review);
  const dispatch = useDispatch();

  const handleLikeReview = () => {
    setLike(!like);
  };

  useEffect(() => {
    if (userId) {
      const fetchRating = async () => {
        const ratingReviewUser = await ratingByUser(userId, reviewId);
        console.log(ratingReviewUser);
        dispatch(setExistRating({ rating: ratingReviewUser }));
        dispatch(setHover(ratingReviewUser));
      };
      fetchRating();
    }
    dispatch(setTypeRating('user'));
  }, [userId, reviewId, dispatch]);

  useEffect(() => {
    const fetchReview = async () => {
      const { data, reviewsContent } = await getReview(reviewId);
      console.log(data);
      setReview(data[0]);
      setContent(reviewsContent);
    };
    fetchReview();
  }, [rating, reviewId]);

  const handleClickSave = async () => {
    const save = await ratingReview(userId, reviewId, rating);
    dispatch(clearRating());
    dispatch(setExistRating({ rating }));

    console.log(save);
  };
  const handleClickCancel = () => {
    dispatch(clearRating());
    dispatch(setHover(existRating));
  };

  return review ? (
    <div className="review">
      <Header />
      <div className={edit ? 'container edit' : 'container'}>
        <div className="review_container">
          {edit ? (
            <EditReview edit={edit} setEdit={setEdit} />
          ) : (
            <>
              <div className="review_header">
                <h2 className="review_title">{review.title}</h2>
                <div className="author__date__icons">
                  <div className="author__date">
                    <div className="date">
                      {moment(review.createdAt).format('DD MMM YYYY hh:mm')}
                    </div>
                    <div className="author">{review.userName}</div>
                  </div>
                  <div className="icons">
                    {userId === review.idUser ? (
                      <button className="edit" onClick={() => setEdit(true)}>
                        {edit ? 'Save' : 'Edit review'}
                      </button>
                    ) : null}
                    <div className="icons_favorite">
                      <BsBookmark />
                    </div>
                    <div className="icons_like">
                      <AiFillHeart
                        className={like ? 'like' : 'unlike'}
                        onClick={handleLikeReview}
                      />{' '}
                      {review.likes}
                    </div>
                  </div>
                </div>
              </div>
              <div className="content">
                <div className="cover_image">
                  <img src={review.coverURL} alt="cover_image" />
                </div>
                {content
                  ? content.map((item) => (
                      <div key={item.id} className="content_tool">
                        {item.type === 'header' ? <h2 className="header">{item.header}</h2> : null}
                        {item.type === 'text' ? <div className="text">{item.text}</div> : null}
                        {item.type === 'image' ? (
                          <div className="review_image">
                            <img src={item.url} alt={`reviewImage${item.id}`} />
                          </div>
                        ) : null}
                      </div>
                    ))
                  : null}
              </div>
              <div className="rating">
                <h4>Rating by author: </h4>
                <div className="rating_number">
                  {review.rating}
                  <AiFillStar />
                </div>
              </div>
              {userId !== review.idUser
                ? token && (
                    <div className="rate_review">
                      <h4>Rate this review</h4>
                      <StarRating />
                      {rating ? (
                        <div className="buttons">
                          <button className="save" onClick={handleClickSave}>
                            OK
                          </button>
                          <button className="cancel" onClick={handleClickCancel}>
                            Cancel
                          </button>
                        </div>
                      ) : null}
                    </div>
                  )
                : null}
            </>
          )}
        </div>
      </div>
      {!edit ? (
        <div className="container">
          <div className="comments">
            <h4>Comments</h4>
            <div className="comments_container"></div>
          </div>
        </div>
      ) : null}

      <Footer />
    </div>
  ) : null;
};

export default Review;
