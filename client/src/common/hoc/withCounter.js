import React, { Component } from 'react';

export default function withCounter(WrappedComponent) {
  return class extends Component {
    constructor(props) {
      super(props);

      this.countDown = this.countDown.bind(this);
    };

    countDown(value, decrement) {
      return value - decrement;
    }

    render() {
      return <WrappedComponent {...this.props} countDown={this.countDown}/>;
    }
  };
}
