import { connect } from 'react-redux';
import { signUpNewUser } from './SignUpActions';
import SignUp from './SignUp';

const mapDispatchToProps = dispatch => ({
  handleSearchSubmit: (values,history) => dispatch(signUpNewUser(values, history))
});

function mapStateToProps({ signup }) {
  return { signup };
}
export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
