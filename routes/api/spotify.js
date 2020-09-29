const express = require("express");
const router = express.Router();

//@route GET api/spotify/
//@desc Get all posts
//@access Private
router.get("/artists", auth, async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });
    res.json(posts);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
