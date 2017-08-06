export interface Grade {
	name: string;
	class: string;
	state: string;
}

export const grades = {
	best: {
		name: "Best",
		class: "table-success",
		state: "success",
	},
	good: {
		name: "Good",
		class: "table-warning",
		state: "warning",
	},
	bad: {
		name: "Bad",
		class: "table-danger",
		state: "danger",
	},
};

export const orderedGrades = ["best", "good", "bad"];
