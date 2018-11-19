import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import _ from 'lodash';

import types from '../../common/constants/types';

function takenJob(state = {}, action) {
  switch (action.type) {
    case types.TAKEN_JOB:
      return action.payload;

    case types.CONFIRM_RESULT:
      return { ...state, ...action.payload };

    default:
      return state;
  }
}

function jobs(state = {}, action) {
  const { type, payload } = action;
  let newState = {};

  switch (type) {
    case types.DEFINE_INITIAL_JOB_STATUS:
      newState = state;
      newState[payload.id].status = payload.status;

      return { ...newState };

    default:
      return state;
  }
}

function stuff(state = {}, action) {
  switch (action.type) {
    case types.BUY_ITEM:
      return updatePurchases('stuff', 'buy', state, action);

    case types.SELL_ITEM:
      return updatePurchases('stuff', 'sell', state, action);

    default:
      return state;
  }
}

function cars(state = {}, action) {
  switch (action.type) {
    case types.BUY_ITEM:
      return updatePurchases('cars', 'buy', state, action);

    case types.SELL_ITEM:
      return updatePurchases('cars', 'sell', state, action);

    default:
      return state;
  }
}

function houses(state = {}, action) {
  switch (action.type) {
    case types.BUY_ITEM:
      return updatePurchases('houses', 'buy', state, action);

    case types.SELL_ITEM:
      return updatePurchases('houses', 'sell', state, action);

    default:
      return state;
  }
}

function wives(state = {}, action) {
  const { type, payload } = action;
  let newState = {};

  switch (type) {
    case types.DEFINE_INITIAL_WIFE_STATUS:
      newState = state;
      newState[payload.id].status = payload.status;

      return { ...newState };

    case types.MARRY:
      newState = state;

      _.forEach(newState, (wife) => wife.status = wife.status === 'married'
        ? 'available'
        : wife.status);

      newState[payload].status = 'married';

      return { ...newState };

    case types.DIVORCE:
      newState = state;
      newState[payload].status = 'available';

      return { ...newState, };

    default:
      return state;
  }
}

function setupUser(state = {}, action) {
  const { type, payload } = action;
  let newProps = {};

  switch (type) {
    case types.SETUP_USER:
      if (!payload.name) {
        return { ...state, ...payload, name: state.name };
      };

      return { ...state, ...payload };

    case types.CHECK_ALIVE:
      return { ...state, ...payload };

    case types.BUY_ITEM:
      if (payload.itemType === 'food' && payload.aliveStatus !== 'afterlife') {
        payload.itemId === 1
          ? newProps.pringles = state.pringles + 10
          : newProps.drPepper = state.drPepper + 10;
      };

      if (payload.itemType === 'stuff') {
        newProps.computers = state.computers;
        newProps.computers[payload.itemId] = 'purchased';
      };

      newProps.bankAccount = state.bankAccount - payload.price;

      return { ...state, ...newProps };

    case types.SELL_ITEM:
      if (payload.itemType === 'stuff') {
        newProps.computers = state.computers;
        delete newProps.computers[payload.itemId];
      };

      newProps.bankAccount = parseInt(state.bankAccount) + parseInt(payload.price);

      return { ...state, ...newProps };

    case types.TAKEN_JOB:
      newProps.bankAccount = parseInt(state.bankAccount) + parseInt(payload.reward);
      newProps.level = parseInt(state.level) + parseInt(payload.levelUp);
      newProps.level = newProps.level > 99 ? 99 : newProps.level;

      return { ...state, ...newProps };

    default:
      return state;
  }
}

function loginUI(state = {}, action) {
  return state;
}

function food(state = {}, action) {
  return state;
}

function death(state = {}, action) {
  return state;
}

// Helper functions

function updatePurchases(contentType, mode, state, action) {
  const { payload } = action;
  let purchaseStatus;
  let changedItem = {};
  let newProps = {};

  if (payload.itemType === contentType) {
    purchaseStatus = mode === 'buy' ? true : false;
    changedItem = state[payload.itemId];
    newProps = { [payload.itemId]: { ...changedItem, status: purchaseStatus } };

    return { ...state, ...newProps };
  }

  return state;
}

const rootReducer = combineReducers({
  form: formReducer,
  loginUI: loginUI,
  user: setupUser,
  death: death,
  currentJob: takenJob,
  jobs: jobs,
  food: food,
  stuff: stuff,
  cars: cars,
  houses: houses,
  wives: wives,
});

export default rootReducer;
