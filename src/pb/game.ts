import { Group } from "./group";

export class Game {
  public name: string;
  public groups: Group[] = [];

  constructor(name: string) {
    this.name = name;
  }
}
