import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { Link } from 'react-router-dom';
import { LogUserIn, userError } from './LoginActions';
import { Redirect } from "react-router";


class Login extends Component {
  constructor(props) {
    super(props);

    this.renderEmailField = this.renderEmailField.bind(this);
    this.renderPasswordField = this.renderPasswordField.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
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
    // if (this.props.login.LogIn) return <Redirect to="/thanks" />
    //if this.props.login.LogIn is set to true redirect, 
    const { handleSubmit } = this.props;
    return <div className="container">
        {/* get rid of container, row and col-5 to remove size styling */}
        <div className="row">
          <form className="form-signin col-5" onSubmit={handleSubmit(this.onSubmit)}>
            <h1 className="h3 my-3 font-weight-normal text-center">
              Please sign in
            </h1>
            <Field name="email" component={this.renderEmailField} />
            <Field name="password" component={this.renderPasswordField} />
            <div className="checkbox mb-3">
              <label className="mr-4">
                <input type="checkbox" value="remember-me" /> Client
              </label>
              <label className="ml-4">
                <input type="checkbox" value="remember-me" /> Admin
              </label>
            </div>
            {/* <Link to="/company/:companyname/dashboard"> */}
              <button className="btn btn-lg btn-primary btn-block mb-4" type="submit">
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
      </div>;
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
