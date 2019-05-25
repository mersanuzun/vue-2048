import GameEnum from './GameEnum';
import storage from './Storage';

export default class GameManager {
  constructor() {
    this.maxMergedTilePoint = 0;
    this.totalScore = 0;
    this.targetPoint = 2048;
    this.bestScore = storage.get(GameEnum.STORAGE_KEY) || 0;
  }

  moveRight(board) {
    return this._move(board);
  }

  moveUp(board) {
    let newBoard = this.rotateToRight(board);

    newBoard = this._move(newBoard);

    return this.rotateToRight(newBoard, 3);
  }

  moveLeft(board) {
    let newBoard = this.rotateToRight(board, 2);

    newBoard = this._move(newBoard);

    return this.rotateToRight(newBoard, 2);
  }

  moveDown(board) {
    let newBoard = this.rotateToRight(board, 3);

    newBoard = this._move(newBoard);

    return this.rotateToRight(newBoard, 1);
  }

  _move(board) {
    const newBoard = board.map(row => {
      let newRow = this.slideToRightRow(row);

      newRow = this.merge(newRow);

      return this.slideToRightRow(newRow);
    });

    if (this.maxMergedTilePoint === this.targetPoint) {
      this.targetPoint *= 2;
    }

    return newBoard;
  }

  addATile(board) {
    const newBoard = board.slice(0);
    const availableCells = board.flatMap((row, rowIndex) => {
      return row.reduce((result, nextRow, columnIndex) => {
        return nextRow.value === 0 ? result.concat({
          r: rowIndex,
          c: columnIndex
        }) : result;
      }, []);
    });
    const randomIndex = Math.floor(Math.random() * availableCells.length);
    const newTilePosition = availableCells[randomIndex];

    newBoard[newTilePosition.r][newTilePosition.c].value = 2;

    return newBoard;
  }

  isBoardFull(board) {
    return board.every((row) => {
      return row.every((cell) => cell.value !== 0);
    });
  }

  slideToRightRow(row) {
    return row.reduce((result, cell) => {
      return cell.value === 0 ? [cell].concat(result) : result.concat(cell);
    }, []);
  }

  areSame(board, newBoard) {
    return newBoard.every((newBoardRow, rowIndex) => {
      return newBoardRow.every((cell, columnIndex) => {
        return cell.value === board[rowIndex][columnIndex].value;
      })
    })
  }

  merge(row) {
    const newRow = row.slice(0);

    for (let i = newRow.length - 1; i > 0; i--) {
      const currentCell = newRow[i];
      const nextCell = newRow[i - 1];

      if (nextCell.value === currentCell.value) {
        const mergedPoint = currentCell.value + nextCell.value;

        this.totalScore += mergedPoint;

        if (mergedPoint > this.maxMergedTilePoint) {
          this.maxMergedTilePoint = mergedPoint;
        }

        currentCell.value = mergedPoint;
        nextCell.value = 0;
      }
    }

    return newRow;
  }

  generateBoard() {
    return [...Array(4).keys()].map(_ =>
      [...Array(4).keys()].map(_ => ({
        value: 0
      }))
    );
  }

  rotateToRight(board, numberOfTimes) {
    const rotateToRightRecursively = (board, numberOfTimes) => {
      if (typeof numberOfTimes === 'undefined' || numberOfTimes === 0) {
        return board;
      }

      const newBoard = this.generateBoard();

      for (let i = board.length - 1; i >= 0; i--) {
        for (let j = board[i].length - 1; j >= 0; j--) {
          newBoard[i][board.length - 1 - j] = board[j][i];
        }
      }

      return rotateToRightRecursively(newBoard, numberOfTimes - 1);
    };

    return rotateToRightRecursively(board, numberOfTimes || 1);
  }

  copyBoard(board) {
    return board.map((row) => {
      return row.map((cell) => ({ value: cell.value }));
    })
  }

  canMove(board) {
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        if (board[i][j].value === 0 || (j < board[i].length) || board[i][j] === board[i][j + 1] || (i < board.length - 1 && board[i][j] === board[i + 1][j])) {
          return true;
        }
      }
    }

    return false;
  }
};
