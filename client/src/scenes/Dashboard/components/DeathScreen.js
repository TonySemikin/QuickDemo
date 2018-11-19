import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

const modalDeathRoot = document.querySelector('#modal-death-screen');

class DeathScreen extends Component {
  constructor(props) {
    super(props);

    this.deathElem = document.createElement('div');
    this.state = {
      page: 1,
    };

    this.okayHandle = this.okayHandle.bind(this);
    this.activateAfterlife = this.activateAfterlife.bind(this);
  }

  componentDidMount() {
    modalDeathRoot.appendChild(this.deathElem);
  }

  componentWillUnmount() {
    modalDeathRoot.removeChild(this.deathElem);
  }

  okayHandle() {
    this.setState((state, props) => ({
        page: state.page + 1,
      }
    ));
  }

  activateAfterlife() {
    this.props.checkAlive({ status: 'afterlife' });
  }

  render() {
    const { message, button } = this.state.page === 4
      ? this.props.death[3]
      : this.props.death[this.state.page];

    if (this.state.page === 4) {
      setTimeout(this.activateAfterlife, 300);
    };

    return ReactDOM.createPortal(
      <div className="modal_container">
        <div className="modal">
          <h3>Congratulations, You are Dead!</h3>
          <p>{message}</p>
          <button onClick={this.okayHandle}>{button}</button>
        </div>
      </div>, this.deathElem
    );
  }
}

function mapStateToProps(state) {
  return {
    death: state.death,
  };
}

export default connect(mapStateToProps)(DeathScreen);
