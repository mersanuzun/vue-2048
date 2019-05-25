import {
  should,
} from 'chai';
import {
  shallowMount,
} from '@vue/test-utils';
import ScoreBoard from '@/components/ScoreBoard.vue';
import Score from '@/components/Score.vue';
import GameEnum from '@/utils/GameEnum';

describe('ScoreBoard.vue', () => {
  before(() => {
    should();
  });

  it('renders props.target when passed', () => {
    const target = 2048;
    const wrapper = shallowMount(ScoreBoard, {
      propsData: {
        target,
      },
    });

    wrapper.find('.target').text().should.to.equal(target.toString());
  });

  it('renders 2048 props.target when not passed', () => {
    const wrapper = shallowMount(ScoreBoard);
    const defaultTarget = 2048;

    wrapper.find('.target').text().should.to.equal(defaultTarget.toString());
  });

  it('renders two Score component', () => {
    const score = 2048;
    const bestScore = 5000;
    const wrapper = shallowMount(ScoreBoard, {
      propsData: {
        score,
        bestScore,
      },
    });

    const scoreComponents = wrapper.findAll(Score);

    scoreComponents.length.should.to.equal(2);
    scoreComponents.at(0).props().score.should.to.equal(score);
    scoreComponents.at(0).props().title.should.to.equal('SCORE');
    scoreComponents.at(1).props().score.should.to.equal(bestScore);
    scoreComponents.at(1).props().title.should.to.equal('BEST');
  });

  describe('computed', () => {
    describe('buttonText', () => {
      it(`should return "Start" if gameStatus is ${GameEnum.NOT_STARTED}`, () => {
        const localThis = {
          gameStatus: GameEnum.NOT_STARTED,
        };

        ScoreBoard.computed.buttonText.call(localThis).should.to.equal('Start');
      });

      it(`should return "Restart" if gameStatus is ${GameEnum.PLAYING}`, () => {
        const localThis = {
          gameStatus: GameEnum.PLAYING,
        };

        ScoreBoard.computed.buttonText.call(localThis).should.to.equal('Restart');
      });
    });
  });

  describe('methods', () => {
    describe('handleClick', () => {
      it('should emit "clickButton"', () => {
        const wrapper = shallowMount(ScoreBoard);

        wrapper.find('.game-action-button').trigger('click');

        wrapper.emitted().clickButton.length.should.to.equal(1);
      });
    });
  });
});
