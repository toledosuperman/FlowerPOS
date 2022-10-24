import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';

// ReactDOM.render(
// <FirebaseContext.Provider value={new Firebase()}>
  
// <App />
// </FirebaseContext.Provider>,
// document.getElementById('root'),
// );

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    
  <BrowserRouter>

    <App />
  </BrowserRouter>
);