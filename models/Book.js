const Sequelize = require("sequelize");
const sequelizeInstance = require("../sequelize");

const Book = sequelizeInstance.define("Book", {
  id: {
    type: Sequelize.UUID,
    allowNull: false,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4,
  },
  author: {
    type: Sequelize.STRING,
  },
  ISBN10: {
    type: Sequelize.STRING,
  },
  title: {
    type: Sequelize.STRING,
  },
  releaseDate: {
    type: Sequelize.DATEONLY,
  },
  genre: {
    type: Sequelize.STRING,
  },
});

module.exports = Book;
