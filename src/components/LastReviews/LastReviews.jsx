import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import book from '../../images/book.jpg';
import movie from '../../images/movie.jpg';
import game from '../../images/games.jpg';
import music from '../../images/music.jpg';
import CardReview from '../CardReview/CardReview';

const LastReviews = ({ reviews }) => {
  // const reviews = [book, movie, game, music];
  const [lastReviews, setLastReviews] = useState();
  useEffect(() => {
    if (reviews) {
      const last = reviews.slice(reviews[reviews.length - 2], reviews[reviews.length]);
      console.log('last_reviews: ', last);
      setLastReviews(last);
    }
  }, [reviews]);

  return (
    <Row xs={1} md={2} className="g-4">
      {lastReviews && lastReviews.map((item, idx) => (
        <CardReview {...item} />
      ))}
    </Row>
  );
};

export default LastReviews;
