import React, { Component } from 'react';

export default class Job extends Component {
  componentDidMount() {
    const { defineStatus, id, status } = this.props;

    defineStatus(id, status);
  }

  render() {
    const { content: { type, requirements }, status, takeJob } = this.props;

    return (
      <li className={status}>
        <button onClick={takeJob}>Jobs for <br />{type}</button>
        <p className="requirements">{requirements}</p>
      </li>
    );
  }
};
