require("dotenv").config();
const express = require("express");

const sequelize = require("./sequelize");
const users = require("./routes/users.route");
const auth = require("./routes/auth.route");

const app = express();

const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use("/users", users);
app.use("/auth", auth);

app.get("/", (req, res) => {
  res.status(200).send("Welcome to my API");
});

async function main() {
  try {
    await sequelize.sync({ alter: true });
    await sequelize.authenticate();
    console.log("Database succesfully joined");

    app.listen(PORT, (err) => {
      if (err) throw new Error(err.message);

      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.log("Unable to start", err.message);
  }
}

if (process.env.NODE_ENV !== "test") {
  main();
}

module.exports = app;
