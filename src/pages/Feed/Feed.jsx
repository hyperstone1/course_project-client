import React from 'react';
import BestReviews from '../../components/BestReviews/BestReviews';
import LastReviews from '../../components/LastReviews/LastReviews';
import Footer from '../../components/Footer/Footer';
import Filter from '../../components/Filter/Filter';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import './index.scss';

const Feed = () => {
  return (
    <div className="container">
      <h4 style={{ margin: '40px 40px 20px 40px' }}>Best reviews</h4>
      <BestReviews />
      <h4 style={{ margin: '40px 40px 20px 40px' }}>Review type</h4>
      <Filter />
      <div className="filter_cards">
        <Row xs={1} md={2} className="g-4 grid">
          {Array.from({ length: 5 }).map(() => (
            <Card style={{ width: '14rem' }}>
              <Card.Img variant="top" src="holder.js/100px180" />
              <Card.Body>
                <Card.Title>Card Title</Card.Title>
                <Card.Text>
                  Some quick example text to build on the card title and make up the bulk of the
                  card's content.
                </Card.Text>
                <Button variant="primary">Go somewhere</Button>
              </Card.Body>
            </Card>
          ))}
        </Row>
      </div>

      <h4 style={{ margin: '40px 40px 20px 40px' }}>Last reviews</h4>
      <LastReviews />
      <Footer />
    </div>
  );
};

export default Feed;
