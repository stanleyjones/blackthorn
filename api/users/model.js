const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const SALT_WORK_FACTOR = 10;

const UserSchema = new mongoose.Schema({
  email: String,
  name: String,
  password: String
});

UserSchema.pre("save", function(next) {
  bcrypt.hash(this.password, SALT_WORK_FACTOR, (err, hash) => {
    if (err) {
      return next(err);
    }
    this.password = hash;
    next();
  });
});

UserSchema.methods.comparePassword = async function(plaintext, next) {
  return await bcrypt.compare(plaintext, this.password);
};

module.exports = mongoose.model("User", UserSchema);
