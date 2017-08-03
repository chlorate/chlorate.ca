import {observable} from "mobx";
import {Stage, stages} from "./stage";

export default class State {
	@observable stage: Stage;
	@observable private _frame: number;
	@observable private _kills: number;
	@observable private _inputLag: number;
	@observable private _iceBlocks: number;
	@observable private _garinkou: number;
	@observable private _yonbain: number;
	@observable showRng: boolean;

	constructor() {
		this.stage = stages[0];
		this.frame = 1;
		this.kills = 0;
		this.inputLag = 0;
		this.iceBlocks = 0;
		this.garinkou = 0;
		this.yonbain = 0;
		this.showRng = false;
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
}
