import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import configs from '../configs';

class Header extends Component {

  render() {
    return (
      <div>
        <img src={require('../assets/react.svg')} height="50" />
        <h1>{configs.name}</h1>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/topics">Topics</Link></li>
        </ul>
      </div>
    );
  }
}

export default Header;
