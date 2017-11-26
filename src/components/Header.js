import React, { Component } from 'react';
import configs from '../configs';

class Header extends Component {

  render() {
    return (
      <h1>{configs.name}</h1>
    );
  }
}

export default Header;
