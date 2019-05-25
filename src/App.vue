<template>
  <div id="app">
    <game></game>
  </div>
</template>

<script>
import Game from './components/2048.vue';

export default {
  name: 'app',
  components: {
    Game,
  },
};
</script>

<style <style lang="scss">
div {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  text-align: center;
  border-radius: 5px;
}
</style>
