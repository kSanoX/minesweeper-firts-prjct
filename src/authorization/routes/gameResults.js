// src/authorization/routes/gameResults.js

const express = require('express');
const router = express.Router();
const GameResult = require('../models/GameResult');

// POST route to save game results
router.post('/', async (req, res) => {
  try {
    const { username, time, difficulty } = req.body;
    const gameResult = new GameResult({ username, time, difficulty });
    await gameResult.save();
    res.status(201).json({ message: 'Game result saved successfully' });
  } catch (error) {
    console.error('Error saving game result:', error);
    res.status(500).json({ message: 'Failed to save game result' });
  }
});

// GET route to fetch game results
router.get('/', async (req, res) => {
  try {
    const easyResults = await GameResult.find({ difficulty: 'easy' }).sort({ time: 1 }).limit(10);
    const mediumResults = await GameResult.find({ difficulty: 'medium' }).sort({ time: 1 }).limit(10);
    const hardResults = await GameResult.find({ difficulty: 'hard' }).sort({ time: 1 }).limit(10);

    res.json({ easyResults, mediumResults, hardResults });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching game results' });
  }
});

module.exports = router;
