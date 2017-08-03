import {linkEvent} from "inferno";
import Component from "inferno-component";
import {connect} from "inferno-mobx";
import {stages} from "./stage";
import State from "./state";
import {marshal, unmarshal} from "./util";

@connect(["state"])
export default class FormComponent extends Component<{state: State}, {}> {
	render() {
		let state = this.props.state;
		let options = stages.map((stage, i) => <option value={i}>{stage.name}</option>);

		return (
			<form class="card mb-3">
				<div class="card-block">
					<div class="row">
						<div class="col-4">
							<label for="stage">Stage</label>
							<select
								class="form-control"
								id="stage"
								onChange={linkEvent(this, handleStageChange)}
							>
								{options}
							</select>
						</div>
						<div class="col">
							<label for="time">Input time</label>
							<input
								type="text"
								class="form-control"
								id="time"
								aria-describedby="time-help"
								maxlength="8"
								placeholder="00:00.00"
								value={marshal(state.frame)}
								onChange={linkEvent(this, handleTimeChange)}
								onKeyDown={linkEvent(this, handleTimeKeyDown)}
							/>
							<p id="time-help" class="form-text text-muted">
								Time when you pressed right.
								Use the Time Attack timer.
							</p>
						</div>
						<div class="col">
							<label for="input-lag">Input lag</label>
							<input
								type="number"
								class="form-control"
								id="input-lag"
								aria-describedby="input-lag-help"
								min="0"
								max="999"
								placeholder="0"
								value={state.inputLag}
								onInput={linkEvent(this, handleInputLagChange)}
							/>
							<p id="input-lag-help" class="form-text text-muted">
								Dolphin: varies, 2-4 frames
							</p>
						</div>
						<div class="col">
							<label for="kills">Enemies killed</label>
							<input
								type="number"
								class="form-control"
								id="kills"
								aria-describedby="kills-help"
								min="0"
								max="999"
								placeholder="0"
								value={state.kills}
								onInput={linkEvent(this, handleKillsChange)}
							/>
							<p id="kills-help" class="form-text text-muted">
								Only enemies that can drop items.
							</p>
						</div>
					</div>
					<div class="row">
						{state.stage.iceBlocks &&
							<div class="col-3">
								<label for="ice-blocks">Ice blocks destroyed</label>
								<input
									type="number"
									class="form-control"
									id="ice-blocks"
									min="0"
									max="999"
									placeholder="0"
									value={state.iceBlocks}
									onInput={linkEvent(this, handleIceBlocksChange)}
								/>
							</div>
						}
						{state.stage.garinkou &&
							<div class="col-3">
								<label for="garinkou">Garinkou jumps</label>
								<input
									type="number"
									class="form-control"
									id="garinkou"
									aria-describedby="garinkou-help"
									min="0"
									max="999"
									placeholder="0"
									value={state.garinkou}
									onInput={linkEvent(this, handleGarinkouChange)}
								/>
								<p id="garinkou-help" class="form-text text-muted">
									Spike jumper enemy.
									Add 1 every time this enemy jumps and is in the air.
								</p>
							</div>
						}
						{state.stage.yonbain &&
							<div class="col-3">
								<label for="yonbain">Yonbain moves</label>
								<input
									type="number"
									class="form-control"
									id="yonbain"
									aria-describedby="yonbain-help"
									min="0"
									max="999"
									placeholder="0"
									value={state.yonbain}
									onInput={linkEvent(this, handleYonbainChange)}
								/>
								<p id="yonbain-help" class="form-text text-muted">
									Eyeball enemy.
									Add 1 every time this enemy moves (not when it divides).
								</p>
							</div>
						}
					</div>
					<div class="form-check m-0">
						<label class="form-check-label">
							<input
								type="checkbox"
								class="form-check-input"
								onChange={linkEvent(this, handleShowRngChange)}
							/> Show RNG values
						</label>
					</div>
				</div>
			</form>
		);
	}
}

function handleStageChange(instance: FormComponent, event) {
	instance.props.state.stage = stages[event.target.value];
}

function handleTimeChange(instance: FormComponent, event) {
	instance.props.state.frame = unmarshal(event.target.value);
}

enum Key {
	pageUp = 33,
	pageDown = 34,
	up = 38,
	down = 40,
}

const keyValues = {
	[Key.pageUp]: 60,
	[Key.pageDown]: -60,
	[Key.up]: 1,
	[Key.down]: -1,
};

function handleTimeKeyDown(instance: FormComponent, event) {
	let value = keyValues[event.keyCode];
	if (value) {
		instance.props.state.frame += value;
		event.preventDefault();
	}
}

function handleInputLagChange(instance: FormComponent, event) {
	instance.props.state.inputLag = parseInt(event.target.value) || 0;
}

function handleKillsChange(instance: FormComponent, event) {
	instance.props.state.kills = parseInt(event.target.value) || 0;
}

function handleIceBlocksChange(instance: FormComponent, event) {
	instance.props.state.iceBlocks = parseInt(event.target.value) || 0;
}

function handleGarinkouChange(instance: FormComponent, event) {
	instance.props.state.garinkou = parseInt(event.target.value) || 0;
}

function handleYonbainChange(instance: FormComponent, event) {
	instance.props.state.yonbain = parseInt(event.target.value) || 0;
}

function handleShowRngChange(instance: FormComponent, event) {
	instance.props.state.showRng = event.target.checked;
}
