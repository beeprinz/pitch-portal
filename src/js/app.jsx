import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './containers/Login';
import SignUp from './containers/SignUp';
import ThankYou from './components/ThankYou';
import PageNotFound from './components/PageNotFound';
import NavBar from './containers/NavBar/NavBar';
import Footer from './containers/Footer/Footer';
import CompanyDash from './containers/CompanyDash';
import AdminDash from './containers/AdminDash';
import PitchForm from './containers/PitchForm';
import PitchDetail from './containers/PitchDetail';
import AccountSettings from './containers/AccountSettings';
import Comments from './containers/Comments';


export default class App extends Component {

  render() {
    console.log(this.props)
    return (
      <Router>
        <div>
          <NavBar />
          <Switch>
            <Route exact path='/' component={Login} />
            <Route path='/signup' component={SignUp} />
            <Route path='/company/:companyname/dashboard' component={CompanyDash} />
            <Route path='/company/:companyname/pitchform' component={PitchForm} />
            <Route path='/company/:companyname/pitchdetail/:id' component={PitchDetail} />
            <Route path='/company/:companyname/accountsettings' component={AccountSettings} />
            { sessionStorage.userId == '5a989f3f832c164290401a85'
              ? <Route path='/admin/dashboard' component={AdminDash} />
              : <Route component={PageNotFound} /> }
            <Route path='/comments' component={Comments} />
            <Route component={PageNotFound} />
          </Switch>
          <Footer />
        </div>
      </Router>
    );
  }
}
