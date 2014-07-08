function ResizeTriangle ( g ) {

	this.graph = g;
	
	
	
	this.originalV0 = { x:this.graph.v0.x , y:this.graph.v0.y };
	this.originalV1 = { x:this.graph.v1.x , y:this.graph.v1.y };
	this.originalV2 = { x:this.graph.v2.x , y:this.graph.v2.y };
	
	this.original_ul = {} ;
	this.original_lr = {};
	
}

ResizeTriangle.prototype = {

	constructor : ResizeTriangle,
		
	updateGraph : function ( new_ul , new_lr ) {
	
	
		//以左上角为参考点	
		var graph = this.graph;
		
		var scaleX = ( new_lr.x - new_ul.x ) /( this.original_lr.x -  this.original_ul.x);
		var scaleY = ( new_lr.y - new_ul.y ) / (this.original_lr.y -  this.original_ul.y);
		
		
		
		var v0_new_x = scaleX * (this.originalV0.x - this.original_ul.x) + new_ul.x;
		var v0_new_y = scaleY * (this.originalV0.y - this.original_ul.y) + new_ul.y;
		
		var v1_new_x = scaleX * (this.originalV1.x - this.original_ul.x) + new_ul.x;
		var v1_new_y = scaleY * (this.originalV1.y - this.original_ul.y) + new_ul.y;
		
		var v2_new_x = scaleX * (this.originalV2.x - this.original_ul.x) + new_ul.x;
		var v2_new_y = scaleY * (this.originalV2.y - this.original_ul.y) + new_ul.y;
		
		
		
		
		     //这里算不算又和MPoint类形成依赖关系了呢？
		graph.v0.setPosition( v0_new_x , v0_new_y );
		graph.v1.setPosition( v1_new_x , v1_new_y );
		graph.v2.setPosition( v2_new_x , v2_new_y );
		
		
	},
	
	
	updateOriginal : function (  ul , lr ) {
	
		this.originalV0 = { x:this.graph.v0.x , y:this.graph.v0.y };
		this.originalV1 = { x:this.graph.v1.x , y:this.graph.v1.y };
		this.originalV2 = { x:this.graph.v2.x , y:this.graph.v2.y };
		
		this.original_ul = {x:ul.x , y : ul.y};
		this.original_lr = {x:lr.x , y : lr.y};
	
	}

}
