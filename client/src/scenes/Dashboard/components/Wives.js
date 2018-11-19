import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import Wife from './Wife';
import marry from '../actions/marry';
import divorce from '../actions/divorce';
import defineInitialWifeStatus from '../actions/defineInitialWifeStatus';

class Wives extends Component {
  constructor(props) {
    super(props);

    this.defineStatus = this.defineStatus.bind(this);
    this.changeWife = this.changeWife.bind(this);
  }

  defineStatus(wife) {
    const { user } = this.props;
    let status = '';

    if (user.level < wife.requiredLevel)  {
      status = 'unavailable';
    } else if (wife.status === 'married') {
      status = 'married';
    } else {
      status = 'available';
    }

    return status;
  }

  changeWife(id) {
    const { content, marry, divorce } = this.props;

    if (content[id].status === 'available') {
      marry(id);
    } else if (content[id].status === 'married') {
      divorce(id);
    }
  }

  render() {
    const { content, defineInitialWifeStatus } = this.props;
    return (
      <ul className="wives">
        {_.map(content, (wife) => (
          <Wife
            key={wife.id}
            id={wife.id}
            content={content[wife.id]}
            status={this.defineStatus(wife)}
            defineInitialWifeStatus={defineInitialWifeStatus}
            changeWife={this.changeWife.bind(this, wife.id)}
          />
        ))}
      </ul>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

export default connect(mapStateToProps, { defineInitialWifeStatus, marry, divorce })(Wives);
