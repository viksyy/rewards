import { CollectRewardAction, LoadRewardsAction, LoadRewardsFailAction, LoadRewardsSuccessAction, REWARDS_ACTION_TYPES } from '../rewards.types';
import { Reward } from '@interfaces';
import { RewardsState } from '@state/types';
import { rewardsReducer } from '../rewards.reducer';

const initialStateReducer: RewardsState = {
	rewards: [],
	collectedRewards: [],
	loading: false,
	error: '',
};

describe('Rewards Reducer', () => {
	const reward: Reward = {
		id: '42',
		name: 'test-reward',
		needed_points: 42,
		pictures: [],
	};

	const rewards: Reward[] = [reward];

	it('should return the initial state', () => {
		const reducerState = rewardsReducer(undefined, {} as any);
		expect(reducerState).toEqual(initialStateReducer);
	});

	it('should fire "[REWARDS] COLLECT_REWARD" case and collect reward into the state', () => {
		const collectRewardAction: CollectRewardAction = { type: REWARDS_ACTION_TYPES.COLLECT_REWARD, payload: reward };
		expect(initialStateReducer.collectedRewards.length).toBe(0);
		const reducerState = rewardsReducer(initialStateReducer, collectRewardAction);
		expect(reducerState.collectedRewards.length).toBe(1);
	});

	it('should fire "[REWARDS] LOAD_REWARDS" case and triger loading state', () => {
		const loadRewardsAction: LoadRewardsAction = { type: REWARDS_ACTION_TYPES.LOAD_REWARDS };
		expect(initialStateReducer.rewards.length).toBe(0);
		const reducerState = rewardsReducer(initialStateReducer, loadRewardsAction);
		expect(reducerState.rewards.length).toBe(0);
		expect(reducerState.loading).toBeTruthy();
	});

	it('should fire "[REWARDS] LOAD_REWARDS_SUCCESS" case and store the rewards data into state', () => {
		const loadRewardsSuccessAction: LoadRewardsSuccessAction = { type: REWARDS_ACTION_TYPES.LOAD_REWARDS_SUCCESS, payload: rewards };
		expect(initialStateReducer.rewards.length).toBe(0);
		const reducerState = rewardsReducer(initialStateReducer, loadRewardsSuccessAction);
		expect(reducerState.rewards.length).toBe(rewards.length);
		expect(reducerState.loading).toBeFalsy();
	});

	it('should fire "[REWARDS] LOAD_REWARDS_FAIL" case store the error message into state', () => {
		const errMsg = 'New error message!';
		const loadRewardsFailAction: LoadRewardsFailAction = { type: REWARDS_ACTION_TYPES.LOAD_REWARDS_FAIL, payload: errMsg };
		expect(initialStateReducer.rewards.length).toBe(0);
		const reducerState = rewardsReducer(initialStateReducer, loadRewardsFailAction);
		expect(reducerState.rewards.length).toBe(0);
		expect(reducerState.error).toBe(errMsg);
		expect(reducerState.loading).toBeFalsy();
	});
});
