const User = require("./models/User");
const Book = require("./models/Book");

User.hasMany(Book);
Book.belongsTo(User);
