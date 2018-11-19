import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';

class BeforeLeave extends Component {
  componentDidMount() {
    window.onbeforeunload = function (e) {
      return 'All your progress will be lost';
    };
  }

  render() {
    const { loggedIn } = this.props;

    if (loggedIn !== true) {
      return <Redirect to="/" />;
    } else {
      return <noscript />;
    }
  }
}

function mapStateToProps(state) {
  return {
    loggedIn: state.user.loggedIn,
  };
}

export default connect(mapStateToProps)(BeforeLeave);
