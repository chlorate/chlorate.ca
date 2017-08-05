import {linkEvent} from "inferno";
import Component from "inferno-component";
import {connect} from "inferno-mobx";
import {stages} from "./stage";
import {State} from "./state";
import {marshal, unmarshal} from "./util";

const classes = [
	"col-sm form-group",
	"col-sm-6 col-md-4 col-lg-3 form-group",
];

@connect(["state"])
export class FormComponent extends Component<{state: State}, {}> {
	render() {
		let state = this.props.state;
		let options = stages.map((stage, i) => <option value={i}>{stage.name}</option>);

		return (
			<form class="card mb-3">
				<div class="card-block">
					<div class="row">
						<div class="col-lg-5 col-xl-4 form-group">
							<label for="stage">Stage</label>
							<select
								class="form-control"
								id="stage"
								onChange={linkEvent(this, handleStageChange)}
							>
								{options}
							</select>
						</div>
						<div class={classes[0]}>
							<label for="time">
								Input time
								<div class="tip">
									<div class="card">
										<div class="card-block">
											<p>
												According to the Time Attack timer.
											</p>
											<p class="m-0">
												If you're in position for a manipulation, then this is the frame when you press right.
											</p>
										</div>
									</div>
								</div>
							</label>
							<input
								type="text"
								class="form-control"
								id="time"
								maxlength="8"
								placeholder="00:00.01"
								value={marshal(state.frame)}
								onChange={linkEvent(this, handleTimeChange)}
								onKeyDown={linkEvent(this, handleTimeKeyDown)}
							/>
						</div>
						<div class={classes[0]}>
							<label for="input-lag">
								Input lag
								<div class="tip">
									<div class="card">
										<div class="card-block">
											Dolphin input lag varies between 2 to 4 frames.
										</div>
									</div>
								</div>
							</label>
							<input
								type="number"
								class="form-control"
								id="input-lag"
								min="0"
								max="999"
								placeholder="0"
								value={state.inputLag}
								onInput={linkEvent(this, handleInputLagChange)}
							/>
						</div>
						<div class={classes[0]}>
							<label for="kills">
								Enemies killed
								<div class="tip">
									<div class="card">
										<div class="card-block">
											Only count enemies that can drop items.
										</div>
									</div>
								</div>
							</label>
							<input
								type="number"
								class="form-control"
								id="kills"
								min="0"
								max="999"
								placeholder="0"
								value={state.kills}
								onInput={linkEvent(this, handleKillsChange)}
							/>
						</div>
					</div>
					<div class="row">
						{state.stage.iceBlocks &&
							<div class={classes[1]}>
								<label for="ice-blocks">
									Ice blocks destroyed
								</label>
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
							<div class={classes[1]}>
								<label for="garinkou">
									Garinkou jumps
									<div class="tip">
										<div class="card">
											<div class="card-block">
												Spike jumper enemy.
												Add 1 every time this enemy jumps.
												A new jump begins 9 frames after it has landed.
											</div>
										</div>
									</div>
								</label>
								<input
									type="number"
									class="form-control"
									id="garinkou"
									min="0"
									max="999"
									placeholder="0"
									value={state.garinkou}
									onInput={linkEvent(this, handleGarinkouChange)}
								/>
							</div>
						}
						{state.stage.yonbain &&
							<div class={classes[1]}>
								<label for="yonbain">
									Yonbain moves
									<div class="tip">
										<div class="card">
											<div class="card-block">
												Eyeball enemy.
												Add 1 every time this enemy moves towards you (not counting when it divides).
											</div>
										</div>
									</div>
								</label>
								<input
									type="number"
									class="form-control"
									id="yonbain"
									min="0"
									max="999"
									placeholder="0"
									value={state.yonbain}
									onInput={linkEvent(this, handleYonbainChange)}
								/>
							</div>
						}
						{state.stage.suzakFenix &&
							<div class={classes[1]}>
								<label for="suzak-fenix">
									Suzak & Fenix moves
									<div class="tip">
										<div class="card">
											<div class="card-block">
												The number of times Suzak & Fenix move.
												2 unless you get a bad kill.
											</div>
										</div>
									</div>
								</label>
								<input
									type="number"
									class="form-control"
									id="suzak-fenix"
									min="0"
									max="999"
									placeholder="0"
									value={state.suzakFenix}
									onInput={linkEvent(this, handleSuzakFenixChange)}
								/>
							</div>
						}
					</div>
					<div class="row">
						<div class="col form-inline">
							<label for="before" class="sr-only">
								Frames shown before input time
							</label>
							<p class="form-control-static mr-2">
								Show
							</p>
							<input
								type="number"
								class="form-control mr-2"
								id="before"
								min="0"
								max="999"
								placeholder="0"
								value={state.before}
								onInput={linkEvent(this, handleBeforeChange)}
							/>
							<p class="form-control-static mr-2">
								frame{state.before === 1 ? "" : "s"} before and
							</p>
							<label for="after" class="sr-only">
								Frames shown after input time
							</label>
							<input
								type="number"
								class="form-control mr-2"
								id="after"
								min="0"
								max="999"
								placeholder="0"
								value={state.after}
								onInput={linkEvent(this, handleAfterChange)}
							/>
							<p class="form-control-static mr-2">
								frame{state.after === 1 ? "": "s"} after input time.
							</p>
						</div>
						<div class="col-lg-3 form-inline justify-content-end">
							<div class="form-check">
								<label class="form-check-label">
									<input
										type="checkbox"
										class="form-check-input"
										onChange={linkEvent(this, handleShowRngChange)}
									/> Show RNG values
								</label>
							</div>
						</div>
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

function handleSuzakFenixChange(instance: FormComponent, event) {
	instance.props.state.suzakFenix = parseInt(event.target.value) || 0;
}

function handleShowRngChange(instance: FormComponent, event) {
	instance.props.state.showRng = event.target.checked;
}

function handleBeforeChange(instance: FormComponent, event) {
	instance.props.state.before = parseInt(event.target.value) || 0;
}

function handleAfterChange(instance: FormComponent, event) {
	instance.props.state.after = parseInt(event.target.value) || 0;
}
