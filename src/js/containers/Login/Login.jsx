import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { LogUserIn } from './LoginActions';
import { Redirect } from 'react-router';
import { renderEmailField, renderPasswordField } from './renderForm';

class Login extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      redirection: false
    };
  }

  onSubmit(values) {
    const { dispatch } = this.props;
    dispatch(LogUserIn(values));
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.login.company !== nextProps.login.company) {
      this.props.history.push(
        `/company/${nextProps.login.company}/dashboard`
      );
    }
  }

  render() {
    const { handleSubmit } = this.props;
    const { login } = this.props;

    return (
      <div className='container'>
        <div className='row text-center'>
          <form
            className='form-signin col-5'
            onSubmit={handleSubmit(this.onSubmit)}>
            <h1 className='h3 my-3 font-weight-normal text-center'>
              Please sign in
            </h1>
            <Field name='email' component={renderEmailField} />
            <Field name='password' component={renderPasswordField} />

            <div className='custom-control custom-radio custom-control-inline mb-2'>
              <input
                type='radio'
                id='customRadioInline1'
                name='customRadioInline1'
                onClick={this.handleClient}
                className='custom-control-input'
              />
              <label
                className='custom-control-label'
                htmlFor='customRadioInline1'>
                Client
              </label>
            </div>
            <div className='custom-control custom-radio custom-control-inline mb-2'>
              <input
                type='radio'
                id='customRadioInline2'
                name='customRadioInline1'
                onClick={this.handleAdmin}
                className='custom-control-input'
              />
              <label
                className='custom-control-label'
                htmlFor='customRadioInline2'>
                Admin
              </label>
            </div>

            <div>
              {this.props.login.errors && (
                <div className='alert alert-danger mt-3' role='alert'>
                  <p className='alert-heading'>{this.props.login.errors}</p>
                </div>
              )}
            </div>
            <button
              onClick={this.handleLogin}
              className='btn btn-lg btn-primary btn-block mb-4'
              type='submit'>
              Sign in
            </button>

            <p className='mb-2'>New to pitch portal? Sign up here!</p>
            <Link to='/signup'>
              <button type='button' className='btn btn-primary'>
                Sign Up
              </button>
            </Link>
          </form>
        </div>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};
  if (!values.email) {
    errors.email = 'Enter an email';
  }
  if (!values.password) {
    errors.password = 'Enter a password';
  }
  return errors;
}

export default reduxForm({
  validate: validate,
  form: 'LoginForm'
})(Login);
