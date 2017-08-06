export class Background {
	private colors: Color[];
	private length: number;

	constructor(colors) {
		this.colors = colors;
		this.length = colors.reduce((sum, color) => sum + color.length, 0);
	}

	colorAt(frame: number): Color {
		frame = (frame - 1) % this.length;
		if (frame < 0) {
			frame += this.length;
		}

		let color = this.colors.find(color => {
			frame -= color.length;
			return frame < 0;
		});
		if (!color) {
			throw "color not found";
		}
		return color;
	}
}

export interface Color {
	name: string;
	length: number;
	class: string;
}

export const backgrounds = {
	solar: new Background([
		{
			name: "1",
			class: "bg-solar-1",
			length: 28,
		},
		{
			name: "2",
			class: "bg-solar-2",
			length: 21,
		},
		{
			name: "3",
			class: "bg-solar-3",
			length: 28,
		},
		{
			name: "2",
			length: 21,
			class: "bg-solar-2",
		},
	]),
	wily2: new Background([
		{
			name: "1",
			class: "bg-wily2-1",
			length: 20,
		},
		{
			name: "2",
			class: "bg-wily2-2",
			length: 20,
		},
	]),
};
