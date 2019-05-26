/* eslint-disable no-plusplus */
import GameEnum from './GameEnum';

export default class GameManager {
  constructor(storage) {
    this.maxMergedTilePoint = 0;
    this.totalScore = 0;
    this.targetPoint = 2048;
    this.storage = storage;
    this.bestScore = storage.get(GameEnum.STORAGE_KEY) || 0;
  }

  moveRight(board) {
    return this.moveBoard(board);
  }

  moveUp(board) {
    let newBoard = this.rotateToRight(board);

    newBoard = this.moveBoard(newBoard);

    return this.rotateToRight(newBoard, 3);
  }

  moveLeft(board) {
    let newBoard = this.rotateToRight(board, 2);

    newBoard = this.moveBoard(newBoard);

    return this.rotateToRight(newBoard, 2);
  }

  moveDown(board) {
    let newBoard = this.rotateToRight(board, 3);

    newBoard = this.moveBoard(newBoard);

    return this.rotateToRight(newBoard, 1);
  }

  moveBoard(board) {
    const newBoard = board.map((row) => {
      let newRow = this.slideToRightRow(row);

      newRow = this.merge(newRow);

      return this.slideToRightRow(newRow);
    });

    return newBoard;
  }

  addATile(board) {
    const newBoard = board.slice(0);
    const isTwoTile = Math.random() < 0.85;
    const availableCells = board.flatMap((row, rowIndex) =>
      row.reduce((result, nextRow, columnIndex) => (nextRow.value === 0 ? result.concat({
        row: rowIndex,
        column: columnIndex,
      }) : result), []));

    if (availableCells.length === 0) {
      return false;
    }

    const randomIndex = Math.floor(Math.random() * availableCells.length);
    const newTilePosition = availableCells[randomIndex];

    newBoard[newTilePosition.row][newTilePosition.column].value = isTwoTile ? 2 : 4;

    return newBoard;
  }

  slideToRightRow(row) {
    return row.reduce((result, cell) =>
      (cell.value === 0 ? [cell].concat(result) : result.concat(cell)), []);
  }

  areSame(board, newBoard) {
    return newBoard.every((newBoardRow, rowIndex) =>
      newBoardRow.every((cell, columnIndex) => cell.value === board[rowIndex][columnIndex].value));
  }

  merge(row) {
    const newRow = row.slice(0);

    // eslint-disable-next-line no-plusplus
    for (let i = newRow.length - 1; i > 0; i--) {
      const currentCell = newRow[i];
      const nextCell = newRow[i - 1];

      if (nextCell.value === currentCell.value) {
        const mergedPoint = currentCell.value + nextCell.value;

        this.totalScore += mergedPoint;

        if (mergedPoint > this.maxMergedTilePoint) {
          this.maxMergedTilePoint = mergedPoint;
        }

        if (this.maxMergedTilePoint === this.targetPoint) {
          this.targetPoint *= 2;
        }

        currentCell.value = mergedPoint;
        nextCell.value = 0;
      }
    }

    return newRow;
  }

  generateBoard() {
    return [...Array(4).keys()].map(_ => [...Array(4).keys()].map(_ => ({
      value: 0,
    })));
  }

  rotateToRight(board, numberOfTimes) {
    const rotateToRightRecursively = (rotatedBoard, numOfTimes) => {
      if (typeof numOfTimes === 'undefined' || numOfTimes === 0) {
        return rotatedBoard;
      }

      const newBoard = this.generateBoard();

      for (let i = rotatedBoard.length - 1; i >= 0; i--) {
        for (let j = rotatedBoard[i].length - 1; j >= 0; j--) {
          newBoard[i][rotatedBoard.length - 1 - j] = rotatedBoard[j][i];
        }
      }

      return rotateToRightRecursively(newBoard, numOfTimes - 1);
    };

    return rotateToRightRecursively(board, numberOfTimes || 1);
  }

  copyBoard(board) {
    return board.map(row => row.map(cell => Object.assign({}, cell)));
  }

  canMove(board) {
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        if (board[i][j].value === 0 || (j < board[j].length - 1 && board[i][j].value === board[i][
          j + 1
        ].value)
          || (i < board[i].length - 1 && board[i][j].value === board[i + 1][j].value)) {
          return true;
        }
      }
    }

    return false;
  }

  saveScore() {
    this.storage.set(GameEnum.STORAGE_KEY, this.totalScore);
  }
}
