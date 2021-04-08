import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {Router} from './components/Router';


ReactDOM.render(
  <React.StrictMode>
    <Router to='/'>
      <App />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);