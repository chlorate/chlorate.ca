export function clamp(n: number, min: number, max: number): number {
	return (n < min ? min : (n > max ? max : n)) || min;
}

export function toHexString(n: number): string {
	return pad(n.toString(16), 8);
}

export function pad(n: number | string, digits: number): string {
	let out = `${n}`;
	while (out.length < digits) {
		out = `0${out}`;
	}
	return out;
}

export function random(seed: number, iterations?: number): number {
	if (iterations === undefined) {
		iterations = 1;
	}
	for (let i = 0; i < iterations; i++) {
		seed = (seed * 0x343fd + 0x269EC3) & 0x7fffffff;
	}
	return seed;
}
