const express = require("express");

const users = express.Router();
const User = require("../models/User");
const bodyChecker = require("../middlewares/bodyChecker");

users.get("/", async (req, res) => {
  try {
    const users = await User.findAll();

    res.status(200).json(users);
  } catch (err) {
    res.status(400).json(err);
  }
});

users.post("/", async (req, res) => {
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

users.put("/:id", async (req, res) => {
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

module.exports = users;
