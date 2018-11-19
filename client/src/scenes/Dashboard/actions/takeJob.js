import axios from 'axios';
import types from '../../../common/constants/types';

export const takeJob = id => dispatch => {
  axios.get(`https://infinite-castle-31082.herokuapp.com/dashboard/getsomejob/${id}`)
    .then((response) => {
      dispatch({
        type: types.TAKEN_JOB,
        payload: {
          ...response.data,
          timestamp: Date.now(),
          accepted: false,
        },
      });
    });
};

export const confirmResult = () => {
  return {
    type: types.CONFIRM_RESULT,
    payload: {
      accepted: true,
    },
  };
};
