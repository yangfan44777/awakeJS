function Matrix4 ( m11, m12 , m13 , m14 , m21 , m22 , m23 , m24 , m31 , m32 , m33 , m34 , m41 , m42 , m43 , m44 ) {
	
	this.elements = [];
	
	var t = this.elements;
	
	t[0] = m11; t[1] = m12; t[2] = m13; t[3] = m14;
	t[4] = m21; t[5] = m22; t[6] = m23; t[7] = m24; 
	t[8] = m31; t[9] = m32; t[10] = m33; t[11] = m34; 
	t[12] = m41; t[13] = m42; t[14] = m43; t[15] = m44; 
	
}

Matrix4.prototype = {

	constructor : Matrix4,
	
	identity : function () {
		
		var t = this.elements;
		
		t[0] = 1; t[1] = 0; t[2] = 0; t[3] = 0;
		t[4] = 0; t[5] = 1; t[6] = 0; t[7] = 0; 
		t[8] = 0; t[9] = 0; t[10] = 1; t[11] = 0; 
		t[12] = 0; t[13] = 0; t[14] = 0; t[15] = 1; 
		
		return this;
	},
	
	/* this矩阵 乘以 m ，结果存储在r中 */
	multiply : function ( r , m ) {
		
		var ae = this.elements;
		var be = m.elements;
		var re = r.elements;
		
		var a11 = ae[0], a12 = ae[1], a13 = ae[2], a14 = ae[3];
		var a21 = ae[4], a22 = ae[5], a23 = ae[6], a24 = ae[7];
		var a31 = ae[8], a32 = ae[9], a33 = ae[10], a34 = ae[11];
		var a41 = ae[12], a42 = ae[13], a43 = ae[14], a44 = ae[15];
		
		var b11 = be[0], b12 = be[1], b13 = be[2], b14 = be[3];
		var b21 = be[4], b22 = be[5], b23 = be[6], b24 = be[7];
		var b31 = be[8], b32 = be[9], b33 = be[10], b34 = be[11];
		var b41 = be[12], b42 = be[13], b43 = be[14], b44 = be[15];
		
		re[0] = a11 * b11 + a12 * b21 + a13 * b31 + a14 * b41;
		re[1] = a11 * b12 + a12 * b22 + a13 * b32 + a14 * b42;
		re[2] = a11 * b13 + a12 * b23 + a13 * b33 + a14 * b43;
		re[3] = a11 * b14 + a12 * b24 + a13 * b34 + a14 * b44;
		
		re[4] = a21 * b11 + a22 * b21 + a23 * b31 + a24 * b41;
		re[5] = a21 * b12 + a22 * b22 + a23 * b32 + a24 * b42;
		re[6] = a21 * b13 + a22 * b23 + a23 * b33 + a24 * b43;
		re[7] = a21 * b14 + a22 * b24 + a23 * b34 + a24 * b44;
		
		re[8] = a31 * b11 + a32 * b21 + a33 * b31 + a34 * b41;
		re[9] = a31 * b12 + a32 * b22 + a33 * b32 + a34 * b42;
		re[10] = a31 * b13 + a32 * b23 + a33 * b33 + a34 * b43;
		re[11] = a31 * b14 + a32 * b24 + a33 * b34 + a34 * b44;
		
		re[12] = a41 * b11 + a42 * b21 + a43 * b31 + a44 * b41;
		re[13] = a41 * b12 + a42 * b22 + a43 * b32 + a44 * b42;
		re[14] = a41 * b13 + a42 * b23 + a43 * b33 + a44 * b43;
		re[15] = a41 * b14 + a42 * b24 + a43 * b34 + a44 * b44;
		
	},
	
	setFromEuler : function ( rx , ry , rz ) {
	
		/*  the Euler order is XYZ => ( Z * Y * X )*/
		var sinX = Math.sin( rx );
		var cosX = Math.cos( rx );
		var sinY = Math.sin( ry );
		var cosY = Math.cos( ry );
		var sinZ = Math.sin( rz );
		var cosZ = Math.cos( rz );
		
		
		var m = this.elements;
		
		m[0] = cosZ * cosY;
		m[1] = cosZ * sinY * sinX - sinZ * cosX;
		m[2] = cosZ * sinY * cosX + sinX * sinX;
		m[3] = 0;
		m[4] = sinZ * cosY;
		m[5] = sinZ * sinY * sinX + cosX * cosZ;
		m[6] = sinZ * sinY * cosX - cosZ * sinX;
		m[7] = 0;
		m[8] = -sinY;
		m[9] = cosY * sinX;
		m[10] = cosY * cosX;
		m[11] = 0;
		m[12] = m[13] = m[14] = 0;
		m[15] = 1;
		

		
		return this;
		
	},
	
	transpose : function () {
		
		var m = this.elements;
		var t;
		
		t = m[1];m[1] = m[4];m[4] = t;
		t = m[2];m[2] = m[8];m[8] = t;
		t = m[6];m[6] = m[9];m[9] = t;
		
		
		t = m[3];m[3] = m[12];m[12] = t;
		t = m[7];m[7] = m[13];m[13] = t;
		t = m[11];m[11] = m[14];m[14] = t;
		
		return this;
	},
	
	setPosition : function ( dx , dy , dz ) {
	
		var m = this.elements;
	
		m[3] = dx;
		m[7] = dy;
		m[11] = dz;
		
		return this;
	}
	
}