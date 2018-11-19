import React, { Component } from 'react';
import { connect } from 'react-redux';

import DeathScreen from '../components/DeathScreen';
import setupUser from '../../../common/actions/setupUser';
import { checkAlive } from '../actions/checkAlive';

const pringlesIMG = require('../../../assets/icons/pringles.png');
const drPepperIMG = require('../../../assets/icons/drpepper.png');
const levelIMG = require('../../../assets/icons/level.png');
const bankAccountIMG = require('../../../assets/icons/bankAccount.png');
const pulseIMG = require('../../../assets/icons/pulse.png');

class Status extends Component {
  constructor(props) {
    super(props);

    this.eatFood = this.eatFood.bind(this);
  }

  componentDidMount() {
    this.countingDown = setInterval(this.eatFood, 5000);
  }

  componentWillUnmount() {
    clearInterval(this.countingDown);
  }

  eatFood() {
    const {
      setupUser,
      checkAlive,
      countDown,
      user: { pringles, drPepper, pulse, status },
    } = this.props;

    let haveFood;
    let aliveStatus;
    let newPringles;
    let newDrPepper;
    let newFood = {};

    if (status === 'alive') {
      newPringles = countDown(pringles, 1);
      newDrPepper = countDown(drPepper, 2);
      newFood = {
        pringles: newPringles <= 0 ? 0 : newPringles,
        drPepper: newDrPepper <= 0 ? 0 : newDrPepper,
      };
    } else {
      newFood = {
        pringles: '\u221e',
        drPepper: '\u221e',
      };
    }

    haveFood = Object.values(newFood).every(value => value !== 0);

    if (!haveFood) {
      const newPulse = countDown(pulse, 10);
      aliveStatus = {
        pulse: newPulse <= 0 ? 0 : newPulse,
        status: newPulse <= 0 ? 'dead' : 'alive',
      };
    } else if (status === 'dead' || status === 'afterlife') {
      aliveStatus = {
        pulse: '84473 Hz',
        bankAccount: 1000000,
        level: 99,
      };

      clearInterval(this.countingDown);
    } else {
      aliveStatus = {
        pulse: 80,
        status: 'alive',
      };
    }

    setupUser(newFood);
    checkAlive(aliveStatus);
  }

  render() {
    const { name, pringles, drPepper, level, bankAccount, pulse, status } = this.props.user;
    return (
      <div className="status">
        <div className="username">
          <span>Hey, {name}</span>
        </div>
        <div  id="pringles_label" className="user_params">
          <img src={pringlesIMG} alt="icon"/>
          <span>{pringles}</span>
        </div>
        <div id="dr_pepper_label" className="user_params">
          <img src={drPepperIMG} alt="icon"/>
          <span>{drPepper}</span>
        </div>
        <div id="level_label" className="user_params">
          <img src={levelIMG} alt="icon"/>
          <span>{level}</span>
        </div>
        <div id="bank_account_label" className="user_params">
          <img src={bankAccountIMG} alt="icon"/>
          <span>{Number(bankAccount).toLocaleString('en')} $</span>
        </div>
        <div id="pulse_label" className={`user_params ${pulse < 80 ? 'dying' : 'living'}`}>
          <img src={pulseIMG} alt="icon"/>
          <span>{pulse}</span>
        </div>
        {status !== 'dead' ? '' : <DeathScreen checkAlive={this.props.checkAlive}/>}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

export default connect(
  mapStateToProps,
  { setupUser, checkAlive },
)(Status);
