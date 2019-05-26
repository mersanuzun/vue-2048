<template>
  <div class="board-wrapper">
    <div v-for="(row, rowIndex) in board" :key="rowIndex" class="row">
      <tile
        v-for="(cell, cellIndex) in row"
        :key="rowIndex + cellIndex"
        :value="cell.value"
      ></tile>
    </div>
  </div>
</template>

<script>
import Tile from './Tile';

export default {
  components: {
    Tile,
  },

  props: {
    board: {
      type: Array,
    },
  },
};
</script>


<style lang="scss" scoped>
.board-wrapper {
  display: flex;
  flex-direction: column;
  background-color: #b8ac9d;
  display: flex;

  .row {
    display: flex;

    .empty-cell {
      width: 60px;
      height: 60px;
      background-color: #cabeb2;
      margin: 5px;
      display: flex;
      justify-content: center;
      align-items: center;
      color: white;
      font-size: 1.5rem;
      font-weight: bold;
    }
  }
}
</style>
