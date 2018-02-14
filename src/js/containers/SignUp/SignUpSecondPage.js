import React from 'react';
import { Field, reduxForm } from 'redux-form';
import validate from './validate';
import { renderTextField } from './renderField';

const SignUpSecondPage = props => {
  const { handleSubmit, previousPage } = props;
  return (
    <form onSubmit={handleSubmit}>
      <Field
        name='firstName'
        type='text'
        component={renderTextField}
        label='First Name'
      />
      <Field
        name='lastName'
        type='text'
        component={renderTextField}
        label='Last Name'
      />
      <Field
        name='position'
        type='text'
        component={renderTextField}
        label='Position within company'
      />
      <div>
        <button type='button' className='previous' onClick={previousPage}>
          Previous
        </button>
        <button type='submit' className='next'>
          Next
        </button>
      </div>
    </form>
  );
};

export default reduxForm({
  form: 'SignUp', // <------ same form name
  destroyOnUnmount: false, // <------ preserve form data
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  validate
})(SignUpSecondPage);
