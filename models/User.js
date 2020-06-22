const Sequelize = require("sequelize");
const sequelizeInstance = require("../sequelize");

const User = sequelizeInstance.define("User", {
  id: {
    type: Sequelize.UUID,
    allowNull: false,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4,
  },
  firstName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  role: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

User.prototype.validPassword = function (password) {
  if (password === this.password) {
    return true;
  } else {
    return false;
  }
};

module.exports = User;
