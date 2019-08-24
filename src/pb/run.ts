export class Run {
  public score: string;
  public time: string;
  public realTime: string;
  public gameTime: string;
  public platform: string;
  public emulator: string;
  public version: string;
  public date: string;
  public comment: string;
  public video: string;

  constructor(
    score: string,
    time: string,
    realTime: string,
    gameTime: string,
    platform: string,
    emulator: string,
    version: string,
    date: string,
    comment: string,
    video: string
  ) {
    this.score = score;
    this.time = time;
    this.realTime = realTime;
    this.gameTime = gameTime;
    this.platform = platform;
    this.emulator = emulator;
    this.version = version;
    this.date = date;
    this.comment = comment;
    this.video = video;
  }
}
