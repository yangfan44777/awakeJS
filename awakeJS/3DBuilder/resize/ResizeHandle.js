function ResizeHandle ( x , y ) {

	this.x = x;
	this.y = y;
	
	this.element; //= new Rectangle( this.x -2 , this.y -2 , this.x + 2 , this.y + 2 , "#000000" , false );
	
	this.r = 3;
	
	
	
	

}

ResizeHandle.prototype = {

	constructor : ResizeHandle,
	
	
	display : function () {
	
		var svgDom = document.getElementById("mySvg");
		
		this.element = new Rectangle( this.x -this.r , this.y -this.r , this.x + this.r , this.y + this.r , "#ffffff" , false );
		
		
		var self = this;
		
		this.element.setContainer(svgDom);
		svgDom.appendChild( this.element.element );
		
		var _self = this;
		
		this.element.addEventListener( "moved" , function(){
		
				_self.update();
		
				_self.dispatchEvent({type:"moved"})
		});
		
	},
	
	hidden : function () {
		
		if(this.element ===undefined )return;
	
		document.getElementById("mySvg").removeChild( this.element.element);
		this.element = undefined;
	
	},
	
	update : function () {
	
		this.x = this.element.currentPosition.x0+this.r;
		this.y = this.element.currentPosition.y0+this.r;
	
	},
	
	updateElement : function () {
	
		this.element.setCurrentPosition( this.x -this.r , this.y - this.r , this.x + this.r , this.y + this.r );
		
	
	}

}

EventDispatcher.prototype.apply( ResizeHandle.prototype );