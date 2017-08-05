import Component from "inferno-component";
import {connect} from "inferno-mobx";
import State from "./state";

@connect(["state"])
export default class TableComponent extends Component<{state: State}, {}> {
	render() {
		let state = this.props.state;
		let result = state.result();

		let rows = result.rows.map((row) => (
			<tr>
				<td class={row.color.class}>
					{row.color.name}
				</td>
				<td>
					{row.inputTime}
				</td>
				{state.showRng &&
					<td>
						{row.inputSeed}
					</td>
				}
				<td>
					{row.doorTime}
				</td>
				{state.showRng &&
					<td>
						{row.doorSeed}
					</td>
				}
				<td class={row.pattern.grade.class}>
					{row.pattern.grade.name}: {row.pattern.name}
				</td>
			</tr>
		));

		return (
			<div class="card">
				<div class="card-block">
					<table class="table table-hover table-sm m-0 text-center">
						<thead>
							<tr>
								<th class="th-min">
									BG
								</th>
								<th class="th-small">
									Input time
								</th>
								{state.showRng &&
									<th class="th-small">
										Input RNG value
									</th>
								}
								<th class="th-small">
									Door time
									<div class="tip">
										<div class="card">
											<div class="card-block">
												The frame when the first tile of the door disappears.
											</div>
										</div>
									</div>
								</th>
								{state.showRng &&
									<th class="th-small">
										Door RNG value
									</th>
								}
								<th>
									Pattern
								</th>
							</tr>
						</thead>
						<tbody>
							{rows}
						</tbody>
					</table>
				</div>
			</div>
		);
	}
}
