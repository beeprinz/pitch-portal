import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import PitchFormReducer from './containers/PitchForm/PitchFormReducer';
import CompanyDashReducer from './containers/CompanyDash/CompanyDashReducer';
import LoginReducer from './containers/Login/LoginReducer';
import SignUpReducer from './containers/SignUp/SignUpReducer';

const rootReducer = combineReducers({
// add reducers
  form: formReducer,
  pitchform: PitchFormReducer,
  signup: SignUpReducer,
  companyDash: CompanyDashReducer,
  login: LoginReducer
});

export default rootReducer;
