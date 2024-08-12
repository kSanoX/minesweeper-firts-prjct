import { TSquare } from "../types";

export const createBoard = (rows: number, cols: number): TSquare[][] => {
  return new Array(rows).fill(null).map(() =>
    new Array(cols).fill(null).map(() => ({
      isRevealed: false,
      isFlagged: false,
      hasBomb: false,
      neighborBombs: 0,
    }))
  );
};

export const randomizeMines = (squares: TSquare[][], mines: number) => {
  const rows = squares.length;
  const cols = squares[0].length;

  let distinctNumbers = new Set<number>(); // ініціалізація мін

  while (distinctNumbers.size < mines) {
    let number = Math.floor(Math.random() * rows * cols);
    distinctNumbers.add(number);
  }

  Array.from(distinctNumbers).forEach((num) => {
    const row = Math.floor(num / rows);
    const col = Math.floor(num % cols);

    squares[row][col].hasBomb = true;
  });

  return squares;
};

export const getMinesAround = (squares: TSquare[][]) => {
  for (let i = 0; i < squares.length; i++) {
    for (let j = 0; j < squares[0].length; j++) {
      if (squares[i][j].hasBomb) continue;

      let bombs = 0;
      for (let k = i - 1; k <= i + 1; k++) {
        for (let l = j - 1; l <= j + 1; l++) {
          if (squares?.[k]?.[l]?.hasBomb) bombs++;
        }
      }
      squares[i][j].neighborBombs = bombs;
    }
  }
  return squares;
};
