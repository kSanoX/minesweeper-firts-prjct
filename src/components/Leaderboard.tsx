// src/components/Leaderboard.tsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface GameResult {
  username: string;
  time: number;
  difficulty: string;
  date: string;
}

const Leaderboard: React.FC = () => {
  const [easyResults, setEasyResults] = useState<GameResult[]>([]);
  const [mediumResults, setMediumResults] = useState<GameResult[]>([]);
  const [hardResults, setHardResults] = useState<GameResult[]>([]);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/game-results');
        setEasyResults(response.data.easyResults);
        setMediumResults(response.data.mediumResults);
        setHardResults(response.data.hardResults);
      } catch (error) {
        console.error('Error fetching game results:', error);
      }
    };

    fetchResults();
  }, []);

  return (
    <div>
      <h2>Leaderboard</h2>

      <h3>Easy</h3>
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Time (s)</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {easyResults.map((result, index) => (
            <tr key={index}>
              <td>{result.username}</td>
              <td>{result.time}</td>
              <td>{new Date(result.date).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>Medium</h3>
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Time (s)</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {mediumResults.map((result, index) => (
            <tr key={index}>
              <td>{result.username}</td>
              <td>{result.time}</td>
              <td>{new Date(result.date).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>Hard</h3>
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Time (s)</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {hardResults.map((result, index) => (
            <tr key={index}>
              <td>{result.username}</td>
              <td>{result.time}</td>
              <td>{new Date(result.date).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
 
export default Leaderboard;
