import { mxGraph, mxGraphView, mxRectangleShape, mxRectangle, mxUtils, mxGraphModel, mxText, mxPoint, mxShape, mxEventObject, mxPolyline, mxImageShape, mxLog, mxResources, mxClient, mxConstants, mxEvent, mxMouseEvent, Base64, mxSvgCanvas2D, HoverIcons } from './index';
import CONST_MXGRAPH from './mxGraph';
import CONST_MXGRAPHVIEW from './mxGraphView';

CONST_MXGRAPH(mxGraph, mxGraphView, mxRectangleShape, mxRectangle, mxUtils, mxGraphModel, mxText, mxPoint, mxShape, mxEventObject, mxPolyline, mxImageShape, mxLog, mxResources, mxClient, mxConstants, mxEvent, mxMouseEvent, Base64, mxSvgCanvas2D);
// CONST_MXGRAPHVIEW(mxGraph, mxGraphView, mxRectangleShape, mxRectangle, mxUtils, mxGraphModel, mxText, mxPoint, mxShape, mxEventObject, mxPolyline, mxImageShape, mxLog, mxResources, mxClient, mxConstants, mxEvent, mxMouseEvent, Base64, mxSvgCanvas2D);
/**
 * Sets global constants.
 */
// Changes default colors
mxConstants.SHADOW_OPACITY = 0.25;
mxConstants.SHADOWCOLOR = '#000000';
mxConstants.VML_SHADOWCOLOR = '#d0d0d0';

class Graph extends mxGraph {
  constructor(container, model) {
    super(container, model);
    this.currentTranslate = new mxPoint(0, 0);
  }
}



export default Graph;