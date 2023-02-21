import Link from 'next/link';
import NavItem from './NavItem';
import {AppBar as MaterialAppBar, Tab, Tabs, Toolbar} from '@mui/material';
import {routes} from '../../helpers/constants';
import logo from '../../assets/images/medical-icon.png';
import {styles} from './Navbar.styles';
import {Button} from '../ui/Button';
import {useRouter} from 'next/router';
import {useState} from 'react';

function MainNavigation() {
  const router = useRouter();
  const [tabValue, setTabValue] = useState(0);

  const handleLogOut = () => {
    router.push('/api/auth/logout');
  };

  const handleOnClick = (path: string) => {
    router.push(`/${path}`);
  };

  return (
    <>
      <MaterialAppBar sx={styles.navbar}>
        <Toolbar sx={styles.toolbar}>
          <img src={logo.src} alt="navbar-logo" style={styles.logo} />
          <Tabs
            sx={styles.tabs}
            value={tabValue}
            indicatorColor="primary"
            onChange={(e, value) => setTabValue(value)}
          >
            <Tab label="Home" onClick={() => handleOnClick('/')} />
            <Tab label="Contact" onClick={() => handleOnClick('contact')} />
            {/* <Link href={'/contact'}>Contact</Link> */}
          </Tabs>
          <Button variant="text" text="LOG OUT" sxStyle={styles.button} onClick={handleLogOut} />
        </Toolbar>
      </MaterialAppBar>
    </>
  );
}

export default MainNavigation;