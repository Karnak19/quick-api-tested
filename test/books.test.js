const chai = require("chai");
const chaiHtpp = require("chai-http");

let should = chai.should();

let server = require("../index");

const sequelize = require("../sequelize");
const Book = require("../models/Book");
const User = require("../models/User");

chai.use(chaiHtpp);

let userId;
let bookId;

const keys = [
  "id",
  "ISBN10",
  "author",
  "genre",
  "title",
  "releaseDate",
  "createdAt",
  "updatedAt",
  "UserId",
];

describe("BOOKS", () => {
  before(async () => {
    await sequelize.sync({ force: true });

    const user = await User.create({
      firstName: "Jane",
      lastName: "Test",
      email: "jane@test.com",
      password: "test",
      role: "ADMIN",
    });

    userId = user.dataValues.id;

    const book = await Book.create({
      ISBN10: "2706118857",
      author: "Robert-Vincent Joule",
      title: "Petit traité de manipulation à l'usage des honnêtes gens",
      genre: "PSYCHOLOGIE",
      releaseDate: new Date(2014, 2),
      UserId: userId,
    });

    bookId = book.dataValues.id;
  });

  describe("get all", () => {
    it("should return an array of books", async () => {
      try {
        const res = await chai.request(server).get("/books");

        res.should.have.status(200);
        res.body.should.be.a("array");
        res.body.length.should.be.eql(1);
        res.body[0].should.have.keys(keys);
      } catch (err) {
        throw err;
      }
    });
  });

  describe("post one", () => {
    it("should post a new book", async () => {
      try {
        const res = await chai
          .request(server)
          .post("/books")
          .send({
            ISBN10: "2706118857",
            author: "Robert-Vincent Joule",
            title: "Petit traité de manipulation à l'usage des honnêtes gens",
            genre: "PSYCHOLOGIE",
            releaseDate: new Date(2014, 2),
            UserId: userId,
          });
        res.should.have.status(201);
        res.body.should.be.a("object");
        res.body.should.have.keys(keys);
      } catch (err) {
        throw err;
      }
    });
  });

  describe("get one", () => {
    it("Should return an unique book", async () => {
      try {
        const res = await chai.request(server).get(`/books/${bookId}`);

        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have.keys(keys);
      } catch (err) {
        throw err;
      }
    });
  });

  describe("update one", () => {
    it("should update a book", async () => {
      try {
        const res = await chai.request(server).put(`/books/${bookId}`).send({
          author: "Marion Hourdou",
        });

        res.should.have.status(204);
      } catch (err) {
        throw err;
      }
    });
  });

  describe("delete one", () => {
    it("Should delete a book", async () => {
      try {
        const res = await chai.request(server).delete(`/books/${bookId}`);

        res.should.have.status(204);
      } catch (err) {
        throw err;
      }
    });
  });
});
