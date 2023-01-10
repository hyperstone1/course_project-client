import React, { useState, useEffect } from 'react';
import Row from 'react-bootstrap/Row';
import CardReview from '../CardReview/CardReview';

const LastReviews = ({ reviews, users }) => {
  const [lastReviews, setLastReviews] = useState([]);
  useEffect(() => {
    if (reviews.length > 0) {
      if (reviews.length >= 4) {
        const last = reviews.slice(reviews.length - 4, reviews.length);
        console.log('last_reviews: ', last);
        setLastReviews(last);
      } else {
        setLastReviews(reviews);
      }
    }
  }, [reviews]);

  return (
    <Row xs={1} md={2} className="g-4">
      {lastReviews.length > 0 && lastReviews.map((item) => <CardReview {...item} users={users} />)}
    </Row>
  );
};

export default LastReviews;
