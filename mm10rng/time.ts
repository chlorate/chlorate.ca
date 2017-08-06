import {pad} from "./math";
import {minFrame} from "./state";

const framesToHundredths = [0, 1, 3, 5, 6, 8];
const hundredthsToFrames = [0, 1, 1, 2, 2, 3, 4, 4, 5, 5];

export function marshal(frame: number): string {
	let minutes = Math.floor(frame / 3600);
	let seconds = Math.floor((frame % 3600) / 60);
	let tenths = Math.floor((frame % 60) / 6);
	let hundredths = framesToHundredths[frame % 6];
	return pad(minutes, 2) + ":" + pad(seconds, 2) + "." + tenths + hundredths;
}

export function unmarshal(time: string): number {
	let result = /^(?:(\d{1,2}):)?([0-5]?\d)(?:[:.](\d)(\d)?)?$/.exec(time);
	if (!result) {
		return minFrame;
	}

	let minutes = parseInt(result[1]) || 0;
	let seconds = parseInt(result[2]);
	let tenths = parseInt(result[3]) || 0;
	let hundredths = hundredthsToFrames[result[4]] || 0;
	return minutes * 3600 + seconds * 60 + tenths * 6 + hundredths;
}
