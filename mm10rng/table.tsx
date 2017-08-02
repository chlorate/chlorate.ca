import Component from "inferno-component";
import {connect} from "inferno-mobx";
import State from "./state";
import {marshal, pad, random} from "./util";

@connect(["state"])
export default class TableComponent extends Component<{state: State}, {}> {
	render() {
		let state = this.props.state;

		let effectiveFrame = state.frame + state.kills;
		if (state.stage.iceBlocks) {
			effectiveFrame += state.iceBlocks * 8;
		}

		let rows: any[] = [];
		let seed = random(state.stage.seed, effectiveFrame);
		for (let i = 0; i < 60; i++) {
			rows.push(
				<tr>
					<td>{marshal(state.frame + i)}</td>
					<td>{pad(seed.toString(16), 8)}</td>
				</tr>
			);
			seed = random(seed);
		}

		return (
			<div class="card">
				<div class="card-block">
					<table class="table table-hover table-sm m-0">
						<thead>
							<tr>
								<th>Time</th>
								<th>RNG value</th>
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
