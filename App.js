import Main from './src/Main.js';

import * as firebase from 'firebase';

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDcllFt1AGWc2c1MIvA8mvR1voeSkTbn-Q",
  authDomain: "naloxone-b5562.firebaseapp.com",
  databaseURL: "https://naloxone-b5562.firebaseio.com",
  //projectId: "naloxone-b5562",
  storageBucket: "naloxone-b5562.appspot.com",
  //messagingSenderId: "292546835523"
};

firebase.initializeApp(firebaseConfig);

export default Main;