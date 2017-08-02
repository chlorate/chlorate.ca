import {render} from "inferno";
import {Provider} from "inferno-mobx";
import {observable} from "mobx";
import FormComponent from "./form";
import TableComponent from "./table";
import State from "./state";

let state = observable(new State());

render(
	<Provider state={state}>
		<div class="row">
			<div class="col-4">
				<FormComponent />
			</div>
			<div class="col">
				<TableComponent />
			</div>
		</div>
	</Provider>,
	document.getElementsByTagName("main")[0]
);
