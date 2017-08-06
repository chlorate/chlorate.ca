import {observable} from "mobx";
import {Color} from "./background";
import {grades} from "./grade";
import {clamp, random, toHexString} from "./math";
import {Pattern} from "./pattern";
import {Stage, stages} from "./stage";
import {marshal} from "./time";

export const minFrame = 1;
export const maxFrame = 359999;
export const minValue = 0;
export const maxValue = 999;

export class State {
	@observable stage: Stage;
	@observable private _frame: number;
	@observable private _before: number;
	@observable private _after: number;
	@observable private _kills: number;
	@observable private _iceBlocks: number;
	@observable private _garinkou: number;
	@observable private _yonbain: number;
	@observable private _suzakFenix: number;
	@observable showRng: boolean;

	constructor() {
		this.stage = stages[0];
		this.frame = minFrame;
		this.before = 0;
		this.after = 60;
		this.kills = 0;
		this.iceBlocks = 0;
		this.garinkou = 0;
		this.yonbain = 0;
		this.suzakFenix = 2;
		this.showRng = false;
	}

	get frame(): number { return this._frame; }
	set frame(n: number) { this._frame = clamp(n, minFrame, maxFrame); }

	get before(): number { return this._before; }
	set before(n: number) { this._before = clamp(n, minValue, maxValue); }

	get after(): number { return this._after; }
	set after(n: number) { this._after = clamp(n, minValue, maxValue); }

	get kills(): number { return this._kills; }
	set kills(n: number) { this._kills = clamp(n, minValue, maxValue); }

	get iceBlocks(): number { return this._iceBlocks; }
	set iceBlocks(n: number) { this._iceBlocks = clamp(n, minValue, maxValue); }

	get garinkou(): number { return this._garinkou; }
	set garinkou(n: number) { this._garinkou = clamp(n, minValue, maxValue); }

	get yonbain(): number { return this._yonbain; }
	set yonbain(n: number) { this._yonbain = clamp(n, minValue, maxValue); }

	get suzakFenix(): number { return this._suzakFenix; }
	set suzakFenix(n: number) { this._suzakFenix = clamp(n, minValue, maxValue); }

	result(): Result {
		let result: Result = {
			rows: [],
			gradeCounts: {},
		};

		let startFrame = Math.max(minFrame, this.frame - this.before);
		let endFrame = Math.min(maxFrame, this.frame + this.after);

		let extraIterations = this.kills;
		if (this.stage.iceBlocks) {
			extraIterations += this.iceBlocks * 8;
		}
		if (this.stage.garinkou) {
			extraIterations += this.garinkou;
		}
		if (this.stage.yonbain) {
			extraIterations += this.yonbain * 2;
		}
		if (this.stage.suzakFenix) {
			extraIterations += this.suzakFenix;
		}
		let seed = random(this.stage.seed, 1 + startFrame + extraIterations);

		for (let frame = startFrame; frame <= endFrame; frame++) {
			let doorSeed = random(seed, this.stage.setupToDoor);
			result.rows.push({
				color: this.stage.background.colorAt(frame),
				inputTime: marshal(frame),
				inputSeed: toHexString(seed),
				doorTime: marshal(frame + this.stage.setupToDoor),
				doorSeed: toHexString(doorSeed),
				pattern: this.stage.pattern(doorSeed),
			});
			seed = random(seed);
		}

		let gradeKeys = Object.keys(grades);
		gradeKeys.forEach((key) => result.gradeCounts[key] = 0);
		result.rows.forEach((row) => {
			let key = gradeKeys.find((key) => grades[key] === row.pattern.grade);
			if (!key) {
				throw "grade not found";
			}
			result.gradeCounts[key]++;
		});

		return result;
	}
}

export interface Result {
	rows: Row[];
	gradeCounts: {[key: string]: number};
}

interface Row {
	color: Color;
	inputTime: string;
	inputSeed: string;
	doorTime: string;
	doorSeed: string;
	pattern: Pattern;
}
