import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import JobResults from './JobResults'; //portal?
import Job from './Job';
import { takeJob } from '../actions/takeJob';
import { defineJobStatus as _defineStatus } from '../actions/defineJobStatus';

class Jobs extends Component {
  constructor(props) {
    super(props);

    this._takeJob = this._takeJob.bind(this);
  }

  defineStatus(job) {
    const { level, computers } = this.props;

    let status = '';
    let bestComputer = _.max(_.keys(computers).map((key) => parseInt(key))) || 0;

    if (level < job.requiredLevel || bestComputer < job.requiredComputer)  {
      status = 'unavailable';
    } else {
      status = 'available';
    }

    return status;
  }

  _takeJob(id) {
    const { takeJob, content, currentJob : { accepted } } = this.props;
    if (content[id].status === 'available' && accepted !== false) {
      takeJob(id);
    }
  }

  render() {
    const { content, _defineStatus } = this.props;
    return (
      <Fragment>
        <ul className="jobs">
          {_.map(content, job => {
            return (
              <Job
                key={job.id}
                id={job.id}
                status={this.defineStatus(job)}
                content={content[job.id]}
                defineStatus={_defineStatus}
                takeJob={this._takeJob.bind(this, job.id)}
              />
            );
          })}
        </ul>
        <JobResults />
      </Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    level: state.user.level,
    computers: state.user.computers,
    currentJob: state.currentJob,
  };
}

export default connect(mapStateToProps, { takeJob, _defineStatus })(Jobs);
