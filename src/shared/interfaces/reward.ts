export type Reward = {
	id: string;
	name: string;
	needed_points: number;
	pictures: Picture[];
};

type Picture = {
	image: string;
	order: number;
	type: string | null;
};
