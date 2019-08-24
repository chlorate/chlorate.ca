import { Category } from "./category";

export class Group {
  public name: string;
  public categories: Category[] = [];

  constructor(name: string) {
    this.name = name;
  }
}
