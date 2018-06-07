import Main from './src/Main.js';

import * as firebase from 'firebase';
import {API_KEY, AUTH_DOMAIN, DATABASE_URL, STORAGE_BUCKET} from 'react-native-dotenv';

console.disableYellowBox = true;

// Initialize Firebase
const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  databaseURL: DATABASE_URL,
  storageBucket: STORAGE_BUCKET,
};

firebase.initializeApp(firebaseConfig);

export default Main;