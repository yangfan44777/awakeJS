//该类应该设计到最低层，参数中给一个回调函数
function MResizeable( element  ) {

	this.resizeElement = element;
	
	
	this.handles = {
	
		rotateHandle : undefined,
		ulHandle :undefined,
		urHandle :undefined,
		llHandle :undefined,
		lrHandle :undefined,
		topHandle:undefined,
		rightHandle:undefined,
		bottomHandle:undefined,
		rightHandle:undefined
	
	};
	
	this.rect = undefined;
	this.handleFlag = 1;
	
	this.available();
}

MResizeable.prototype = {

	constructor : MResizeable,
	
	available : function () {
		
		//if ( this.resizeHandler !== undefined ) return ;
		
		var _self = this;
		
		EventUtil.addListener( _self.resizeElement.element , "click" , this.resizeHandler = function (e) {
							  
							  //获取左上角坐标  获取右下角坐标
			
			//_self.dispHandle( _self.getUL() , _self.getLR() );//子类需要实现getUL getLR
			if(_self.handleFlag==1){
			
				_self.dispHandle( _self.getUL() , _self.getLR() );
				//_self.dispHandle( {x:100 , y:100} , {x:200,y:200} );
				_self.handleFlag = 0;
			}
			else{
			
				_self.removeHandle(  );
				_self.handleFlag = 1;
			}

		});
		
	},
	
	dispHandle : function ( ul , lr ) {
	
		this.rect = new Rectangle( ul.x-8 , ul.y-8 , lr.x +8, lr.y +8 , "none" , true);
		this.resizeElement.element.setAttributeNS (null, 'style', "fill:rgba(32,164,210,0.5); stroke:#000000;stroke-width:0");
		
		
		var svgDom = this.resizeElement.container;
	
		svgDom.insertBefore( this.rect.element, this.resizeElement.element);
		
		//旋转句柄
		//this.handles.rotateHandle = new Rectangle( lr.x +20 , lr.y+20 , lr.x +30, lr.y +30 , "#000000" ,false );
		//svgDom.appendChild( this.handles.rotateHandle.element );
		
		//1句柄
		this.handles.ulHandle = new Rectangle( ul.x -14 , ul.y-14 , ul.x-8 , ul.y-8  , "#ffffff" ,false );
		svgDom.appendChild( this.handles.ulHandle.element );
		this.handles.ulHandle.setContainer(svgDom);
		
		//2句柄
		this.handles.urHandle = new Rectangle( lr.x +14 , ul.y-14 , lr.x +8, ul.y -8 , "#ffffff" ,false );
		svgDom.appendChild( this.handles.urHandle.element );
		this.handles.urHandle.setContainer(svgDom);
		//3句柄
		this.handles.lrHandle = new Rectangle( lr.x +8 , lr.y+8 , lr.x +14, lr.y +14 , "#ffffff" ,false );
		svgDom.appendChild( this.handles.lrHandle.element );
		this.handles.lrHandle.setContainer(svgDom);
		//4句柄
		this.handles.llHandle = new Rectangle( ul.x -8 , lr.y+8 , ul.x -14, lr.y +14 , "#ffffff" ,false );
		svgDom.appendChild( this.handles.llHandle.element );
		this.handles.llHandle.setContainer(svgDom);
		
		var midX = (lr.x + ul.x)/2;
		var midY = (lr.y + ul.y)/2;
		
		//top句柄
		this.handles.topHandle = new Rectangle( midX-2 , ul.y-12 , midX+2 , ul.y-8  , "#000000" ,false );
		svgDom.appendChild( this.handles.topHandle.element );
		
		//right句柄
		this.handles.rightHandle = new Rectangle( lr.x+8 , midY-2 , lr.x+12 , midY+2  , "#000000" ,false );
		svgDom.appendChild( this.handles.rightHandle.element );
		
		//bottom句柄
		this.handles.bottomHandle = new Rectangle( midX-2 , lr.y+8 , midX+2 , lr.y+12  , "#000000" ,false );
		svgDom.appendChild( this.handles.bottomHandle.element );
		
		//left句柄
		this.handles.leftHandle = new Rectangle( ul.x-12 , midY-2  , ul.x-8 , midY+2   , "#000000" ,false );
		svgDom.appendChild( this.handles.leftHandle.element );
		
		
	
	},
	
	removeHandle : function (  ) {
	
		this.resizeElement.element.setAttributeNS (null, 'style', "fill:rgba(0,0,0,0.2); stroke:#000000;stroke-width:0");
		
		var svgDom = this.resizeElement.container;
	
		svgDom.removeChild( this.rect.element );
		
		//旋转句柄
		//svgDom.removeChild( this.handles.rotateHandle.element );
		
		//1句柄
		svgDom.removeChild( this.handles.ulHandle.element );
		//2
		svgDom.removeChild( this.handles.urHandle.element );
		//3
		svgDom.removeChild( this.handles.lrHandle.element );
		//4
		svgDom.removeChild( this.handles.llHandle.element );
		
		svgDom.removeChild( this.handles.topHandle.element );
		
		svgDom.removeChild( this.handles.leftHandle.element );
		
		svgDom.removeChild( this.handles.rightHandle.element );
		
		svgDom.removeChild( this.handles.bottomHandle.element );
	
	},
	
	updateHandle: function () {
	
		this.removeHandle();
		this.dispHandle( this.getUL() , this.getLR() );
	
	}

}