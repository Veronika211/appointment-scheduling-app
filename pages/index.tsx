import React from 'react';
import Head from 'next/head';
import Home from 'components/Home';

const HomePage: React.FC = () => {
  return (
    <>
      <Head>
        <meta name="description" />
      </Head>
      <Home />
    </>
  );
};

export default HomePage;
