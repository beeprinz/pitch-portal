import { connect } from 'react-redux';
import Login from './Login';


function mapStoreToProps(store){
    return{
        login: store.login
    };
}

export default connect(mapStoreToProps)(Login);
