const { JUnitXmlReporter } = require("jasmine-reporters");
const { handler } = require("./rewrites");

const reporter = new JUnitXmlReporter({ savePath: "junit/jasmine" });
jasmine.getEnv().addReporter(reporter);

describe("handler", () => {
  let request;
  let event;

  beforeEach(() => {
    request = { uri: "/path", headers: {} };
    event = { Records: [{ cf: { request } }] };
  });

  const tests = [
    {
      name: "should return root unchanged",
      in: "/",
      out: "/"
    },
    {
      name: "should return files unchanged",
      in: "/static/styles.hash.css",
      out: "/static/styles.hash.css"
    },
    {
      name: "should rewrite directories with missing trailing slash",
      in: "/some/directory",
      out: "/some/directory/"
    },
    {
      name: "should return directories with trailing slash unchanged",
      in: "/some/directory/",
      out: "/some/directory/"
    },
    {
      name: "should return unknown Input Display routes unchanged",
      in: "/input-display/unknown",
      out: "/input-display/unknown/"
    }
  ];

  [
    "/input-display/config",
    "/input-display/config/advanced",
    "/input-display/config/appearance",
    "/input-display/config/controller",
    "/input-display/config/controls",
    "/input-display/config/controls/123",
    "/input-display/config/controls/new",
    "/input-display/controller",
    "/input-display/help"
  ].forEach(uri => {
    tests.push(
      {
        name: `should rewrite ${uri}`,
        in: uri,
        out: "/input-display/"
      },
      {
        name: `should rewrite ${uri}/`,
        in: `${uri}/`,
        out: "/input-display/"
      }
    );
  });

  tests.forEach(test => {
    it(test.name, async () => {
      request.uri = test.in;

      const got = await handler(event);
      expect(got.uri).toBe(test.out);
    });
  });
});
