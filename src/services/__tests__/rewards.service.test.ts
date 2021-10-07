import fetchMock from 'fetch-mock';
import { Reward } from '@interfaces';
import { rewardsService } from '@services';

describe('Rewards Service', () => {
	it('should "getRewards" service action works', () => {
		const testData: Reward[] = [
			{
				id: '42',
				name: 'test-reward',
				needed_points: 42,
				pictures: [],
			},
		];
		fetchMock.get('*', testData);

		const apiResult = rewardsService.getRewards().then((response) => {
			expect(response).toEqual(testData);
		});

		fetchMock.restore();
		return apiResult;
	});
});
