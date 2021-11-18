require("dotenv").config();
const request = require("supertest");
const app = require("../../app");
const faker = require("faker");
const {
  createFakeProduct,
  createFakeUser,
  createFakeOrder,
  createFakeEmptyOrder,
  addFakeProductToOrder,
} = require("../helpers");

const { objectContaining } = expect;

describe("ORDERS_PRODUCTS TESTS", () => {
  describe("POST /api/orders_products", () => {
    it("Correctly adds an item to an order", async () => {
      const fakeUser = {
        username: faker.internet.userName(),
        password: faker.internet.password(),
      };
      const { username, id } = await createFakeUser(fakeUser);
      const fakeProduct = await createFakeProduct({
        name: faker.datatype.uuid(),
        description: faker.datatype.uuid(),
        price: faker.datatype.number(),
        stockQty: faker.datatype.number(),
      });

      const order = await createFakeEmptyOrder(id);

      const response = await request(app)
        .post("/api/orders_products")
        .set("Cookie", process.env["TEST_COOKIE"])
        .send({
          productId: fakeProduct.id,
          orderId: order.id,
          qty: 1,
        });
      expect(response.status).toEqual(200);
      expect(response.body).toEqual(
        objectContaining({
          productId: fakeProduct.id,
          orderId: order.id,
          qty: 1,
        })
      );
    });
  });
  describe("DELETE /api/orders_products", () => {
    it("Deletes an item from the through table", async () => {
      const fakeUser = {
        username: faker.internet.userName(),
        password: faker.internet.password(),
      };
      const { username, id } = await createFakeUser(fakeUser);
      const fakeProduct = await createFakeProduct({
        name: faker.datatype.uuid(),
        description: faker.datatype.uuid(),
        price: faker.datatype.number(),
        stockQty: faker.datatype.number(),
      });
      const order = await createFakeEmptyOrder(id);
      const order_product = await addFakeProductToOrder(
        order.id,
        fakeProduct.id,
        1
      );

      const response = await request(app)
        .delete("/api/orders_products")
        .set("Cookie", process.env["TEST_COOKIE"])
        .send({ productId: fakeProduct.id, orderId: order.id });
      expect(response.status).toEqual(200);
      expect(response.body).toEqual(
        objectContaining({
          productId: fakeProduct.id,
          orderId: order.id,
        })
      );
    });
  });

  describe("PATCH /api/orders_products", () => {
    it("Updates the qty in the through-table", async () => {
      const fakeUser = {
        username: faker.internet.userName(),
        password: faker.internet.password(),
      };
      const { username, id } = await createFakeUser(fakeUser);
      const fakeProduct = await createFakeProduct({
        name: faker.datatype.uuid(),
        description: faker.datatype.uuid(),
        price: faker.datatype.number(),
        stockQty: faker.datatype.number(),
      });
      const order = await createFakeEmptyOrder(id);
      const order_product = await addFakeProductToOrder(
        order.id,
        fakeProduct.id,
        1
      );

      const response = await request(app)
        .patch("/api/orders_products")
        .set("Cookie", process.env["TEST_COOKIE"])
        .send({
          productId: fakeProduct.id,
          orderId: order.id,
          qty: order_product.qty + 1,
        });
      expect(response.status).toEqual(200);
      expect(response.body).toEqual(
        objectContaining({
          productId: fakeProduct.id,
          orderId: order.id,
          qty: order_product.qty + 1,
        })
      );
    });
  });
});
