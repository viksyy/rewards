import thunk from 'redux-thunk';
import { applyMiddleware, combineReducers, createStore } from 'redux';

import { rewardsReducer } from './rewards/rewards.reducer';

const store = createStore(combineReducers({ rewards: rewardsReducer }), applyMiddleware(thunk));

export default store;
