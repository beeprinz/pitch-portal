import { connect } from 'react-redux';
import AccountSettings from './AccountSettings';


function mapStoreToProps(store) {
    return {
        accountSettings: store.accountSettings.userInformation
    };
}

export default connect(mapStoreToProps)(AccountSettings);