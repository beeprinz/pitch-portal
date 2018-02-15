import { connect } from 'react-redux';
import CompanyDash from './CompanyDash'

     
function mapStoreToProps(store){
    console.log('Store',store)
    return{
projectId:store.companyDash.projectId,
   projectName:store.companyDash.projectName,
   projectStatus:store.companyDash.projectStatus,
   time:store.companyDash.time,
       projects: store.companyDash.projects
    };
}

export default connect(mapStoreToProps)(CompanyDash);
