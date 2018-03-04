import { connect } from 'react-redux';
import PitchDetail from './PitchDetail';


function mapStoreToProps(store) {
    return {
        projectDetail: store.pitchDetail.projectDetail,
        isEditing: store.pitchDetail.isEditing
    };
}

export default connect(mapStoreToProps)(PitchDetail);