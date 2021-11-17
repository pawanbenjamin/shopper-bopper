require("dotenv").config();
const request = require("supertest");
const app = require("../../app");
const faker = require("faker");
const { createFakeProduct } = require("../helpers");

const { objectContaining } = expect;

describe("POST /api/products", () => {
  it("Creates a new Product in the DB", async () => {
    const fakeProduct = {
      name: faker.datatype.uuid(),
      description: faker.datatype.uuid(),
      price: faker.datatype.number(),
      stockQty: faker.datatype.number(),
    };
    const response = await request(app)
      .post("/api/products")
      .set("Cookie", process.env["TEST_COOKIE"])
      .send(fakeProduct);

    expect(response.status).toEqual(200);
    expect(response.body).toEqual(
      objectContaining({
        name: fakeProduct.name,
        description: fakeProduct.description,
        price: fakeProduct.price,
        stockqty: fakeProduct.stockQty,
      })
    );
  });
});

describe("GET /api/products/:id", () => {
  it("Gets a Product by productId", async () => {
    const fakeProduct = {
      name: faker.datatype.uuid(),
      description: faker.datatype.uuid(),
      price: faker.datatype.number(),
      stockQty: faker.datatype.number(),
    };
    const { id } = await createFakeProduct(fakeProduct);

    const response = await request(app).get(`/api/products/${id}`);
    expect(response.status).toEqual(200);
    expect(response.body).toEqual(
      objectContaining({
        name: fakeProduct.name,
        description: fakeProduct.description,
        price: fakeProduct.price,
        stockqty: fakeProduct.stockQty,
      })
    );
  });
});

describe("PATCH /api/products/:id", () => {
  it("Updates a product in the DB", async () => {
    const fakeProduct = {
      name: faker.datatype.uuid(),
      description: faker.datatype.uuid(),
      price: faker.datatype.number(),
      stockQty: faker.datatype.number(),
    };
    const { id } = await createFakeProduct(fakeProduct);

    const newProductValues = {
      name: faker.datatype.uuid(),
      description: faker.datatype.uuid(),
      price: faker.datatype.number(),
      stockQty: faker.datatype.number(),
      id,
    };

    const response = await request(app)
      .patch(`/api/products/${id}`)
      .set("Cookie", process.env["TEST_COOKIE"])
      .send(newProductValues);

    expect(response.status).toEqual(200);
    expect(response.body).toEqual(
      objectContaining({
        name: newProductValues.name,
        description: newProductValues.description,
        price: newProductValues.price,
        stockqty: newProductValues.stockQty,
        id,
      })
    );
  });
});

describe("DELETE /api/products/:id", () => {
  it("Deletes a product in the DB", async () => {
    const fakeProduct = {
      name: faker.datatype.uuid(),
      description: faker.datatype.uuid(),
      price: faker.datatype.number(),
      stockQty: faker.datatype.number(),
    };
    const { id } = await createFakeProduct(fakeProduct);

    const response = await request(app).delete(`/api/products/${id}`);
    expect(response.status).toEqual(200);
    expect(response.body).toEqual(
      objectContaining({
        name: fakeProduct.name,
        description: fakeProduct.description,
        price: fakeProduct.price,
        stockqty: fakeProduct.stockQty,
      })
    );
  });
});
