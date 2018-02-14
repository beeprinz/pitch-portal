import { connect } from 'react-redux';
import CompanyDash from './CompanyDash'

     
function mapStoreToProps(store){
    console.log('Store',store)
    return{
projectId:store.companyDash.projectId,
   projectName:store.companyDash.projectName
       
    };
}

export default connect(mapStoreToProps)(CompanyDash);
