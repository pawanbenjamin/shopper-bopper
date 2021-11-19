require("dotenv").config();
const request = require("supertest");
const app = require("../../app");
const faker = require("faker");
const {
  createFakeProduct,
  createFakeUser,
  createFakeOrder,
  createFakeEmptyOrder,
} = require("../helpers");

const { objectContaining, arrayContaining } = expect;

describe("API/ORDERS TESTS", () => {
  describe("POST t/api/orders", () => {
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
          isActive: true,
          userId: id,
        })
      );
    });
  });

  describe("GET /api/orders", () => {
    it("Gets all of the orders", async () => {
      const fakeUser = {
        username: faker.internet.userName(),
        password: faker.internet.password(),
      };
      const { username, id } = await createFakeUser(fakeUser);
      const order = await createFakeOrder(id);

      const response = await request(app)
        .get("/api/orders")
        .set("Cookie", process.env["TEST_COOKIE"]);

      expect(response.status).toEqual(200);
      expect(response.body.length).toBeTruthy();
    });
  });

  describe("GET /api/orders/user/:userId", () => {
    it(`Get all of a user's orders`, async () => {
      const fakeUser = {
        username: faker.internet.userName(),
        password: faker.internet.password(),
      };
      const { username, id } = await createFakeUser(fakeUser);
      const order = await createFakeOrder(id);
      const response = await request(app)
        .get(`/api/orders/user/${id}`)
        .set("Cookie", process.env["TEST_COOKIE"]);

      expect(response.status).toEqual(200);
      expect(response.body[0]).toEqual(
        objectContaining({
          orderId: order.id,
          userId: id,
        })
      );
    });
  });

  describe("PATCH /api/orders/purchase/:orderId", () => {
    it("Changes isActive status on Orders to False", async () => {
      const fakeUser = {
        username: faker.internet.userName(),
        password: faker.internet.password(),
      };
      const { username, id } = await createFakeUser(fakeUser);
      const order = await createFakeOrder(id);
      const response = await request(app)
        .patch(`/api/orders/purchase/${order.id}`)
        .set("Cookie", process.env["TEST_COOKIE"]);
      expect(response.status).toEqual(200);
      expect(response.body).toEqual(
        objectContaining({
          isactive: false,
        })
      );
    });
  });

  describe("DELETE /api/orders/:id", () => {
    it("Deletes an Order without items", async () => {
      const fakeUser = {
        username: faker.internet.userName(),
        password: faker.internet.password(),
      };
      const { username, id } = await createFakeUser(fakeUser);
      const order = await createFakeEmptyOrder(id);
      const response = await request(app)
        .delete(`/api/orders/${order.id}`)
        .set("Cookie", process.env["TEST_COOKIE"]);

      expect(response.status).toEqual(200);
      expect(response.body).toEqual(
        objectContaining({
          userId: id,
          id: order.id,
        })
      );
    });
  });
});
