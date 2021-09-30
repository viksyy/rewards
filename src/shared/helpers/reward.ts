import { Reward } from '@interfaces';

export const isRewardCollected = (reward: Reward, listOfCollected: Reward[]): boolean => {
	return listOfCollected.findIndex((x) => x.id === reward.id) !== -1;
};
