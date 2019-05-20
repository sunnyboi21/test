<template>
  <div id="app">
    <Draw />
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import Draw from './components/Draw.vue'

export default {
  name: 'app',
  components: {
    HelloWorld,
    Draw
  }
}
</script>

<style>
#app {
  display: flex;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
