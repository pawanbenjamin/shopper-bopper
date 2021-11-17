require("dotenv").config();
const request = require("supertest");
const app = require("../../app");
const faker = require("faker");
const { createUser } = require("../helpers");
const { objectContaining } = expect;

describe("POST /auth/register", () => {
  it("Registers a New User", async () => {
    const fakeUser = {
      username: faker.internet.userName(),
      password: faker.internet.password(),
    };
    const response = await request(app).post("/auth/register").send(fakeUser);
    console.log("Hello");
    expect(response.body).toEqual(
      objectContaining({
        username: expect.any(String),
        id: expect.any(Number),
      })
    );
  });
});

describe("POST /auth/login", () => {
  it("Logs in a User", async () => {
    const fakeUser = {
      username: faker.internet.userName(),
      password: faker.internet.password(),
    };
    await request(app).post("/auth/register").send(fakeUser);
    const response = await request(app).post("/auth/login").send(fakeUser);
    expect(response.status).toEqual(200);
  });
});
