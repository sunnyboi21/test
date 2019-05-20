export default (mxGraph, mxGraphView, mxRectangleShape, mxRectangle, mxUtils, mxGraphModel, mxText, mxPoint, mxShape, mxEventObject, mxPolyline, mxImageShape, mxLog, mxResources, mxClient, mxConstants, mxEvent, mxMouseEvent, Base64, mxSvgCanvas2D) => { // eslint-disable-line
  mxGraph.prototype.pageBreakColor = '#c0c0c0';
  mxGraph.prototype.pageScale = 1;


  const graphUpdatePageBreaks = mxGraph.prototype.updatePageBreaks;
	mxGraph.prototype.updatePageBreaks = function() {
    const useCssTranforms = this.useCssTransforms;
    const scale = this.view.scale;
		const translate = this.view.translate;
	
		if (useCssTranforms) {
			this.view.scale = 1;
			this.view.translate = new mxPoint(0, 0);
			this.useCssTransforms = false;
		}
		
		graphUpdatePageBreaks.apply(this, arguments);
		
		if (useCssTranforms)
		{
			this.view.scale = scale;
			this.view.translate = translate;
			this.useCssTransforms = true;
		}
	};
}