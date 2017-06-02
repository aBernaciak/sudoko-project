<template>
  <div id="tile">
    <input type="number"
      v-on:keyup.enter="showConfirm($event)"
      v-on:blur="showConfirm($event)"
      v-if="this.data == 0">
    <span v-else-if="this.data > 0">
      {{ this.data }}
    </span>
    <span v-else>
      <i class="fa fa-bomb" aria-hidden="true"></i>
    </span>
  </div>
</template>

<script>
export default {
  name: 'tile',
  props: ['data', 'indexy', 'indexx'],
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

</style>
