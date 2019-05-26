<template>
  <div class="game-wrapper">
    <score-board
      @clickButton="clickButton"
      :score="gameManager.totalScore"
      :gameStatus="gameStatus"
      :target="target"
      :bestScore="gameManager.bestScore"
    ></score-board>
    <board-shadow :board="board"></board-shadow>
    <message v-if="message" :message="message"></message>
  </div>
</template>

<script>
import ScoreBoard from './ScoreBoard.vue';
import BoardShadow from './BoardShadow.vue';
import Message from './Message.vue';
import GameManager from '../utils/GameManager';
import GameEnum from '../utils/GameEnum';
import { setTimeout, clearTimeout } from 'timers';
import Storage from '@/utils/Storage';

export default {
  components: {
    ScoreBoard,
    BoardShadow,
    Message,
  },

  data() {
    const gameManager = new GameManager(new Storage());

    return {
      board: gameManager.generateBoard(),
      gameStatus: GameEnum.NOT_STARTED,
      gameManager,
      message: '',
    };
  },

  methods: {
    clickButton() {
      if (this.gameStatus === GameEnum.NOT_STARTED) {
        document.addEventListener('keydown', this.handleKeyDown);

        this.board = this.gameManager.addATile(this.board);
        this.board = this.gameManager.addATile(this.board);

        this.gameStatus = GameEnum.PLAYING;
      } else if (this.gameStatus === GameEnum.PLAYING) {
        this.board = this.gameManager.generateBoard();

        this.gameManager.maxMergedTilePoint = 0;
        this.gameManager.totalScore = 0;

        this.board = this.gameManager.addATile(this.board);
        this.board = this.gameManager.addATile(this.board);
      }
    },

    handleKeyDown(event) {
      const direction = event.code.replace('Arrow', '').toLowerCase();
      const oldBoard = this.gameManager.copyBoard(this.board);
      let newBoard;

      if (direction === GameEnum.RIGHT) {
        newBoard = this.gameManager.moveRight(this.board);
      } else if (direction === GameEnum.UP) {
        newBoard = this.gameManager.moveUp(this.board);
      } else if (direction === GameEnum.LEFT) {
        newBoard = this.gameManager.moveLeft(this.board);
      } else if (direction === GameEnum.DOWN) {
        newBoard = this.gameManager.moveDown(this.board);
      }

      if (newBoard && !this.gameManager.areSame(oldBoard, newBoard)) {
        this.board = this.gameManager.addATile(newBoard);

        if (!this.gameManager.canMove(this.board)) {
          this.gameManager.saveScore();

          this.message = `GAME OVER. Your score: ${this.gameManager.totalScore}`;
        }
      }
    },
  },

  computed: {
    target() {
      return this.gameManager.targetPoint;
    },
  },

  destroyed() {
    document.removeEventListener('keydown', this.handleKeyDown);

    clearTimeout(this.setTimeoutId);
  },

  watch: {
    target() {
      this.message = `Your new target ${this.target}`;

      clearTimeout(this.setTimeoutId);

      this.setTimeoutId = setTimeout(() => {
        this.message = '';
      }, 5000);
    },
  },
};
</script>

<style lang="scss" scoped>
.game-wrapper {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 15px;
  width: 280px;
  height: 425px;
  background-color: #f9f6ef;
}
</style>
