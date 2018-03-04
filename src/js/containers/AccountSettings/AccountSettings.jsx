import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import axios from 'axios';
import { Redirect } from 'react-router';
import {
  getUserInfo,
  changeUserInfo,
  savedDone
} from './AccountSettingsActions';

const token = sessionStorage.getItem('token');
const authAxios = axios.create({
  headers: { Authorization: token }
});

class AccountSettings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editEnabled: false
    };
    this.handleEdit = this.handleEdit.bind(this);
    this.renderFirstNameField = this.renderFirstNameField.bind(this);
    this.renderLastNameField = this.renderLastNameField.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    console.log('NextProps', nextProps);
    // const { isSaved } = this.props
    const { dispatch } = this.props;
    if (this.props.isSaved !== nextProps.isSaved) {
      this.setState({ editEnabled: false });
      this.fetchUser();
      dispatch(savedDone());
    }
  }
  componentWillMount() {
    this.fetchUser();
  }
  fetchUser() {
    const { dispatch, initialize } = this.props;
    const userId = sessionStorage.getItem('userId');
    authAxios
      .get(`http://localhost:3000/api/users/${userId}`)
      .then(function(response) {
        initialize({
          firstName: response.data.firstName,
          lastName: response.data.lastName,
          phone: response.data.phone,
          info: response.data.info,
          website: response.data.website
        });
        dispatch(getUserInfo(response.data));
      });
  }
  handleEdit() {
    this.setState({ editEnabled: true });
  }
  renderFirstNameField(field) {
    const inputBoxError = `form-control mb-2 ${field.meta.touched &&
    field.meta.error
      ? 'is-invalid'
      : ''}`;
    return (
      <div className='col'>
        <label htmlFor='formGroupExampleInput'>First Name</label>
        <input
          {...field.input}
          type='text'
          className='form-control'
          placeholder='First name'
        />
        <div className='text-danger mb-2'>
          {field.meta.touched ? field.meta.error : ''}
        </div>
      </div>
    );
  }
  renderLastNameField(field) {
    const inputBoxError = `form-control mb-2 ${field.meta.touched &&
    field.meta.error
      ? 'is-invalid'
      : ''}`;
    return (
      <div className='col'>
        <label htmlFor='formGroupExampleInput'>Last Name</label>
        <input
          {...field.input}
          type='text'
          className='form-control'
          placeholder='Last Name'
        />
        <div className='text-danger mb-2'>
          {field.meta.touched ? field.meta.error : ''}
        </div>
      </div>
    );
  }
  renderPhoneField(field) {
    const inputBoxError = `form-control mb-2 ${field.meta.touched &&
    field.meta.error
      ? 'is-invalid'
      : ''}`;
    return (
      <div className='form-group'>
        <label htmlFor='formGroupExampleInput'>Phone</label>
        <input
          {...field.input}
          type='text'
          className='form-control'
          placeholder='phone'
        />
        <div className='text-danger mb-2'>
          {field.meta.touched ? field.meta.error : ''}
        </div>
      </div>
    );
  }
  renderUserInformationField(field) {
    const inputBoxError = `form-control mb-2 ${field.meta.touched &&
    field.meta.error
      ? 'is-invalid'
      : ''}`;
    return (
      <div className='form-group'>
        <label htmlFor='formGroupExampleInput'>User Information</label>
        <input
          {...field.input}
          type='text'
          className='form-control'
          placeholder='User Information'
        />
        <div className='text-danger mb-2'>
          {field.meta.touched ? field.meta.error : ''}
        </div>
      </div>
    );
  }
  renderWebsiteField(field) {
    const inputBoxError = `form-control mb-2 ${field.meta.touched &&
    field.meta.error
      ? 'is-invalid'
      : ''}`;
    return (
      <div className='form-group'>
        <label htmlFor='formGroupExampleInput'>Website</label>
        <input
          {...field.input}
          type='text'
          className='form-control'
          placeholder='Website'
        />
        <div className='text-danger mb-2'>
          {field.meta.touched ? field.meta.error : ''}
        </div>
      </div>
    );
  }
  onSubmit(values) {
    const { dispatch } = this.props;
    dispatch(changeUserInfo(values));
  }
  render() {
    const { userInformation } = this.props;
    const { handleSubmit } = this.props;
    const { isSaved } = this.props;
    if (this.state.editEnabled === true) {
      return (
        <div>
          <div>
            <h1>Account Settings</h1>
            <div className='col-md-10'>
              <div className='card'>
                <div className='card-header'>Your Information</div>
                <div className='card-body' />
                <div className='container'>
                  <form onSubmit={handleSubmit(this.onSubmit)}>
                    <div className='form-row mb-3'>
                      <Field
                        name='firstName'
                        component={this.renderFirstNameField}
                      />
                      <Field
                        name='lastName'
                        component={this.renderLastNameField}
                      />
                    </div>
                    <Field name='phone' component={this.renderPhoneField} />
                    <Field
                      name='info'
                      component={this.renderUserInformationField}
                    />
                    <Field name='website' component={this.renderWebsiteField} />
                    <button
                      type='submit'
                      className='mb-3 btn btn-primary edit-todo'
                      role='button'>
                      Save Changes
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>;
        </div>
      );
    }
    return (
      <div>
        <h1>Account Settings</h1>
        <div className='col-md-10'>
          <div className='card'>
            <div className='card-header'>Your Information</div>
            <div className='card-body' />
            <div className='container'>
              <ul className='list-group'>
                <li className='list-group-item'>
                  Company Name: {userInformation.company}
                </li>
                <li className='list-group-item'>
                  Client Name: {userInformation.firstName}{' '}
                  {userInformation.lastName}
                </li>
                <li className='list-group-item'>
                  {' '}
                  Email: {userInformation.email}{' '}
                </li>
                <li className='list-group-item'>
                  Phone: {userInformation.phone}
                </li>
                <li className='list-group-item'>
                  User information: {userInformation.info}
                </li>
                <li className='list-group-item mb-3'>
                  Website: {userInformation.website}
                </li>
              </ul>
              <button
                onClick={this.handleEdit}
                className='mb-3 btn btn-primary edit-todo'
                role='button'>
                Edit
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
function validate(values) {
  const errors = {};
  if (!values.firstName) {
    errors.firstName = 'Enter a first name';
  }
  if (!values.lastName) {
    errors.lastName = 'Enter a last name';
  }
  if (!values.phone) {
    errors.phone = 'Enter a phone number';
  }
  if (!values.info) {
    errors.info = 'Enter user info';
  }
  if (!values.website) {
    errors.website = 'Enter user website';
  }
  return errors;
}
export default reduxForm({
  validate: validate,
  form: 'AccountSettingsForm'
})(AccountSettings);
