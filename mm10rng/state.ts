import {observable} from "mobx";
import {Stage, stages} from "./stage";

export default class State {
	@observable stage: Stage;
	@observable frame: number;
	@observable kills: number;
	@observable inputLag: number;
	@observable iceBlocks: number;
	@observable yonbain: number;

	constructor() {
		this.stage = stages[0];
		this.frame = 1;
		this.kills = 0;
		this.inputLag = 0;
		this.iceBlocks = 0;
		this.yonbain = 0;
	}
}
