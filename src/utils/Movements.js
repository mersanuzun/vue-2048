import GameEnum from './GameEnum';
import gameManager from './GameManager';

export const rightMove = (direction, board) => {
  if (direction === GameEnum.RIGHT) {
    return board.map(row => {
      let newRow = gameManager.slideToRightRow(row);
      newRow = gameManager.merge(newRow);

      return gameManager.slideToRightRow(newRow);
    });
  }

  return board;
};

export const upMove = (direction, board) => {
  if (direction === GameEnum.UP) {
    let newBoard = gameManager.rotateToRight(board);

    newBoard = gameManager.move(direction, move);

    newBoard = gameManager.rotateToRight(newBoard, 3);

    return newBoard;
  }

  return board;
};

export const leftMove = (direction, board) => {
  if (direction === GameEnum.LEFT) {
    let newBoard = gameManager.rotateToRight(board, 2);

    newBoard = gameManager.move(direction, move);

    newBoard = gameManager.rotateToRight(newBoard, 2);

    return newBoard;
  }

  return board;
};

export const downMove = (direction, board) => {
  if (direction === GameEnum.DOWN) {
    let newBoard = gameManager.rotateToRight(board, 3);

    newBoard = gameManager.move(direction, move);

    newBoard = gameManager.rotateToRight(newBoard, 1);

    return newBoard;
  }

  return board;
}