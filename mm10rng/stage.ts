export interface Stage {
	name: string;
	seed: number;
	iceBlocks: boolean;
}

export const stages: Stage[] = [
	{
		name: "Solar Man",
		seed: 8,
		iceBlocks: false,
	},
	{
		name: "Wily Castle 2",
		seed: 10,
		iceBlocks: true,
	},
];
