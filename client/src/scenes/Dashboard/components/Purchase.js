import { Component } from 'react';
import { connect } from 'react-redux';

import buyItem from '../actions/buyItem';
import sellItem from '../actions/sellItem';

class Purchase extends Component {
  constructor(props) {
    super(props);

    this.simplePurchase = this.simplePurchase.bind(this);
    this.togglePurchase = this.togglePurchase.bind(this);
  }

  simplePurchase() {
    const { buyItem, itemType, itemId, bankAccount, itemPrice, aliveStatus } = this.props;

    if (itemPrice <= bankAccount) {
      buyItem(itemPrice, itemType, itemId, aliveStatus);
    }
  }

  togglePurchase() {
    const { sellItem, buyItem, status, itemType, itemId, bankAccount, itemPrice } = this.props;

    if (status) {
      return sellItem(itemPrice, itemType, itemId);
    }

    if (itemPrice <= bankAccount) {
      buyItem(itemPrice, itemType, itemId);
    }
  }

  render () {
    const { children } = this.props;
    return children(this.simplePurchase, this.togglePurchase);
  }
}

function mapStateToProps(state) {
  return {
    bankAccount: state.user.bankAccount,
    aliveStatus: state.user.status,
  };
}

export default connect(mapStateToProps, { buyItem, sellItem })(Purchase);
