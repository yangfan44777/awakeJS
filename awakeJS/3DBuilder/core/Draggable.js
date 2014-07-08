 function Draggable ( dragElement , container ) {
	
	this.dragElement  = dragElement;
	
	this.dragContainer = container;
	
	this.dragHandler;
	
	this.available();
	
		
 };
 
 Draggable.prototype = {
 
	constructor : Draggable,
	
	available : function () { 

		if ( this.dragContainer === undefined ) return ;
	
		var _self = this;
		
		var moveHandler;
		var upHandler;
		
	
	
		EventUtil.addListener(_self.dragElement , "mousedown" ,this.dragHandler = function (e) { 
	
			var mousedownX = e.offsetX;
			var mousedownY = e.offsetY;  
			
			_self.dragElement.style.cursor = "default";
			
			moveHandler = function(e) {
				
				_self.dragging( e.offsetX - mousedownX , e.offsetY - mousedownY);//子类必须实现dragging抽象方法
				mousedownX = e.offsetX;
				mousedownY = e.offsetY;
				
			};
			
			EventUtil.addListener( _self.dragContainer , "mousemove" , moveHandler );
			
			
			upHandler = function(e) { 
	
				_self.dragElement.style.cursor = "default"; 
				
				EventUtil.removeListener( _self.dragContainer , "mousemove" , moveHandler );
								
				EventUtil.removeListener( window, "mouseup" , upHandler );
												
			};
			
			EventUtil.addListener( window , "mouseup" , upHandler );

			
		});		

	},
	unavailable : function () {
	
		//阻止拖拽
		EventUtil.removeListener(this.dragElement , "mousedown" ,this.dragHandler);
	
	}
	
	
 
 }