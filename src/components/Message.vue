<template>
  <div class="message-wrapper">
    <span>{{message}}</span>
  </div>
</template>

<script>
export default {
  props: {
    message: {
      type: String,
      default: '',
    },
  },
};
</script>

<style lang="scss" scoped>
.message-wrapper {
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  -webkit-transition: 2s;

  span {
    font-weight: bold;
    font-size: 18px;
  }
}
</style>
