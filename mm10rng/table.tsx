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
		if (state.stage.yonbain) {
			effectiveFrame += state.yonbain * 2;
		}

		let rows: any[] = [];
		let seed = random(state.stage.seed, effectiveFrame);
		for (let i = 0; i < 60; i++) {
			let cells: any[] = [
				<td>{marshal(state.frame + i)}</td>,
				<td>{pad(seed.toString(16), 8)}</td>
			];
			state.stage.bosses.forEach((boss) => {
				let doorSeed = random(seed, state.inputLag + boss.setupToDoor);
				let pattern = boss.pattern(doorSeed);
				cells.push(
					<td>
						{marshal(state.frame + i + state.inputLag + boss.setupToDoor)}
					</td>,
					<td class={pattern.grade.class}>
						{pattern.grade.name}: {pattern.name}
					</td>
				)
			});

			rows.push(<tr>{cells}</tr>);
			seed = random(seed);
		}

		let cells: any[] = [
			<th class="th-small">Input time</th>,
			<th class="th-small">RNG value</th>
		];
		state.stage.bosses.forEach((boss) => {
			cells.push(
				<th class="th-small">Door time</th>,
				<th>{boss.name}</th>
			);
		});

		return (
			<div class="card">
				<div class="card-block">
					<table class="table table-hover table-sm m-0">
						<thead>
							<tr>
								{cells}
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
