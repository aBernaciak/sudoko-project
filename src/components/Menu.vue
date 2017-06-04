<template>
  <div id="game-menu">
    <ul>
      <li><router-link to="/game/easy">Start Game - easy</router-link></li>
      <li><router-link to="/game/hard">Start Game - hard</router-link></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'GameMenu',
  props: [],
  data() {
    return {
    }
  },
  methods: {
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

</style>
