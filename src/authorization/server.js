const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const gameResultsRouter = require('./routes/gameResults');
const dotenv = require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;
const allowedOrigins = [
  'https://minesweeper-firts-prjct.vercel.app',
  'https://minesweeper-firts-prjct-q6cokvmzc-ksanoxs-projects.vercel.app',
  'http://localhost:3000'
];

app.use(express.json());
app.use(cors({
  origin: function(origin, callback){
    // Разрешаем запросы с указанных origin
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      return callback(null, true);
    }
    return callback(new Error('Not allowed by CORS'));
  }
}));

// Подключение к MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Маршруты
app.use('/api/auth', require('./routes/auth'));
app.use('/api/game', require('./routes/game'));
app.use('/api/game-results', gameResultsRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
