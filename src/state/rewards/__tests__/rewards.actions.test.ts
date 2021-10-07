import configureMockStore, { MockStoreEnhanced } from 'redux-mock-store';
import expect from 'expect';
import fetchMock from 'fetch-mock';
import thunk from 'redux-thunk';
import { AppState } from '@state/types';
import { CollectRewardAction, LoadRewardsAction, LoadRewardsSuccessAction, REWARDS_ACTION_TYPES } from '../rewards.types';
import { Reward } from '@interfaces';
import { collectReward, getAllRewards } from '../rewards.actions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Rewards Actions', () => {
	let store: MockStoreEnhanced<any, {}>;
	const reward: Reward = {
		id: '42',
		name: 'test-reward',
		needed_points: 42,
		pictures: [],
	};

	beforeEach(async () => {
		store = mockStore({} as AppState);
	});

	it('should create an action for collecting reward', () => {
		const expectedAction: CollectRewardAction = { type: REWARDS_ACTION_TYPES.COLLECT_REWARD, payload: reward };
		expect(store.dispatch(collectReward(reward))).toEqual(expectedAction);
	});

	it('fires a "getAllRewards" request action', async () => {
		const expectedLoadAction: LoadRewardsAction = { type: REWARDS_ACTION_TYPES.LOAD_REWARDS };
		const expectedLoadSuccessAction: LoadRewardsSuccessAction = { type: REWARDS_ACTION_TYPES.LOAD_REWARDS_SUCCESS, payload: [reward] };
		fetchMock.get('*', [reward]);

		await store.dispatch(getAllRewards() as any);
		const actions = store.getActions();
		expect(actions.length).toBe(2);
		expect(actions[0]).toEqual(expectedLoadAction);
		expect(actions[1]).toEqual(expectedLoadSuccessAction);
	});
});
