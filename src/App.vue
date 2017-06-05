<template>
  <div id="app" class="container">
    <img src="./assets/sudoku-logo.png">
    <div class="router-view">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import GameMenu from './components/Menu.vue';

export default {
  name: 'app',
  components: {
    GameMenu
  },
  data() {
    return {
    };
  },
  methods: {
  },
}
</script>

<style lang="scss">
  body {
    background-color: #B7E5F5;
    text-align: center;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
  }
  a {
    text-decoration: none;
    &:active, &:focus, &:visited, &:hover {
      color: inherit;
      text-decoration: none;
    }
  } 
  img {
    max-width: 100%;
    max-height: 100%;
  }
  strong {
    font-weight: 700;
  }
  .main-button {
    text-transform: uppercase;
    font-size: 24px;
    border: 2px solid rgba(50, 149, 183, 0.8);
    border-radius: 5px;
    color: rgba(50, 149, 183, 0.8);
    margin-bottom: 15px;
    background: inherit;
    font-weight: 700;
    a {
      padding: 15px 20px;
      display: inline-block;
    }
  }
  .router-view {
    margin-top: 30px;
  }
</style>
