import {
  should,
} from 'chai';
import {
  shallowMount,
} from '@vue/test-utils';
import Score from '@/components/Score.vue';


describe('Score.vue', () => {
  before(() => {
    should();
  });

  it('renders props.title when passed', () => {
    const title = 'TEST SCORE';
    const wrapper = shallowMount(Score, {
      propsData: {
        title,
      },
    });

    wrapper.find('.score-title').text().should.to.equal(title);
  });

  it('does not render props.title when passed', () => {
    const wrapper = shallowMount(Score);
    wrapper.find('.score-title').exists().should.to.equal(false);
  });
});
