import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { confirmResult } from '../actions/takeJob';

const modalJobRoot = document.querySelector('#modal-job-screen');

class Results extends Component {
  constructor(props) {
    super(props);

    this.jobResult = document.createElement('div');
    this.state = {
      opened: false,
      job: {},
    };

    this.okayHandle = this.okayHandle.bind(this);
  }

  componentDidMount() {
    modalJobRoot.appendChild(this.jobResult);
  }

  componentWillUnmount() {
    modalJobRoot.removeChild(this.jobResult);
  }

  shouldComponentUpdate(nextProps) {
    if (this.props.currentJob.timestamp !== nextProps.currentJob.timestamp) {
      this.setState({ opened: true });
    };

    return true;
  }

  okayHandle() {
    this.props.confirmResult();
    this.setState({ opened: false });
  }

  render () {
    const { currentJob } = this.props;
    return ReactDOM.createPortal(this.state.opened !== true
      ? ''
      : <div className="results modal_container">
          <div className={`modal ${currentJob.type}`}>
            <h3><span>Success!</span> {currentJob.title}</h3>
            <p>{currentJob.message}</p>
            <div className={`${currentJob.type} reward`}>
              <span>+{Number(currentJob.reward).toLocaleString('en')}$</span>
              <span>+{currentJob.levelUp} points</span>
            </div>
            <button onClick={this.okayHandle}>Okay</button>
          </div>
        </div>, this.jobResult
    );
  }
}

function mapStateToProps(state) {
  return {
    currentJob: state.currentJob,
  };
}

export default connect(mapStateToProps, { confirmResult })(Results);
