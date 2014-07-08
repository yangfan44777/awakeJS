function ResizeContainer ( ) {//应该也是单例模式

	this.handles = [
					new ResizeHandle(100 , 100),
					new ResizeHandle(200 , 100),
					new ResizeHandle(200 , 200),
					new ResizeHandle(100 , 200)
					];
	
	this.rect = new Rectangle(this.handles[0].x , this.handles[0].y , this.handles[2].x , this.handles[2].x , "none" , true);
	
	this._initHandles();
	
	this.ul = {x:this.handles[0].x , y : this.handles[0].y};
	this.lr = {x:this.handles[2].x , y : this.handles[2].y};

}

ResizeContainer.prototype = {

	constructor : ResizeContainer,
	
	
	_initHandles : function () {
	
		var handles = this.handles;
	
		var _self = this;
	
		var len = handles.length;

		
		for( var i = 0 ; i < len ; i++ ){
		
			(function (m) {
			
				handles[m].addEventListener( "moved" , function ( e ){ 
		
							for( var j = 0 ; j < len ; j++ ){
								if( j !== m && j!==(m+2)%4){
								
										if( m % 2 == 0 ){
											handles[m+1].y = handles[m].y;
											handles[m+1].updateElement();
											
										}
										
										if( m % 2 == 1 ){
											handles[m-1].y = handles[m].y;
											handles[m-1].updateElement();
											
										}
										handles[3-m].x = handles[m].x;
										handles[3-m].updateElement();
								}
							}
							var old_ul = { x : _self.ul.x , y : _self.ul.y };
							
							
							var old_lr = { x : _self.lr.x , y : _self.lr.y };
							
							
							_self.updateFromHandles();
							
							_self._changed(  _self.ul , _self.lr );
						});
							
			
			})(i);
		}
		
	
	},
	
	display : function ( ul , lr ) {
	
		this.hidden();
	
		if(GraphContainer.getInstance().graphs.length <=0)
		{
			this.rect.setCurrentPosition( 0 , 0 , 0 , 0 );
			return;
		}
		var svgDom = document.getElementById("mySvg");
		
		this.rect.setCurrentPosition( ul.x , ul.y , lr.x , lr.y );
		
		svgDom.appendChild(this.rect.element);
	
		var handles = this.handles;
	
		handles[0].x = ul.x;
		handles[0].y = ul.y;
		
		handles[1].x = lr.x;
		handles[1].y = ul.y;
		
		handles[2].x = lr.x;
		handles[2].y = lr.y;
		
		handles[3].x = ul.x;
		handles[3].y = lr.y;
		
		this.ul = {x:this.handles[0].x , y : this.handles[0].y};
		this.lr = {x:this.handles[2].x , y : this.handles[2].y};
		
	
		for( var i = 0 ;  i < 4 ; i++ ){
			
		
			handles[i].display();
			handles[i].updateElement();
		}
		
	
	},
	
	hidden : function () {
	
		var handles = this.handles;
	
		for( var i = 0 ;  i < 4 ; i++ )
			handles[i].hidden();
		
	
	},
	
	updateFromHandles : function () {
	
		var handles = this.handles;
		
		this.ul.x = handles[0].x;
		this.ul.y = handles[0].y;
		
		this.lr.x = handles[2].x;
		this.lr.y = handles[2].y;
		
		
		this.rect.setCurrentPosition( this.ul.x  , this.ul.y , this.lr.x , this.lr.y );
	
	},
	
	_changed : function (  new_ul , new_lr ) {
	
		//this.ul = new_ul
		//this.lr = new_lr;
		
		GraphContainer.getInstance().updateGraphs(   new_ul , new_lr );
		
	}

}