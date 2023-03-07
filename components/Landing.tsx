import {Box, Typography} from '@mui/material';
import {useRouter} from 'next/router';
import {Button} from '@/ui/Button';
import {styles} from './Landing.styles';

const Landing = (): JSX.Element => {
  const router = useRouter();

  const handleSignIn = () => {
    router.push('/api/auth/login');
  };

  return (
    <Box sx={styles.container}>
      <Box sx={styles.textBox}>
        <Typography variant="h1" sx={styles.mainHeader}>
          Software cures the world.
        </Typography>
        <Typography variant="h4" sx={styles.subheader}>
          If you need a cure sign in!
        </Typography>
        <Button onClick={handleSignIn} variant="contained" sxStyle={styles.button} text="SIGN IN" />
      </Box>
    </Box>
  );
};

export default Landing;
