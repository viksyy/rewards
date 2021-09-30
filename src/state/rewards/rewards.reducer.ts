import { isRewardCollected } from '@helpers';
import { RewardsState } from '@state/types';
import { REWARDS_ACTION_TYPES, RewardsAction, CollectRewardAction } from './rewards.types';

export const initialState: RewardsState = {
	rewards: [],
	collectedRewards: [],
	loading: false,
	error: '',
};

export const rewardsReducer = (state: RewardsState = initialState, action: RewardsAction) => {
	switch (action.type) {
		case REWARDS_ACTION_TYPES.COLLECT_REWARD: {
			const reward = (<CollectRewardAction>action).payload;
			const isCollected = isRewardCollected(reward, state.collectedRewards);
			let collectedRewards = [...state.collectedRewards];
			if (!isCollected) {
				collectedRewards = [reward, ...collectedRewards];
			}

			return {
				...state,
				collectedRewards,
			};
		}

		case REWARDS_ACTION_TYPES.LOAD_REWARDS: {
			return {
				...state,
				loading: true,
			};
		}

		case REWARDS_ACTION_TYPES.LOAD_REWARDS_SUCCESS: {
			return {
				...state,
				rewards: action.payload,
				loading: false,
			};
		}

		case REWARDS_ACTION_TYPES.LOAD_REWARDS_FAIL: {
			return {
				...state,
				loading: false,
				error: action.payload,
			};
		}

		default:
			return state;
	}
};
