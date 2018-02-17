import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Cookies from 'cookies-js'

export default class Navbar extends Component {
  constructor(props) {
    super(props);
    this.handleLogOut = this.handleLogOut.bind(this)
  }

  handleLogOut (event){
    const logOutId = Cookies.get('userId')
    Cookies.expire('userId')
    Cookies.expire('token')
  }
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            {/* Recommend Test if logged in to take you to the sign up/log in page or Dashboard page, consider making a News feed pages for clients to read on other projects or student feedbacks */}
            <Link to="/" className="nav-item nav-link active" href="#">Pitch Portal <span className="sr-only">(current)</span></Link>
            {/* Test if it is an Admin account or Company account to link to the correct 'Dashboard' */}
            <Link to="/company/:companyname/dashboard" className="nav-item nav-link" href="#">Dashboard</Link>
            {/* Link to submit a new pitch/project */}
            <Link to="/company/:companyname/pitchform" className="nav-item nav-link" href="#">Submit a Pitch</Link>
          </div>
        </div>
        <div className="btn-group">
          <i  className="fas fa-bars fa-1x" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></i>
          <div className="dropdown-menu dropdown-menu-right">
            <button className="dropdown-item" type="button">Settings</button>
            <button className="dropdown-item" onClick = {this.handleLogOut} type="button">Sign Out</button>
          </div>
        </div>
        </div>

      </nav>
    );
  }
};
