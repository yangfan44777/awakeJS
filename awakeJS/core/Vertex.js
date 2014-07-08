function Vertex ( x , y , z ) {

	this.x = x || 0; // 世界坐标系中的位置
	this.y = y || 0;
	this.z = z || 0;
	
	this.sx = 0;     // 在屏幕上投影后的位置
	this.sy = 0;
	this.depth = 0;
		
};

Vertex.prototype = {

	constructor : Vertex,
	
	applyMatrix4 : function ( m ) {
	
		var m = m.elements;
	
		var x = this.x;
		var y = this.y;
		var z = this.z;
		
		
		this.x = m[0] * x + m[1] * y + m[2] * z + m[3];
		this.y = m[4] * x + m[5] * y + m[6] * z + m[7];
		this.depth = this.z = m[8] * x + m[9] * y + m[10] * z + m[11];
		
		
		
		return this;
	
	},
	
	applyProjection : function( m ) {
	
		/* 这里做投影变换，变换到屏幕中 */
		var t = this.clone().applyMatrix4( m );
		
		//alert(t.elements);
		
		this.depth = t.z;
		
		
		this.sx = t.x/this.depth;
		this.sy = t.y/this.depth;
		
		
		return this;
	
	},
	
	draw : function ( ctx ) {
	
		ctx.fillStyle="#FF0000";
		ctx.beginPath();
		ctx.arc( this.sx , this.sy , 15 , 0 , Math.PI*2 , true );
		ctx.closePath();
		ctx.fill();
	
	},
	
	clone : function () {
	
		return new Vertex( this.x , this.y , this.z );
	
	}
	
}