import {Background, backgrounds} from "./background";
import {Pattern, crabPuncher, suzakFenixSolar, suzakFenixWily2} from "./pattern";

export interface Stage {
	id: string;
	name: string;
	seed: number;
	background: Background,
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
		id: "solar-birds",
		name: "Solar Man - Suzak & Fenix",
		seed: stageSeeds.solar,
		background: backgrounds.solar,
		iceBlocks: false,
		garinkou: false,
		yonbain: true,
		suzakFenix: false,
		setupToDoor: 151,
		pattern: suzakFenixSolar,
	},
	{
		id: "wily2-birds",
		name: "Wily Castle 2 - Suzak & Fenix",
		seed: stageSeeds.wily2,
		background: backgrounds.wily2,
		iceBlocks: true,
		garinkou: true,
		yonbain: false,
		suzakFenix: false,
		setupToDoor: 68,
		pattern: suzakFenixWily2,
	},
	{
		id: "wily2-crab",
		name: "Wily Castle 2 - Crab Puncher",
		seed: stageSeeds.wily2,
		background: backgrounds.wily2,
		iceBlocks: true,
		garinkou: true,
		yonbain: false,
		suzakFenix: true,
		setupToDoor: 71,
		pattern: crabPuncher,
	},
];
