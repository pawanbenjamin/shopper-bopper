require("dotenv").config();
const request = require("supertest");
const app = require("../../app");
const faker = require("faker");
const {
  createFakeProduct,
  createFakeUser,
  createFakeOrder,
} = require("../helpers");
// const { buildTables, seedDb } = require("../../db/seedData");

const { objectContaining } = expect;

describe("POST /api/orders", () => {
  it("Creates an Active Order in the DB", async () => {
    const fakeUser = {
      username: faker.internet.userName(),
      password: faker.internet.password(),
    };
    const { username, id } = await createFakeUser(fakeUser);
    const response = await request(app)
      .post(`/api/orders/user/${id}`)
      .set("Cookie", process.env["TEST_COOKIE"]);

    expect(response.status).toEqual(200);
    expect(response.body).toEqual(
      objectContaining({
        userId: id,
      })
    );
  });
});

describe("GET /api/orders/:id", () => {
  it("Gets an order by Order ID", async () => {
    const fakeUser = {
      username: faker.internet.userName(),
      password: faker.internet.password(),
    };
    const { username, id } = await createFakeUser(fakeUser);
    const fakeOrder = await createFakeOrder(id);

    const response = await request(app)
      .get(`/api/orders/${fakeOrder.id}`)
      .set("Cookie", process.env["TEST_COOKIE"]);
    expect(response.status).toBe(200);
  });
});

describe("GET /api/orders/user/:userId/cart", () => {
  it("Gets a user's active order (CART)", async () => {
    const fakeUser = {
      username: faker.internet.userName(),
      password: faker.internet.password(),
    };
    const { username, id } = await createFakeUser(fakeUser);
    const fakeOrder = await createFakeOrder(id);

    const response = await request(app)
      .get(`/api/orders/user/${fakeOrder.userId}/cart`)
      .set("Cookie", process.env["TEST_COOKIE"]);

    expect(response.status).toEqual(200);
    expect(response.body).toEqual(
      objectContaining({
        isactive: true,
      })
    );
  });
});
