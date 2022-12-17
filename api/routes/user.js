const router = require("express").Router();
const User = require("../models/User");

//Update current user info
router.put("/:id", async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    try {
      let userId = req.body.userId;
      const user = await User.findByIdAndUpdate(userId, {
        $set: req.body,
      });
      res.status(200).json("Account Updated");
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json("You cannot update other account");
  }
});

//Delete an existing user
router.delete("/:id", async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    try {
      let userId = req.body.userId;
      const user = await User.findByIdAndDelete(userId);
      res.status(200).json("Account Deleted");
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json("You cannot delete other account");
  }
});

//Get a user
router.get("/", async (req, res) => {
  const userId = req.query.userId;
  const username = req.query.username;

  try {
    const user = userId
      ? await User.findById(userId)
      : await User.findOne({ username: username });
    const { password, updatedAt, ...other } = user._doc;
    res.status(200).json(other);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
