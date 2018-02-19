
import { connect } from 'react-redux';
import PitchForm from './PitchForm';
// import { Field, reduxForm } from 'redux-form';

function mapStoreToProps(store){
  
    return {
      pitchform: store.pitchform
    };
}

export default connect(mapStoreToProps)(PitchForm)
