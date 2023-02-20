import {ReactNode, useEffect, useState} from 'react';
import AuthContext from '../../store/auth-context';
import Landing from '../Landing';
import Layout from '../layout/Layout';
import {useUser} from '@auth0/nextjs-auth0/client';
import Loader from '../ui/loader/Loader';

interface Props {
  children: ReactNode;
}
const AuthProvider: React.FC<Props> = (props): JSX.Element => {
  const {children} = props;
  const {user, error, isLoading} = useUser();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (user) setIsLoggedIn(true);
  }, []);

  const renderContent = () => {
    if (user) {
      return <Layout>{children}</Layout>;
    }
    return <Landing />;
  };

  if (isLoading) return <Loader />;

  return (
    <AuthContext.Provider value={{isLoggedIn: isLoggedIn}}>{renderContent()}</AuthContext.Provider>
  );
};

export default AuthProvider;
