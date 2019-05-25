import {
  should,
} from 'chai';
import {
  shallowMount,
} from '@vue/test-utils';
import Message from '@/components/Message.vue';


describe('Message.vue', () => {
  before(() => {
    should();
  });

  it('renders props.message when passed', () => {
    const message = 'TEST';
    const wrapper = shallowMount(Message, {
      propsData: {
        message,
      },
    });

    wrapper.find('.message-wrapper').text().should.to.equal(message);
  });
});
