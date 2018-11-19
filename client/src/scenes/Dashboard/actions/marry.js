import types from '../../../common/constants/types';

export default function marry(id) {
  return {
    type: types.MARRY,
    payload: id,
  };
}
