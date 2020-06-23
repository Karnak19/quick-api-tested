const express = require("express");
const Book = require("../models/Book");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const books = await Book.findAll();
    res.status(200).json(books);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.post("/", async (req, res) => {
  const { ISBN10, title, author, genre, releaseDate, UserId } = req.body;
  try {
    const newBook = await Book.create({
      ISBN10,
      title,
      author,
      genre,
      releaseDate,
      UserId,
    });

    res.status(201).json(newBook);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const book = await Book.findByPk(id);

    res.status(200).json(book);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { author, ISBN10, genre, releaseDate, UserId, title } = req.body;
  try {
    await Book.update(
      { author, ISBN10, genre, releaseDate, UserId, title },
      {
        where: { id },
      }
    );

    res.status(204).end();
  } catch (error) {
    res.status(400).json(error);
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await Book.destroy({ where: { id } });

    res.status(204).end();
  } catch (error) {
    console.log(error);

    res.status(400).json(error);
  }
});

module.exports = router;
