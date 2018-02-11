import React, {Component} from 'react';
import Header from '../components/Header';

class Home extends Component {
  render() {
    return (
      <div id="home">
        <Header />
        <div>
          <p>Hello React!</p>
          <p>React + Redux + Redux-Sagas + Webpack3 + React-Router4</p>
          <a href="https://github.com/ludejun/ReactStartKit">https://github.com/ludejun/ReactStartKit</a>
        </div>
      </div>
    );
  }
}

export default Home;
