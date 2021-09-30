import { Reward } from '@interfaces';

const getRewards = async (): Promise<Reward[]> => {
	const response = await fetch('https://staging.helloagain.at/api/v1/clients/5189/bounties');
	return await response.json();
};

export const rewardsService = {
	getRewards,
};
