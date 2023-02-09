const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },

  username: {
    type: String,
    required: false,
  },
});

//login static method
userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error("All field must be filled");
  }
  const checkUserExist = await this.findOne({ email });

  if (!checkUserExist) {
    throw Error("This email has not be registered");
  }

  const comparePassword = await bcrypt.compare(
    password,
    checkUserExist.password
  );

  if (!comparePassword) {
    throw Error("Password  incorrect");
  }

  return checkUserExist;
};

//signup static method
userSchema.statics.signup = async function (email, username, password) {
  if (!email || !password || !username) {
    throw Error("All field must be filled");
  }
  const checkUserExist = await this.findOne({ email });

  if (checkUserExist) {
    throw Error("Email already taken");
  }

  const checkUsernameExist = await this.findOne({ username });

  if (checkUsernameExist) {
    throw Error("Username already in use");
  }

  if (!validator.isEmail(email)) {
    throw Error("This is not a valid Email");
  }

  if (password.length < 4) {
    throw Error("Password length must be greather than 3");
  }

  if (username.length < 2) {
    throw Error("Username must at least have two or more characters");
  }

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  const user = this.create({ username, email, password: hashPassword });

  return user;
};

module.exports = mongoose.model("User", userSchema);
