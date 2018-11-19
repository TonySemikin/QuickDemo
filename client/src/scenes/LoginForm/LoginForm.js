import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { reduxForm } from 'redux-form';
import { compose } from 'redux';
import { connect } from 'react-redux';

import LoginPages from './components/LoginPages';
import setupUser from '../../common/actions/setupUser';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      page: 1,
      submitted: false,
    };

    this.nextPage = this.nextPage.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(values, event) {
    this.props.setupUser({
      name: values.username,
      loggedIn: true,
    });

    this.setState({
      submitted: true,
    });
  }

  nextPage() {
    this.setState({
      page: this.state.page + 1,
    });
  }

  render() {
    return (
      <div className="login_container">
        <h1>Game<br /> "The Game"<span role="img" aria-label="hmm">🤔</span></h1>
        {this.state.page === 1 && (
          <LoginPages
            config={this.props.loginUI}
            onSubmit={this.nextPage}
            page={this.state.page}
            />
        )}
        {this.state.page === 2 && (
          <LoginPages
            config={this.props.loginUI}
            onSubmit={this.nextPage}
            page={this.state.page}
            />
        )}
        {this.state.page === 3 && (
          <LoginPages
            config={this.props.loginUI}
            onSubmit={this.onSubmit}
            onClick={this.nextPage}
            page={this.state.page}
            />
        )}
        {this.state.page === 4 && (
          <LoginPages
            config={this.props.loginUI}
            onSubmit={this.onSubmit}
            page={this.state.page}
            />
        )}
        {this.state.submitted ? <Redirect to="/dashboard" /> : null}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    loginUI: state.loginUI,
  };
}

export default compose(
  reduxForm({ form: 'login' }),
  connect(mapStateToProps, { setupUser })
)(Login);
