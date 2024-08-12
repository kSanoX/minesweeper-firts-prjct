import React, { useState } from 'react';
import './styles/style.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import PrivateRoute from './components/PrivateRoute';
import { AuthProvider } from './components/AuthContext';
import UserMenu from './components/UserMenu';
import Game from './components/Game'; // Новый компонент Game
import SettingsModal from './components/SettingsModal';
import Leaderboard from './components/Leaderboard'; // Новый компонент Leaderboard

export default function App() {
  const [showModal, setShowModal] = useState(false);
  const [difficulty, setDifficulty] = useState('easy');

  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <nav className='nav-container'>
            <Link to="/register" className='nav-link'>Register</Link>
            <Link to="/login" className='nav-link'>Login</Link>
            <Link to="/game" className='nav-link'>Game</Link>
            <Link to="/leaderboard" className='nav-link'>Leaderboard</Link> {/* Добавляем ссылку на Leaderboard */}
            <button className='btn-new' onClick={() => setShowModal(true)}>Settings</button>
            <UserMenu />
          </nav>

          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/game" element={
              <PrivateRoute>
                <Game difficulty={difficulty} /> {/* Передаем difficulty в Game */}
              </PrivateRoute>
            } />
            <Route path="/leaderboard" element={<Leaderboard />} /> {/* Добавляем маршрут для Leaderboard */}
          </Routes>

          {showModal && (
            <SettingsModal
              onClose={() => setShowModal(false)}
              onDifficultyChange={(newDifficulty) => setDifficulty(newDifficulty)} // Обработчик изменения сложности
            />
          )}
        </div>
      </Router>
    </AuthProvider>
  );
}
