function Rectangle (  x0 , y0 , x1 , y1 , fill , dash  ) { // 参数这么多是因为svgelement和能拖动图元(Rectangle)在一个类中同时构造的结果
                     //左上     右下		

	var xmlns = "http://www.w3.org/2000/svg"; 
	var path = document.createElementNS( xmlns , "polygon" );

	path.setAttributeNS ( null, 'points', x0+","+y0+" " +x1+","+y0+" " +x1+","+y1+" " +x0+","+y1 );
	path.setAttributeNS (null, 'style', "fill:"+fill+"; stroke:#000000;stroke-width:1");
	
	if(dash)
		path.setAttributeNS (null, 'stroke-dasharray' , "3");
	
	
	this.element = path;
	
	this.container = undefined ;
	
	this.currentPosition = { x0 : x0 , y0 : y0 , x1 : x1 , y1 : y1  };
	
	//Draggable.call( this , this.element , this.container );
	
};

Rectangle.prototype = Object.create( Draggable.prototype );

Rectangle.prototype.setContainer = function ( container ) {

	this.container = container;
	Draggable.call( this , this.element , this.container );
}
Rectangle.prototype.dragging = function ( dx , dy ) {
	
		
		this.currentPosition.x0 += dx;
		this.currentPosition.y0 += dy;
		this.currentPosition.x1 += dx;
		this.currentPosition.y1 += dy;
		
		
		var newX0 =this.currentPosition.x0;
		var newX1 = this.currentPosition.x1;
	
		var newY0 = this.currentPosition.y0;
		var newY1 =this.currentPosition.y1;
		
		
		this.element.setAttributeNS ( null, 'points', newX0+","+newY0+" " +newX1+","+newY0+" " +newX1+","+newY1+" " +newX0+","+newY1 );
	
		this.dispatchEvent( { type : "moved"  } );
};
Rectangle.prototype.setCurrentPosition = function ( x0 , y0 , x1 , y1 ) {

		this.currentPosition.x0 = x0;
		this.currentPosition.y0 = y0;
		this.currentPosition.x1 = x1;
		this.currentPosition.y1 = y1;
				
		this.element.setAttributeNS ( null, 'points', x0+","+y0+" " +x1+","+y0+" " +x1+","+y1+" " +x0+","+y1 );

}

EventDispatcher.prototype.apply( Rectangle.prototype );
