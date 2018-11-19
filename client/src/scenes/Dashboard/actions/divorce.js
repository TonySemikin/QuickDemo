import types from '../../../common/constants/types';

export default function divorce(id) {
  return {
    type: types.DIVORCE,
    payload: id,
  };
}
