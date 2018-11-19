import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reduxThunk from 'redux-thunk';

import './styles/reset.css';
import './styles/fonts.css';
import './styles/animations.css';
import './styles/styles.scss';
import './styles/media.scss';

import App from './common/App';
import rootReducer from './common/reducers';

import UISetup from './common/constants/UISetup';

const store = createStore(rootReducer, UISetup, applyMiddleware(reduxThunk));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector('#root')
);
