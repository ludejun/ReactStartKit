import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import {Router, browserHistory} from 'react-router';
import {Provider} from 'react-redux';
import Storage from './utils/Storage';
import createRoutes from './routes';
import configureStore from './store/configure-store';
import rootSaga from './sagas/index';

const store = configureStore();
store.runSaga(rootSaga);
const routes = createRoutes(store);

Storage.setNamespace('sharingB');

ReactDOM.render(
  <Provider store={store} key="provider">
    <Router routes={routes} history={browserHistory} />
  </Provider>,
  document.getElementById('main')
);
