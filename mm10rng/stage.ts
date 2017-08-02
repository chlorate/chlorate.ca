import {random} from "./util";

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
				pattern: suzakAndFenix,
			},
		],
	},
];

function suzakAndFenix(seed: number): string {
	const patternBit = 0x10000;
	const doorToAttack = 221;
	const horizToAttack = 196;

	seed = random(seed, doorToAttack);
	if (seed & patternBit) {
		seed = random(seed, horizToAttack);
		if (seed & patternBit) {
			return "horizontal, horizontal";
		}
		return "horizontal, vertical";
	}
	return "vertical, horizontal";
}
