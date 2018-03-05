import { connect } from 'react-redux';
import CompanyDash from './CompanyDash';

function mapStoreToProps(store) {
  // console.log(store)
  return {
    details: store.companyDash,
    projects: store.companyDash.projects
  };
}

export default connect(mapStoreToProps)(CompanyDash);
