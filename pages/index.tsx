import React from 'react';
import Head from 'next/head';
import {Home} from 'components/Home';

const HomePage: React.FC = () => (
  <>
    <Head>
      <meta name="description" />
    </Head>
    <Home />
  </>
);

/* eslint-disable  import/no-default-export */
//we have to disable this rule here because in next.js all pages must have default export
export default HomePage;
