import React, { useState, useEffect } from 'react';
import Row from 'react-bootstrap/Row';
import CardReview from '../CardReview/CardReview';

const LastReviews = ({ reviews, users }) => {
  const [lastReviews, setLastReviews] = useState([]);
  useEffect(() => {
    if (reviews.length > 0) {
      const last = reviews.slice(reviews[reviews.length - 2], reviews[reviews.length]);
      console.log('last_reviews: ', last);
      setLastReviews(last);
    }
  }, [reviews]);

  return (
    <Row xs={1} md={2} className="g-4">
      {lastReviews.length > 0 &&
        lastReviews.map((item, idx) => <CardReview {...item} users={users} />)}
    </Row>
  );
};

export default LastReviews;
