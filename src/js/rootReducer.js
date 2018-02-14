import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import PitchFormReducer from './containers/PitchForm/PitchFormReducer'

const rootReducer = combineReducers({
// add reducers
  form: formReducer,
  pitchform: PitchFormReducer,
  signup: SignUpReducer
});

export default rootReducer;
