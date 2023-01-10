import React, { useState, useEffect } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { getBestReviews } from '../../http/reviewsAPI';
import './index.scss';
import { useNavigate } from 'react-router-dom';

const BestReviews = () => {
  const [reviews, setReviews] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchBestReviews = async () => {
      const bestReviews = await getBestReviews();
      setReviews(bestReviews);
      console.log(bestReviews);
    };
    fetchBestReviews();
  }, []);

  const handleClickCard = (id) => {
    navigate(`reviews/${id}`);
  };

  return (
    <div className="best_reviews_container">
      <Carousel fade>
        {reviews.length > 0 &&
          reviews.map((review) => (
            <Carousel.Item onClick={() => handleClickCard(review.id)}>
              <img className="d-block w-100" src={review.coverURL} alt="First slide" />
              <Carousel.Caption>
                {/* <h3>First slide label</h3> */}
                <h5>{review.title}</h5>
              </Carousel.Caption>
            </Carousel.Item>
          ))}
      </Carousel>
    </div>
  );
};

export default BestReviews;
