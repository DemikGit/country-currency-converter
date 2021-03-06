import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { history, store } from './store-index';
import { App } from './components/App/App';
import { ConnectedRouter as Router } from 'react-router-redux';

render(
  <Provider store={ store }>
    <Router history={ history }>
      <App />
    </Router>
  </Provider>
  ,
  document.querySelector('#root')
)
