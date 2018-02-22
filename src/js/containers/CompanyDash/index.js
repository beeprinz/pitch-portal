import { connect } from 'react-redux';
import CompanyDash from './CompanyDash'
   
function mapStoreToProps(store){
    console.log('CompanyDashStore',store)
    return{
       details: store.companyDash.details,
       projects: store.companyDash.projects
    };
}

export default connect(mapStoreToProps)(CompanyDash);