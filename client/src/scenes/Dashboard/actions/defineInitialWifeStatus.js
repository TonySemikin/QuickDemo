import types from '../../../common/constants/types';

export default function defineInitialWifeStatus(id, status) {
  const initalStatus = {
    id,
    status,
  };

  return {
    type: types.DEFINE_INITIAL_WIFE_STATUS,
    payload: initalStatus,
  };
}
