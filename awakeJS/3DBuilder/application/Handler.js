function Handler ( x , y , resizeRect , resizeElement) {

	this.x = x;
	this.y = y;
	
	this.resizeRect = resizeRect;
	
	this.handlerElement = new Rectangle( x - 2 , y -2 , x + 2 , y + 2);

}



Handler.prototype.init = function () {

	var mouseDownHandler;
	var mouseMoveHandler;
	
	var _self = this;
	EventUtil.addListener(_self.handlerElement.element , "mousedown" ,mouseDownHandler = function () {
	
		EventUtil.addListener(_self.handlerElement.element , "mousemove" ,mouseMoveHandler = function () {
		
			_self.resizeRect.update();
		
		});
	
	});

}
