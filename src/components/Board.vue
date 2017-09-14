<template>
  <div id="board">
    <button class="main-button">
      <router-link to="/">Back to menu</router-link>
    </button>
    <div class="scores-container">
      <span>Amount of fields to fill: {{ blanksCount }}</span>
      <br>
    </div>
    <div class="box-whole" v-if="dataReady">
      <div class="box-container"
           v-for="(item, indexX) in playArray">
        <tile
          v-for="(n, indexY) in 9" class="box"
          :data="item[n-1]" 
          :indexx="indexX" 
          :indexy="indexY"
          :state="tileMessage"
          @entered="action">
        </tile>
      </div>
      <h3 v-if="messageShow">
        Correct: {{ filledCorrect }}
        Errors: {{ filledWrong }}
      </h3>
    </div>
    <div v-else>
      <h2>Data loading...</h2>
    </div>
  </div>
</template>

<script>
import Tile from './Tile.vue';

export default {
  name: 'board',
  components: {
    Tile
  },
  data() {
    return {
      blanksCount: 0,
      filledCorrect: 0,
      filledWrong: 0,
      dataReady: false,
      tileMessage: '',
      messageShow: false,
      solutionsArray: [],
      playArray: [],
      editableFieldsArray: []
    };
  },
  computed: {
    totalToFill() {
      return this.filledWrong + this.filledCorrect;
    }
  },
  methods: {
    action(params) {
      let solutionsArrayTile = this.solutionsArray[params.tileIndexX][params.tileIndexY];
      let playArrayTile = this.solutionsArray[params.tileIndexX][params.tileIndexY];
      this.$set(this.playArray[params.tileIndexX], params.tileIndexY, params.tileValue);
      if(params.tileValue == solutionsArrayTile) {
        this.filledCorrect ++;
        if(this.blanksCount == this.totalToFill){
          this.messageShow = true;
        }
      }
      else {
        this.filledWrong ++;
        if(this.blanksCount == this.totalToFill){
          this.messageShow = true;
        }
      }
    },
    checkBlanks() {
      if(this.dataReady) {
        for (let i = 0; i <= 8; i++) {
          for (let j = 0; j <= 8; j++) {
            if(this.playArray[i][j] == null) {
              this.blanksCount ++;
              this.editableFieldsArray.push([i,j]);
            }
          }
        }
      }
    }
  },
  created() {
    let difficulty = this.$route.params.difficulty;
    // console.log(this.$ls.get('playArray'));
    // if (this.$ls.get('playArray') != 'undefined') {
    //   this.playArray = this.$ls.get('playArray');
    //   this.solutionsArray = this.$ls.get('solutionsArray');
    //   console.log(this.playArray, this.solutionsArray)
    //   this.dataReady = true;
    // }
    // else {
      this.$http.get('http://vast-wildwood-2439.herokuapp.com/api/' + difficulty)
        .then(function(response){
          this.playArray = response.data.board;
          // this.$ls.set('playArray', response.data.board);
          this.solutionsArray = response.data.solution;
          // this.$ls.set('solutionsArray', response.data.solution);
          this.dataReady = true;
          this.checkBlanks();
      });
    // }
  }
}
</script>

<style lang="scss">
$border-color: #064475;
$background-color-tile: #2f97ea;

.box-container {
  list-style-type: none;
  padding: 0;
  &:nth-of-type(3n+1) {
    border-top: 3px solid $border-color;
    display: inline-block;
  }
  &:last-of-type {
    border-bottom: 3px solid $border-color;
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
      border-left: 3px solid $border-color;
    }
    &:last-of-type {
      border-right: 3px solid $border-color;
    }
    &:nth-of-type(3n) {
      border-right: 3px solid $border-color;
    }
    span {
      background: $background-color-tile;
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
</style>
