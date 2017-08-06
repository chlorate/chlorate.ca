import {Grade, grades} from "./grade";
import {random} from "./math";

export interface Pattern {
	name: string;
	grade: Grade;
}

const patternBit = 0x10000;

const doorToAttack = 221;
const horizToAttack = 196;
const vertToAttack = 127; // 123 if you don't kill a bird.

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
				grade: grades.bad,
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

export function crabPuncher(seed: number): Pattern {
	const counterMask = 0x7fff0000;
	const doorToSpawn = 312;
	const spawnToAttack = 504;

	seed = random(seed, doorToSpawn);

	// Boss spawns before energy fills up. It randomly picks a number n from
	// 0 to 2 and then stores (1+n)*120. This is used as a counter that counts
	// down every frame during the fight. When it reaches 0, it generates a new
	// counter value. If n=0, the counter actually ends 2 frames before the crab
	// chooses its first attack. So sometimes there is an extra RNG call. Also
	// seems to be what causes the eye twitch pattern.
	//
	// Does something randomly happen every 2, 4, or 6 seconds in the crab
	// fight? Hard mode?
	let counter = ((seed & counterMask) >> 16) % 3;
	if (!counter) {
		seed = random(seed);
	}

	seed = random(seed, spawnToAttack);
	if (seed & patternBit) {
		return {
			name: "bubbles",
			grade: grades.bad,
		};
	}
	if (!counter) {
		return {
			name: "eye twitch, punches",
			grade: grades.good,
		};
	}
	return {
		name: "punches",
		grade: grades.best,
	};
}
