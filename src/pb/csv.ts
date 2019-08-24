import * as parse from "csv-parse";
import { Series } from "./series";
import { Game } from "./game";
import { Group } from "./group";
import { Category } from "./category";
import { Run } from "./run";

export class CsvParser {
  public errors: string[] = [];
  public series: Series[] = [];

  private rowNumber: number = 0;

  private seriesIndex?: number;
  private gameIndex?: number;
  private groupIndex?: number;
  private categoryIndex?: number;
  private primaryIndex?: number;
  private scoreIndex?: number;
  private timeIndex?: number;
  private realTimeIndex?: number;
  private gameTimeIndex?: number;
  private platformIndex?: number;
  private emulatorIndex?: number;
  private versionIndex?: number;
  private dateIndex?: number;
  private commentIndex?: number;
  private videoIndex?: number;

  private lastSeries?: Series;
  private lastGame?: Game;
  private lastGroup?: Group;
  private lastCategory?: Category;

  public parse(csv: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const parser = parse();
      parser.on("readable", () => {
        for (let row = parser.read(); row; row = parser.read()) {
          this.rowNumber++;

          if (this.rowNumber === 1) {
            this.parseHeader(row);
            continue;
          }

          this.parseRow(row);
        }
      });
      parser.on("finish", () => {
        if (this.errors.length) {
          reject();
          return;
        }
        resolve();
      });
      parser.on("error", error => {
        this.errors.push(error.toString());
        reject();
      });
      parser.write(csv);
      parser.end();
    });
  }

  private parseHeader(row: string[]): void {
    row.forEach((value, i) => {
      switch (value) {
        case "Series":
          this.seriesIndex = i;
          break;
        case "Game":
          this.gameIndex = i;
          break;
        case "Group":
          this.groupIndex = i;
          break;
        case "Category":
          this.categoryIndex = i;
          break;
        case "Primary":
          this.primaryIndex = i;
          break;
        case "Score":
          this.scoreIndex = i;
          break;
        case "Time":
          this.timeIndex = i;
          break;
        case "Real time":
          this.realTimeIndex = i;
          break;
        case "Game time":
          this.gameTimeIndex = i;
          break;
        case "Platform":
          this.platformIndex = i;
          break;
        case "Emulator":
          this.emulatorIndex = i;
          break;
        case "Version":
          this.versionIndex = i;
          break;
        case "Date":
          this.dateIndex = i;
          break;
        case "Comment":
          this.commentIndex = i;
          break;
        case "Video":
          this.videoIndex = i;
          break;
      }
    });
  }

  private parseRow(row: string[]): void {
    this.parseSeries(row);
    this.parseGame(row);
    this.parseGroup(row);
    this.parseCategory(row);
    this.parseRun(row);
  }

  private parseSeries(row: string[]): void {
    let name = "";
    if (this.seriesIndex !== undefined) {
      name = row[this.seriesIndex];
    }
    if (this.lastSeries && !name) {
      name = this.lastSeries.name;
    }

    if (!this.lastSeries || name !== this.lastSeries.name) {
      this.lastSeries = new Series(name);
      this.lastGame = undefined;
      this.lastGroup = undefined;
      this.lastCategory = undefined;
      this.series.push(this.lastSeries);
    }
  }

  private parseGame(row: string[]): void {
    let name = "";
    if (this.gameIndex !== undefined) {
      name = row[this.gameIndex];
    }
    if (this.lastGame && !name) {
      name = this.lastGame.name;
    }

    if (!this.lastGame || name !== this.lastGame.name) {
      if (!this.lastSeries) {
        throw new Error("missing last series");
      }

      this.lastGame = new Game(name);
      this.lastGroup = undefined;
      this.lastCategory = undefined;
      this.lastSeries.games.push(this.lastGame);
    }
  }

  private parseGroup(row: string[]): void {
    let name = "";
    if (this.groupIndex !== undefined) {
      name = row[this.groupIndex];
    }
    if (this.lastGroup && !name) {
      name = this.lastGroup.name;
    }

    if (!this.lastGroup || name !== this.lastGroup.name) {
      if (!this.lastGame) {
        throw new Error("missing last game");
      }

      this.lastGroup = new Group(name);
      this.lastCategory = undefined;
      this.lastGame.groups.push(this.lastGroup);
    }
  }

  private parseCategory(row: string[]): void {
    let name = "";
    if (this.categoryIndex !== undefined) {
      name = row[this.categoryIndex];
    }
    if (this.lastCategory && !name) {
      name = this.lastCategory.name;
    }

    let primary = "";
    if (this.primaryIndex !== undefined) {
      primary = row[this.primaryIndex];
    }

    if (!this.lastCategory || name !== this.lastCategory.name) {
      if (!this.lastGroup) {
        throw new Error("missing last group");
      }

      this.lastCategory = new Category(name, primary);
      this.lastGroup.categories.push(this.lastCategory);
    }
  }

  private parseRun(row: string[]): void {
    if (!this.lastCategory) {
      throw new Error("missing last category");
    }

    let score = "";
    if (this.scoreIndex !== undefined) {
      score = row[this.scoreIndex];
    }

    let time = "";
    if (this.timeIndex !== undefined) {
      time = row[this.timeIndex];
    }

    let realTime = "";
    if (this.realTimeIndex !== undefined) {
      realTime = row[this.realTimeIndex];
    }

    let gameTime = "";
    if (this.gameTimeIndex !== undefined) {
      gameTime = row[this.gameTimeIndex];
    }

    let platform = "";
    if (this.platformIndex !== undefined) {
      platform = row[this.platformIndex];
    }

    let emulator = "";
    if (this.emulatorIndex !== undefined) {
      emulator = row[this.emulatorIndex];
    }

    let version = "";
    if (this.versionIndex !== undefined) {
      version = row[this.versionIndex];
    }

    let date = "";
    if (this.dateIndex !== undefined) {
      date = row[this.dateIndex];
    }

    let comment = "";
    if (this.commentIndex !== undefined) {
      comment = row[this.commentIndex];
    }

    let video = "";
    if (this.videoIndex !== undefined) {
      video = row[this.videoIndex];
    }

    const run = new Run(
      score,
      time,
      realTime,
      gameTime,
      platform,
      emulator,
      version,
      date,
      comment,
      video
    );
    this.lastCategory.runs.push(run);
  }
}
