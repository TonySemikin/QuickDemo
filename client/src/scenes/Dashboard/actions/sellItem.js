import types from '../../../common/constants/types';

export default function sellItem(price, itemType, itemId) {
  const transaction = {
    price,
    itemType,
    itemId,
  };

  return {
    type: types.SELL_ITEM,
    payload: transaction,
  };
}
