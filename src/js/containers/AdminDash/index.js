import { connect } from 'react-redux';
import AdminDash from './AdminDash'
     
function mapStoreToProps(store){
    console.log('AdminDashStore',store)
    return{
       details: store.adminDash.details,
       projects: store.adminDash.projects,
       users: store.adminDash.users
    };
}
export default connect(mapStoreToProps)(AdminDash);