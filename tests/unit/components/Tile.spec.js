import {
  should,
} from 'chai';
import {
  shallowMount,
} from '@vue/test-utils';
import Tile from '@/components/Tile.vue';

describe('Tile.vue', () => {
  before(() => {
    should();
  });

  it('renders props.value when passed', () => {
    const value = 2;
    const wrapper = shallowMount(Tile, {
      propsData: {
        value,
      },
    });

    wrapper.text().should.to.include(value);
  });

  describe('computed', () => {
    describe('backgroundStyle', () => {
      it('should return white color if value is different from 2 or 4', () => {
        const localThis = {
          value: 8,
        };

        Tile.computed.backgroundStyle.call(localThis).color
          .should.to.equal('white');
      });

      it('should return #444444 color if value is 2 or 4', () => {
        const localThis = {
          value: 2,
        };

        Tile.computed.backgroundStyle.call(localThis).color
          .should.to.equal('#444444');
      });

      it('should return #EA8C4B for "background-color" if value is 16', () => {
        const localThis = {
          value: 16,
        };

        Tile.computed.backgroundStyle.call(localThis)['background-color']
          .should.to.equal('#EA8C4B');
      });
    });

    describe('getValue', () => {
      it('should return given value if value is different from 0', () => {
        const localThis = {
          value: 2,
        };

        Tile.computed.getValue.call(localThis).should.to.equal(2);
      });

      it('should return empty string value if value is 0', () => {
        const localThis = {
          value: 0,
        };

        Tile.computed.getValue.call(localThis).should.to.equal('');
      });
    });
  });
});
