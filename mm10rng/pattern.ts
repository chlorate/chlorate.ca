import {random} from "./util";
import {Grade, grades} from "./grade";

export interface Pattern {
	name: string;
	grade: Grade;
}

enum SuzakFenixPatternName {
	hh = "horizontal, horizontal",
	hv = "horizontal, vertical",
	vh = "vertical, horizontal",
}

const suzakFenixWily2Grades = {
	[SuzakFenixPatternName.hh]: grades.worst,
	[SuzakFenixPatternName.hv]: grades.best,
	[SuzakFenixPatternName.vh]: grades.good,
};

export function suzakFenixWily2(seed: number): Pattern {
	let name = suzakFenix(seed);
	return {
		grade: suzakFenixWily2Grades[name],
		name: name,
	};
}

function suzakFenix(seed: number): string {
	const patternBit = 0x10000;
	const doorToAttack = 221;
	const horizToAttack = 196;

	seed = random(seed, doorToAttack);
	if (seed & patternBit) {
		seed = random(seed, horizToAttack);
		if (seed & patternBit) {
			return SuzakFenixPatternName.hh;
		}
		return SuzakFenixPatternName.hv;
	}
	return SuzakFenixPatternName.vh;
}
