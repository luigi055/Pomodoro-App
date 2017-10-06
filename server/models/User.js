const mongoose = require ('mongoose');

mongoose.Promise = global.Promise;

const userSchema = new mongoose.Schema ({
  facebookID: String,
  googleID: String,
  googleID: String,
  name: String,
  email: String,
  avatar: String,
  Provider: String,
});

const User = mongoose.model ('user', userSchema);

module.exports = User;
