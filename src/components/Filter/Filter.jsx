import React, { useState, useEffect } from 'react';
import Nav from 'react-bootstrap/Nav';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/esm/Row';
import { useSelector, useDispatch } from 'react-redux';
import { setFilter } from '../../store/slices/filterSlice/filterSlice';
import CardReview from '../CardReview/CardReview';

const Filter = ({ reviews }) => {
  const dispatch = useDispatch();
  const filterValue = useSelector((state) => state.filter.filterValue);
  const [key, setKey] = useState('movies');
  useEffect(() => {
    console.log(filterValue);
  }, [filterValue]);

  const handleChangeFilter = (k) => {
    setKey(k);
  };

  return reviews ? (
    <Tabs
      id="controlled-tab-example"
      activeKey={filterValue}
      onSelect={(key) => dispatch(setFilter({ filterValue: key }))}
      className="mb-3"
    >
      <Tab eventKey="movies" title="Movies">
        <Row xs={1} md={2} className="g-4 grid">
          {reviews.map((item) => (item.type === 'Кино' ? <CardReview {...item} /> : null))}
        </Row>
      </Tab>
      <Tab eventKey="games" title="Games">
        <Row xs={1} md={2} className="g-4 grid">
          {reviews.map((item) => (item.type === 'Игры' ? <CardReview {...item} /> : null))}
        </Row>
      </Tab>
      <Tab eventKey="books" title="Books">
        <Row xs={1} md={2} className="g-4 grid">
          {reviews.map((item) => (item.type === 'Книги' ? <CardReview {...item} /> : null))}
        </Row>
      </Tab>
      <Tab eventKey="music" title="Music">
        <Row xs={1} md={2} className="g-4 grid">
          {reviews.map((item) => (item.type === 'Музыка' ? <CardReview {...item} /> : null))}
        </Row>
      </Tab>
    </Tabs>
  ) : null;
};

export default Filter;
