import React, { useEffect } from 'react';
import BestReviews from '../../components/BestReviews/BestReviews';
import LastReviews from '../../components/LastReviews/LastReviews';
import Footer from '../../components/Footer/Footer';
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
    <div className="container">
      <h4 style={{ margin: '40px 40px 20px 40px' }}>Best reviews</h4>
      <BestReviews />
      <h4 style={{ margin: '40px 40px 20px 40px' }}>Review type</h4>
      <Filter />
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

      <h4 style={{ margin: '40px 40px 20px 40px' }}>Last reviews</h4>
      <LastReviews />
      <Footer />
    </div>
  );
};

export default Feed;
