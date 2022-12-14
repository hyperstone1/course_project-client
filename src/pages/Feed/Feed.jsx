import React, { useState, useEffect } from 'react';
import BestReviews from '../../components/BestReviews/BestReviews';
import LastReviews from '../../components/LastReviews/LastReviews';
import Filter from '../../components/Filter/Filter';
import CardReview from '../../components/CardReview/CardReview';
import Row from 'react-bootstrap/Row';
import './index.scss';
import { AiOutlineArrowRight } from 'react-icons/ai';
import { getLatestReviews, getBestReviews, getAllReviews } from '../../http/reviewsAPI';
import Swal from 'sweetalert2';

const Feed = () => {
  const [reviews, setReviews] = useState();
  const [latestReviews, setLatestReviews] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const bestReviews = await getBestReviews();
        const allReviews = await getAllReviews();
        const latestReviews = await getLatestReviews();
        setReviews(allReviews);
      } catch ({ response }) {
        Swal.fire({
          title: 'Oops...',
          text: response.data.message,
        });
      }
    };
  }, []);

  return (
    <>
      <div className="container_feed">
        <div className="best_reviews">
          <h4>Best reviews</h4>
          <BestReviews />
        </div>

        <div className="filter">
          <h4>Review type</h4>
          <Filter />
        </div>

        <div className="filter_cards">
          <Row xs={1} md={2} className="g-4 grid">
            {Array.from({ length: 4 }).map(() => (
              <CardReview />
            ))}
          </Row>
          <div className="show_more">
            Show more <AiOutlineArrowRight />
          </div>
        </div>
        <div className="last_reviews">
          <h4>Last reviews</h4>
          <LastReviews />
        </div>
      </div>
    </>
  );
};

export default Feed;
