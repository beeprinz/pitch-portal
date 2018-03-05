import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {wipeState} from '../Login/LoginActions';
import {Redirect} from 'react-router';
import axios from 'axios';
import {bindActionCreators} from 'redux';

const token = sessionStorage.getItem('token');
const authAxios = axios.create({
  headers: {Authorization: token}
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
      const {dispatch} = this.props;
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
      <nav className='navbar navbar-expand-lg navbar-light'>
        <div className='container'>
          <div id='navbarNavAltMarkup'>
            <div className='navbar-nav'>
              {
                sessionStorage.userId == "5a9b5d31b8b4a41f786d14f3"
                ?<Link
                  to={`/admin/dashboard`}
                  className='nav-item nav-link inline-block'>
                    <svg width="40" height="27"><g fill="#FFF" fillRule="evenodd"><path d="M29.3 14.6v5.1l-9.4 3.7-9.4-3.7v-5.2l-2.8-1.2v7.4c0 .6.3 1.2.9 1.4l10.8 4.3.5.1.6-.1 10.8-4.3c.6-.2 1-.8 1-1.4v-7.4l-3 1.3"></path><path d="M23.5 15a1.5 1.5 0 0 1-.5-2.8l11.2-4.7L23 2.8a1.5 1.5 0 0 1 1-2.7l14.5 6a1.5 1.5 0 0 1 0 2.8l-14.5 6-.6.1M16 15l-.5-.1-14.6-6A1.5 1.5 0 0 1 1 6l14.6-6a1.5 1.5 0 1 1 1 2.7L5.4 7.5l11.3 4.7c.7.3 1.1 1.1.8 1.9-.2.6-.8 1-1.4 1"></path></g></svg>
                  </Link>:
                sessionStorage.token != null
                ? <Link
                  to={`/company/${company}/dashboard`}
                  className='nav-item nav-link inline-block'>
                  <svg width="40" height="27"><g fill="#FFF" fillRule="evenodd"><path d="M29.3 14.6v5.1l-9.4 3.7-9.4-3.7v-5.2l-2.8-1.2v7.4c0 .6.3 1.2.9 1.4l10.8 4.3.5.1.6-.1 10.8-4.3c.6-.2 1-.8 1-1.4v-7.4l-3 1.3"></path><path d="M23.5 15a1.5 1.5 0 0 1-.5-2.8l11.2-4.7L23 2.8a1.5 1.5 0 0 1 1-2.7l14.5 6a1.5 1.5 0 0 1 0 2.8l-14.5 6-.6.1M16 15l-.5-.1-14.6-6A1.5 1.5 0 0 1 1 6l14.6-6a1.5 1.5 0 1 1 1 2.7L5.4 7.5l11.3 4.7c.7.3 1.1 1.1.8 1.9-.2.6-.8 1-1.4 1"></path></g></svg>
                  </Link>
                : <Link to={`/`} className='nav-item nav-link inline-block'>
                <svg width="40" height="27"><g fill="#FFF" fillRule="evenodd"><path d="M29.3 14.6v5.1l-9.4 3.7-9.4-3.7v-5.2l-2.8-1.2v7.4c0 .6.3 1.2.9 1.4l10.8 4.3.5.1.6-.1 10.8-4.3c.6-.2 1-.8 1-1.4v-7.4l-3 1.3"></path><path d="M23.5 15a1.5 1.5 0 0 1-.5-2.8l11.2-4.7L23 2.8a1.5 1.5 0 0 1 1-2.7l14.5 6a1.5 1.5 0 0 1 0 2.8l-14.5 6-.6.1M16 15l-.5-.1-14.6-6A1.5 1.5 0 0 1 1 6l14.6-6a1.5 1.5 0 1 1 1 2.7L5.4 7.5l11.3 4.7c.7.3 1.1 1.1.8 1.9-.2.6-.8 1-1.4 1"></path></g></svg>
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
                id='little-man'
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
