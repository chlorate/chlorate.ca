import {render} from "inferno";
import {Provider, connect} from "inferno-mobx";
import {observable} from "mobx";
import {BarComponent} from "./bar";
import {FormComponent} from "./form";
import {State} from "./state";
import {TableComponent} from "./table";

let state = observable(new State());

const IndexComponent = connect(["state"], ({state}: {state: State}) => {
	let result = state.result();
	return (
		<div>
			<FormComponent />
			<BarComponent result={result} />
			<TableComponent result={result} />
		</div>
	);
});

render(
	<Provider state={state}>
		<IndexComponent />
	</Provider>,
	document.getElementsByTagName("main")[0]
);
