require("dotenv").config();
const request = require("supertest");
const app = require("../../app");
const faker = require("faker");
const { createFakeUser } = require("../helpers");

const { objectContaining } = expect;

describe("POST /api/users", () => {
  it("Creates a user in the DB", async () => {
    const fakeUser = {
      username: faker.internet.userName(),
      password: faker.internet.password(),
    };
    const response = await request(app)
      .post("/api/users")
      .set("Cookie", process.env["TEST_COOKIE"])
      .send(fakeUser);
    expect(response.body).toEqual(
      objectContaining({
        username: expect.any(String),
        id: expect.any(Number),
      })
    );
  });
});

describe("GET /api/users/:id", () => {
  it("Gets a user by user's id", async () => {
    const fakeUser = {
      username: faker.internet.userName(),
      password: faker.internet.password(),
    };
    const { username, id } = await createFakeUser();
    const response = await request(app)
      .get(`/api/users/${id}`)
      .set("Cookie", process.env["TEST_COOKIE"]);
    expect(response.body).toEqual(
      objectContaining({
        username,
        id,
      })
    );
  });
});
