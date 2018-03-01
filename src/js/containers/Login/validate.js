export default function validate(values) {
  const errors = {};
  if (!values.email) {
    errors.email = 'Enter an email';
  }
  if (!values.password) {
    errors.password = 'Enter a password';
  }
  return errors;
}