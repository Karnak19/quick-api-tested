const chai = require("chai");
const chaiHtpp = require("chai-http");

let should = chai.should();

let server = require("../index");

const sequelize = require("../sequelize");
const User = require("../models/User");

chai.use(chaiHtpp);

describe("USERS", () => {
  before(async () => {
    await sequelize.sync({ force: true });

    await User.create({
      firstName: "Jane",
      lastName: "Test",
      email: "jane@test.com",
      password: "test",
      role: "ADMIN",
    });
  });

  describe("get all", () => {
    it("should return an array of users", async () => {
      try {
        const res = await chai.request(server).get("/users");

        res.should.have.status(200);
        res.body.should.be.a("array");
        res.body.length.should.be.eql(1);
        res.body[0].should.have.keys([
          "id",
          "firstName",
          "lastName",
          "createdAt",
          "email",
          "role",
          "updatedAt",
        ]);
      } catch (err) {
        throw err;
      }
    });
  });

  describe("post one", () => {
    it("should post a new user", async () => {
      try {
        const res = await chai.request(server).post("/users").send({
          firstName: "John",
          lastName: "Doe",
          email: "john@doe.com",
          password: "test",
          role: "ADMIN",
        });
        res.should.have.status(201);
        res.body.should.be.a("object");
        res.body.should.have.keys([
          "id",
          "firstName",
          "lastName",
          "createdAt",
          "email",
          "role",
          "password",
          "updatedAt",
        ]);
      } catch (err) {
        throw err;
      }
    });

    it("should fail to create", async () => {
      try {
        const res = await chai
          .request(server)
          .post("/users")
          .send({ lastName: "Doe" });

        res.should.have.status(422);
        res.body.should.be.a("object");
      } catch (err) {
        throw err;
      }
    });
  });
});
