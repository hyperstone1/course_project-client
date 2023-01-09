import React from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Row from 'react-bootstrap/esm/Row';
import { useSelector, useDispatch } from 'react-redux';
import { setFilter } from '../../store/slices/filterSlice/filterSlice';
import CardReview from '../CardReview/CardReview';

const Filter = ({ reviews, users }) => {
  const dispatch = useDispatch();
  const filterValue = useSelector((state) => state.filter.filterValue);
  const lang = useSelector((state) => state.header.language);

  return reviews.length > 0 ? (
    <Tabs
      id="controlled-tab-example"
      activeKey={filterValue}
      onSelect={(key) => dispatch(setFilter({ filterValue: key }))}
      className="mb-3"
    >
      <Tab eventKey="movies" title={lang === 'eng' ? 'Movies' : 'Кино'}>
        <Row xs={1} md={2} className="g-4 grid">
          {reviews.map((item) =>
            item.type === 'Movies' ? <CardReview users={users} {...item} /> : null,
          )}
        </Row>
      </Tab>
      <Tab eventKey="games" title={lang === 'eng' ? 'Games' : 'Игры'}>
        <Row xs={1} md={2} className="g-4 grid">
          {reviews.map((item) =>
            item.type === 'Games' ? <CardReview users={users} {...item} /> : null,
          )}
        </Row>
      </Tab>
      <Tab eventKey="books" title={lang === 'eng' ? 'Books' : 'Книги'}>
        <Row xs={1} md={2} className="g-4 grid">
          {reviews.map((item) =>
            item.type === 'Books' ? <CardReview users={users} {...item} /> : null,
          )}
        </Row>
      </Tab>
      <Tab eventKey="music" title={lang === 'eng' ? 'Music' : 'Музыка'}>
        <Row xs={1} md={2} className="g-4 grid">
          {reviews.map((item) =>
            item.type === 'Music' ? <CardReview users={users} {...item} /> : null,
          )}
        </Row>
      </Tab>
    </Tabs>
  ) : null;
};

export default Filter;
