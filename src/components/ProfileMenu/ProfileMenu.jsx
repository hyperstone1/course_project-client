import React, { useEffect } from 'react';
import Nav from 'react-bootstrap/Nav';
import { useDispatch, useSelector } from 'react-redux';
import { setMenuValue } from '../../store/slices/profileSlice/profileSlice';

const ProfileMenu = () => {
  const dispatch = useDispatch();
  const menuKey = useSelector((state) => state.profile.menuValue);

  useEffect(() => {
    console.log(menuKey);
  }, [menuKey]);
  return (
    <div className="nav_profile">
      <Nav
        justify
        variant="tabs"
        style={{ flexDirection: 'column' }}
        onSelect={(key) => dispatch(setMenuValue({ menuValue: key }))}
        defaultActiveKey="info"
      >
        <Nav.Item>
          <Nav.Link eventKey="info">Personal Information</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="reviews">My reviews</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="comments">My comments</Nav.Link>
        </Nav.Item>
      </Nav>
    </div>
  );
};

export default ProfileMenu;
