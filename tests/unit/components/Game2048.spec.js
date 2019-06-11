import {
  should,
} from 'chai';
import {
  shallowMount,
} from '@vue/test-utils';
import Storage from '@/utils/Storage';
import GameEnum from '@/utils/GameEnum';
import GameManager from '@/utils/GameManager';
import sinon from 'sinon';
import Game2048 from '@/components/2048.vue';


describe('2048.vue', () => {
  const sandbox = sinon.createSandbox();
  let stubStorage;
  let stubGameManager;

  before(() => {
    stubStorage = sandbox.stub(Storage.prototype);
    stubGameManager = sandbox.stub(GameManager.prototype);

    should();
  });

  after(() => {
    sandbox.restore();
  });

  describe('data', () => {
    it('should return correct data', () => {
      const board = [1, 1, 1, 1];
      (typeof Game2048.data).should.to.equal('function');
    
      stubGameManager.generateBoard.returns(board);
      
      const defaultData = Game2048.data();
      
      defaultData.board.should.to.equal(board);
      defaultData.gameStatus.should.to.equal(GameEnum.NOT_STARTED);
    });
  });
});
