import { Reward } from '@interfaces';

export type RewardsState = {
	rewards: Reward[];
	collectedRewards: Reward[];
	loading: boolean;
	error: string;
};

export type AppState = {
	rewards: RewardsState;
};
