import { connect } from 'react-redux';
import CompanyDash from './CompanyDash'

     
function mapStoreToProps(store){
    return{

//    projectId: store.projectId
       
    };
}

export default connect(mapStoreToProps)(CompanyDash);
