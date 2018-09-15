const handler = require("./redirect").handler;

describe("handler", () => {
  let request;
  let event;

  beforeEach(() => {
    request = { uri: "/path", headers: {} };
    event = { Records: [{ cf: { request } }] };
  });

  [
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
      name: "should return directories with missing trailing slash added",
      in: "/some/directory",
      out: "/some/directory/"
    },
    {
      name: "should return directories with trailing slash unchanged",
      in: "/some/directory/",
      out: "/some/directory/"
    }
  ].forEach(test => {
    it(test.name, async () => {
      request.uri = test.in;

      const got = await handler(event);
      expect(got.uri).toBe(test.out);
    });
  });
});
