import {Pattern, suzakFenixSolar, suzakFenixWily2} from "./pattern";

export interface Stage {
	name: string;
	seed: number;
	iceBlocks: boolean;
	yonbain: boolean;
	bosses: Boss[];
}

export interface Boss {
	name: string;
	setupToDoor: number;
	pattern(seed: number): Pattern;
}

export const stages: Stage[] = [
	{
		name: "Solar Man",
		seed: 8,
		iceBlocks: false,
		yonbain: true,
		bosses: [
			{
				name: "Suzak & Fenix",
				setupToDoor: 151,
				pattern: suzakFenixSolar,
			},
		],
	},
	{
		name: "Wily Castle 2",
		seed: 10,
		iceBlocks: true,
		yonbain: false,
		bosses: [
			{
				name: "Suzak & Fenix",
				setupToDoor: 68,
				pattern: suzakFenixWily2,
			},
		],
	},
];
