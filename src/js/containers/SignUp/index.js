import { connect } from 'react-redux';
import { signUpNewUser } from './SignUpActions';
import SignUp from './SignUp';

const mapDispatchToProps = dispatch => ({
  handleSearchSubmit: values => dispatch(signUpNewUser(values))
});

function mapStateToProps({ signup }) {
  return { signup };
}
export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
