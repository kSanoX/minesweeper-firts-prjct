const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

const corsOptions = {
  origin: 'https://minesweeper-firts-prjct.vercel.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.use(express.json());

app.post('/api/auth/register', (req, res) => {
  // Обработка регистрации
  res.send('User registered');
});

app.post('/api/auth/login', (req, res) => {
  // Обработка логина
  res.send('User logged in');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
