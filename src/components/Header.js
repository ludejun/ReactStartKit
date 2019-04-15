import React from 'react';
import { Link } from 'react-router-dom';
import configs from '../configs';

const Header = () => (
  <div>
    <img src="../assets/react.svg" height="50" alt="react" />
    <h1>{configs.name}</h1>
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
      <li>
        <Link to="/topics">Topics</Link>
      </li>
    </ul>
  </div>
);

export default Header;
