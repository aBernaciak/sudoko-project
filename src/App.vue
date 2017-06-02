<template>
  <div id="app">
    <div class="scores-container">
      <span>Amount of fields to fill: {{ blanksCountStart }}</span>&nbsp;&nbsp;
      <span>Fields added correctly: {{ blanksCountProgress }}</span>
      <br>
    </div>
    <div class="box-whole">
      <div class="box-container" v-for="(item, indexX) in playArray">
        <tile v-for="(n, indexY) in 9" class="box"
          :data="item[n-1]" 
          :indexx="indexX" 
          :indexy="indexY" 
          @entered="action">
        </tile>
      </div>
      <h2 v-show="message.show">Number( {{this.message.value}} ) You added is {{this.message.isCorrect}}</h2>
    </div>
  </div>
</template>

<script>
import Tile from './components/Tile.vue';

export default {
  name: 'app',
  components: {
    Tile
  },
  data() {
    return {
      blanksCountStart: 0,
      blanksCountProgress : 0,
      message: {
        value: undefined,
        show: false,
        isCorrect: ''
      },
      completedArray: [
        [1, 2, 3, 6, 7, 8, 9, 4, 5],
        [5, 8, 4, 2, 3, 9, 7, 6, 1],
        [9, 6, 7, 1, 4, 5, 3, 2, 8],
        [3, 7, 2, 4, 6, 1, 5, 8, 9],
        [6, 9, 1, 5, 8, 3, 2, 7, 4],
        [4, 5, 8, 7, 9, 2, 6, 1, 3],
        [8, 3, 6, 9, 2, 4, 1, 5, 7],
        [2, 1, 9, 8, 5, 7, 4, 3, 6],
        [7, 4, 5, 3, 1, 6, 8, 9, 2],
      ],
      playArray: [
        [0, 2, 0, 6, 0, 8, 0, 0, 0],
        [5, 8, 0, 0, 0, 9, 7, 0, 0],
        [0, 0, 0, 0, 4, 0, 0, 0, 0],
        [3, 7, 0, 0, 0, 0, 5, 0, 0],
        [6, 0, 0, 0, 0, 0, 0, 0, 4],
        [0, 0, 8, 0, 0, 0, 0, 1, 3],
        [0, 0, 0, 0, 2, 0, 0, 0, 0],
        [0, 0, 9, 8, 0, 0, 0, 3, 6],
        [0, 0, 0, 3, 0, 6, 0, 9, 0],
      ],
      // playArray: [
      //   [0, 0, 3, 6, 7, 8, 9, 4, 5],
      //   [5, 8, 4, 2, 3, 9, 7, 6, 1],
      //   [9, 6, 7, 1, 4, 5, 3, 2, 8],
      //   [3, 7, 2, 4, 6, 1, 5, 8, 9],
      //   [6, 9, 1, 0, 8, 3, 2, 7, 4],
      //   [4, 5, 8, 0, 9, 0, 6, 1, 3],
      //   [8, 3, 6, 0, 2, 0, 1, 5, 7],
      //   [2, 1, 9, 8, 5, 7, 4, 3, 6],
      //   [7, 4, 5, 3, 1, 6, 8, 9, 2],
      // ],
    };
  },
  methods: {
    action(params) {
      let completedArrayTile = this.completedArray[params.tileIndexX][params.tileIndexY];
      let playArrayTile = this.completedArray[params.tileIndexX][params.tileIndexY];
      this.message.show = true;
      this.message.value = params.tileValue;
      if(params.tileValue == completedArrayTile) {
        this.$set(this.playArray[params.tileIndexX], params.tileIndexY, params.tileValue);
        this.message.isCorrect = 'correct';
        if( this.blanksCountStart == ++this.blanksCountProgress){
          alert('Wygrana')
        }
      }
      else {
        this.$set(this.playArray[params.tileIndexX], params.tileIndexY, 0);
        this.message.isCorrect = 'wrong';
        this.message.show = true;
        // for (let i = 0; i <= 8; i++) {
        //   for (let j = 0; j <= 8; j++) {
        //     if(this.playArray[i][j] == 0) {
        //       this.$set(this.playArray[i], j, undefined);
        //     }
        //   }
        // }
      }
    }
  },
  created() {
    for (let i = 0; i <= 8; i++) {
      for (let j = 0; j <= 8; j++) {
        if(this.playArray[i][j] == 0) {
          this.blanksCountStart ++;
        }
      }
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.box-container {
  list-style-type: none;
  padding: 0;
  &:nth-of-type(3n+1) {
    border-top: 3px solid red;
    display: inline-block;
  }
  &:last-of-type {
    border-bottom: 3px solid red;
    display: inline-block;
  }
  .box {
    width: 60px;
    height: 60px;
    line-height: 60px;
    border: 1px solid #000;
    font-weight: bold;
    font-size: 32px;
    display: inline-block;
    &:first-of-type {
      border-left: 3px solid red;
    }
    &:last-of-type {
      border-right: 3px solid red;
    }
    &:nth-of-type(3n) {
      border-right: 3px solid red;
    }
    span {
      opacity: 0.8;
    }
  }
  input[type="number"] {
    width: calc(100% - 4px);
    height: calc(100% - 4px);
    border: 0;
    margin: 0;
    padding: 0;
    display: inline-block;
    font-size: 32px;
    text-align: center;
    font-weight: bold;
  }
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
 }

a {
  color: #42b983;
}
</style>
