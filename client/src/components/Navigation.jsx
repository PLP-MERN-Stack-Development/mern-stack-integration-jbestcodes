// components/Navigation.jsx - Navigation component for JBest Eyes blog

import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navigation = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <nav className="nav">
      <div className="container">
        <ul>
          <li>
            <Link to="/" className={isActive('/')}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/create" className={isActive('/create')}>
              Write New Post
            </Link>
          </li>
          <li>
            <Link to="/categories" className={isActive('/categories')}>
              Categories
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;