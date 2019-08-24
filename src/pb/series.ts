import { Game } from "./game";

export class Series {
  public name: string;
  public games: Game[] = [];

  constructor(name: string) {
    this.name = name;
  }
}
