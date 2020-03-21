const express = require("express");

const Character = require("./model");
const auth = require("../lib/auth");

const router = express.Router();

router.get("/", auth.protectedRoute, async (req, res) => {
  const characters = await Character.find();
  res.json(characters);
});

router.post("/", auth.protectedRoute, async (req, res) => {
  const character = new Character(req.body);
  character.userId = req.decoded.data.userId;
  await character.save();
  res.json(character);
});

router.get("/:id", auth.protectedRoute, async (req, res) => {
  const character = await Character.findById(req.params.id);
  res.json(character);
});

router.patch("/:id", auth.protectedRoute, async (req, res) => {
  const character = await Character.findById(req.params.id);
  if (auth.getCurrentUserId(req) === character.userId) {
    const updated = await Character.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });
    res.json(updated);
  } else {
    res.sendStatus(403);
  }
});

router.delete("/:id", auth.protectedRoute, async (req, res) => {
  const character = await Character.findById(req.params.id);
  if (auth.getCurrentUserId(req) === character.userId) {
    await Character.findByIdAndDelete(req.params.id);
    res.status(200).json();
  } else {
    res.sendStatus(403);
  }
});

module.exports = router;
