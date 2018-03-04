import React from 'react';
import { Link } from 'react-router-dom';

const PageNotFound = () => {
  return (
    <div className ='container'>
      <h1>404</h1>
      <h2>Whoops! Something went wrong.</h2>
      <p>
        This page is not available. Click back to return home. 
      </p>
      <Link to='/'>
      <button type="button">Go Back</button>
      </Link>
    </div>
  );
};
export default PageNotFound;