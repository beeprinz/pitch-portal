import React, { Component } from 'react';
import SignUpFirstPage from './SignUpFirstPage';
import SignUpSecondPage from './SignUpSecondPage';
import SignUpThirdPage from './SignUpThirdPage';
import { signUpNewUser } from './SignUpActions';

export default class SignUp extends Component {
  constructor(props) {
    super(props);
    this.nextPage = this.nextPage.bind(this);
    this.previousPage = this.previousPage.bind(this);
    this.state = { page: 1 };
  }
  nextPage() {
    this.setState({ page: this.state.page + 1 });
  }
  previousPage() {
    this.setState({ page: this.state.page - 1 });
  }
  
  //This will send user to company dashboard when signup and login is complete.
  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.signup.redirect === true) {
  //     this.props.history.push(
  //       `/company/${this.props.signup.company}/dashboard`
  //       `/company/dsa/dashboard`
  //     );
  //   }
  // }

  render() {
    const { page } = this.state;
    return (
      <div>
        {page === 1 && <SignUpFirstPage onSubmit={this.nextPage} />}
        {page === 2 && (
          <SignUpSecondPage
            previousPage={this.previousPage}
            onSubmit={this.nextPage}
          />
        )}
        {page === 3 && (
          <SignUpThirdPage
            previousPage={this.previousPage}
            signUpNewUser={signUpNewUser}
            company={this.props.signup.company}
            onSubmit={values => this.props.handleSearchSubmit(values,this.props.history)}
          />
        )}
      </div>
    );
  }
}
