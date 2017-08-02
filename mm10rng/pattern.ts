import {random} from "./util";

enum SuzakFenixPatterns {
	hh = "horizontal, horizontal",
	hv = "horizontal, vertical",
	vh = "vertical, horizontal"
}

export function suzakFenixWily2(seed: number): string {
	let pattern = suzakFenix(seed);
	switch (pattern) {
		case SuzakFenixPatterns.hv:
			return "Best: " + pattern;
		case SuzakFenixPatterns.vh:
			return "Good: " + pattern;
		case SuzakFenixPatterns.hh:
			return "Bad: " + pattern;
		default:
			return pattern;
	}
}

function suzakFenix(seed: number): string {
	const patternBit = 0x10000;
	const doorToAttack = 221;
	const horizToAttack = 196;

	seed = random(seed, doorToAttack);
	if (seed & patternBit) {
		seed = random(seed, horizToAttack);
		if (seed & patternBit) {
			return SuzakFenixPatterns.hh;
		}
		return SuzakFenixPatterns.hv;
	}
	return SuzakFenixPatterns.vh;
}
