const mxgraph = require('mxgraph')({
  mxImageBasePath: './src/images',
  mxBasePath: './src'
});

export const { mxGraph, mxGraphView, mxRectangleShape, mxRectangle, mxUtils, mxGraphModel, mxText, mxPoint, mxShape, mxEventObject, mxPolyline, mxImageShape, mxLog, mxResources, mxClient, mxConstants, mxEvent, mxMouseEvent, Base64, mxSvgCanvas2D, HoverIcons } = mxgraph; // eslint-disable-line