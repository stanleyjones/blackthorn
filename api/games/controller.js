const express = require('express');

const Game = require('./model');
const auth = require('../lib/auth');

const router = express.Router();

router.get('/', auth.protectedRoute, async (req, res) => {
	const games = await Game.find();
	res.json(games);
});

router.post('/', auth.protectedRoute, async (req, res) => {
	const game = new Game(req.body);
	game.userId = req.decoded.data.userId;
	await game.save();
	res.json(game);
});

router.get('/:id', auth.protectedRoute, async (req, res) => {
	const game = await Game.findById(req.params.id);
	res.json(game);
});

router.patch('/:id', auth.protectedRoute, async (req, res) => {
	const game = await Game.findById(req.params.id);
	if (auth.getCurrentUserId(req) === game.userId) {
		const updated = await Game.findByIdAndUpdate(req.params.id, req.body, { new: true });
		res.json(updated);
	} else {
		res.sendStatus(403);
	}
});

router.delete('/:id', auth.protectedRoute, async (req, res) => {
	const game = await Game.findById(req.params.id);
	if (auth.getCurrentUserId(req) === game.userId) {
		await Game.findByIdAndDelete(req.params.id);
		res.status(200).json();
	} else {
		res.sendStatus(403);
	}
});

module.exports = router;