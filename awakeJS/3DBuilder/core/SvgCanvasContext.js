function SvgCanvasContext ( canvas ) {
	
	this.canvas = canvas;
	this.fillColor = "#eb0000";
	this.strokeStyle = { color : "#000000" , width : 2 };
	
};

SvgCanvasContext.prototype = {

	constructor : SvgCanvasContext,
	
	drawCircle : function ( x , y , r ) {
	
		 var cvs = this.canvas;
		
		var circle = new Circle( x , y , r ,  cvs.svgDom );
		
		cvs.appendChild( circle);
		 
	},
	
	drawTriangle : function ( x0 , y0 , x1 , y1 , x2 , y2 ) {
	
		
		//path.setAttributeNS (null, 'style', "fill:#cccccc; stroke:#000000;stroke-width:1");
		
		var cvs = this.canvas;
		
		var triangle = new Triangle( x0 , y0 , x1 , y1 , x2 , y2 , cvs.svgDom );
		
		cvs.appendChild( triangle);
		
	},
	
	drawLine : function ( x1 , y1 , x2 , y2 ) {
	
		var cvs = this.canvas;
		
		var line = new Line( x1 , y1 , x2 , y2 , cvs.svgDom );
		
		cvs.appendChild( line);
	
	}
	

}