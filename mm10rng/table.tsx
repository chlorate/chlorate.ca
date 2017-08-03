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
		if (state.stage.garinkou) {
			effectiveFrame += state.garinkou;
		}
		if (state.stage.yonbain) {
			effectiveFrame += state.yonbain * 2;
		}

		let rows: any[] = [];
		let seed = random(state.stage.seed, effectiveFrame);
		for (let i = 0; i < 60; i++) {
			let doorSeed = random(seed, state.inputLag + state.stage.setupToDoor);
			let pattern = state.stage.pattern(doorSeed);
			rows.push(
				<tr>
					<td>
						{marshal(state.frame + i)}
					</td>
					{state.showRng &&
						<td>
							{pad(seed.toString(16), 8)}
						</td>
					}
					<td>
						{marshal(state.frame + i + state.inputLag + state.stage.setupToDoor)}
					</td>
					{state.showRng &&
						<td>
							{pad(doorSeed.toString(16), 8)}
						</td>
					}
					<td class={pattern.grade.class}>
						{pattern.grade.name}: {pattern.name}
					</td>
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
								<th class="th-small">Input time</th>
								{state.showRng &&
									<th class="th-small">Input RNG value</th>
								}
								<th class="th-small">Door time</th>
								{state.showRng &&
									<th class="th-small">Door RNG value</th>
								}
								<th>Pattern</th>
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
