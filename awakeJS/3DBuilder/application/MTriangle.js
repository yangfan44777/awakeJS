function MTriangle ( v0 , v1 , v2  ) {
	//需要引入3dBuilder/core/Triangle
	this.triangleElement = new Triangle( v0.x , v0.y , v1.x , v1.y , v2.x , v2.y  );
	this.v0 = v0;
	this.v1 = v1;
	this.v2 = v2;
	
	this.resizeBehaviour = new ResizeTriangle( this  );
	
	//建立点与三角的关系
	v0.triangles.push(this);
	v1.triangles.push(this);
	v2.triangles.push(this);
	this.selected = false;
	this.ul = {
				x : (v0.x>v1.x? (v2.x > v1.x ? v1.x:v2.x):(v2.x > v0.x ? v0.x:v2.x )),
				y : (v0.y>v1.y? (v2.y > v1.y ? v1.y:v2.y):(v2.y > v0.y ? v0.y:v2.y ))
			  };
			  
	this.lr = {
				x : (v0.x<v1.x? (v2.x < v1.x ? v1.x:v2.x):(v2.x < v0.x ? v0.x:v2.x )),
				y : (v0.y<v1.y? (v2.y < v1.y ? v1.y:v2.y):(v2.y < v0.y ? v0.y:v2.y ))
			  };
	
	//Debug
	var _self = this;
	EventUtil.addListener(_self.triangleElement.element , "click" , function () {
	
		if(!_self.selected)
		{
			_self.triangleElement.element.setAttributeNS (null, 'style', "fill:rgba(32,164,210,0.5); stroke:#000000;stroke-width:0");
			_self.selected=true;
		}
		else
		{
			_self.triangleElement.element.setAttributeNS (null, 'style', "fill:rgba(0,0,0,0.5); stroke:#000000;stroke-width:0");
			_self.selected=false;
		}
	
		var GraphContainerInstance = GraphContainer.getInstance();
		
		if( GraphContainerInstance.graphs.indexOf(_self) === -1 )
	
		{	GraphContainerInstance.addGraph( _self );}
		
		else
		{	GraphContainerInstance.removeGraph( _self );}
		
		
		
		GraphContainerInstance.initResize();
		
	
	});
	
	EventUtil.addListener( this.triangleElement.element , "mouseover" , function(){if(!_self.selected)_self.triangleElement.element.setAttributeNS (null, 'style', "fill:rgba(0,0,0,0.5); stroke:#000000;stroke-width:0");} );
	EventUtil.addListener( this.triangleElement.element , "mouseout" , function(){if(!_self.selected) _self.triangleElement.element.setAttributeNS (null, 'style', "fill:rgba(0,0,0,0.2); stroke:#000000;stroke-width:0");} );

	
	
	//MResizeable.call( this , this.triangleElement );
};
//MTriangle.prototype = Object.create( MResizeable.prototype );

MTriangle.prototype.resize = function (  new_ul , new_lr ) {

	this.resizeBehaviour.updateGraph(  new_ul , new_lr );

};

MTriangle.prototype.update = function () {
	
	
	var triEle = this.triangleElement;
	
	var v0 = this.v0;
	var v1 = this.v1;
	var v2 = this.v2;
	
	triEle.setCurrentPosition(v0.x , v0.y , v1.x , v1.y , v2.x , v2.y );
	
	this.ul = {
				x : (v0.x>v1.x? (v2.x > v1.x?v1.x:v2.x):(v2.x > v0.x?v0.x:v2.x )),
				y : (v0.y>v1.y? (v2.y > v1.y?v1.y:v2.y):(v2.y > v0.y?v0.y:v2.y ))
			  };
			  
	this.lr = {
				x : (v0.x<v1.x? (v2.x < v1.x?v1.x:v2.x):(v2.x < v0.x?v0.x:v2.x )),
				y : (v0.y<v1.y? (v2.y < v1.y?v1.y:v2.y):(v2.y < v0.y?v0.y:v2.y ))
			  };
		
	

}

MTriangle.prototype.initResizeBehaviour = function () {
	
	this.resizeBehaviour = new ResizeTriangle( this  );
	
}

                                //{x:a , y:b}
MTriangle.prototype.setPosition = function( v0 , v1 , v2 ){

	this.v0.x = v0.x;
	this.v0.y = v0.y;
	
	this.v1.x = v1.x;
	this.v1.y = v1.y;
	
	this.v2.x = v2.x;
	this.v2.y = v2.y;

	this.update();
}

MTriangle.prototype.getUL = function () {

	var v0 = this.v0;
	var v1 = this.v1;
	var v2 = this.v2;
	
	var ul = {};
	
	ul.x = (v0.x < v1.x ? ( v0.x < v2.x ? v0.x : v2.x):( v1.x < v2.x ? v1.x : v2.x));
	ul.y = (v0.y < v1.y ? ( v0.y < v2.y ? v0.y : v2.y):( v1.y < v2.y ? v1.y : v2.y));
	
	return ul;

}

MTriangle.prototype.getLR = function () {

	var v0 = this.v0;
	var v1 = this.v1;
	var v2 = this.v2;
	
	var lr = {};
	
	lr.x = (v0.x > v1.x ? ( v0.x > v2.x ? v0.x : v2.x):( v1.x > v2.x ? v1.x : v2.x));
	lr.y = (v0.y > v1.y ? ( v0.y > v2.y ? v0.y : v2.y):( v1.y > v2.y ? v1.y : v2.y));
	
	return lr;

}
	
MTriangle.prototype.destroy = function () {
			
	var v0 = this.v0;
	var v1 = this.v1;
	var v2 = this.v2;

	
	//这里的indexV0、indexV1、indexV2不能提前，因为有可能两个顶点甚至三个顶点都指向同一个实例
	var indexV0 = v0.triangles.indexOf(this);
	if(indexV0!==-1)
		v0.triangles.splice( indexV0 , 1);
	
	
	var indexV1 = v1.triangles.indexOf(this);
	if(indexV1!==-1)
		v1.triangles.splice( indexV1 , 1);
	
	
	var indexV2 = v2.triangles.indexOf(this);
	if(indexV2!==-1)
		v2.triangles.splice( indexV2 , 1);

		
	if(this.handleFlag==0)
		this.removeHandle();
}
