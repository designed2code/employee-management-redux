import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
// Bootstrap and Toastify
import 'bootstrap/dist/css/bootstrap.min.css'
import "react-toastify/dist/ReactToastify.css";
import {BrowserRouter as Router} from 'react-router-dom'
import employeeReducer from './redux/reducer/employeeReducer';
import { composeWithDevTools } from 'redux-devtools-extension';
// To Create Store
import { createStore } from 'redux';
// Connect store 
import { Provider } from 'react-redux';

// Creating the Store
const store = createStore(employeeReducer, composeWithDevTools())
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
    <Router>
    <App />
    </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);


