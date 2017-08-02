export interface Grade {
	name: string;
	class: string;
}

export const grades = {
	best: {
		name: "Best",
		class: "table-success",
	},
	good: {
		name: "Good",
		class: "table-warning",
	},
	worst: {
		name: "Worst",
		class: "table-danger",
	},
};
