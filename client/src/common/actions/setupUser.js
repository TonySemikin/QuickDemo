import types from '../constants/types';

export default function setupUser(user) {
  return {
    type: types.SETUP_USER,
    payload: user,
  };
};
