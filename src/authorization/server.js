const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const gameResultsRouter = require('./routes/gameResults');
const dotenv = require('dotenv');

dotenv.config();


const allowedOrigins = [process.env.HOST, 'http://localhost:3000'];

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors({
  origin: allowedOrigins,
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
