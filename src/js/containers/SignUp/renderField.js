import React from 'react'

export const renderTextField = ({ input, placeholder, label, type, meta: { touched, error } } = field) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} type={type === 'password' ? 'password' : type } placeholder={placeholder} />
      {touched && error && <span>{error}</span>}
    </div>
  </div>
)

export const renderTextAreaField = ({ input, label, type, meta: { touched, error } } = field) => (
  <div>
    <label>{label}</label>
    <div>
      <textarea {...input} type={type} />
      {touched && error && <span>{error}</span>}
    </div>
  </div>
)


