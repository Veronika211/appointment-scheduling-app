import * as React from 'react';
import type {AppProps} from 'next/app';
import {CacheProvider, EmotionCache} from '@emotion/react';
import {ThemeProvider, CssBaseline, createTheme} from '@mui/material';
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import createEmotionCache from '../utility/createEmotionCache';
import themeOptions from '../styles/theme/themeOptions';
import '../styles/globals.css';
import {UserProvider} from '@auth0/nextjs-auth0/client';
import AuthProvider from '../components/auth/AuthProvider';
import {LocalizationProvider} from '@mui/x-date-pickers';

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

const clientSideEmotionCache = createEmotionCache();

const theme = createTheme(themeOptions);

const MyApp: React.FunctionComponent<MyAppProps> = (props) => {
  const {Component, emotionCache = clientSideEmotionCache, pageProps} = props;

  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <UserProvider>
          <AuthProvider>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <Component {...pageProps} />
            </LocalizationProvider>
          </AuthProvider>
        </UserProvider>
      </ThemeProvider>
    </CacheProvider>
  );
};

export default MyApp;
