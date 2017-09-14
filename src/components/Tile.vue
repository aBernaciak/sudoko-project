<template>
  <div id="tile">
    <div v-if="this.data == null || this.editableTile == true" class="input-container">
      <input type="number"
        v-on:keyup.enter="sendValue($event)"
        v-on:blur="sendValue($event)"
        @click="showConfirm()"
        :placeholder="data">
<!--         <ul v-show="showMenu" class="circle-menu">
          <li>1</li>
          <li>2</li>
          <li>3</li>
          <li>4</li>
          <li>5</li>
          <li>6</li>
          <li>7</li>
          <li>8</li>
          <li>9</li>
          <li>X</li>
        </ul> -->
    </div>
    <span class="added-by-user" v-else-if="data > 0 && addByUser == true"
                                @click="editTile()">
      {{ data }}
    </span>
    <span v-else>
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
  props: ['data', 'indexy', 'indexx'],
  data() {
    return {
      showMenu: false,
      computedIndexY: this.indexy,
      computedIndexX: this.indexx,
      addByUser: false,
      editableTile: false
    }
  },
  methods: {
    sendValue(event) {
      this.addByUser = true;
      this.editableTile = false;
      if(event.target.value != '') {
        this.$emit('entered', { tileValue: event.target.value,
                                tileIndexX: this.computedIndexX, 
                                tileIndexY: this.computedIndexY })
      }
    },
    showConfirm() {
      this.showMenu = true;
    },
    editTile() {
      this.editableTile = true;
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
    opacity: 0.4;
    cursor: pointer;
  }
  .input-container {
    position: relative;
    .circle-menu {
      position: absolute;
      width: 60px;
      height: 60px;
      top: 0;
      left: 0;
      li {
        border-radius: 50%;
        text-align: center;
        width: 60px;
        height: 60px;
        position: absolute;
        bottom: 0;
        left: 0;
        -webkit-transition: .2s linear;
        transition: .2s linear;
        border: none;
        z-index: 15;
        &:first-child {
          transform: translateY(-55px)
        }
        &:nth-child(2) {
          transform: translateY(-40px) translateX(35px);
        }
        &:nth-child(3) {
          transform: translateY(-15px) translateX(60px);
        }
        &:nth-child(4) {
          transform: translateY(15px) translateX(35px);
        }
      }
    }
  }
</style>
