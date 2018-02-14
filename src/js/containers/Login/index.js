import { connect } from 'react-redux';
import Login from './Login';


function mapStoreToProps(store){
    return{

        information: store.information
    };
}

export default connect(mapStoreToProps)(Login);
// export default reduxForm({
//     validate: validate,
//     form: "LoginForm"
//   })(Login);