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

  const generateBoardTiles = (board) => {
    return board.map(row => row.map(value => ({
      value,
    })));
  };

  before(() => {
    sandbox = sinon.createSandbox();

    storageStub = sandbox.stub(Storage);

    should();
  });

  beforeEach(() => {
    gameManager = new GameManager();
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
        [1, 0, 2, 3]
      ];
      const newRow = [0, 1, 2, 3];
      const slideToRightRowStub = sandbox.stub(gameManager, 'slideToRightRow').returns(
        newRow);
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

    beforeEach(() => {
      mathStub = sandbox.stub(Math);
    });

    it('should return newBoard with added new tile', () => {
      
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
