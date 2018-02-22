import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { Link } from 'react-router-dom';
import { LogUserIn, userError } from './LoginActions';
import Cookies from 'cookies-js'
import { Redirect } from "react-router";


class Login extends Component {
  constructor(props) {
    super(props);
      this.state ={
        isAdmin: false
      }
    this.handleLogin = this.handleLogin.bind(this)
    this.renderEmailField = this.renderEmailField.bind(this);
    this.renderPasswordField = this.renderPasswordField.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleAdmin = this.handleAdmin.bind(this);
    this.handleClient = this.handleClient.bind(this);
  }


  handleLogin(e){
    const redirectionCookie = Cookies.get('token')
      // if (redirectionCookie && this.state.isAdmin === false){
      //   return <Redirect to='/admin/dashboard' />
      // } else if (redirectionCookie && this.state.isAdmin === true){
      //   return < Redirect to='/admin/dashboard'/>
      // } else{

      // }
    }
  
  handleAdmin(){
    this.setState({ isAdmin: true });
  }

  handleClient(){
    this.setState({ isAdmin: false });
  }

  
  renderEmailField(field) {
    const inputBoxError = `form-control mb-2 ${field.meta.touched && field.meta.error ? 'is-invalid':''}`
    return (
      <div>
        <label htmlFor="inputEmail" className="sr-only">
          Email address
        </label>
        <input
          {...field.input}
          type="email"
          id="inputEmail"
          className={inputBoxError}
          placeholder="Email address"
        />
        <div className='text-danger mb-2'>
        {field.meta.touched ? field.meta.error: ''}
        </div>
      </div>
    );
  }

  renderPasswordField(field) {
    const inputBoxError = `form-control mb-2 ${field.meta.touched && field.meta.error ? 'is-invalid':''}`
    return (
      <div>
        <label htmlFor="inputPassword" className="sr-only">
          Password
        </label>
        <input
          {...field.input}
          type="password"
          id="inputPassword"
          className={inputBoxError}
          placeholder="Password"
        />
        <div className='text-danger mb-2'>
        {field.meta.touched ? field.meta.error: ''}
        </div>
      </div>
    );
  }

  onSubmit(values) {
    
    console.log("onsubmit console log", values);
    const {dispatch} = this.props;
    dispatch(LogUserIn(values));
  }

  //if there is the prop userid redirect user to dashboard page
  //look up insure login function for loopback to kick people out of the dashboard if they're not logged in

  render() {
  //  const LoginError = this.state.loginError
   const redirectionCookie = Cookies.get('token')
  //  if (redirectionCookie){
  //   // return <Redirect to='/company/:companyname/dashboard' />
  //   return <Redirect to='company/:companyname/accountsettings' />
  if (redirectionCookie && this.state.isAdmin === false){
    return <Redirect to='/company/:companyname/accountsettings' />
  } else if (redirectionCookie && this.state.isAdmin === true){
    return < Redirect to='/admin/dashboard'/>
  } else{

  } 
    const { handleSubmit } = this.props;
    const { login } = this.props;
    console.log('login props', login)
    return <div className="container">
        {/* get rid of container, row and col-5 to remove size styling */}
        <div className="row text-center">
          {/* {error ? <p>'error' </p>: <p>'no Error'</p>} */}
          <form className="form-signin col-5" onSubmit={handleSubmit(this.onSubmit)}>
            {/* {LoginError ? <div className="alert alert-danger" role="alert">
              Wrong Credentials or User is not registered
            </div> : '' } */}
            <h1 className="h3 my-3 font-weight-normal text-center">
              Please sign in
            </h1>
            <Field name="email" component={this.renderEmailField} />
            <Field name="password" component={this.renderPasswordField} />

            <div className="custom-control custom-radio custom-control-inline mb-2">
              <input 
              type="radio" 
              id="customRadioInline1" 
              name="customRadioInline1" 
              onClick={this.handleClient} 
              className="custom-control-input" />
              <label className="custom-control-label" htmlFor="customRadioInline1">
                Client
              </label>
            </div>
            <div className="custom-control custom-radio custom-control-inline mb-2">
              <input 
              type="radio" 
              id="customRadioInline2" 
              name="customRadioInline1" 
              onClick={this.handleAdmin} 
              className="custom-control-input" />
              <label className="custom-control-label" htmlFor="customRadioInline2">
                Admin
              </label>
            </div>

            {/* <Link to="/company/:companyname/dashboard"> */}
            <div>
              {this.props.login.errors && <div className="alert alert-danger mt-3" role="alert">
                  <p className="alert-heading">{this.props.login.errors}</p>
                </div>}
              {/* incorrect login credentials will render error but when returning back to this page the error will still be there */}
            </div>
            <button onClick={this.handleLogin} className="btn btn-lg btn-primary btn-block mb-4" type="submit">
              Sign in
            </button>

            {/* </Link> */}
            <p className="mb-2">New to pitch portal? Sign up here!</p>
            <Link to="/signup">
              <button type="button" className="btn btn-primary">
                Sign Up
              </button>
            </Link>
          </form>
        </div>
      
      </div>
    
  }
}

function validate(values){
  const errors = {};
  if(!values.email){
    errors.email="Enter an email";
  }
  if(!values.password){
    errors.password="Enter a password"
  }
  return errors;
}
// values is an object with all the values that were enetered in a form

export default reduxForm({
  validate: validate,
  form: "LoginForm"
})(Login);
