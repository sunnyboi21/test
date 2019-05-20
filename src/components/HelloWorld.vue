<template>
  <div class="graph">
    <div id="element1">asdasdas</div>
    <div id="element2">dasdasd</div>
  </div>
</template>

<script>
import { jsPlumb } from 'jsplumb';
export default {
  name: 'HelloWorld',
  data: () => ({
    //
  }),
  mounted() {
    jsPlumb.bind("ready", () => {
      jsPlumb.setContainer(this.$el);
      const firstInstance = jsPlumb.getInstance();
      console.log(firstInstance.makeSource);
      firstInstance.makeSource("el1", {
        anchor:"Continuous",
        endpoint:["Rectangle", { width:40, height:20 }],
        maxConnections:3
      });  
      firstInstance.connect({
        source:"element1", 
        target:"element2", 
        scope:"someScope" 
      });
    });
  },
  methods: {
    //
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.graph {
  overflow: auto;
  height: 100%;
  width: 100%;
}
</style>
