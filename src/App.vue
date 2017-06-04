<template>
  <div id="app">
    <router-view></router-view>
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

</style>
