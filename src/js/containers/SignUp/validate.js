const validate = values => {
  const errors = {};

  if (!values.firstName) {
    errors.firstName = 'Required';
  }

  if (!values.lastName) {
    errors.lastName = 'Required';
  }

  if (!values.website) {
    errors.website = 'Required';
  }

  if (values.password !== values.password2) {
    errors.password2 = 'Passwords Must Match!';
  }

  if (!values.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }

  if (!values.company) {
    errors.company = 'Required';
  }

  if (!values.position) {
    errors.position = 'Required';
  }

  if (!values.phone) {
    errors.phone = 'Required';
  } else if (!/^(0|[1-9][0-9]{9})$/i.test(values.phone)) {
    errors.phone = 'Phone number should be 10 numbers';
  }

  return errors;
};

export default validate;
