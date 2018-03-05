import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'cookies-js';
import { Redirect } from 'react-router';
import axios from 'axios';

const token = sessionStorage.getItem('token');
const authAxios = axios.create({
  headers: { Authorization: token }
});

export default class Navbar extends Component {
  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
  }
  handleLogout(e) {
    const logoutId = Cookies.get('userId');
    const accessToken = Cookies.get('token');
    Cookies.expire('userId');
    Cookies.expire('token');
    Cookies.expire('projectId')
    authAxios.delete(
      `http://localhost:3000/api/users/${logoutId}/accessTokens`
    );
  }

  render() {
    return (
      <nav className='navbar navbar-expand-lg navbar-light bg-light'>
        <div className='container'>
          <button
            className='navbar-toggler'
            type='button'
            data-toggle='collapse'
            data-target='#navbarNavAltMarkup'
            aria-controls='navbarNavAltMarkup'
            aria-expanded='false'
            aria-label='Toggle navigation'>
            <span className='navbar-toggler-icon' />
          </button>
          <div className='collapse navbar-collapse' id='navbarNavAltMarkup'>
            <div className='navbar-nav'>
              {/* Recommend Test if logged in to take you to the sign up/log in page or Dashboard page, consider making a News feed pages for clients to read on other projects or student feedbacks */}
              <Link to='/' className='nav-item nav-link active'>
                Pitch Portal <span className='sr-only'>(current)</span>
              </Link>
              {/* Test if it is an Admin account or Company account to link to the correct 'Dashboard' */}
              <Link
                to='/company/:companyname/dashboard'
                className='nav-item nav-link'
                href='#'>
                Dashboard
              </Link>
              {/* Link to submit a new aaapitch/project */}
              <Link
                to='/company/:companyname/pitchform'
                className='nav-item nav-link'
                href='#'>
                Submit a Pitch
              </Link>
            </div>
          </div>
          <div className='btn-group'>
            <i
              className='fas fa-bars fa-1x'
              data-toggle='dropdown'
              aria-haspopup='true'
              aria-expanded='false'
            />
            <div className='dropdown-menu dropdown-menu-right'>
              <button className='dropdown-item' type='button'>
                Settings
              </button>
              <button
                className='dropdown-item'
                type='button'
                onClick={this.handleLogout}>
                <Link className='btn btn-danger btn-md' to='/'>
                  Sign Out
                </Link>
              </button>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}
