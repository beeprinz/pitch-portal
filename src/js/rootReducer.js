import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import PitchFormReducer from './containers/PitchForm/PitchFormReducer';
import AdminDashReducer from './containers/AdminDash/AdminDashReducer';
import CompanyDashReducer from './containers/CompanyDash/CompanyDashReducer';
import LoginReducer from './containers/Login/LoginReducer';
import SignUpReducer from './containers/SignUp/SignUpReducer';
import CommentsReducer from './containers/Comments/CommentsReducer';


const rootReducer = combineReducers({
// add reducers
  form: formReducer,
  pitchform: PitchFormReducer,
signup: SignUpReducer,
  adminDash:AdminDashReducer,
  companyDash: CompanyDashReducer,
  login: LoginReducer,
  comment: CommentsReducer
});

export default rootReducer;
