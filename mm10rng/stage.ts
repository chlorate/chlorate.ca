import {Pattern, crabPuncher, suzakFenixSolar, suzakFenixWily2} from "./pattern";

export interface Stage {
	name: string;
	seed: number;
	iceBlocks: boolean;
	garinkou: boolean;
	yonbain: boolean;
	suzakFenix: boolean;
	setupToDoor: number;
	pattern(seed: number): Pattern;
}

const stageSeeds = {
	solar: 8,
	wily2: 10,
};

export const stages: Stage[] = [
	{
		name: "Solar Man - Suzak & Fenix",
		seed: stageSeeds.solar,
		iceBlocks: false,
		garinkou: false,
		yonbain: true,
		suzakFenix: false,
		setupToDoor: 151,
		pattern: suzakFenixSolar,
	},
	{
		name: "Wily Castle 2 - Suzak & Fenix",
		seed: stageSeeds.wily2,
		iceBlocks: true,
		garinkou: true,
		yonbain: false,
		suzakFenix: false,
		setupToDoor: 68,
		pattern: suzakFenixWily2,
	},
	{
		name: "Wily Castle 2 - Crab Puncher",
		seed: stageSeeds.wily2,
		iceBlocks: true,
		garinkou: true,
		yonbain: false,
		suzakFenix: true,
		setupToDoor: 71,
		pattern: crabPuncher,
	},
];
