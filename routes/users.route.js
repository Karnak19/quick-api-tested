const express = require("express");

const router = express.Router();
const User = require("../models/User");
const Book = require("../models/Book");
const bodyChecker = require("../middlewares/bodyChecker");
const authRole = require("../middlewares/authRole");

router.get("/", async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: {
        exclude: ["password"],
      },
    });

    res.status(200).json(users);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post("/", async (req, res) => {
  const { firstName, lastName, email, password, role } = req.body;

  try {
    const user = await User.create({
      firstName,
      lastName,
      email,
      password,
      role,
    });

    res.status(201).json(user);
  } catch (err) {
    res.status(422).json(err);
  }
});

router.put("/:id", async (req, res) => {
  const { firstName, lastName, email, password, role } = req.body;
  const { id } = req.params;

  try {
    const user = await User.update(
      {
        firstName,
        lastName,
        email,
        password,
        role,
      },
      {
        where: { id },
      }
    );
    res.status(204).json(user);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get("/:id/books", async (req, res) => {
  const { id } = req.params;
  try {
    const books = await Book.findAll({ where: { UserId: id } });
    res.status(200).json(books);
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = router;
