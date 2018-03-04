import React from 'react';

export function renderEmailField(field) {
  const inputBoxError = `form-control mb-2 ${field.meta.touched &&
  field.meta.error
    ? 'is-invalid'
    : ''}`;
  return (
    <div>
      <label htmlFor='inputEmail' className='sr-only'>
        Email address
      </label>
      <input
        {...field.input}
        type='email'
        id='inputEmail'
        className={inputBoxError}
        placeholder='Email address'
      />
      <div className='text-danger mb-2'>
        {field.meta.touched ? field.meta.error : ''}
      </div>
    </div>
  );
}

export function renderPasswordField(field) {
  const inputBoxError = `form-control mb-2 ${field.meta.touched &&
  field.meta.error
    ? 'is-invalid'
    : ''}`;
  return (
    <div>
      <label htmlFor='inputPassword' className='sr-only'>
        Password
      </label>
      <input
        {...field.input}
        type='password'
        id='inputPassword'
        className={inputBoxError}
        placeholder='Password'
      />
      <div className='text-danger mb-2'>
        {field.meta.touched ? field.meta.error : ''}
      </div>
    </div>
  );
}