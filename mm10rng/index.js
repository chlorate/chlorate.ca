import Inferno from "inferno";
import FormComponent from "./form";

Inferno.render(
	<div class="row">
		<div class="col-4">
			<FormComponent />
		</div>
	</div>,
	document.getElementsByTagName("main")[0]
);
