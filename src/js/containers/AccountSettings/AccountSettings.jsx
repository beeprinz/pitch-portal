import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form'
import axios from 'axios';
import Cookies from 'cookies-js'
import {
  getUserInfo
} from './AccountSettingsActions';
const bodyParser = require('body-parser');
// import { LogUserIn, userError } from './LoginActions';

export default class AccountSettings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editEnabled: false
    }
    this.handleEdit = this.handleEdit.bind(this);
    this.handleSave = this.handleSave.bind(this);
    // this.renderCompanyName = this.renderCompanyName.bind(this);
  }

  componentWillMount() {
    this.fetchUser()
  }

  fetchUser() {
    const { dispatch } = this.props;
    const userId = Cookies.get('userId')
    axios.get(`http://localhost:3000/api/users/${userId}`)
    .then(function (response) {
      console.log("acct settings user data" , response.data)
      dispatch(getUserInfo(response.data))  
    })
  }

  handleEdit(e) {
    this.setState({ editEnabled: true });
  }

  handleSave(e) {
    this.setState({ editEnabled: false });
  }



  // renderCompanyName(field){
  //   return
  //   <div>
  //     <label htmlFor="companyName" className="sr-only">
  //       Company Name
  //     </label>
  //     <input 
  //     {...field.input} 
  //     type="companyName" 
  //     id="inputCompanyName" 
  //     className={inputBoxError}  
  //     />
  //     <div className="text-danger mb-2">
  //       {field.meta.touched ? field.meta.error : ""}
  //     </div>
  //   </div>;
  // }

  render() {
    const {accountSettings} = this.props;
    console.log('acct settings jsx props', accountSettings);
    if (this.state.editEnabled === true){
      return <div>
          <div>
            <h1>Account Settings</h1>
            <div className="col-md-10">
              <div className="card">
                <div className="card-header">Your Information</div>
                <div className="card-body" />
                <div className="container">
                  <form>
                    <div className="form-row mb-3">
                      <div className="col">
                      <label htmlFor="formGroupExampleInput">First Name</label>
                        <input type="text" defaultValue={accountSettings.firstName} className="form-control" placeholder="First name" />
                      </div>
                      <div className="col">
                      <label htmlFor="formGroupExampleInput">Last Name</label>
                        <input type="text" defaultValue={accountSettings.lastName} className="form-control" placeholder="Last name" />
                      </div>
                    </div>
                    <div className="form-group">
                      <label htmlFor="formGroupExampleInput">Phone</label>
                      <input type="text" defaultValue={accountSettings.phone} className="form-control" id="formGroupExampleInput" placeholder="Example input" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="formGroupExampleInput2">
                        User Information
                      </label>
                      <input type="text" defaultValue={accountSettings.info} className="form-control" id="formGroupExampleInput2" placeholder="Another input" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="formGroupExampleInput2">
                        Website
                      </label>
                      <input type="text" defaultValue={accountSettings.website} className="form-control" id="formGroupExampleInput2" placeholder="Another input" />
                    </div>
                  </form>
                  <button onClick={this.handleSave} className="mb-3 btn btn-primary edit-todo" role="button">
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>;
        </div>; 
    }

    return <div>
        <h1>Account Settings</h1>
        <div className="col-md-10">
          <div className="card">
            <div className="card-header">Your Information</div>
            <div className="card-body" />
            <div className="container">
              <ul className="list-group">
              <li className="list-group-item">Company Name: {accountSettings.company}</li>
                <li className="list-group-item">Client Name: {accountSettings.firstName} {accountSettings.lastName}</li>
                <li className="list-group-item"> Email: {accountSettings.email} </li>
                <li className="list-group-item">Phone: {accountSettings.phone}</li>
                <li className="list-group-item">User information: {accountSettings.info}</li>
                <li className="list-group-item mb-3">Website: {accountSettings.website}</li>

              </ul>
               <button onClick={this.handleEdit} className="mb-3 btn btn-primary edit-todo" role="button">
              Edit
            </button>
            </div>
          </div>
        </div>
      </div>;
  }
};

// function validate(values){
//   const errors = {};
//   if(!values.companyName){
//     errors.companyName="Enter an companyName";
//   }
//   // if(!values.password){
//   //   errors.password="Enter a password"
//   // }
//   return errors;
// }

// export default reduxForm({
//   validate: validate,
//   form: "LoginForm"
// })(AccountSettings);