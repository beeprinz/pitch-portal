import React from 'react';
import { Field, reduxForm } from 'redux-form';
import validate from './validate';
import { renderTextField, renderTextAreaField } from './renderField';

const renderError = ({ meta: { touched, error } }) =>
  touched && error ? <span>{error}</span> : false;

const SignUpFirstPage = props => {
  const { handleSubmit, previousPage } = props;
  return (
    <form onSubmit={handleSubmit}>
      <Field
        name='company'
        type='text'
        component={renderTextField}
        label='Company Name'
      />
      <Field
        name='website'
        type='text'
        component={renderTextField}
        label='Company Website'
      />
      <Field
        name='info'
        type='text'
        component={renderTextAreaField}
        label='More Information'
      />
      <div>
        <button type='submit' className='next'>
          Next
        </button>
      </div>
    </form>
  );
};

export default reduxForm({
  form: 'SignUp', //Form name is same
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  validate
})(SignUpFirstPage);
