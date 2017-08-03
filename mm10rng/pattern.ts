import {random} from "./util";
import {Grade, grades} from "./grade";

export interface Pattern {
	name: string;
	grade: Grade;
}

const patternBit = 0x10000;
const doorToAttack = 221;
const horizToAttack = 196;
const vertToAttack = 123;

export function suzakFenixSolar(seed: number): Pattern {
	seed = random(seed, doorToAttack);
	if (seed & patternBit) {
		seed = random(seed, horizToAttack);
		if (seed & patternBit) {
			return {
				name: "horizontal, horizontal",
				grade: grades.bad,
			};
		}
		seed = random(seed, vertToAttack)
		if (seed & patternBit) {
			return {
				name: "horizontal, vertical, horizontal",
				grade: grades.best,
			};
		}
		return {
			name: "horizontal, vertical, vertical (fake out)",
			grade: grades.good,
		};
	}
	return {
		name: "vertical, horizontal",
		grade: grades.bad,
	};
}

export function suzakFenixWily2(seed: number): Pattern {
	seed = random(seed, doorToAttack);
	if (seed & patternBit) {
		seed = random(seed, horizToAttack);
		if (seed & patternBit) {
			return {
				name: "horizontal, horizontal",
				grade: grades.worst,
			};
		}
		return {
			name: "horizontal, vertical",
			grade: grades.best,
		};
	}
	return {
		name: "vertical, horizontal",
		grade: grades.good,
	};
}
