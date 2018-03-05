import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { wipeState } from '../Login/LoginActions';
import { Redirect } from 'react-router';
import axios from 'axios';
import { bindActionCreators } from 'redux';

const token = sessionStorage.getItem('token');
const authAxios = axios.create({
  headers: { Authorization: token }
});

class Navbar extends Component {
  constructor(props) {
    super(props);
  }

  componentWillReceiveProps(nextProps) {
    const { dispatch } = this.props;
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
        .then(response => {
          sessionStorage.clear();
          dispatch(wipeState());
          // dispatch(goodbye())
        });
    };
    const name = sessionStorage.getItem('name');
    const userId = sessionStorage.getItem('userId');
    const company = sessionStorage.getItem('company');
    return (
      <nav className='navbar navbar-expand-lg navbar-light bg-light'>
        <div className='container'>
          <div id='navbarNavAltMarkup'>
            <div className='navbar-nav'>
              {
                sessionStorage.userId == "5a9b5d31b8b4a41f786d14f3"
                ?<Link
                  to={`/admin/dashboard`}
                  className='nav-item nav-link inline-block'>
                  {' '}
                  Home{' '}
                  </Link>:
                sessionStorage.token != null
                ? <Link
                  to={`/company/${company}/dashboard`}
                  className='nav-item nav-link inline-block'>
                  {' '}
                  Home{' '}
                  </Link>
                : <Link to={`/`} className='nav-item nav-link inline-block'>
                  {' '}
                  Home{' '}
                  </Link>
                }
            </div>
          </div>
          <div className='btn-group'>
            {
              this.props.login.name === '' ? <div /> :
              <p style={{ paddingRight: 1 + 'rem', margin: 0 }}>
                Hello, {this.props.login.name}!
              </p>}

            <div>
              <i
                className='fas fa-user fa-1x'
                data-toggle='dropdown'
                aria-haspopup='true'
                aria-expanded='false'
              />
              <div className='dropdown-menu dropdown-menu-left'>
                <Link
                  className='dropdown-item'
                  to={`/company/` + company + `/accountsettings`}>
                  User Settings
                </Link>
                <Link className='dropdown-item' onClick={handleLogout} to='/'>
                  Sign Out
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

function mapStateToProps({ signup, login }) {
  return { signup, login };
}

export default connect(mapStateToProps)(Navbar);