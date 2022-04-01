<template>
  <div id="game">
   <Game />
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import Game from './components/Game/index.vue';

export default defineComponent({
    name: 'App',
    components: { Game },
    mounted(){
        console.log('in APP onMounted')
    }
})
</script>
<style>
*{
  margin: 0;
  padding: 0;
}
html, body{
  overflow: hidden;
}
</style>
