function Triangle (  x0 , y0 , x1 , y1 , x2 , y2  ) { // 参数这么多是因为svgelement和能拖动图元(Triangle)在一个类中同时构造的结果


	var xmlns = "http://www.w3.org/2000/svg"; 
	var path = document.createElementNS( xmlns , "polygon" );
		
	path.setAttributeNS ( null, 'points', x0+","+y0+" " +x1+","+y1+" " +x2+","+y2 );
	path.setAttributeNS (null, 'style', "fill:rgba(0,0,0,0.2); stroke:#000000;stroke-width:0");

	this.element = path;
	
	this.container = undefined ;
	
	this.currentPosition = { x0 : x0 , y0 : y0 , x1 : x1 , y1 : y1 , x2 : x2 , y2 : y2 };
	
	//Draggable.call( this , this.element , this.container );
	
};

Triangle.prototype = Object.create( Draggable.prototype );

Triangle.prototype.setContainer = function ( container ) {

	this.container = container;
	//Draggable.call( this , this.element , this.container );
}
Triangle.prototype.dragging = function ( dx , dy ) {
	
		
		this.currentPosition.x0 += dx;
		this.currentPosition.y0 += dy;
		this.currentPosition.x1 += dx;
		this.currentPosition.y1 += dy;
		this.currentPosition.x2 += dx;
		this.currentPosition.y2 += dy;
		
		var newX0 =this.currentPosition.x0;
		var newX1 = this.currentPosition.x1;
		var newX2 = this.currentPosition.x2;
		
		var newY0 = this.currentPosition.y0;
		var newY1 =this.currentPosition.y1;
		var newY2 = this.currentPosition.y2;
		
		
		this.element.setAttributeNS( null,"points" , newX0+","+ newY0 +","+ newX1+","+newY1+","+ newX2+","+newY2  );
	
};
Triangle.prototype.setCurrentPosition = function ( x0,y0,x1,y1,x2,y2) {

		this.currentPosition.x0 = x0;
		this.currentPosition.y0 = y0;
		this.currentPosition.x1 = x1;
		this.currentPosition.y1 = y1;
		this.currentPosition.x2 = x2;
		this.currentPosition.y2 = y2;
		
		
		
		this.element.setAttributeNS( null,"points" , x0+","+ y0 +","+ x1+","+y1+","+ x2+","+y2  );

}


