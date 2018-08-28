const expect = require("chai").expect;
const request = require("supertest");
const sinon = require("sinon");
const app = require("../index");
const ejs = require("ejs");

describe("App", () => {
  it("should return a 200 response", (done) => {
    request(app).get("/").expect(200, done);
  });
});

describe("App", () => {
  it("should return a 404 on invalid page", (done) => {
    request(app).get("/ksdkfdkfk").expect(404, done);
  });
});

describe("Getting a Season", () => {
  it("should return a 200 response", (done) => {
    request(app).get("/season/1").expect(200, done);
  });

  it("should find some queens", () => request(app)
    .get("/season/1")
    .then((response) => {
      expect(response.queens).to.not.be.null;
    }));

  it("should throw an error on invalid season", (done) => {
    request(app).get("/season/99").expect(404, done);
  });
});
