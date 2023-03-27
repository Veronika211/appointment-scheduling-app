import {AppBar as MaterialAppBar, Tab, Tabs, Toolbar} from '@mui/material';
import logo from '@assets/images/medical-icon.png';
import {styles} from 'components/navbar/Navbar.styles';
import {Button} from '@ui/Button';
import {useRouter} from 'next/router';
import {useState} from 'react';
import Image from 'next/image';

export const Navbar = () => {
  const router = useRouter();
  const [tabValue, setTabValue] = useState(0);

  const handleLogOut = () => {
    router.push('/api/auth/logout');
  };

  const handleOnClick = (path: string) => {
    router.push(`/${path}`);
  };

  return (
    <MaterialAppBar sx={styles.navbar}>
      <Toolbar sx={styles.toolbar}>
        <Image src={logo.src} alt="navbar-logo" width={30} height={30} />
        <Tabs
          sx={styles.tabs}
          value={tabValue}
          indicatorColor="primary"
          onChange={(e, value) => setTabValue(value)}
        >
          <Tab label="Home" onClick={() => handleOnClick('')} />
          <Tab label="Contact" onClick={() => handleOnClick('contact')} />
        </Tabs>
        <Button variant="text" text="LOG OUT" sxStyle={styles.button} onClick={handleLogOut} />
      </Toolbar>
    </MaterialAppBar>
  );
};
