import React from 'react';
import Feed from '../Feed/Feed';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import './index.scss';
import Tags from '../../components/Tags/Tags';

const Home = () => {
  return (
    <>
      <Header />
      <div className="container">
        <Feed />
      </div>
      <div className="container tags__container">
        <Tags />
      </div>
      <Footer />
    </>
  );
};

export default Home;
