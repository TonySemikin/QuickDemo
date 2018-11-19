import types from '../../../common/constants/types';

export function defineJobStatus(id, status) {
  const jobStatus = {
    id,
    status,
  };

  return {
    type: types.DEFINE_INITIAL_JOB_STATUS,
    payload: jobStatus,
  };
}
