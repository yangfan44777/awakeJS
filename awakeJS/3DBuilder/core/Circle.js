function Circle ( x , y , r ) {

	var xmlns = "http://www.w3.org/2000/svg"; 
	var path = document.createElementNS( xmlns , "circle" );
		
	path.setAttributeNS ( null, 'cx', x );
	path.setAttributeNS ( null, 'cy', y );
	path.setAttributeNS ( null, 'r', r );
	
	path.setAttributeNS (null, 'style', "fill:#3d3d3d;");

	this.element = path;
	
	this.container = undefined ;
	
	this.currentPosition = { x : x , y : y };
	
	//Draggable.call( this , this.element , this.container );

};

Circle.prototype = Object.create( Draggable.prototype );

Circle.prototype.setContainer = function ( container ) {

	this.container = container;
	Draggable.call( this , this.element , this.container );
}

Circle.prototype.dragging = function ( dx , dy ) {
	
		
		this.currentPosition.x += dx;
		this.currentPosition.y += dy;
		
		var newX =this.currentPosition.x;
		var newY = this.currentPosition.y;
		
		
		
		this.element.setAttributeNS( null,"cx" , newX  );
		this.element.setAttributeNS( null,"cy" , newY  );
	
};


Circle.prototype.setCurrentPosition = function( x , y ) {

	this.currentPosition.x = x;
	this.currentPosition.y = y;
	
	this.element.setAttributeNS( null,"cx" , x  );
	this.element.setAttributeNS( null,"cy" , y  );
	

}
