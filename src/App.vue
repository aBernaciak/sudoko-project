<template>
  <div id="app">
    <div class="scores-container">
      <span>Amount of fields to fill: {{ blanksCountStart }}</span>&nbsp;&nbsp;
      <span>Fields added correctly: {{ blanksCountProgress }}</span>
      <br>
    </div>
    <div class="box-whole" v-if="dataReady">
      <div class="box-container" v-for="(item, indexX) in playArray">
        <tile v-for="(n, indexY) in 9" class="box"
          :data="item[n-1]" 
          :indexx="indexX" 
          :indexy="indexY"
          :state="tileMessage" 
          @entered="action">
        </tile>
      </div>
      <h2 v-show="message.show">Number( {{this.message.value}} ) You added is {{this.message.isCorrect}}</h2>
    </div>
    <div v-else>
      <h2>Data loading</h2>
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
      dataReady: false,
      tileMessage: '',
      message: {
        value: undefined,
        show: false,
        isCorrect: ''
      },
      solutionsArray: [],
      playArray: [],
      // solutionsArray: [
      //   [1, 2, 3, 6, 7, 8, 9, 4, 5],
      //   [5, 8, 4, 2, 3, 9, 7, 6, 1],
      //   [9, 6, 7, 1, 4, 5, 3, 2, 8],
      //   [3, 7, 2, 4, 6, 1, 5, 8, 9],
      //   [6, 9, 1, 5, 8, 3, 2, 7, 4],
      //   [4, 5, 8, 7, 9, 2, 6, 1, 3],
      //   [8, 3, 6, 9, 2, 4, 1, 5, 7],
      //   [2, 1, 9, 8, 5, 7, 4, 3, 6],
      //   [7, 4, 5, 3, 1, 6, 8, 9, 2],
      // ],
      // playArray: [
      //   [0, 2, 0, 6, 0, 8, 0, 0, 0],
      //   [5, 8, 0, 0, 0, 9, 7, 0, 0],
      //   [0, 0, 0, 0, 4, 0, 0, 0, 0],
      //   [3, 7, 0, 0, 0, 0, 5, 0, 0],
      //   [6, 0, 0, 0, 0, 0, 0, 0, 4],
      //   [0, 0, 8, 0, 0, 0, 0, 1, 3],
      //   [0, 0, 0, 0, 2, 0, 0, 0, 0],
      //   [0, 0, 9, 8, 0, 0, 0, 3, 6],
      //   [0, 0, 0, 3, 0, 6, 0, 9, 0],
      // ],
    };
  },
  methods: {
    action(params) {
      let solutionsArrayTile = this.solutionsArray[params.tileIndexX][params.tileIndexY];
      let playArrayTile = this.solutionsArray[params.tileIndexX][params.tileIndexY];
      this.message.value = params.tileValue;
      this.message.show = true;
      if(params.tileValue == solutionsArrayTile) {
        this.$set(this.playArray[params.tileIndexX], params.tileIndexY, params.tileValue);
        this.message.isCorrect = 'correct';
        if( this.blanksCountStart == ++this.blanksCountProgress){
          alert('Wygrana')
        }
      }
      else {
        this.$set(this.playArray[params.tileIndexX], params.tileIndexY, null);
        this.message.isCorrect = 'wrong';
        // this.tileMessage = 'error';
        // this.message.show = false;
        // for (let i = 0; i <= 8; i++) {
        //   for (let j = 0; j <= 8; j++) {
        //     if(this.playArray[i][j] == 0) {
        //       this.$set(this.playArray[i], j, undefined);
        //     }
        //   }
        // }
      }
    },
    checkBlanks() {
      if(this.dataReady) {
        for (let i = 0; i <= 8; i++) {
          for (let j = 0; j <= 8; j++) {
            if(this.playArray[i][j] == null) {
              this.blanksCountStart ++;
            }
          }
        };
      }
    }
  },
  created() {
    this.$http.get('http://vast-wildwood-2439.herokuapp.com/api/easy')
      .then(function(response){
        this.playArray = response.data.board;
        this.solutionsArray = response.data.solution;
        this.dataReady = true;
        this.checkBlanks();
    });
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
    border-top: 3px solid #064475;
    display: inline-block;
  }
  &:last-of-type {
    border-bottom: 3px solid #064475;
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
      border-left: 3px solid #064475;
    }
    &:last-of-type {
      border-right: 3px solid #064475;
    }
    &:nth-of-type(3n) {
      border-right: 3px solid #064475;
    }
    span {
      background: #2f97ea;
      display: block;
      color: white;
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
