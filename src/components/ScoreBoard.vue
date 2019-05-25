<template>
  <div class="score-board-wrapper">
    <div class="target">{{ target }}</div>
    <div class="scores-right">
      <div class="scores">
        <div class="score">
          <score title="SCORE" :score="score"></score>
        </div>
        <div class="best">
          <score title="BEST" :score="bestScore"></score>
        </div>
      </div>
      <div class="button-wrapper">
        <div class="game-action-button" @click="handleClick">{{buttonText}}</div>
      </div>
    </div>
  </div>
</template>


<script>
import Score from "./Score";
import GameEnum from '../utils/GameEnum';

export default {
  props: {
    target: {
      type: Number,
      default: 2048
    },

    score: {
      type: Number,
      default: 0
    },

    bestScore: {
      type: Number,
      default: 0
    },

    gameStatus: {
      type: String,
      default: ''
    }
  },

  computed: {
    buttonText () {
      if (this.gameStatus === GameEnum.NOT_STARTED) {
        return 'Start';
      } else if (this.gameStatus === GameEnum.PLAYING) {
        return 'Restart';
      }

      return '';
    }
  },

  components: {
    Score
  },

  methods: {
    handleClick() {
      this.$emit('clickButton');
    }
  }
};
</script>

<style lang="scss" scoped>
.score-board-wrapper {
  display: flex;
  height: 85px;
  margin-bottom: 20px;
  justify-content: space-between;

  .target {
    width: 35%;
    background-color: #ebc300;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    font-size: 32px;
    font-weight: bold;
  }

  .scores-right {
    width: 55%;
    display: flex;
    flex-direction: column;

    .scores {
      height: 58%;
      display: flex;
      justify-content: space-between;
    }

    .button-wrapper {
      height: 25%;
      margin-top: 6px;

      .game-action-button {
        color: white;
        height: 30px;
        font-size: 20px;
        font-weight: bold;
        background-color: #e2975e;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;

        &:hover {
          font-size: 22px;
        }
      }
    }
  }
}
</style>

