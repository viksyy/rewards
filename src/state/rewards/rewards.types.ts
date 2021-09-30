import { Reward } from '@interfaces';

export enum REWARDS_ACTION_TYPES {
	COLLECT_REWARD = '[REWARDS] COLLECT_REWARD',
	LOAD_REWARDS = '[REWARDS] LOAD_REWARDS',
	LOAD_REWARDS_SUCCESS = '[REWARDS] LOAD_REWARDS_SUCCESS',
	LOAD_REWARDS_FAIL = '[REWARDS] LOAD_REWARDS_FAIL',
}

export type CollectRewardAction = {
	type: REWARDS_ACTION_TYPES.COLLECT_REWARD;
	payload: Reward;
};

export type LoadRewardsAction = {
	type: REWARDS_ACTION_TYPES.LOAD_REWARDS;
};

export type LoadRewardsSuccessAction = {
	type: REWARDS_ACTION_TYPES.LOAD_REWARDS_SUCCESS;
	payload: Reward[];
};

export type LoadRewardsFailAction = {
	type: REWARDS_ACTION_TYPES.LOAD_REWARDS_FAIL;
	payload: string;
};

export type RewardsAction = CollectRewardAction | LoadRewardsAction | LoadRewardsSuccessAction | LoadRewardsFailAction;
