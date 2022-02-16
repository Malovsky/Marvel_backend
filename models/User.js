const mongoose = require("mongoose");

const User = mongoose.model("User", {
  email: {
    unique: true,
    type: String,
  },
  favCharacters: [String],
  favComics: [String],
  token: String,
  hash: String,
  salt: String,
});

module.exports = User;
