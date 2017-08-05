import {observable} from "mobx";
import {Color} from "./background";
import {Pattern} from "./pattern";
import {Stage, stages} from "./stage";
import {marshal, pad, random} from "./util";

export default class State {
	@observable stage: Stage;
	@observable private _frame: number;
	@observable private _kills: number;
	@observable private _inputLag: number;
	@observable private _iceBlocks: number;
	@observable private _garinkou: number;
	@observable private _yonbain: number;
	@observable private _suzakFenix: number;
	@observable showRng: boolean;
	@observable private _before: number;
	@observable private _after: number;

	constructor() {
		this.stage = stages[0];
		this.frame = 1;
		this.kills = 0;
		this.inputLag = 0;
		this.iceBlocks = 0;
		this.garinkou = 0;
		this.yonbain = 0;
		this.suzakFenix = 2;
		this.showRng = false;
		this.before = 0;
		this.after = 60;
	}

	get frame(): number { return this._frame; }
	set frame(n: number) { this._frame = Math.max(n, 1); }

	get kills(): number { return this._kills; }
	set kills(n: number) { this._kills = Math.min(Math.max(n, 0), 999); }

	get inputLag(): number { return this._inputLag; }
	set inputLag(n: number) { this._inputLag = Math.min(Math.max(n, 0), 999); }

	get iceBlocks(): number { return this._iceBlocks; }
	set iceBlocks(n: number) { this._iceBlocks = Math.min(Math.max(n, 0), 999); }

	get garinkou(): number { return this._garinkou; }
	set garinkou(n: number) { this._garinkou = Math.min(Math.max(n, 0), 999); }

	get yonbain(): number { return this._yonbain; }
	set yonbain(n: number) { this._yonbain = Math.min(Math.max(n, 0), 999); }

	get suzakFenix(): number { return this._suzakFenix; }
	set suzakFenix(n: number) { this._suzakFenix = Math.min(Math.max(n, 0), 999); }

	get before(): number { return this._before; }
	set before(n: number) { this._before = Math.min(Math.max(n, 0), 999); }

	get after(): number { return this._after; }
	set after(n: number) { this._after = Math.min(Math.max(n, 0), 999); }

	result(): Result {
		let result: Result = {
			rows: [],
		};

		let startFrame = Math.max(1, this.frame - this.before);
		let endFrame = this.frame + this.after;

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
			let doorSeed = random(seed, this.inputLag + this.stage.setupToDoor);
			result.rows.push({
				color: this.stage.background.colorAt(frame),
				inputTime: marshal(frame),
				inputSeed: pad(seed.toString(16), 8),
				doorTime: marshal(frame + this.inputLag + this.stage.setupToDoor),
				doorSeed: pad(doorSeed.toString(16), 8),
				pattern: this.stage.pattern(doorSeed),
			});
			seed = random(seed);
		}

		return result;
	}
}

interface Result {
	rows: Row[];
}

interface Row {
	color: Color;
	inputTime: string;
	inputSeed: string;
	doorTime: string;
	doorSeed: string;
	pattern: Pattern;
}
