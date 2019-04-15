import '@babel/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import { Provider } from 'react-redux';
import { AppContainer } from 'react-hot-loader';
import Storage from './utils/Storage';
// import createRoutes from './routes';
import App from './containers/App';
// noinspection JSAnnotator
import configureStore from './store/configure-store';
import rootSaga from './sagas/index';
import configs from './configs';

const store = configureStore();
store.runSaga(rootSaga);
const history = createBrowserHistory();
// const routes = createRoutes(store);

Storage.setNamespace(configs.name);

const render = (Component) => {
  try {
    ReactDOM.render(
      <AppContainer>
        <Provider store={store} key="provider">
          <Router history={history}>
            <Component />
          </Router>
        </Provider>
      </AppContainer>,
      document.getElementById('main'),
    );
  } catch (err) {
    console.error(err);
  }
};

render(App);

// Webpack Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./containers/App', () => render(App));
}
