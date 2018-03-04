import React from 'react';
import { Link } from 'react-router-dom';

const ThankYou = () => (
  <div className='container'>
    <h1 className='display-1'>Success</h1>
    <h1 className='display-5'>Thanks dawg</h1>
    <p>Poop</p>
    <Link to='/'>
      <button type='button' className='btn btn-secondary'>
        Go Back
      </button>
    </Link>
  </div>
);

export default ThankYou;
