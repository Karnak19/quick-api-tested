const express = require("express");
const jwt = require("jsonwebtoken");

const User = require("../models/User");
const secret = require("../secret");

const router = express.Router();

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({
      where: {
        email,
      },
    });

    const isPasswordValid = user.validPassword(password);
    if (user && isPasswordValid) {
      const token = jwt.sign(
        {
          email,
          role: user.dataValues.role,
        },
        secret,
        {
          expiresIn: "1h",
        }
      );

      // TODO: Fix this delete with validPassword method
      delete user.dataValues.password;

      res.status(200).json({
        token,
        user,
      });
    } else {
      res.status(422).json({
        message: "Wrong credentials",
        hint: "password",
      });
    }
  } catch (error) {
    res.status(422).json({
      message: "Wrong credentials",
    });
  }
});

module.exports = router;
