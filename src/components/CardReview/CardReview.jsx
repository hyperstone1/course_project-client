import React, { useState, useRef } from 'react';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import book from '../../images/book.jpg';
import movie from '../../images/movie.jpg';
import game from '../../images/games.jpg';
import music from '../../images/music.jpg';
import './index.scss';
import { CgNotes } from 'react-icons/cg';
import { FaRegComment } from 'react-icons/fa';
import { AiOutlineLike, AiFillLike } from 'react-icons/ai';
import { BsBookmark, BsFillBookmarkFill, BsChatFill } from 'react-icons/bs';
import comments from '../../images/comments.svg';

const CardReview = ({ idx }) => {
  const reviews = [book, movie, game, music];
  const [like, setLike] = useState(false);
  const [openComments, setOpenComments] = useState(false);
  const [save, setSave] = useState(false);

  const handleClickIcons = (e) => {
    const saveSVG = e.target.closest('.save');
    const likeSVG = e.target.closest('.like');
    if (saveSVG) {
      setSave(!save);
    } else if (likeSVG) {
      setLike(!like);
    }
  };

  return (
    <Col>
      <Card>
        <div className="card_img">
          <Card.Img variant="top" src={reviews[idx]} />
        </div>
        <Card.Body>
          <Card.Subtitle className="mb-2 text-muted">
            <div className="title_review">
              <CgNotes /> <span>Review</span>
            </div>
            <span>Reviewer</span>
          </Card.Subtitle>
          <Card.Title>Card Title</Card.Title>
          <Card.Text>
            Some quick example text to build on the card title and make up the bulk of the card's
            content.
          </Card.Text>
          <Card.Text className="footer_card">
            <span>Date</span>
            <div className="icons" onClick={(e) => handleClickIcons(e)}>
              <div className="save">
                {save ? <BsFillBookmarkFill className="save" /> : <BsBookmark className="save" />}
              </div>
              <div className="like">
                {like ? (
                  <AiFillLike className="like" style={{ width: '20px', height: '20px' }} />
                ) : (
                  <AiOutlineLike className="like" style={{ width: '20px', height: '20px' }} />
                )}
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
