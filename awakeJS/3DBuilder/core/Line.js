function Line ( x1 , y1 , x2 , y2  ) {

	var xmlns = "http://www.w3.org/2000/svg"; 
	var path = document.createElementNS( xmlns , "line" );
		
	path.setAttributeNS ( null, 'x1', x1 );
	path.setAttributeNS ( null, 'y1', y1 );
	path.setAttributeNS ( null, 'x2', x2 );
	path.setAttributeNS ( null, 'y2', y2 );
	path.setAttributeNS ( null, "style" , "stroke:rgba(99,99,99,0.2);stroke-width:6;z-index:-1");
	
	//path.setAttributeNS (null, 'style', "fill:#cccccc; stroke:#000000;stroke-width:1");

	this.element = path;
	
	this.container = undefined ;
	
	this.currentPosition = { x1 : x1 , y1 : y1 , x2 : x2 , y2 : y2 };
	
	//Draggable.call( this , this.element , this.container );

};

Line.prototype = Object.create( Draggable.prototype );

Line.prototype.setContainer = function ( container ) {

	this.container = container;
	//Draggable.call( this , this.element , this.container );
}

Line.prototype.dragging = function ( dx , dy ) {
	
		
		this.currentPosition.x1 += dx;
		this.currentPosition.y1 += dy;
		
		this.currentPosition.x2 += dx;
		this.currentPosition.y2 += dy;
		
		var newX1 =this.currentPosition.x1;
		var newY1 = this.currentPosition.y1;
		
		var newX2 =this.currentPosition.x2;
		var newY2 = this.currentPosition.y2;
		
		
		
		this.element.setAttributeNS( null,"x1" , newX1  );
		this.element.setAttributeNS( null,"y1" , newY1  );
		
		this.element.setAttributeNS( null,"x2" , newX2  );
		this.element.setAttributeNS( null,"y2" , newY2  );
	
};

Line.prototype.setCurrentPosition = function ( x1,y1,x2,y2) {

		
		this.currentPosition.x1 = x1;
		this.currentPosition.y1 = y1;
		this.currentPosition.x2 = x2;
		this.currentPosition.y2 = y2;
		
		var path = this.element;
		
		path.setAttributeNS ( null, 'x1', x1 );
		path.setAttributeNS ( null, 'y1', y1 );
		path.setAttributeNS ( null, 'x2', x2 );
		path.setAttributeNS ( null, 'y2', y2 );

}
