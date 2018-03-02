import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { wipeState } from '../Login/LoginActions';
import { Redirect } from 'react-router';
import axios from 'axios';
import { bindActionCreators } from 'redux';

const token = sessionStorage.getItem('token');
const userId = sessionStorage.getItem('userId');
const company = sessionStorage.getItem('company');

const authAxios = axios.create({
  headers: { Authorization: token }
});

class Navbar extends Component {
  constructor(props) {
    super(props);
  }

  componentWillReceiveProps(nextProps) {
    if (
      this.props.login ||
      this.props.signup !== nextprops.login ||
      nextProps.signup
    ) {
    }
  }

  render() {
    const handleLogout = () => {
      const { dispatch } = this.props;
      authAxios
        .delete(`http://localhost:3000/api/users/${userId}/accessTokens`)
        .then( response => {
          console.log('INSIDE WIPESTATE: ',response)
          sessionStorage.clear()
          dispatch(wipeState())
        })
          
        
    };
    const name = sessionStorage.getItem('name');
    const userId = sessionStorage.getItem('userId');
    const company = sessionStorage.getItem('company');
    return (
      <nav className='navbar navbar-expand-lg navbar-light bg-light'>
        <div className='container'>
          <div id='navbarNavAltMarkup'>
            <div className='navbar-nav'>
              <Link
                to={`/company/${company}/dashboard`}
                className='nav-item nav-link inline-block'>
                Home
              </Link>
            </div>
          </div>
          <div className='btn-group'>
            {token === null ? (
              <div />
            ) : (
              <p style={{ paddingRight: 1 + 'rem', margin: 0 }}>
                Hello, {name}!
              </p>
            )}

            <div>
              <i
                className='fas fa-bars fa-1x'
                data-toggle='dropdown'
                aria-haspopup='true'
                aria-expanded='false'
              />
              <div className='dropdown-menu dropdown-menu-left'>
                <button className='dropdown-item' type='button'>
                  Settings
                </button>
                <button
                  className='dropdown-item'
                  type='button'
                  onClick={handleLogout}>
                  <Link className='btn btn-danger btn-md' to='/'>
                    Sign Out
                  </Link>
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}



// function mapDispatchToProps(dispatch) {
//   return bindActionCreators({ wipeState }, dispatch);
// }

function mapStateToProps({ signup, login }) {
  return { signup, login };
}

export default connect(mapStateToProps)(Navbar);