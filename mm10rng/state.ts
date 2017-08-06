import {observable} from "mobx";
import {format, parse} from "url";
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

interface Query {
	stage?: string;
	frame?: string;
	before?: string;
	after?: string;
	kills?: string;
	refill?: string;
	ice?: string;
	garinkou?: string;
	yonbain?: string;
	birds?: string;
	rng?: string;
}

export class State {
	@observable stage: Stage;
	@observable private _frame: number;
	@observable private _before: number;
	@observable private _after: number;
	@observable private _refillFrames: number;
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
		this.refillFrames = 0;
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

	get refillFrames(): number { return this._refillFrames; }
	set refillFrames(n: number) { this._refillFrames = clamp(n, minValue, maxValue); }

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

	save() {
		let query: Query = {
			stage: this.stage.id,
		};
		if (this.frame > minFrame) {
			query.frame = this.frame.toString();
		}
		if (this.before) {
			query.before = this.before.toString();
		}
		if (this.after) {
			query.after = this.after.toString();
		}
		if (this.kills) {
			query.kills = this.kills.toString();
		}
		if (this.refillFrames) {
			query.refill = this.refillFrames.toString();
		}
		if (this.stage.iceBlocks && this.iceBlocks) {
			query.ice = this.iceBlocks.toString();
		}
		if (this.stage.garinkou && this.garinkou) {
			query.garinkou = this.garinkou.toString();
		}
		if (this.stage.yonbain && this.yonbain) {
			query.yonbain = this.yonbain.toString();
		}
		if (this.stage.suzakFenix && this.suzakFenix) {
			query.birds = this.suzakFenix.toString();
		}
		if (this.showRng) {
			query.rng = "1";
		}

		let url = parse(window.location.href);
		url.search = undefined;
		url.query = query;
		window.history.replaceState(null, "", format(url));
	}

	load() {
		let query: Query = parse(window.location.href, true).query;
		let stage = stages.find((stage) => stage.id === query.stage);
		if (stage) {
			this.stage = stage;
		}
		if (query.frame) {
			this.frame = parseInt(query.frame);
		}
		if (query.before) {
			this.before = parseInt(query.before);
		}
		if (query.after) {
			this.after = parseInt(query.after);
		}
		if (query.kills) {
			this.kills = parseInt(query.kills);
		}
		if (query.refill) {
			this.refillFrames = parseInt(query.refill);
		}
		if (query.ice) {
			this.iceBlocks = parseInt(query.ice);
		}
		if (query.garinkou) {
			this.garinkou = parseInt(query.garinkou);
		}
		if (query.yonbain) {
			this.yonbain = parseInt(query.yonbain);
		}
		if (query.birds) {
			this.suzakFenix = parseInt(query.birds);
		}
		if (query.rng) {
			this.showRng = query.rng === "1";
		}
	}

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
				color: this.stage.background.colorAt(frame - this.refillFrames),
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
