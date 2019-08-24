import * as fs from "fs";
import * as https from "https";
import * as yargs from "yargs";
import { CsvParser } from "./csv";

const args = yargs.command("* <url> <jsonPath>", "parses a CSV file", yargs =>
  yargs
    .positional("url", { describe: "URL for a CSV file", type: "string" })
    .positional("jsonPath", {
      describe: "path to output JSON file",
      type: "string"
    })
).argv;

https.get(args.url, response => {
  const { statusCode } = response;
  if (statusCode !== 200) {
    throw new Error(`request failed with status: {statusCode}`);
  }

  let body = "";
  response.on("data", chunk => (body += chunk));
  response.on("end", () => handleRequestSuccess(body));
});

async function handleRequestSuccess(csv: string): Promise<void> {
  const parser = new CsvParser();
  await parser.parse(csv);

  const json = JSON.stringify({ series: parser.series });
  fs.writeFileSync(args.jsonPath, json);
}
