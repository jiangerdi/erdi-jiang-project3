const router = require("express").Router();
const Post = require("../models/Post");
const User = require("../models/User");

//Create a new post
router.post("/", async (req, res) => {
  const newPost = new Post(req.body);
  try {
    const savePost = await newPost.save();
    res.status(200).json(savePost);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//Edit a post
router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await post.updateOne({ $set: req.body });
      res.status(200).json("Post Updated");
    } else {
      res.status(403).json("You can not edit others' post");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//Delete a post
router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await post.deleteOne();
      res.status(200).json("Post Deleted");
    } else {
      res.status(403).json("You can not delete others' post");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//Get a post
router.get("/:id", async (req, res) => {
  try {
    let postId = req.params.id;
    const post = await Post.findById(postId);
    res.status(200).json(post);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//Get all posts by timeline
router.get("/timeline/:id", async (req, res) => {
  try {
    // const currUser = await User.findById(req.params.id);
    // const userPosts = await Post.find({ userId: currUser._id });
    const query = {};
    const sort = { createdAt: -1 };
    const userPosts = await Post.find(query).sort(sort);
    res.status(200).json(userPosts);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Get user's all posts
router.get("/profile/:username", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    const sort = { createdAt: -1 };
    const userPosts = await Post.find({ userId: user._id }).sort(sort);
    res.status(200).json(userPosts);
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;
