import React from 'react';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import book from '../../images/book.jpg';
import movie from '../../images/movie.jpg';
import game from '../../images/games.jpg';
import music from '../../images/music.jpg';

const LastReviews = () => {
  const reviews = [book, movie, game, music];
  return (
    <Row xs={1} md={2} className="g-4">
      {Array.from({ length: 4 }).map((_, idx) => (
        <Col>
          <Card>
            <Card.Img variant="top" src={reviews[idx]} />
            <Card.Body>
              <Card.Title>Card title</Card.Title>
              <Card.Text>
                This is a longer card with supporting text below as a natural lead-in to additional
                content. This content is a little bit longer.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default LastReviews;
