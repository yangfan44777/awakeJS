function Camera ( x , y , z , rx , ry , rz , distance ) {
	
	
	this.x = x || 0;
	this.y = y || 0;
	this.z = z || 0;
	this.rx = rx || 0;
	this.ry = ry || 0;
	this.rz = rz || 0;
	
	this.distance = distance || 500; //near
	

	this.matrixWorldInverse = new Matrix4();
	this.projectionMatrix = new Matrix4(); /* 透视投影矩阵暂时不考虑CVV裁剪 */
	
	
	this.projectionMatrix.identity(); 
	this.updateProjectionMatrix();
	
};

/* X                       
   1  0   0    0
   0  cx  -sx  0
   0  sx  cx   0   
   0  0   0    1
   
   Y                       
   cy   0   sy  0
   0    1   0   0
   -sy  0   cy  0   
   0    0   0   1
   
   Z                        
   cz  -sz   0  0
   sz  cz    0  0
   0   0     1  0  
   0   0     0  1
   
   Euler order is 'XYZ'
 */
Camera.prototype = {

	constructor : Camera,
	
	update :  function () {
	
                                                                        /* 旋转矩阵的转置即为矩阵的逆 */
		this.matrixWorldInverse.setFromEuler( this.rx , this.ry , this.rz ).transpose();//order : 'XYZ'  => Z * Y * X
		
		var tra = new Matrix4().identity().setPosition( -this.x , -this.y , -this.z );
		
		this.matrixWorldInverse.multiply( this.matrixWorldInverse , tra );
		
	},

	setDistance : function ( distance ) {

		this.distance = distance;
		
		this.updateProjectionMatrix();

	},

	updateProjectionMatrix : function () {

		/* 根据distance等信息更新投影矩阵 */
		
		var projectionMatrix = this.projectionMatrix.elements;
		
		projectionMatrix[ 0 ] = projectionMatrix[ 5 ] = this.distance;
		
		
	}
}
