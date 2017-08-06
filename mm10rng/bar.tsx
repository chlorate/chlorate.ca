import {grades, orderedGrades} from "./grade";
import {Result} from "./state";

export function BarComponent({result}: {result: Result}) {
	let bars: any[] = [];
	orderedGrades.forEach(key => {
		let percent = result.gradeCounts[key] / result.rows.length * 100;
		if (percent) {
			bars.push(
				<div
					class={`progress-bar bg-${grades[key].state}`}
					style={`width: ${percent}%`}
				>
					{grades[key].name}: {result.gradeCounts[key]} ({Math.round(percent)}%)
				</div>
			);
		}
	});

	return (
		<div class="card mb-3">
			<div class="card-block">
				<div class="progress">
					{bars}
				</div>
			</div>
		</div>
	);
};
