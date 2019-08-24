import { Run } from "./run";

export class Category {
  public name: string;
  public primary: string;
  public runs: Run[] = [];

  constructor(name: string, primary: string) {
    this.name = name;
    this.primary = primary;
  }
}
