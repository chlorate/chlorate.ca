import {suzakFenixWily2} from "./pattern";

export interface Stage {
	name: string;
	seed: number;
	iceBlocks: boolean;
	bosses: Boss[];
}

export interface Boss {
	name: string;
	setupToDoor: number;
	pattern(seed: number): string;
}

export const stages: Stage[] = [
	{
		name: "Solar Man",
		seed: 8,
		iceBlocks: false,
		bosses: [],
	},
	{
		name: "Wily Castle 2",
		seed: 10,
		iceBlocks: true,
		bosses: [
			{
				name: "Suzak & Fenix",
				setupToDoor: 70,
				pattern: suzakFenixWily2,
			},
		],
	},
];
