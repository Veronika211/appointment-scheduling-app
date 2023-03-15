// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
import {getAnalytics} from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyC-uSqfgr2p7FxYkTkeNmf9DJGRbFuJpp8',
  authDomain: 'test-app-fb-716e1.firebaseapp.com',
  projectId: 'test-app-fb-716e1',
  storageBucket: 'test-app-fb-716e1.appspot.com',
  messagingSenderId: '795904890813',
  appId: '1:795904890813:web:b0dbb5e05b547493c264d4',
  measurementId: 'G-HX1BEKNB4T',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
