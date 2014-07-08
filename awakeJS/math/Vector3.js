function Vector3 ( x , y , w) {

	this.x = x || 0;
	this.y = y || 0;
	this.w = w || 1;

};

Vector3.prototype = {

	constructor : Vector3,
	
	applyMatrix : function ( m ) {
	
		var me = m.elements;
		
		var x = this.x;
		var y = this.y;
		var w = this.w;
	
		this.x = me[0] * x + me[1] * y + me[2] * w;
		this.y = me[3] * x + me[4] * y + me[5] * w;
		this.w = me[6] * x + me[7] * y + me[8] * w;
		
		return this;
		
	},
	
	getLength : function ( v ) {
	
		if ( this.w === 0 || v.w === 0 ) return ;
		
		var dx = this.x - v.x;
		var dy = this.y - v.y;
		
		return Math.sqrt( dx * dx + dy * dy );
	
	}
	
	

}

