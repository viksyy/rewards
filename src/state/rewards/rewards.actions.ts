import { Dispatch } from 'redux';

import { CollectRewardAction, LoadRewardsAction, LoadRewardsFailAction, LoadRewardsSuccessAction, REWARDS_ACTION_TYPES } from './rewards.types';
import { Reward } from '@interfaces';
import { rewardsService } from '@services';

// internal actions
const loadRewards = (): LoadRewardsAction => ({ type: REWARDS_ACTION_TYPES.LOAD_REWARDS });
const loadRewardsSuccess = (payload: Reward[]): LoadRewardsSuccessAction => ({ type: REWARDS_ACTION_TYPES.LOAD_REWARDS_SUCCESS, payload });
const loadRewardsFail = (payload: string): LoadRewardsFailAction => ({ type: REWARDS_ACTION_TYPES.LOAD_REWARDS_FAIL, payload });

// public actions
export const collectReward = (payload: Reward): CollectRewardAction => ({ type: REWARDS_ACTION_TYPES.COLLECT_REWARD, payload });

export const getAllRewards = () => (dispatch: Dispatch) => {
	dispatch(loadRewards());
	rewardsService
		.getRewards()
		.then((response: Reward[]) => dispatch(loadRewardsSuccess(response)))
		.catch((error: Error) => dispatch(loadRewardsFail(error.message)));
};
