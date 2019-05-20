export default (mxGraph, mxGraphView, mxRectangleShape, mxRectangle, mxUtils, mxGraphModel, mxText, mxPoint, mxShape, mxEventObject, mxPolyline, mxImageShape, mxLog, mxResources, mxClient, mxConstants, mxEvent, mxMouseEvent, Base64, mxSvgCanvas2D) => {
  const graphViewValidate = mxGraphView.prototype.validate;
	mxGraphView.prototype.validate = function(cell) {
    console.log('mxGraphView validate');
		if (this.graph.useCssTransforms) {
      this.graph.currentScale = this.scale;
      this.graph.currentTranslate.x = this.translate.x;
      this.graph.currentTranslate.y = this.translate.y;
      
      this.scale = 1;
      this.translate.x = 0;
      this.translate.y = 0;
		}
		
		graphViewValidate.apply(this, arguments);
		
		if (this.graph.useCssTransforms)
		{
			this.graph.updateCssTransform();
			
			this.scale = this.graph.currentScale;
			this.translate.x = this.graph.currentTranslate.x;
			this.translate.y = this.graph.currentTranslate.y;
		}
  };
  mxGraphView.prototype.validateBackgroundPage = function() {
		const graph = this.graph;
		if (graph.container != null && !graph.transparentBackground) {
			if (graph.pageVisible) {
				const bounds = this.getBackgroundPageBounds();
				
				if (this.backgroundPageShape == null)
				{
					// Finds first element in graph container
					let firstChild = graph.container.firstChild;
					while (firstChild != null && firstChild.nodeType != mxConstants.NODETYPE_ELEMENT) {
						firstChild = firstChild.nextSibling;
          }

					if (firstChild != null) {
						this.backgroundPageShape = this.createBackgroundPageShape(bounds);
						this.backgroundPageShape.scale = 1;

						// Shadow filter causes problems in outline window in quirks mode. IE8 standards
						// also has known rendering issues inside mxWindow but not using shadow is worse.
						this.backgroundPageShape.isShadow = !mxClient.IS_QUIRKS;
						this.backgroundPageShape.dialect = mxConstants.DIALECT_STRICTHTML;
						this.backgroundPageShape.init(graph.container);

						// Required for the browser to render the background page in correct order
						firstChild.style.position = 'absolute';
						graph.container.insertBefore(this.backgroundPageShape.node, firstChild);
						this.backgroundPageShape.redraw();
						
						this.backgroundPageShape.node.className = 'geBackgroundPage';
						
						// Adds listener for double click handling on background
						mxEvent.addListener(this.backgroundPageShape.node, 'dblclick',
							mxUtils.bind(this, function(evt)
							{
								graph.dblClick(evt);
							})
						);
						
						// Adds basic listeners for graph event dispatching outside of the
						// container and finishing the handling of a single gesture
						mxEvent.addGestureListeners(this.backgroundPageShape.node,
							mxUtils.bind(this, function(evt)
							{
								graph.fireMouseEvent(mxEvent.MOUSE_DOWN, new mxMouseEvent(evt));
							}),
							mxUtils.bind(this, function(evt)
							{
								// Hides the tooltip if mouse is outside container
								if (graph.tooltipHandler != null && graph.tooltipHandler.isHideOnHover())
								{
									graph.tooltipHandler.hide();
								}
								
								if (graph.isMouseDown && !mxEvent.isConsumed(evt))
								{
									graph.fireMouseEvent(mxEvent.MOUSE_MOVE, new mxMouseEvent(evt));
								}
							}),
							mxUtils.bind(this, function(evt)
							{
								graph.fireMouseEvent(mxEvent.MOUSE_UP, new mxMouseEvent(evt));
							})
						);
					}
				}
				else
				{
					this.backgroundPageShape.scale = 1;
					this.backgroundPageShape.bounds = bounds;
					this.backgroundPageShape.redraw();
				}
			}
			else if (this.backgroundPageShape != null)
			{
				this.backgroundPageShape.destroy();
				this.backgroundPageShape = null;
			}
			
			this.validateBackgroundStyles();
		}
	};
};