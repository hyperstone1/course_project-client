import React, { useState, useEffect, useRef } from 'react';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import { CgNotes } from 'react-icons/cg';
import { FaRegComment } from 'react-icons/fa';
import { AiOutlineLike, AiFillLike } from 'react-icons/ai';
import { BsBookmark, BsFillBookmarkFill, BsChatFill } from 'react-icons/bs';
import Loader from './Loader';
import moment from 'moment';
import { AiFillStar } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { likeReview } from '../../http/userAPI';
import { useDispatch, useSelector } from 'react-redux';
import { changeReviewLikes, changeUserLikes } from '../../store/slices/reviewSlice/review';
import Swal from 'sweetalert2';
import './index.scss';

const CardReview = ({ id, userName, type, title, text, rating, coverURL, likes, createdAt }) => {
  const [like, setLike] = useState(false);
  const [save, setSave] = useState(false);
  const [textReview, setTextReview] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const idUser = useSelector((state) => state.user.id);
  const [likesCount, setLikesCount] = useState(likes);
  const { reviewLikes, userLikes } = useSelector((state) => state.review);
  const img = useRef(null);

  useEffect(() => {
    reviewLikes.map((item) => (item.id === id ? setLikesCount(item.likes) : null));
    const isExist = userLikes.filter((item) => item.idReview === id);
    console.log(isExist);
    if (isExist.length > 0) {
      setLike(true);
    } else {
      setLike(false);
    }
  }, [reviewLikes]);

  const handleClickIcons = async (e, id) => {
    const saveSVG = e.target.closest('.save');
    const likeSVG = e.target.closest('.like');
    if (saveSVG) {
      setSave(!save);
    } else if (likeSVG) {
      // if (like) {
      //   setLike(!like);
      // }
      const likes = await likeReview(id, idUser);
      if (likes.message) {
        Swal.fire({
          title: 'Sorry...',
          text: `${likes.message}`,
        });
      } else {
        dispatch(changeReviewLikes({ id: id, likes: likes }));
        dispatch(changeUserLikes({ id: id }));
        setLikesCount(likes);
      }
    }
  };

  const handleClickLike = () => {};

  const handleClickReview = () => {
    // const url = document.location.pathname;
    // navigate(`${url}/${id}`);
    navigate(`/reviews/${id}`);
  };

  useEffect(() => {
    if (text) {
      const textJson = JSON.parse(text[0]);
      textJson.text.length > 255
        ? setTextReview(`${textJson.text.slice(0, 255)} ...`)
        : setTextReview(textJson.text);
      console.log(coverURL);
    }
  }, []);

  // useEffect(() => {
  //   const url = URL.createObjectURL(coverURL);
  //   console.log(url);
  // }, []);

  const handleLoaded = () => {
    setLoading(false);
  };

  return (
    <Col key={id}>
      <Card>
        <div onClick={handleClickReview} className="card_img">
          <div className="rate">
            <AiFillStar />
            <div className="rating_number">{rating}</div>
          </div>
          <Card.Img ref={img} variant="top" src={coverURL} onLoad={() => handleLoaded()} />
          {loading && <Loader />}
        </div>
        <Card.Body>
          <Card.Subtitle className="mb-2 text-muted">
            <div className="title_review">
              <CgNotes /> <span>{type}</span>
            </div>
            <span>{userName}</span>
          </Card.Subtitle>
          <Card.Title>{title}</Card.Title>
          <Card.Text>{textReview}</Card.Text>
          <Card.Text className="footer_card">
            <span>{moment(createdAt).format('DD MMM YYYY')}</span>
            <div className="icons" onClick={(e) => handleClickIcons(e, id)}>
              <div className="save">
                {save ? <BsFillBookmarkFill className="save" /> : <BsBookmark className="save" />}
              </div>
              <div className="like">
                {like ? (
                  <AiFillLike className="like" style={{ width: '20px', height: '20px' }} />
                ) : (
                  <AiOutlineLike className="like" style={{ width: '20px', height: '20px' }} />
                )}{' '}
                <div className="likes_count">{likesCount}</div>
              </div>
              <div className="comment">
                <FaRegComment className="comment" />
              </div>
            </div>
          </Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default CardReview;
