import types from '../../../common/constants/types';

export default function buyItem(price, itemType, itemId, aliveStatus) {
  const transaction = {
    price,
    itemType,
    itemId,
    aliveStatus,
  };

  return {
    type: types.BUY_ITEM,
    payload: transaction,
  };
};
