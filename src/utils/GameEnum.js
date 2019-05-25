class GameEnum {
  constructor() {
    this.RIGHT = 'right';
    this.LEFT = 'left';
    this.UP = 'up';
    this.DOWN = 'down';
    this.NOT_STARTED = 'notStarted';
    this.PLAYING = 'playing';
    this.FINISHED = 'finished';
    this.STORAGE_KEY = '2048game';
  }
}

export default new GameEnum();