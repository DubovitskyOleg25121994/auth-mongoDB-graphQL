(() => {
  const mongoose = require('mongoose');

  const { Schema } = mongoose;

  const UsersSchema = new Schema({
    name: String,
    email: String,
    password: String,
    activationToken: String,
  });

  const user = mongoose.model('user', UsersSchema);

  module.exports = user;
})();
