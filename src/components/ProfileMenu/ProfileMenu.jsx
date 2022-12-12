import React from 'react';
import Nav from 'react-bootstrap/Nav';

const ProfileMenu = () => {
  return (
    <div className="nav_profile">
      <Nav justify variant="tabs" style={{ flexDirection: 'column' }} defaultActiveKey="link-1">
        <Nav.Item>
          <Nav.Link eventKey="link-1">Personal Information</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-2">My reviews</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-3">My comments</Nav.Link>
        </Nav.Item>
      </Nav>
    </div>
  );
};

export default ProfileMenu;
