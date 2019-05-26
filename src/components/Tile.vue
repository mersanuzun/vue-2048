<template>
  <div class="tile" :style="backgroundStyle">{{ getValue }}</div>
</template>

<script>
import { tileColors } from '../utils/constants';

export default {
  props: {
    value: {
      type: Number,
      default: 0,
    },
  },

  computed: {
    backgroundStyle() {
      const color = [2, 4].indexOf(this.value) > -1 ? '#444444' : 'white';

      return { 'background-color': tileColors[this.value], color };
    },

    getValue() {
      return this.value ? this.value : '';
    },
  },
};
</script>


<style lang="scss" scoped>
.tile {
  width: 60px;
  height: 60px;
  margin: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 1.5rem;
  font-weight: bold;
}
</style>
