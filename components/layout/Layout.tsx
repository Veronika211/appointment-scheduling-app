import * as React from 'react';
import Footer from 'components/footer/Footer';
import Navbar from 'components/navbar/Navbar';

interface LayoutProps {
  children: React.ReactNode;
  includeFooter?: boolean;
}

const Layout = ({children, includeFooter = true}: LayoutProps): JSX.Element => {
  return (
    <>
      <Navbar />
      <main id="main">{children}</main>
      {includeFooter && <Footer />}
    </>
  );
};

export default Layout;
