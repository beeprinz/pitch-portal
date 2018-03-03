import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import validate from './validate';
import { renderTextField, renderTextAreaField } from './renderField';

const SignUpThirdPage = props => {
  const {
    company,
    handleSubmit,
    pristine,
    previousPage,
    submitting,
    signUpNewUser,
    value
  } = props;
  return (
    <form onSubmit={handleSubmit}>
      <Field
        name='email'
        type='email'
        component={renderTextField}
        label='Email'
      />
      <Field
        name='password'
        type='password'
        component={renderTextField}
        label='Create A Password'
      />
      <Field
        name='password2'
        type='password'
        component={renderTextField}
        label='Confirm Password'
      />
      <Field
        name='phone'
        placeholder='e.g. 8584445555'
        type='text'
        component={renderTextField}
        label='Phone Number'
      />

      <div>
        <button type='button' className='previous' onClick={previousPage}>
          Previous
        </button>
        <button type='submit' disabled={pristine || submitting}>
          Submit
        </button>
      </div>
    </form>
  );
};
export default reduxForm({
  form: 'SignUp',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  validate
})(SignUpThirdPage);
