const express = require("express");

const User = require("./model");
const auth = require("../lib/auth");

const router = express.Router();

router.get("/", auth.protectedRoute, async (req, res) => {
  const users = await User.find();
  res.json(users);
});

router.post("/", async (req, res) => {
  const user = new User(req.body);
  await user.save();
  res.json(user);
});

router.get("/:id", auth.protectedRoute, async (req, res) => {
  const user = await User.findById(req.params.id);
  res.json(user);
});

router.patch("/:id", auth.protectedRoute, async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true
  });
  res.json(user);
});

router.delete("/:id", auth.protectedRoute, async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json();
});

router.post("/current", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (await user.comparePassword(password)) {
    res.json({ token: auth.createToken({ userId: user._id }) });
  } else {
    res.sendStatus(403);
  }
});

module.exports = router;
