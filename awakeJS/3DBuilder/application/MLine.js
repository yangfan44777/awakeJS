function MLine ( v0 , v1 ) {

	//需要引入3dBuilder/core/Line
	this.lineElement = new Line(v0.x , v0.y , v1.x , v1.y );
    this.v0 = v0;
	this.v1 = v1;
	
	//建立点与线关系
	v0.lines.push( this );
	v1.lines.push( this );
	
	var self = this;
	
	EventUtil.addListener( this.lineElement.element , "mouseover" , function(){self.lineElement.element.setAttributeNS ( null, "style" , "stroke:rgba(253,196,0,1);stroke-width:6;z-index:-1");} );
	EventUtil.addListener( this.lineElement.element , "mouseout" , function(){self.lineElement.element.setAttributeNS ( null, "style" , "stroke:rgba(99,99,99,0.2);stroke-width:6;z-index:-1");} );

 };
 
MLine.prototype = {

	constructor : MLine,
	
	update : function () {
	
		var lineEle = this.lineElement;
		
		var v0 = this.v0;
		var v1 = this.v1;
		
		lineEle.setCurrentPosition( v0.x , v0.y , v1.x , v1.y );
	
	},
	
	destroy : function () {
	
		var v0 = this.v0;
		var v1 = this.v1;
		
	
		var indexV0 = v0.lines.indexOf(this);
		if(indexV0!==-1)
			v0.lines.splice( indexV0 , 1);
		
		
		var indexV1 = v1.lines.indexOf(this);
		if(indexV1!==-1)
			v1.lines.splice( indexV1 , 1);
		
	
	
	}

}