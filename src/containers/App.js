import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import * as route from './index';
import './app.less';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Switch>
            <Route exact path="/" component={route.Home} />
            <Route path="/login" component={route.Login} />
            <Route path="/topics" component={route.Topics} />
            <Route component={route.NoMatch} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
