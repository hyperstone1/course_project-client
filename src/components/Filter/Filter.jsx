import React, { useState, useEffect } from 'react';
import Nav from 'react-bootstrap/Nav';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { useSelector, useDispatch } from 'react-redux';
import { setFilter } from '../../store/slices/filterSlice/filterSlice';

const Filter = () => {
  const dispatch = useDispatch();
  const filterValue = useSelector((state) => state.filter.filterValue);
  const [key, setKey] = useState('movies');
  useEffect(() => {
    console.log(filterValue);
  }, [filterValue]);

  const handleChangeFilter = (k) => {
    setKey(k);
  };
  return (
    <Tabs
      id="controlled-tab-example"
      activeKey={filterValue}
      onSelect={(key) => dispatch(setFilter({ filterValue: key }))}
      className="mb-3"
    >
      <Tab eventKey="movies" title="Movies">
        <Card style={{ width: '14rem' }}>
          <Card.Img variant="top" src="holder.js/100px180" />
          <Card.Body>
            <Card.Title>Card Title</Card.Title>
            <Card.Text>
              Some quick example text to build on the card title and make up the bulk of the card's
              content.
            </Card.Text>
            <Button variant="primary">Go somewhere</Button>
          </Card.Body>
        </Card>
      </Tab>
      <Tab eventKey="games" title="Games">
        {/* <Sonnet /> */}
      </Tab>
      <Tab eventKey="books" title="Books" disabled>
        {/* <Sonnet /> */}
      </Tab>
      <Tab eventKey="music" title="Music" disabled>
        {/* <Sonnet /> */}
      </Tab>
    </Tabs>
  );
};

export default Filter;
