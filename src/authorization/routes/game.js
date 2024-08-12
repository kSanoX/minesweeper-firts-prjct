const express = require('express');
const GameResult = require('../models/GameResult.js');
const router = express.Router();
const auth = require('../middleware/auth');

router.post('/save', auth, async (req, res) => {
  const { time, difficulty } = req.body;
  const username = req.user.username;

  try {
    const gameResult = new GameResult({
      username,
      time,
      difficulty
    });

    await gameResult.save();
    res.json({ msg: 'Game result saved' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
