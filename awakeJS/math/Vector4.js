function Vector4 ( x , y , z , w ) {

	this.x = x || 0;
	this.y = y || 0;
	this.z = z || 0;
	this.w = ( w === undefined ) ? 1 : w;
}

Vector4.prototype = {
	
	construtor : Vector4,
	
	applyMatrix4 : function ( m ) {
		
		var x = this.x;
		var y = this.y;
		var z = this.z;
		var w = this.w;

		var e = m.elements;
		
		/*
		m11 m12 m13 m14      x
		m21 m22 m23 m24      y
		m31 m32 m33 m34   *  z
		m41 m42 m43 m44      w
		*/

		this.x = e[0] * x + e[1] * y + e[2] * z + e[3] * w;
		this.y = e[4] * x + e[5] * y + e[6] * z + e[7] * w;
		this.z = e[8] * x + e[9] * y + e[10] * z + e[11] * w;
		this.w = e[12] * x + e[13] * y + e[14] * z + e[15] * w;
	}
}