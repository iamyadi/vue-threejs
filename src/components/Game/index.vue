<template>
  <div id="game">
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import HouseGame from "./gameCreators/houseGame";
// import ManualControlCube from "./gameCreators/manualControlCube";
// import OribtCube from './gameCreators/orbitControlCube';
// import MyGeometry from "./gameCreators/myGeometry";
import TextureExp from './gameCreators/texture';

export default defineComponent({
  name: "Game",
  data(): {
    houseGame?: HouseGame;
    cube?: TextureExp;
  } {
    return {};
  },
  mounted() {
    this.createGame();
  },
  methods: {
    createGame() {
      this.cube = new TextureExp();
    },
  },
});
</script>
