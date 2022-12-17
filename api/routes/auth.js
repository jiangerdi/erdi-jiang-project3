const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

//Register a new user
router.post("/register", async (req, res) => {
  try {
    //Password encryption using bcrypt
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    //Const new user
    const newUser = new User({
      username: req.body.username,
      password: hashPassword,
    });

    //Save new user info to database
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Login a current user
router.post("/login", async (req, res) => {
  try {
    //check username
    const user = await User.findOne({ username: req.body.username });
    !user && res.status(404).json("user not found");

    //check password
    const rightPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    !rightPassword && res.status(404).json("wrong password");

    //retrun the user found
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
