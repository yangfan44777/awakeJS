function Face ( a , b , c ,color) {
	
	this.a = a;
	this.b = b;
	this.c = c;
	
	this.depth = 0;
	
	this.color  = color || '#eeeeee';
	this.border = null;
	
	this.material = null;
};

Face.prototype = {

	constructor : Face,
	
	setMaterial : function ( texture , uv ) {
	
	
		/* 这里做贴图映射 */
		/* 思路：选最大角顶点的其余两点的任意一点，如果旋转后，最大角顶点的y值为负，则再做一个平移和旋转操作 */
		
		/* 约定 b - a 向量为x轴 ， c - a 向量为y轴 。pointA对应a点，pointB 对应b点 ， pointC 对应c点*/
		
		var  pointA , pointB , pointC,
		baseToOriginalMtx , baseToTargetMtx  , OriginalToTargetMtx , lengthAB = 0 , lengthBC = 0 , lengthCA = 0,
		rad = 0 , pivx , pivy , cvsHeight , cvsWidth , maxRadVertex , affinityMtx;
		
		
	
		pointA = new Vector3(texture.width * uv[0][0],texture.height * uv[0][1],1);
		pointB = new Vector3(texture.width * uv[1][0],texture.height * uv[1][1],1);
		pointC = new Vector3(texture.width * uv[2][0],texture.height * uv[2][1],1);
		
		baseToOriginalMtx = new Matrix3(  pointB.x - pointA.x , pointC.x - pointA.x , pointA.x , pointB.y - pointA.y , pointC.y - pointA.y , pointA.y , 0 , 0 , 1 );
		
		lengthAB = pointA.getLength( pointB ); 
		lengthBC = pointB.getLength( pointC ); 
		lengthCA = pointC.getLength( pointA ); 
	
		if (lengthAB > lengthBC && lengthAB > lengthCA ) {        
		
			// use u_a v_a
			rad = Math.atan2( pointB.y-pointA.y, pointB.x - pointA.x );
			pivx = pointA.x;
			pivy = pointA.y;
			cvsWidth = lengthAB;
			maxRadVertex = pointC;
			
		}
		else if ( lengthBC > lengthCA ) { 
		
			// use u_b v_b
			rad = Math.atan2( pointC.y-pointB.y, pointC.x-pointB.x );
			pivx = pointB.x;
			pivy = pointB.y;
			cvsWidth = lengthBC;
			maxRadVertex = pointA;
			
		}
		else {
		
			// use u_c v_c
			rad = Math.atan2( pointA.y-pointC.y, pointA.x-pointC.x );
			pivx = pointC.x;
			pivy = pointC.y;
			cvsWidth = lengthCA;
			maxRadVertex = pointB;
							
		}
		
				
		rad = -rad;
		var cosR = Math.cos( rad );
		var sinR = Math.sin( rad )
		
		affinityMtx = new Matrix3();
		
		( new Matrix3( cosR , -sinR , 0 , sinR , cosR , 0 , 0 , 0 , 1 ) ).multiply( affinityMtx , new Matrix3( 1 , 0 , -pivx , 0 ,1 , -pivy , 0 , 0 , 1) );
		
		//( new Matrix3( 1 , 0 , 1 , 0 , 1 , 1 , 0 , 0 , 1) ).multiply(affinityMtx , affinityMtx);
		
		pointA.applyMatrix( affinityMtx );
		pointB.applyMatrix( affinityMtx );
		pointC.applyMatrix( affinityMtx );
				
		if ( maxRadVertex.y < 0) {
			
			affinityMtx = new Matrix3( -1 , 0 , cvsWidth , 0 , -1 , 0 , 0 , 0 , 1 );
			
			pointA.applyMatrix( affinityMtx );
			pointB.applyMatrix( affinityMtx );
			pointC.applyMatrix( affinityMtx );
					
		}
		
		
		cvsHeight = ( pointA.y > pointB.y ) ? ( pointA.y > pointC.y ? pointA.y : pointC.y ) : ( pointB.y > pointC.y ? pointB.y : pointC.y );
			
		// 新建一个贴图
		var canvas = document.createElement( "canvas" );
		canvas.width = Math.ceil( cvsWidth );//返回大于等于数字参数的最小整数
		canvas.height = Math.ceil( cvsHeight );
	
		var ctx = canvas.getContext( "2d" );
				
		baseToTargetMtx = new Matrix3(  pointB.x - pointA.x , pointC.x - pointA.x , pointA.x , pointB.y - pointA.y , pointC.y - pointA.y , pointA.y , 0 , 0 , 1 );
			
		var baseToTargetMtxInverse = baseToTargetMtx.clone().inverse();
		
		OriginalToTargetMtx = new Matrix3();
		
		baseToTargetMtx.multiply( OriginalToTargetMtx , baseToOriginalMtx.inverse()  );
		
	
		ctx.save();
		                
		var OTTelements = OriginalToTargetMtx.elements;
		
		ctx.setTransform( OTTelements[0], OTTelements[3], OTTelements[1],OTTelements[4], OTTelements[2], OTTelements[5] );
						//x 轴     y 轴
						//0,0这两个参数表示绘制图像的左上角位置
		ctx.drawImage( texture, 0, 0);

		ctx.restore();
		
		this.material = new Material();
		
		this.material.style =  ctx.createPattern( canvas, "no-repeat" );
		 
		 
		this.material.matrix = baseToTargetMtxInverse;
		
		

		
		return this;
		
	},

	
	updateDepth : function () {
	
		/* 更新z轴深度信息 */
		this.depth = this.a.z + this.b.z + this.c.z;
	
	}
	
}