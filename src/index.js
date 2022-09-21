import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

firebase.initializeApp({
  apiKey: "AIzaSyDcc1jnbceSvBcBmDuN2nnMzMqAw3euNqE",
  authDomain: "flowerpos-1dec4.firebaseapp.com",
  projectId: "flowerpos-1dec4",
  storageBucket: "flowerpos-1dec4.appspot.com",
  messagingSenderId: "514427894287",
  appId: "1:514427894287:web:d115bf119e7eb69048c17a",
  measurementId: "G-D9XSKRBLXV"
});
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
