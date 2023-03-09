import * as React from 'react';
import {Footer} from 'components/footer/Footer';
import {Navbar} from 'components/navbar/Navbar';

interface LayoutProps {
  children: React.ReactNode;
  includeFooter?: boolean;
}

export const Layout = ({children, includeFooter = true}: LayoutProps): JSX.Element => (
  <>
    <Navbar />
    <main id="main">{children}</main>
    {includeFooter && <Footer />}
  </>
);
