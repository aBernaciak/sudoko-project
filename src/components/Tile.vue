<template>
  <div id="tile">
    <input type="number"
      v-if="this.data == null"
      v-on:keyup.enter="showConfirm($event)"
      v-on:blur="showConfirm($event)">
    <span v-else-if="data > 0">
      {{ data }}
    </span>
    <span v-else class="added-by-user">
      {{ data }}
    </span>
<!--     <span v-else class="bomb-container">
      <i class="fa fa-bomb" aria-hidden="true"></i>
    </span> -->
  </div>
</template>

<script>
export default {
  name: 'tile',
  props: ['data', 'indexy', 'indexx', 'state'],
  data() {
    return {
      computedIndexY: this.indexy,
      computedIndexX: this.indexx
    }
  },
  methods: {
    showConfirm(event) {
      if(event.target.value != '') {
        this.$emit('entered', { tileValue: event.target.value,
                                tileIndexX: this.computedIndexX, 
                                tileIndexY: this.computedIndexY })
      }
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .box-container .bomb-container {
    background: red;
  }
  .added-by-user {
    opacity: 0.8;
  }
</style>
