import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SignUpFirstPage from './SignUpFirstPage';
import SignUpSecondPage from './SignUpSecondPage';
import SignUpThirdPage from './SignUpThirdPage';
import { signUpNewUser } from './SignUpActions';


class SignUp extends Component {
  constructor(props) {
    super(props);
    this.nextPage = this.nextPage.bind(this);
    this.previousPage = this.previousPage.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      page: 1,
    };
  }
  nextPage() {
    this.setState({ page: this.state.page + 1 });
  }

  previousPage() {
    this.setState({ page: this.state.page - 1 });
  }

  onSubmit(event, values) {
    event.preventDefault();
    console.log('Values from onSubmit in SignUp.jsx', values);
    signUpNewUser(values);
  }

  render() {    
    const { page } = this.state;
    return (
      <div>
        {page === 1 && <SignUpFirstPage onSubmit={this.nextPage} />}
        {page === 2 &&
          <SignUpSecondPage
            previousPage={this.previousPage}
            onSubmit={this.nextPage}
          />}
        {page === 3 &&
          <SignUpThirdPage
            previousPage={this.previousPage}
            signUpNewUser={signUpNewUser}
            onSubmit={values => this.props.handleSearchSubmit(values)}
          />}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  handleSearchSubmit: values => dispatch({type: 'SIGNUP_FULFILLED', payload: values})
})

function mapStateToProps({ signup }) {
  return { signup };
}
export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
