import React from 'react'
import Nav from 'react-bootstrap/Nav';

const Filter = () => {
  return (
    <Nav fill variant="tabs" defaultActiveKey="link-1">
      <Nav.Item>
        <Nav.Link eventKey="link-1">Movies</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="link-2">Books</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="link-3">Games</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="link-4">Music</Nav.Link>
      </Nav.Item>
    </Nav>
  )
}

export default Filter