const framesToHundredths = [0, 1, 3, 5, 6, 8];
const hundredthsToFrames = [0, 1, 1, 2, 2, 3, 4, 4, 5, 5];

export function unmarshal(time: string): number {
	let result = /^(?:(\d{1,2}):)?([0-5]?\d)(?:[:.](\d)(\d)?)?$/.exec(time);
	if (!result) {
		return 1;
	}

	let minutes = parseInt(result[1]) || 0;
	let seconds = parseInt(result[2]);
	let tenths = parseInt(result[3]) || 0;
	let hundredths = hundredthsToFrames[result[4]] || 0;
	return minutes * 3600 + seconds * 60 + tenths * 6 + hundredths + 1;
}

export function marshal(frame: number): string {
	frame--;
	var minutes = Math.floor(frame / 3600);
	var seconds = Math.floor((frame % 3600) / 60);
	var tenths = Math.floor((frame % 60) / 6);
	var hundredths = framesToHundredths[frame % 6];
	return pad(minutes, 2) + ":" + pad(seconds, 2) + "." + tenths + hundredths;
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

export function pad(n: any, digits: number): string {
	let out = n + "";
	while (out.length < digits) {
		out = "0" + out;
	}
	return out;
}

