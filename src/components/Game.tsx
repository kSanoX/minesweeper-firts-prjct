// components/Game.tsx
import React, { useState, useEffect } from 'react';
import { TSquare } from '../types';
import { createBoard, randomizeMines, getMinesAround } from '../utils/helper';
import NotificationModal from './NotificationModal';
import axios from 'axios';
import { useAuth } from './AuthContext';

interface GameProps {
  difficulty: string;
}

const Game: React.FC<GameProps> = ({ difficulty }) => {
  const [squares, setSquares] = useState<TSquare[][]>([]);
  const [time, setTime] = useState(0);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [rows, setRows] = useState(20);
  const [cols, setCols] = useState(20);
  const [mines, setMines] = useState(50);
  const [showMines, setShowMines] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState<string | null>(null);
  const { username } = useAuth();

  const init = (rows: number, cols: number, mines: number) => {
    let squares = createBoard(rows, cols);
    squares = randomizeMines(squares, mines);
    squares = getMinesAround(squares);

    setTime(0); // Сброс таймера
    setIsGameStarted(false); // Сброс состояния начала игры
    setIsGameOver(false); // Сброс состояния окончания игры
    setShowMines(false);
    setNotificationMessage(null); // Сброс сообщения уведомления

    return squares;
  };

  

  useEffect(() => {
    switch (difficulty) {
      case 'easy':
        setRows(10);
        setCols(10);
        setMines(10);
        break;
      case 'medium':
        setRows(20);
        setCols(20);
        setMines(30);
        break;
      case 'hard':
        setRows(30);
        setCols(30);
        setMines(9);
        break;
      default:
        break;
    }
  }, [difficulty]);

  useEffect(() => {
    setSquares(init(rows, cols, mines));
  }, [rows, cols, mines]);

  const saveGameResult = async (username: string, time: number, difficulty: string) => {
    try {
      await axios.post('http://localhost:5000/api/game-results', {
        username,
        time,
        difficulty
      });
      console.log('Game result saved successfully');
    } catch (error) {
      console.error('Error saving game result:', error);
    }
  };
  

  useEffect(() => {
    let timer: NodeJS.Timeout | undefined;
    if (isGameStarted && !isGameOver) {
      timer = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    } else if (isGameOver) {
      clearInterval(timer);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isGameStarted, isGameOver]);

  const reveal = (rowIdx: number, colIdx: number) => {
    if (squares[rowIdx][colIdx].isRevealed || squares[rowIdx][colIdx].isFlagged) {
      return;
    }

    if (squares[rowIdx][colIdx].hasBomb) {
      setNotificationMessage(`Game Over! Time: ${time}s`);
      setIsGameOver(true);
      setShowMines(true);
      return;
    }

    const stack = [{ rowIdx, colIdx }];

    while (stack.length > 0) {
      const { rowIdx, colIdx } = stack.pop()!;

      const currentCell = squares[rowIdx][colIdx];
      if (!currentCell.isRevealed) {
        currentCell.isRevealed = true;

        if (!currentCell.hasBomb && currentCell.neighborBombs === 0) {
          // Add adjacent non-mine cells to the stack
          for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
              const newRow = rowIdx + i;
              const newCol = colIdx + j;
              if (
                newRow >= 0 &&
                newRow < rows &&
                newCol >= 0 &&
                newCol < cols &&
                !squares[newRow][newCol].hasBomb &&
                !squares[newRow][newCol].isRevealed
              ) {
                stack.push({ rowIdx: newRow, colIdx: newCol });
              }
            }
          }
        }
      }
    }
    setSquares([...squares]);
    if (!isGameStarted) setIsGameStarted(true);
  };

  const setFlag = (e: React.MouseEvent<HTMLDivElement>, rowIdx: number, colIdx: number) => {
    e.preventDefault();
    if (squares[rowIdx][colIdx].isRevealed) return;

    const newSquares = [...squares];
    newSquares[rowIdx][colIdx].isFlagged = !newSquares[rowIdx][colIdx].isFlagged;

    setSquares(newSquares);
  };

  useEffect(() => {
    const revealed = squares.reduce((acc, row) => {
      acc += row.reduce((acc2, sq) => {
        acc2 += sq.isRevealed ? 1 : 0;
        return acc2;
      }, 0);
      return acc;
    }, 0);

    if (revealed === rows * cols - mines) {
      setNotificationMessage(`You won! Time: ${time}s`);
      if (username) {
        saveGameResult(username, time, difficulty);
      }
      setIsGameOver(true);
      setShowMines(true);
      return;
    }
  }, [squares, rows, cols, mines, time, difficulty]);

  const handleCloseNotification = () => {
    setNotificationMessage(null);
    setSquares(init(rows, cols, mines));
  };

  return (
    <>
      <div>Time: {time}<span className='time'>s</span></div>
      {notificationMessage && (
        <NotificationModal
          message={notificationMessage}
          onClose={handleCloseNotification}
        />
      )}
      {squares.map((row, rowIdx) => (
        <div key={rowIdx} className="row">
          {row.map((square, colIdx) => (
            <div
              key={colIdx}
              className={`square ${square.isRevealed ? 'square--revealed' : ''}`}
              data-value={square.neighborBombs}
              onClick={() => reveal(rowIdx, colIdx)}
              onContextMenu={(e) => setFlag(e, rowIdx, colIdx)}
            >
              {square.isRevealed && square.neighborBombs !== 0
                ? square.neighborBombs
                : ''}
              {square.isFlagged && !square.isRevealed ? '🚩' : ''}
              {(square.isRevealed || showMines) && square.hasBomb ? '💣' : ''}
            </div>
          ))}
        </div>
      ))}
    </>
  );
};

export default Game;
