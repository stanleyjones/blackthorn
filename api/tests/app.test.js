const req = require("supertest");

const app = require("../app");

describe("HttpServer", () => {
  test("GET / should be 200", () =>
    req(app)
      .get("/")
      .expect(200));
});
