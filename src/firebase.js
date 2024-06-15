// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
import {getAnalytics} from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyAJBcdBaRdGF3qQpAZ8W1gTqhqX20IQEck',
  authDomain: 'esp32-c256f.firebaseapp.com',
  databaseURL: 'https://esp32-c256f-default-rtdb.firebaseio.com',
  projectId: 'esp32-c256f',
  storageBucket: 'esp32-c256f.appspot.com',
  messagingSenderId: '369949579174',
  appId: '1:369949579174:web:c64f07e84f6ea274faa167',
  measurementId: 'G-Q2M3GE50VR',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
