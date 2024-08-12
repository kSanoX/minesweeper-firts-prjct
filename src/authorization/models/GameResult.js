const mongoose = require('mongoose');

const GameResultSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  time: {
    type: Number,
    required: true
  },
  difficulty: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('GameResult', GameResultSchema);
