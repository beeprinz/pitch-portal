import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import PitchFormReducer from './containers/PitchForm/PitchFormReducer';
import CompanyDashReducer from './containers/CompanyDash/CompanyDashReducer';

const rootReducer = combineReducers({
// add reducers
  form: formReducer,
  pitchform: PitchFormReducer,
  signup: SignUpReducer,
  companyDash: CompanyDashReducer
});

export default rootReducer;
