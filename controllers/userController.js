const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const jwtToken = (id) => jwt.sign({ id }, process.env.SECRET);

//login controller
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);
    const token = jwtToken(user._id);

    res.status(200).json({ email: user.email, username: user.username, token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

//signup controller
const signupUser = async (req, res) => {
  const { email, password, username } = req.body;

  try {
    const user = await User.signup(email, username, password);
    const token = jwtToken(user._id);

    res.status(200).json({ email: user.email, token, username: user.username });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = { loginUser, signupUser };
