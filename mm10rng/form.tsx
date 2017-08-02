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
						<div class="col-3">
							<label for="stage">Stage</label>
							<select
								class="form-control"
								id="stage"
								onChange={linkEvent(this, handleStageChange)}
							>
								{options}
							</select>
						</div>
						<div class="col-3">
							<label for="time">Time</label>
							<input
								type="text"
								class="form-control"
								id="time"
								aria-describedby="time-help"
								placeholder="00:00.00"
								value={marshal(state.frame)}
								onChange={linkEvent(this, handleTimeChange)}
							/>
							<p id="time-help" class="form-text text-muted">
								Use the Time Attack timer.
							</p>
						</div>
						<div class="col-3">
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
					</div>
				</div>
			</form>
		);
	}
}

function handleTimeChange(instance: FormComponent, event) {
	instance.props.state.frame = unmarshal(event.target.value);
}

function handleStageChange(instance: FormComponent, event) {
	instance.props.state.stage = stages[event.target.value];
}

function handleKillsChange(instance: FormComponent, event) {
	instance.props.state.kills = parseInt(event.target.value);
}

function handleIceBlocksChange(instance: FormComponent, event) {
	instance.props.state.iceBlocks = parseInt(event.target.value);
}
