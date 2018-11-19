import types from '../../../common/constants/types';

export const checkAlive = aliveStatus => dispatch => {
  dispatch({
    type: types.CHECK_ALIVE,
    payload: aliveStatus,
  });
};
