import {observable} from "mobx";
import {Stage, stages} from "./stage";

export default class State {
	@observable stage: Stage;
	@observable frame: number;
	@observable kills: number;
	@observable iceBlocks: number;

	constructor() {
		this.stage = stages[0];
		this.frame = 0;
		this.kills = 0;
		this.iceBlocks = 0;
	}
}
