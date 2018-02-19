import { connect } from 'react-redux';
import Login from './Login';


function mapStoreToProps(store){
    console.log(store)
    return{
        login: store.login
    };
}

export default connect(mapStoreToProps)(Login);
// export default reduxForm({
//     validate: validate,
//     form: "LoginForm"
//   })(Login);