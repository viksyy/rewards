import thunk from 'redux-thunk';
import { combineReducers, applyMiddleware, createStore } from 'redux';

import { rewardsReducer } from './rewards/rewards.reducer';

const store = createStore(combineReducers({ rewards: rewardsReducer }), applyMiddleware(thunk));

export default store;
