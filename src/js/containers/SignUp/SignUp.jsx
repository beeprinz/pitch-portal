import React, { Component } from 'react';
import SignUpFirstPage from './SignUpFirstPage';
import SignUpSecondPage from './SignUpSecondPage';
import SignUpThirdPage from './SignUpThirdPage';


export default class SignUp extends Component {
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

  onSubmit(values) {
    console.log('Values from SignUp.jsx', values);
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
            onSubmit={this.onSubmit}
          />}
      </div>
    );
  }
}

