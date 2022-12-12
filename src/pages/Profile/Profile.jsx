import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/use-auth';
import Header from '../../components/Header/Header';
import ProfileMenu from '../../components/ProfileMenu/ProfileMenu';
import ProfileInfo from '../../components/ProfileInfo/ProfileInfo';
import './index.scss';

const Profile = () => {
  const { isAuth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    !isAuth && navigate('/');
  }, [isAuth, navigate]);
  return (
    <div className="container">
      <Header />
      <div style={{ display: 'flex' }} className="profile_container">
        <ProfileMenu />
        <ProfileInfo />
      </div>
    </div>
  );
};

export default Profile;
