import Component from "inferno-component";
import stages from "./stages";

export default class FormComponent extends Component<any, any> {
	render() {
		var options = stages.map((stage, i) => <option value={i}>{stage.name}</option>);

		return (
			<form class="card">
				<div class="card-block">
					<div class="form-group">
						<label for="stage">Stage</label>
						<select class="form-control" id="stage">
							{options}
						</select>
					</div>
					<div class="form-group">
						<label for="time">Time</label>
						<input type="text" class="form-control" id="time" placeholder="00:00:00" aria-describedby="time-help" />
						<p id="time-help" class="form-text text-muted">
							According to the Time Attack timer.
						</p>
					</div>
					<div class="form-group">
						<label for="kills">Enemies killed</label>
						<input type="number" class="form-control" id="kills" min="0" max="999" placeholder="0" />
						<p id="kills-help" class="form-text text-muted">
							Only count enemies that can drop items.
						</p>
					</div>
					<div class="form-group">
						<label for="ice-blocks">Ice blocks destroyed</label>
						<input type="number" class="form-control" id="ice-blocks" min="0" max="999" placeholder="0" />
					</div>
				</div>
			</form>
		);
	}
}
