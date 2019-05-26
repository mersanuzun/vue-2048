import {
  should,
} from 'chai';
import sinon from 'sinon';
import GameManager from '@/utils/GameManager';
import Storage from '@/utils/Storage';

describe('GameManager', () => {
  let gameManager;
  let sandbox;
  let storageStub;

  const generateBoardTiles = board => board.map(row => row.map(value => ({
    value,
  })));

  before(() => {
    sandbox = sinon.createSandbox();

    storageStub = sandbox.stub(Storage.prototype);

    storageStub.get.returns(0);

    should();
  });

  beforeEach(() => {
    gameManager = new GameManager(new Storage());
  });

  afterEach(() => {
    sandbox.reset();
  });

  describe('moveRight(board)', () => {
    it('should call moveBoard methods', () => {
      const moveBoardStub = sandbox.stub(gameManager, 'moveBoard');
      const board = [];

      gameManager.moveRight(board);

      moveBoardStub.called.should.to.equal(true);
      moveBoardStub.getCall(0).args[0].should.to.equal(board);
    });
  });

  describe('moveUp(board)', () => {
    it('should call rotateToRight(board), moveBoard(newBoard) and rotateToRight(newBoard, 3)',
      () => {
        const board = [];
        const rotateToRightStub = sandbox.stub(gameManager, 'rotateToRight').returns([]);
        const moveBoardStub = sandbox.stub(gameManager, 'moveBoard').returns([]);

        gameManager.moveUp(board);

        rotateToRightStub.calledTwice.should.to.equal(true);
        rotateToRightStub.getCall(0).args[0].should.to.deep.equal([]);
        rotateToRightStub.getCall(1).args[0].should.to.deep.equal([]);
        rotateToRightStub.getCall(1).args[1].should.to.equal(3);

        moveBoardStub.called.should.to.equal(true);
        moveBoardStub.getCall(0).args[0].should.deep.equal([]);
      });
  });

  describe('moveLeft(board)', () => {
    it('should call rotateToRight(board, 2), moveBoard(newBoard) and rotateToRight(newBoard, 2)',
      () => {
        const board = [];
        const rotateToRightStub = sandbox.stub(gameManager, 'rotateToRight').returns([]);
        const moveBoardStub = sandbox.stub(gameManager, 'moveBoard').returns([]);

        gameManager.moveLeft(board);

        rotateToRightStub.calledTwice.should.to.equal(true);
        rotateToRightStub.getCall(0).args[0].should.to.deep.equal([]);
        rotateToRightStub.getCall(0).args[1].should.to.equal(2);
        rotateToRightStub.getCall(1).args[0].should.to.deep.equal([]);
        rotateToRightStub.getCall(1).args[1].should.to.equal(2);

        moveBoardStub.called.should.to.equal(true);
        moveBoardStub.getCall(0).args[0].should.deep.equal([]);
      });
  });

  describe('moveDown(board)', () => {
    it('should call rotateToRight(board, 3), moveBoard(newBoard) and rotateToRight(newBoard, 1)',
      () => {
        const board = [];
        const rotateToRightStub = sandbox.stub(gameManager, 'rotateToRight').returns([]);
        const moveBoardStub = sandbox.stub(gameManager, 'moveBoard').returns([]);

        gameManager.moveDown(board);

        rotateToRightStub.calledTwice.should.to.equal(true);
        rotateToRightStub.getCall(0).args[0].should.to.deep.equal([]);
        rotateToRightStub.getCall(0).args[1].should.to.equal(3);
        rotateToRightStub.getCall(1).args[0].should.to.deep.equal([]);
        rotateToRightStub.getCall(1).args[1].should.to.equal(1);

        moveBoardStub.called.should.to.equal(true);
        moveBoardStub.getCall(0).args[0].should.deep.equal([]);
      });
  });

  describe('moveBoad(board)', () => {
    it('should call slideToRightRow(row), merge(newRow) and slideToRight(newRow)', () => {
      const board = [
        [1, 0, 2, 3],
      ];
      const newRow = [0, 1, 2, 3];
      const slideToRightRowStub = sandbox.stub(gameManager, 'slideToRightRow').returns(
        newRow,
      );
      const mergeBoardStub = sandbox.stub(gameManager, 'merge').returns(newRow);

      gameManager.moveBoard(board);

      slideToRightRowStub.calledTwice.should.to.equal(true);
      slideToRightRowStub.getCall(0).args[0].should.deep.equal(board[0]);
      slideToRightRowStub.getCall(1).args[0].should.deep.equal(newRow);
      mergeBoardStub.getCall(0).args[0].should.deep.equal(newRow);
    });
  });

  describe('addATile(board)', () => {
    let mathStub;

    before(() => {
      mathStub = sandbox.stub(Math);
    });

    afterEach(() => {

    });

    it('should return newBoard with added 2 point new tile if chance gets less than %85', () => {
      const board = generateBoardTiles([[0, 2, 2, 2]]);
      const newBoardWithATile = generateBoardTiles([[2, 2, 2, 2]]);

      mathStub.random.returns(0.5);
      mathStub.floor.withArgs(0.5).returns(0);
      const newBoard = gameManager.addATile(board);

      newBoard.should.deep.equal(newBoardWithATile);
    });

    it('should return newBoard with added 4 point new tile if chance gets more than %85', () => {
      const board = generateBoardTiles([[0, 2, 2, 2]]);
      const newBoardWithATile = generateBoardTiles([[4, 2, 2, 2]]);

      mathStub.random.returns(0.95);
      mathStub.floor.withArgs(0.95).returns(0);
      const newBoard = gameManager.addATile(board);

      newBoard.should.deep.equal(newBoardWithATile);
    });

    it('should return false if there is no available cell', () => {
      const board = generateBoardTiles([[2, 2, 2, 2]]);

      mathStub.random.returns(0.95);
      mathStub.floor.withArgs(0.95).returns(0);
      const newBoard = gameManager.addATile(board);

      newBoard.should.to.equal(false);
    });
  });

  describe('slideToRightRow', () => {
    it('should return a array with zeros are in left other numbers are in right of the array', () => {
      const board = generateBoardTiles([[2, 0, 2, 0]]);
      const newBoard = generateBoardTiles([[0, 0, 2, 2]]);

      const newRow = gameManager.slideToRightRow(board[0]);

      newRow.should.deep.equal(newBoard[0]);
    });
  });

  describe('areSame', () => {
    it('should true if given boards are same', () => {
      const boardOne = generateBoardTiles([[2, 0, 2, 0], [2, 0, 2, 0]]);
      const boardTwo = generateBoardTiles([[2, 0, 2, 0], [2, 0, 2, 0]]);

      const areSame = gameManager.areSame(boardOne, boardTwo);

      areSame.should.to.equal(true);
    });

    it('should false if given boards are not same', () => {
      const boardOne = generateBoardTiles([[2, 0, 2, 0], [2, 0, 2, 0]]);
      const boardTwo = generateBoardTiles([[4, 0, 2, 0], [2, 0, 2, 0]]);

      const areSame = gameManager.areSame(boardOne, boardTwo);

      areSame.should.to.equal(false);
    });
  });

  describe('merge', () => {
    it('should return merged new array, if array has same values side by side', () => {
      const board = generateBoardTiles([[0, 0, 2, 2]]);
      const mergedBoard = generateBoardTiles([[0, 0, 0, 4]]);

      const newRow = gameManager.merge(board[0]);

      newRow.should.deep.equal(mergedBoard[0]);
      gameManager.totalScore.should.deep.equal(4);
    });

    it('should return not merged new array, if array has same values but not side by side', () => {
      const board = generateBoardTiles([[0, 2, 0, 2]]);

      const newRow = gameManager.merge(board[0]);

      newRow.should.deep.equal(board[0]);
    });

    it('should return not merged new array, if array has not same values side by side', () => {
      const board = generateBoardTiles([[0, 0, 4, 2]]);

      const newRow = gameManager.merge(board[0]);

      newRow.should.deep.equal(board[0]);
    });

    it('should update "maxMergedTilePoint" if mergedPoint is greater than it', () => {
      const board = generateBoardTiles([[0, 0, 8, 8]]);

      gameManager.merge(board[0]);

      gameManager.maxMergedTilePoint.should.to.equal(16);
    });

    it('should multiply "maxMergedTilePoint" with 2 if "maxMergedTilePoint" is equal "targetPoint"', () => {
      const board = generateBoardTiles([[0, 0, 8, 8]]);

      gameManager.targetPoint = 16;

      gameManager.merge(board[0]);

      gameManager.targetPoint.should.to.equal(32);
    });
  });

  describe('canMove(board)', () => {
    it('should return true if board has any empty tile in board center', () => {
      const board = [
        [22, 33, 44, 55],
        [66, 0, 88, 99],
        [10, 11, 12, 13],
        [14, 15, 16, 17],
      ];

      gameManager.canMove(generateBoardTiles(board)).should.to.equal(true);
    });

    it('should return true if row has any same values in board', () => {
      const board = [
        [22, 33, 44, 44],
        [66, 77, 88, 99],
        [10, 11, 12, 13],
        [14, 15, 16, 17],
      ];

      gameManager.canMove(generateBoardTiles(board)).should.to.equal(true);
    });

    it('should return true if column has any same values in board', () => {
      const board = [
        [22, 33, 44, 55],
        [66, 77, 88, 99],
        [10, 11, 12, 13],
        [10, 15, 16, 17],
      ];

      gameManager.canMove(generateBoardTiles(board)).should.to.equal(true);
    });

    it('should return true if column has any same values in end of the board', () => {
      const board = [
        [22, 33, 44, 55],
        [66, 77, 88, 99],
        [10, 11, 12, 13],
        [14, 15, 16, 13],
      ];

      gameManager.canMove(generateBoardTiles(board)).should.to.equal(true);
    });

    it('should return false if column does not have any empty tile', () => {
      const board = [
        [22, 33, 44, 55],
        [66, 77, 88, 99],
        [10, 11, 12, 13],
        [14, 15, 16, 17],
      ];

      gameManager.canMove(generateBoardTiles(board)).should.to.equal(false);
    });
  });
});
