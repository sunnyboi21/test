<template>
  <div class="graph geDiagramContainer geDiagramBackdrop">
  </div>
</template>

<script>
const mxgraph = require('mxgraph')({
  mxImageBasePath: './src/images',
  mxBasePath: './src'
});
import Graph from './js/Graph';
export default {
  name: 'HelloWorld',
  data: () => ({
    model: new mxgraph.mxGraphModel()
  }),
  mounted() {
    const model = this.model;
    this.createGraph(this.$el, model);
    // Required for the browser to render the background page in correct order
    this.resetGraph();
    this.createBackgroundPage();
    this.createGraphListeners();
    this.setScrollbar();
    this.graph.minimumGraphSize = new mxgraph.mxRectangle(0, 0, 2500, 2500);
    this.graph.getModel().beginUpdate();
    const test1 = this.graph.insertVertex(this.parent, null, 'test', 0, 100, 100, 40);
    const test2 = this.graph.insertVertex(this.parent, null, 'test2', 0, 150, 100, 40);
    this.graph.insertEdge(this.parent, null, '', test1, test2);
    this.graph.getModel().endUpdate();
    console.log(this.graph);
    this.graph.isCellSelectable = () => {
      console.log('cell')
      return false;
    }
    test2.isConnectable = function() {
      if (this.edges) {
        return false;
      }
      return true
    };
  },
  methods: {
    createGraph(container, model) {
      this.graph = new Graph(container, model);
      this.graph.minFitScale = null;
      this.parent = this.graph.getDefaultParent();
      this.graph.view.allowNegativeCoordinates = false;
      this.layout = new mxgraph.mxRubberband(this.graph);
    },
    resetGraph() {
      this.graph.gridEnabled = true;
      this.graph.graphHandler.guidesEnabled = true;
      this.graph.setTooltips(true);
      this.graph.setConnectable(true);
      this.graph.setPanning(true);
      this.graph.foldingEnabled = true;
      this.graph.scrollbars = this.graph.defaultScrollbars;
      this.graph.pageVisible = this.graph.defaultPageVisible;
      this.graph.pageBreaksVisible = this.graph.pageVisible; 
      this.graph.preferPageSize = this.graph.pageBreaksVisible;
      this.graph.background = null;
      this.graph.pageScale = mxgraph.mxGraph.prototype.pageScale;
      this.graph.pageFormat = mxgraph.mxGraph.prototype.pageFormat;
      this.graph.currentScale = 1;
      this.graph.currentTranslate.x = 0;
      this.graph.currentTranslate.y = 0;
      this.updateGraphComponents();
      this.graph.view.setScale(1);
    },
    createBackgroundPage() {
      const firstChild = this.graph.container.firstChild;
      firstChild.style.position = 'absolute';
      const backgroundPageShape = new mxgraph.mxRectangleShape({height: 1100, width: 850, x: 0, y: 0 }, '#ffffff', this.graph.defaultPageBorderColor);
      backgroundPageShape.init(this.graph.container);
      this.graph.container.insertBefore(backgroundPageShape.node, firstChild);
      // backgroundPageShape.redraw();
      backgroundPageShape.node.className = 'geBackgroundPage';
      backgroundPageShape.node.style.backgroundPosition = '-1px -1px';
			backgroundPageShape.node.style.backgroundImage = 'url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2UwZTBlMCIgb3BhY2l0eT0iMC4yIiBzdHJva2Utd2lkdGg9IjEiLz48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZTBlMGUwIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=")';
      backgroundPageShape.node.style.width = 900 + 'px';
      backgroundPageShape.node.style.height = 1500 + 'px';
      backgroundPageShape.node.style.left = 300 + 'px';
      backgroundPageShape.node.style.top = 300 + 'px';
      backgroundPageShape.node.style.backgroundColor = '#ffffff';
			this.graph.container.className = 'geDiagramContainer geDiagramBackdrop';
      console.log(backgroundPageShape);
    },
    updateGraphComponents() {
      const graph = this.graph;
	
      if (graph.container != null) {
        graph.view.validateBackground();
        graph.container.style.overflow = (graph.scrollbars) ? 'auto' : this.defaultGraphOverflow;
      }
    },
    createGraphListeners() {
      this.graph.addMouseListener({
        mouseDown: function(sender, evt) {
          // console.log('mouseDown');
        },
        mouseMove: function(sender, evt) {
          if (evt.sourceState) {
            // console.log(evt.sourceState);
          }
        },
        mouseUp: function() {
          //
        }
      });
      this.graph.addListener(mxgraph.mxEvent.CELLS_MOVED, sender => {
        
        console.log(sender.graphHandler.bounds);
      });
    },
    hoverConnections() {
      //
    },
    setScrollbar() {
      this.graph.container.scrollTop = 200;
		  this.graph.container.scrollLeft = 200;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.graph {
  position: absolute;
  left: 0;
  right: 0;
  top: 0px;
  bottom: 0;
  overflow: auto;
}
.geBackgroundPage {
  position: absolute;
  border-width: 1px;
  overflow: hidden;
  border-color: rgb(255, 255, 255);
  border-style: solid;
  background-color: rgb(255, 255, 255);
  background-image: url(&quot;data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2UwZTBlMCIgb3BhY2l0eT0iMC4yIiBzdHJva2Utd2lkdGg9IjEiLz48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZTBlMGUwIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=&quot;);
  background-position: -1px -21px;
}

.geDiagramBackdrop {
  background-color: #f8f9fa;
  position: absolute;
  left: 0;
  right: 0;
  top: 0px;
  bottom: 0;
  overflow: auto;
}
</style>
