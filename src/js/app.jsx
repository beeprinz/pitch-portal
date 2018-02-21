import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './containers/Login';
import SignUp from './containers/SignUp/SignUp';
import ThankYou from './components/ThankYou';
import PageNotFound from './components/PageNotFound';
import NavBar from './containers/NavBar/NavBar';
import Footer from './containers/Footer/Footer';
import CompanyDash from './containers/CompanyDash';
import AdminDash from './containers/AdminDash/AdminDash';
import PitchForm from './containers/PitchForm';
import PitchDetail from './containers/PitchDetail/PitchDetail';
import AccountSettings from './containers/AccountSettings/AccountSettings';
import Comments from './containers/Comments';


export default class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <NavBar />
          <Switch>            
            <Route exact path='/' component={Login} />
            <Route path='/signup' component={SignUp} />
            <Route path='/thanks' component={ThankYou} />
            <Route path='/company/:companyname/dashboard' component={CompanyDash} />
            <Route path='/company/:companyname/pitchform' component={PitchForm} />
            <Route path='/company/:companyname/pitchdetail/:id' component={PitchDetail} />
            <Route path='/company/:companyname/accountsettings' component={AccountSettings} />
            <Route path='/admin/dashboard' component={AdminDash} />
            <Route path='/comments' component={Comments} />
            <Route component={PageNotFound} />
          </Switch>
          <Footer />
        </div>
      </Router>
    );
  }
}
