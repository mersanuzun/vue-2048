/* eslint-disable no-plusplus */
import GameEnum from './GameEnum';
import Storage from './Storage';

export default class GameManager {
  constructor() {
    this.maxMergedTilePoint = 0;
    this.totalScore = 0;
    this.targetPoint = 8;
    this.bestScore = Storage.get(GameEnum.STORAGE_KEY) || 0;
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
    const availableCells = board.flatMap((row, rowIndex) => {
      return row.reduce((result, nextRow, columnIndex) => {
        return nextRow.value === 0 ? result.concat({
          row: rowIndex,
          column: columnIndex,
        }) : result;
      }, []);
    });

    const randomIndex = Math.floor(Math.random() * availableCells.length);
    const newTilePosition = availableCells[randomIndex];

    newBoard[newTilePosition.row][newTilePosition.column].value = isTwoTile ? 2 : 4;

    return newBoard;
  }

  isBoardFull(board) {
    return board.every((row) => {
      return row.every(cell => cell.value !== 0);
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
      });
    });
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
      value: 0
    })));
  }

  rotateToRight(board, numberOfTimes) {
    const rotateToRightRecursively = (board, numOfTimes) => {
      if (typeof numOfTimes === 'undefined' || numOfTimes === 0) {
        return board;
      }

      const newBoard = this.generateBoard();

      for (let i = board.length - 1; i >= 0; i--) {
        for (let j = board[i].length - 1; j >= 0; j--) {
          newBoard[i][board.length - 1 - j] = board[j][i];
        }
      }

      return rotateToRightRecursively(newBoard, numOfTimes - 1);
    };

    return rotateToRightRecursively(board, numberOfTimes || 1);
  }

  copyBoard(board) {
    return board.map((row) => {
      return row.map(cell => Object.assign({}, cell));
    });
  }

  canMove(board) {
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        if (board[i][j].value === 0 || (j < board[j].length - 1 && board[i][j].value === board[i][
            j + 1
          ].value) ||
          (i < board[i].length - 1 && board[i][j].value === board[i + 1][j].value)) {
          return true;
        }
      }
    }

    return false;
  }

  saveScore() {
    Storage.set(GameEnum.STORAGE_KEY, this.totalScore);
  }
}
