import React, { useState, useEffect, useRef } from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import moment from 'moment';
import { getReview, ratingByUser } from '../../http/reviewsAPI';
import { useNavigate, useParams } from 'react-router-dom';
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
import { getUser } from '../../http/userAPI';
import ReactMarkdown from 'react-markdown';
import { getComments, sendComment } from '../../http/reviewsAPI';
import jwtDecode from 'jwt-decode';

const Review = () => {
  const [content, setContent] = useState();
  const [like, setLike] = useState(false);
  const userId = useSelector((state) => state.user.id);
  const [edit, setEdit] = useState(false);
  const { token } = useSelector((state) => state.user);
  const [review, setReview] = useState();
  const [comments, setComments] = useState([]);
  const params = useParams();
  const reviewId = params.id;
  const { rating, existRating, userLikes } = useSelector((state) => state.review);
  const dispatch = useDispatch();
  const [userRating, setUserRating] = useState();
  const [comment, setComment] = useState('');
  const refComment = useRef(null);
  const lang = useSelector((state) => state.header.language);
  const navigate = useNavigate();

  const handleLikeReview = () => {
    setLike(!like);
  };

  useEffect(() => {
    userLikes.map((item) => (item.idReview === reviewId ? setLike(true) : setLike(false)));
  }, [userLikes, reviewId]);

  useEffect(() => {
    if (review) {
      const fetchUser = async () => {
        const user = await getUser(review.idUser);
        console.log(user);
        setUserRating(user[0].rating);
      };
      fetchUser();
    }
  }, [review]);

  useEffect(() => {
    if (reviewId) {
      const interval = setInterval(() => {
        const fetchComments = async () => {
          const commentsReview = await getComments(reviewId);
          console.log(commentsReview);
          setComments(commentsReview);
        };
        fetchComments();
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [review, reviewId]);

  useEffect(() => {
    if (userId) {
      const fetchRating = async () => {
        const ratingReviewUser = await ratingByUser(userId, reviewId);
        console.log(ratingReviewUser);
        if (ratingReviewUser === 'not rated') {
          dispatch(setExistRating({ rating: 0 }));
        } else {
          dispatch(setExistRating({ rating: ratingReviewUser }));
          dispatch(setHover(ratingReviewUser));
        }
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
  }, [rating, reviewId, token]);

  useEffect(() => {
    const fetchReview = async () => {
      const { data, reviewsContent } = await getReview(reviewId);
      console.log(data);
      setReview(data[0]);
      setContent(reviewsContent);
    };
    fetchReview();
  }, [rating, reviewId, token]);

  const handleClickSave = async () => {
    const save = await ratingReview(userId, reviewId, rating).then(() => {
      dispatch(setExistRating({ rating }));
      dispatch(clearRating());
    });

    console.log(save);
  };
  const handleClickCancel = () => {
    dispatch(clearRating());
    dispatch(setHover(existRating));
  };

  const handleSendComment = async () => {
    if (token) {
      const { name } = jwtDecode(token);
      console.log(name);
      await sendComment(userId, reviewId, name, comment);
    }

    setComment('');
  };

  const handleChangeComment = (e) => {
    setComment(e.target.value);
    autoResize();
  };
  function autoResize() {
    const ref = refComment.current;
    ref.style.height = 'auto';

    ref.style.height = ref.scrollHeight + 'px';
  }

  const handleClickTag = (tag) => {
    navigate(`/tag/${tag}`);
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
                    <div className="author username_rating">
                      <div className="user_rating">
                        {userRating ? userRating : null}
                        <AiFillStar />
                      </div>
                      <span className="username">{review.userName}</span>
                    </div>
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
                        {item.type === 'text' ? (
                          <div className="text">
                            <ReactMarkdown>{item.text}</ReactMarkdown>
                          </div>
                        ) : null}
                        {item.type === 'image' ? (
                          <div className="review_image">
                            <img src={item.url} alt={`reviewImage${item.id}`} />
                          </div>
                        ) : null}
                      </div>
                    ))
                  : null}
              </div>

              <div className="tags_container" style={{ marginTop: 0 }}>
                {review.tags.map((tag) => (
                  <span className="tag" onClick={() => handleClickTag(tag)}>
                    {tag}
                  </span>
                ))}
              </div>
              <div className="rating">
                <h4>{lang === 'eng' ? 'Rating by author: ' : 'Оценка автора: '}</h4>
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
      {!edit && token ? (
        <div className="container">
          <div className="comments">
            <h4>{lang === 'eng' ? 'Comments' : 'Комментарии'}</h4>
            <div className="comments_container">
              {comments.length > 0
                ? comments.map((item) => (
                    <div className="comment">
                      <div className="title_comment">
                        <span className="username">{item.username}</span>
                        {moment(item.createdAt).format('HH MM YYYY hh:mm ')}
                      </div>
                      <div className="comment_content">{item.comment}</div>
                      <div className="answer">{lang === 'eng' ? 'Answer' : 'Ответить'}</div>
                    </div>
                  ))
                : null}
              <div className="comment_send">
                <textarea
                  ref={refComment}
                  className="comment_textarea"
                  type="text"
                  value={comment}
                  onChange={handleChangeComment}
                />
                <button className="send" onClick={handleSendComment}>
                  {lang === 'eng' ? 'Send' : 'Отправить'}
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      <Footer />
    </div>
  ) : null;
};

export default Review;
