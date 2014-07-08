function Renderer ( canvas ) {

	this.canvas = canvas;
	

};
Renderer.compareDepth = function ( a , b) {

	return   b.depth - a.depth; 

};

Renderer.prototype = {

	constructor : Renderer,
	                                      
	render : function ( faces , camera ) {
		
		camera.update();
	
		var facesLen = faces.length;
		
		var matrixWorldInverse = camera.matrixWorldInverse;
		var projectionMatrix = camera.projectionMatrix;
		
		var canvas = this.canvas;
		var ctx =  canvas.getContext('2d');
		
		var centerWidth = canvas.width / 2 , centerHeight = canvas.height / 2;
		
		ctx.clearRect( 0, 0, canvas.width, canvas.height );
		
		
		
		for ( var i = 0 ; i < facesLen ; i++ ) {
		
			var face = faces[i];
			
			var cloneA = face.a.clone().applyMatrix4( matrixWorldInverse );
			var cloneB = face.b.clone().applyMatrix4( matrixWorldInverse );
			var cloneC = face.c.clone().applyMatrix4( matrixWorldInverse );
			
			face.depth = cloneA.depth + cloneB.depth + cloneC.depth;
			
			face.a.sx = cloneA.applyProjection( projectionMatrix ).sx + centerWidth;
			face.a.sy = cloneA.applyProjection( projectionMatrix ).sy + centerHeight;
			face.b.sx = cloneB.applyProjection( projectionMatrix ).sx + centerWidth;
			face.b.sy = cloneB.applyProjection( projectionMatrix ).sy + centerHeight;
			face.c.sx = cloneC.applyProjection( projectionMatrix ).sx + centerWidth;
			face.c.sy = cloneC.applyProjection( projectionMatrix ).sy + centerHeight;
			
			
		}
		   
		
			
			/* sort Z */			
			faces.sort( Renderer.compareDepth  );
			
			/* draw */
			for ( var i = 0 ; i < facesLen ; i++ ) {
			
			
			
				var face = faces[i];
				
				
				
				
				var style = face.material.style;
				
				var B_ = face.material.matrix;
				
				
				var M = new Matrix3( face.b.sx - face.a.sx , face.c.sx - face.a.sx , face.a.sx , face.b.sy - face.a.sy , face.c.sy - face.a.sy , face.a.sy , 0 , 0 , 1 );
		
				var R = new Matrix3();
				
				M.multiply( R , B_);
				
				/*扩大面，减少裂痕*/
				var polySize = 1.3;//沿重心延长线增加1.3像素
				var x0 = face.a.sx,y0 = face.a.sy;
				
				var x1 = face.b.sx, x2 = face.c.sx , y1 = face.b.sy, y2 = face.c.sy;
		
				var cx = ( x0 + x1 + x2 ) * 1/3;
				var cy = ( y0 + y1 + y2 ) * 1/3;

				var xd = x0 - cx;
				var yd = y0 - cy;
				var l = polySize / Math.sqrt( xd * xd + yd * yd );
				x0 += xd * l;
				y0 += yd * l;
				xd = x1 - cx; yd = y1 - cy;
				l = polySize / Math.sqrt( xd * xd + yd * yd );
				x1 += xd * l;
				y1 += yd * l;
				xd = x2 - cx; yd = y2 - cy;
				l = polySize / Math.sqrt( xd * xd + yd * yd );
				x2 += xd * l;
				y2 += yd * l;
	
		
				ctx.fillStyle = style;
		
				ctx.beginPath();
				ctx.moveTo( x0 , y0 );
				ctx.lineTo( x1 , y1 );
				ctx.lineTo( x2 , y2 );
				
				ctx.closePath();
		
				
				ctx.save();
				ctx.setTransform( R.elements[0],  R.elements[3],  R.elements[1], R.elements[4],  R.elements[2],  R.elements[5] );
				ctx.fill();
				ctx.restore();
				
		
		
		
		}
	}

}