import {linkEvent} from "inferno";
import {connect} from "inferno-mobx";
import {stages} from "./stage";
import {State} from "./state";
import {marshal, unmarshal} from "./util";

const classes = [
	"col-sm form-group",
	"col-sm-6 col-md-4 col-lg-3 form-group",
];

export const FormComponent = connect(["state"], ({state}: {state: State}) => {
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
							onChange={linkEvent(state, handleStageChange)}
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
							min="0"
							max="999"
							placeholder="0"
							value={state.kills}
							onInput={linkEvent(state, handleKillsChange)}
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
								min="0"
								max="999"
								placeholder="0"
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
								min="0"
								max="999"
								placeholder="0"
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
								min="0"
								max="999"
								placeholder="0"
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
							min="0"
							max="999"
							placeholder="0"
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
							min="0"
							max="999"
							placeholder="0"
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
									onChange={linkEvent(state, handleShowRngChange)}
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
	state.stage = stages[event.target.value];
}

function handleTimeChange(state: State, event) {
	state.frame = unmarshal(event.target.value);
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
		event.preventDefault();
	}
}

function handleKillsChange(state: State, event) {
	state.kills = parseInt(event.target.value) || 0;
}

function handleIceBlocksChange(state: State, event) {
	state.iceBlocks = parseInt(event.target.value) || 0;
}

function handleGarinkouChange(state: State, event) {
	state.garinkou = parseInt(event.target.value) || 0;
}

function handleYonbainChange(state: State, event) {
	state.yonbain = parseInt(event.target.value) || 0;
}

function handleSuzakFenixChange(state: State, event) {
	state.suzakFenix = parseInt(event.target.value) || 0;
}

function handleShowRngChange(state: State, event) {
	state.showRng = event.target.checked;
}

function handleBeforeChange(state: State, event) {
	state.before = parseInt(event.target.value) || 0;
}

function handleAfterChange(state: State, event) {
	state.after = parseInt(event.target.value) || 0;
}
