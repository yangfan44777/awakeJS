function Matrix3 ( m11, m12 , m13 ,  m21 , m22 , m23 , m31 , m32 , m33  ) {
	
	this.elements = [];
	
	var t = this.elements;
	
	t[0] = m11; t[1] = m12; t[2] = m13;
	t[3] = m21; t[4] = m22; t[5] = m23; 
	t[6] = m31; t[7] = m32; t[8] = m33;
	
}

Matrix3.prototype = {

	constructor : Matrix3,
	
	identity : function () {
		
		var t = this.elements;
		
		t[0] = 1; t[1] = 0; t[2] = 0;
		t[3] = 0; t[4] = 1; t[5] = 0; 
		t[6] = 0; t[7] = 0; t[8] = 1;
		
		return this;
	},
	
	/* this矩阵 乘以 m ，结果存储在r中 */
	multiply : function ( r , m ) {
		
		var ae = this.elements;
		var be = m.elements;
		var re = r.elements;
		
		var a11 = ae[0], a12 = ae[1], a13 = ae[2];
		var a21 = ae[3], a22 = ae[4], a23 = ae[5];
		var a31 = ae[6], a32 = ae[7], a33 = ae[8];
	
		
		var b11 = be[0], b12 = be[1], b13 = be[2];
		var b21 = be[3], b22 = be[4], b23 = be[5];
		var b31 = be[6], b32 = be[7], b33 = be[8];
	
		
		re[0] = a11 * b11 + a12 * b21 + a13 * b31 ;
		re[1] = a11 * b12 + a12 * b22 + a13 * b32 ;
		re[2] = a11 * b13 + a12 * b23 + a13 * b33 ;
	
		
		re[3] = a21 * b11 + a22 * b21 + a23 * b31 ;
		re[4] = a21 * b12 + a22 * b22 + a23 * b32 ;
		re[5] = a21 * b13 + a22 * b23 + a23 * b33 ;
		
		
		re[6] = a31 * b11 + a32 * b21 + a33 * b31 ;
		re[7] = a31 * b12 + a32 * b22 + a33 * b32 ;
		re[8] = a31 * b13 + a32 * b23 + a33 * b33 ;
		
		
	
		
	},
	
	inverse : function () {
		
		var m = this.elements;
		
		var m11 = m[0];var m12 = m[1];var m13 = m[2];
		var m21 = m[3];var m22 = m[4];var m23 = m[5];
		var m31 = m[6];var m32 = m[7];var m33 = m[8];
		
		det =m11 * m22 * m33 + m12 * m23 * m31 + m13 * m21 * m32 - m13 * m22 * m31 - m12 * m21 * m33 - m11 * m23 * m32;
		
		m[0] = m22 * m33 - m23 * m32;
		m[1] = -( m21 * m33 - m23 * m31 );
		m[2] = m21*m32 - m22 *m31;
		
		m[3] = -(m12* m33 - m13 * m32);
		m[4] = m11 * m33 - m13 * m31;
		m[5] = -(m11 * m32 - m12* m31);
		
		m[6] = m12 * m23 -m13* m22;
		m[7] = -(m11 * m23-m13* m21);
		m[8] =m11 * m22 -m12* m21;
		
		this.transpose().multiplyScalar( 1.0 / det );
		
		return this;
		
	},
	
	multiplyScalar: function ( s ) {

		var te = this.elements;

		te[0] *= s; te[3] *= s; te[6] *= s;
		te[1] *= s; te[4] *= s; te[7] *= s;
		te[2] *= s; te[5] *= s; te[8] *= s;

		return this;

	},

	transpose : function () {
		
		var m = this.elements;
		var t;
		
		t = m[1];m[1] = m[3];m[3] = t;
		t = m[2];m[2] = m[6];m[6] = t;
		t = m[5];m[5] = m[7];m[7] = t;
		
		
		return this;
	},
	
	setPosition : function ( dx , dy ) {
	
		var m = this.elements;
	
		m[2] = dx;
		m[5] = dy;
	
		return this;
	},
	
	clone : function () {
	
		var e = this.elements;
		
		return new Matrix3(e[0],e[1],e[2],e[3],e[4],e[5],e[6],e[7],e[8] );
	
	}
	
}