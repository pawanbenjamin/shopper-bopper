const app = require("../app");
const request = require("supertest");

describe("Products API", () => {
  describe("GET /api/products", () => {
    it("Get the correct products", async () => {
      const { body } = await request(app).get("/api/products").expect(200);
      console.log(body);
      expect(body.length).toEqual(4);
    });
  });
});
