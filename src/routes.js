import React from 'react';
import {IndexRoute, Route} from 'react-router';
import {
  App,
  Home
} from './containers';

export default () => {
  return (
    <Route path="/" component={App}>
      <IndexRoute component={Home} />
    </Route>
  );
};
