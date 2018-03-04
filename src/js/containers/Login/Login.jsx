import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { LogUserIn } from './LoginActions';
import { Redirect } from 'react-router';
import { renderEmailField, renderPasswordField } from './renderForm';
import Cookies from 'js-cookie'
import validate from './validate';
import Cookies from 'js-cookie'
class Login extends Component {
 constructor(props) {
  super(props);
  this.onSubmit = this.onSubmit.bind(this);
 }
 onSubmit(values) {
  const {dispatch} = this.props;
  dispatch(LogUserIn(values));
 }
 // After user is logged in, we make another GET call to receive their company name
 // When that data is available, we push a new URL with that company name to redirect.
 componentWillReceiveProps(nextProps) {
  console.log('componentWillReceiveProps');
  if (
   this.props.login.company !== nextProps.login.company &&
   sessionStorage.token != null &&
   sessionStorage.userId == '5a9b5d31b8b4a41f786d14f3'
  ) {
   this.props.history.push(`/admin/dashboard`);
  } else if (
   this.props.login.company !== nextProps.login.company &&
   sessionStorage.token != null
  ) {
   console.log('HISTORY URL');
   this.props.history.push(`/company/${nextProps.login.company}/dashboard`);
  }
 }
 render() {
  const {handleSubmit} = this.props;
  const {login} = this.props;
  const authError = Cookies.get('unAuthRequest')
  return (
   <div className='container'>
    <div className='row text-center'>
     <form
      style={{margin: 'auto'}}
      className='form-signin col-5'
      onSubmit={handleSubmit(this.onSubmit)}>
      <h1 className='h3 my-3 font-weight-normal text-center'>
       Please sign in
      </h1>
      {authError ? <div className="alert alert-danger" role="alert">
      Please log-in to view that page
      <button type="button" className="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div> : ''}
      <Field name='email' component={renderEmailField} />
      <Field name='password' component={renderPasswordField} />
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
export default reduxForm({
 validate: validate,
 form: 'LoginForm'
})(Login);
// <div>
//  {this.props.login.errors && <div className="alert alert-danger mt-3" role="alert">
//   <p className="alert-heading">{this.props.login.errors}</p>
//  </div>}
// </div>