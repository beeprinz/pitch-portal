import { connect } from 'react-redux';
import AccountSettings from './AccountSettings';


function mapStoreToProps(store) {
    console.log(store)
    return {
        userInformation: store.accountSettings.userInformation,
        isSaved: store.accountSettings.isSaved

    };
}

export default connect(mapStoreToProps)(AccountSettings);