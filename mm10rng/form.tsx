import {linkEvent} from "inferno";
import {connect} from "inferno-mobx";
import {stages} from "./stage";
import {State, minFrame, minValue, maxValue} from "./state";
import {marshal, unmarshal} from "./time";

const classes = [
	"col-sm form-group",
	"col-sm-6 col-md-4 col-lg-3 form-group",
];

export const FormComponent = connect(["state"], ({state}: {state: State}) => {
	let options = stages.map((stage, i) => <option value={stage.id}>{stage.name}</option>);
	let timePlaceholder = marshal(minFrame);

	return (
		<form class="card mb-3">
			<div class="card-block">
				<div class="row">
					<div class="col-lg-5 col-xl-4 form-group">
						<label for="stage">Stage</label>
						<select
							class="form-control"
							id="stage"
							value={state.stage.id}
							onInput={linkEvent(state, handleStageChange)}
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
							maxlength={timePlaceholder.length}
							placeholder={timePlaceholder}
							value={marshal(state.frame)}
							onChange={linkEvent(state, handleTimeChange)}
							onKeyDown={linkEvent(state, handleTimeKeyDown)}
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
							min={minValue}
							max={maxValue}
							placeholder={minValue}
							value={state.kills}
							onInput={linkEvent(state, handleKillsChange)}
						/>
					</div>
					<div class={classes[0]}>
						<label for="refill-frames">
							Energy refill frames
							<div class="tip">
								<div class="card">
									<div class="card-block">
										The energy refill animation delays the background animation.
										Add 1 whenever the top pixel of energy is refilled.
										Otherwise, add 4 for every pixel.
									</div>
								</div>
							</div>
						</label>
						<input
							type="number"
							class="form-control"
							min={minValue}
							max={maxValue}
							placeholder={minValue}
							value={state.refillFrames}
							onInput={linkEvent(state, handleRefillFramesChange)}
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
								min={minValue}
								max={maxValue}
								placeholder={minValue}
								value={state.iceBlocks}
								onInput={linkEvent(state, handleIceBlocksChange)}
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
								min={minValue}
								max={maxValue}
								placeholder={minValue}
								value={state.garinkou}
								onInput={linkEvent(state, handleGarinkouChange)}
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
								min={minValue}
								max={maxValue}
								placeholder={minValue}
								value={state.yonbain}
								onInput={linkEvent(state, handleYonbainChange)}
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
								min={minValue}
								max={maxValue}
								placeholder={minValue}
								value={state.suzakFenix}
								onInput={linkEvent(state, handleSuzakFenixChange)}
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
							min={minValue}
							max={maxValue}
							placeholder={minValue}
							value={state.before}
							onInput={linkEvent(state, handleBeforeChange)}
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
							min={minValue}
							max={maxValue}
							placeholder={minValue}
							value={state.after}
							onInput={linkEvent(state, handleAfterChange)}
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
									checked={state.showRng}
									onClick={linkEvent(state, handleShowRngChange)}
								/> Show RNG values
							</label>
						</div>
					</div>
				</div>
			</div>
		</form>
	);
});

function handleStageChange(state: State, event) {
	let id = event.target.value;
	let stage = stages.find((stage) => stage.id === id);
	if (!stage) {
		throw `stage not found: ${id}`
	}
	state.stage = stage;
	state.save();
}

function handleTimeChange(state: State, event) {
	state.frame = unmarshal(event.target.value);
	state.save();
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

function handleTimeKeyDown(state: State, event) {
	let value = keyValues[event.keyCode];
	if (value) {
		state.frame += value;
		state.save();
		event.preventDefault();
	}
}

function handleKillsChange(state: State, event) {
	state.kills = parseInt(event.target.value);
	state.save();
}

function handleRefillFramesChange(state: State, event) {
	state.refillFrames = parseInt(event.target.value);
	state.save();
}

function handleIceBlocksChange(state: State, event) {
	state.iceBlocks = parseInt(event.target.value);
	state.save();
}

function handleGarinkouChange(state: State, event) {
	state.garinkou = parseInt(event.target.value);
	state.save();
}

function handleYonbainChange(state: State, event) {
	state.yonbain = parseInt(event.target.value);
	state.save();
}

function handleSuzakFenixChange(state: State, event) {
	state.suzakFenix = parseInt(event.target.value);
	state.save();
}

function handleBeforeChange(state: State, event) {
	state.before = parseInt(event.target.value);
	state.save();
}

function handleAfterChange(state: State, event) {
	state.after = parseInt(event.target.value);
	state.save();
}

function handleShowRngChange(state: State, event) {
	state.showRng = event.target.checked;
	state.save();
}
