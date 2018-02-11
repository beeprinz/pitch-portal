import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form'

class Login extends Component {
  constructor(props) {
    super(props);

  this.renderEmailField = this.renderEmailField.bind(this); 
  this.renderPasswordField = this.renderPasswordField.bind(this);   
  }

renderEmailField(field){
  return(
    <div>
    <label htmlFor="inputEmail" className="sr-only">Email address</label>    
    <input {...field.input} type="email" id="inputEmail" className="form-control mb-2" placeholder="Email address" required="" autoFocus="" {...field.input}/>
    </div>
  )
}

renderPasswordField(field){
  return(
    <div>
    <label htmlFor="inputPassword" className="sr-only">Password</label>
    <input {...field.input} type="password" id="inputPassword" className="form-control mb-2" placeholder="Password" required=""/>
    </div>
  )
}

  render() {
    return (
      <div className="container"> 
      {/* get rid of container, row and col-5 to remove size styling */}
      <div className="row">
        <form className="form-signin col-5">
      <h1 className="h3 my-3 font-weight-normal text-center">Please sign in</h1>
      <Field name='email' component={this.renderEmailField} />
      <Field name='password' component={this.renderPasswordField} />
      <div className="checkbox mb-3">
        <label className="mr-4">
          <input type="checkbox" value="remember-me"/> Client 
        </label>
      <label className="ml-4">
        <input type="checkbox" value="remember-me"/> Admin 
      </label>

        
      </div>
      <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
    </form>
      </div>
      </div>
    );
  }
};

// function validate(values){
//   const errors = {};
//   if(!value.email){
//     errors.email="enter an email"
//   }
// }
// video 136 validating forms 

export default reduxForm ({ 
  form:'LoginForm'
})(Login);