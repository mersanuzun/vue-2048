<template>
  <div class="score-wrapper">
    <div class="score-title" v-if="title">{{title}}</div>
    <div class="score">{{score}}</div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ""
    },
    score: {
      type: Number,
      default: 0
    }
  }
};
</script>

<style lang="scss" scoped>
.score-wrapper {
  background-color: #b9ab9e;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  color: white;

  div {
    width: 72px;
  }

  .score-title {
    font-size: 12px;
  }

  .score {
    font-weight: bold;
  }
}
</style>

