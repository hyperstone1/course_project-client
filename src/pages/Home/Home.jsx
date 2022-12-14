import React from 'react';
import Feed from '../Feed/Feed';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import './index.scss';

const Home = () => {
  return (
    <>
      <Header />

      <div className="container">
        <Feed />
      </div>
      <Footer />
    </>
  );
};

export default Home;
