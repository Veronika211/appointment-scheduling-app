//theme provider
//navbar
//footer
import styles from "./stylesheets/Layout.module.scss";
import Footer from "../footer/Footer";
import Navbar from "../navbar/Navbar";

interface LayoutProps {
  children: React.ReactNode;
  includeFooter?: boolean;
}

const Layout = ({
  children,
  includeFooter = true,
}: LayoutProps): JSX.Element => {
  return (
    <>
      <Navbar />
      <main id="main">{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
