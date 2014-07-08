function Mesh2D(canvas){

	this.triangleSvg = [];
	this.pointSvg = [];
	this.lineSvg = [];
	this.canvas = canvas;
	
	this.createLine( this.createPoint(100,100) , this.createPoint(50,50));
};

Mesh2D.prototype = {

	constructor : Mesh2D,
	
	createPoint : function ( x , y  ) {
	
		var point = new MPoint( x , y ,5);
		this.pointSvg.push(point);
		this.canvas.appendChild(point.pointElement);
		
		var pointSvg = this.pointSvg;
		var self = this;
		var canvas = this.canvas;
		
		var downHandler;
		var upHandler;
		var wheelHandler;
		
		EventUtil.addListener( point.pointElement.element ,"mousedown",downHandler = function(e){
		
			for(var i = 0;i<pointSvg.length;i++){
			
				if(pointSvg[i]===point)continue;
				var dx = pointSvg[i].x-point.x;
				var dy = pointSvg[i].y-point.y;
				if( Math.sqrt(dx*dx + dy*dy)<=4 ){
				
					canvas.removeChild(point.pointElement);
					
					for( var j = 0;j<point.triangles.length;j++){
						
						if(pointSvg[i].triangles.indexOf(point.triangles[j])===-1){
						
							var t = point.triangles[j];
							
							pointSvg[i].triangles.push(t);
							
						}
						
						var vTri = point.triangles;
							
						if( vTri[j].v0===point ){
		
							vTri[j].v0 = pointSvg[i];
						
						}
						if( vTri[j].v1===point ){
						
							vTri[j].v1 = pointSvg[i];
						
						}
						if( vTri[j].v2===point ){
						
							vTri[j].v2 = pointSvg[i];
						
						}
					
					}
					
					
					for( var j = 0;j<point.lines.length;j++){
					
						if(pointSvg[i].lines.indexOf(point.lines[j])===-1){
						
							pointSvg[i].lines.push(point.lines[j]);
							
						
						}
						
						var vLine = point.lines;
							
						if( vLine[j].v0===point ){
		
							vLine[j].v0 = pointSvg[i];
						
						}
						if( vLine[j].v1===point ){
						
							vLine[j].v1 = pointSvg[i];
						
						}
						
					
					}
					
					
					var index = pointSvg.indexOf(point);
					
					pointSvg.splice(index , 1);
					
					
					//检查重复和无效的tri以及line
					
					var results = pointSvg[i].removeUnavailableTriangles();
					//console.log(results);
					for(var k=0;k<results.length;k++){
						
						
						canvas.removeChild(results[k].triangleElement);
						
						var index = self.triangleSvg.indexOf(results[k]);
						
						self.triangleSvg.splice(index,1);
					}
					
					results = pointSvg[i].removeUnavailableLines();
					//console.log(results);
					for(var k=0;k<results.length;k++){
						
						
						canvas.removeChild(results[k].lineElement);
						
						var index = self.lineSvg.indexOf(results[k]);
						
						self.lineSvg.splice(index,1);
					}
					
					break;
				}
			
			}
			
			EventUtil.addListener( window , "mousewheel" , wheelHandler=function (e) {
		
	
				var s = ( e.detail ) ? -e.detail : e.wheelDelta;
				
				if(s>0)
					point.z+=10;
				
				else 
					point.z-=10;
				
				
		
			});
			
			EventUtil.addListener( window , "mouseup" , upHandler = function () {
			
			
			
			//EventUtil.removeListener( window , "mousemove" , moveHandler );
			
			EventUtil.removeListener( window , "mouseup" , upHandler );
			
			EventUtil.removeListener( window , "mousewheel" , wheelHandler );
		});
			
		
		});
		
		
		//EventUtil.addListener( point.pointElement.element ,"mouseup",upHandler = function(e){});
		
		
		
		return point;
		
	},
	
	createLine : function ( v0 , v1 ) {
	
		var line = new MLine( v0 , v1 );
		
		this.lineSvg.push(line);
		
		var element = line.lineElement.element;
		
		this.canvas.insertChildBefore(line.lineElement,"circle");
	
		var self = this;
		var canvas  = this.canvas;
		EventUtil.addListener( element ,"mousedown",function(e){
		   
			var moveHandler;
			var upHandler;
			//绘制临时的连线
			var v0 = line.v0;
			var v1 = line.v1;
			var line1 = new Line(v0.x,v0.y,e.offsetX,e.offsetY);
			var line2 = new Line(v1.x,v1.y,e.offsetX,e.offsetY);
			
			line1.element.setAttributeNS ( null, "style" , "stroke:rgba(253,196,0,1);stroke-width:3;z-index:-1");
			line2.element.setAttributeNS ( null, "style" , "stroke:rgba(253,196,0,1);stroke-width:3;z-index:-1");
			line1.element.setAttributeNS (null, 'stroke-dasharray' , "10");
			line2.element.setAttributeNS (null, 'stroke-dasharray' , "10");
			
			canvas.insertChildBefore(line1,"circle");
			canvas.insertChildBefore(line2,"circle");
			
			EventUtil.addListener( window,"mousemove",moveHandler=function(e) {
				
					line1.setCurrentPosition( v0.x,v0.y,e.offsetX,e.offsetY );
					line2.setCurrentPosition( v1.x,v1.y,e.offsetX,e.offsetY );
					
				});
				
				EventUtil.addListener( window,"mouseup" ,upHandler = function(e){
				
					
					var v = self.createPoint( e.offsetX , e.offsetY );
					
					self.createTriangle(v0 , v1 , v );
					self.createLine( v0 , v );
					self.createLine( v1 , v );
					
					canvas.removeChild( line1 );
					canvas.removeChild( line2 );
					
					EventUtil.removeListener(window,"mosuemove",moveHandler);
					EventUtil.removeListener(window,"mouseup",upHandler);
					
					
				
				});
		});
	},
	
	createTriangle : function ( v0 , v1 , v2 ) {
	
	
	
		var triangle = new MTriangle( v0 , v1 , v2 );
		
		this.triangleSvg.push(triangle);
		
		this.canvas.insertChild( triangle.triangleElement );
		
		return triangle;
	},
	
	
	getMeshData : function () {
	
		var pointSvg = this.pointSvg;
		var triangleSvg = this.triangleSvg;
		
		
		var verticesrc = [],facesrc = [] , uvsrc = [];
		
		//生成原始数据
		var len = pointSvg.length;
		for(var i = 0;i< len; i++){
		
			verticesrc.push([pointSvg[i].x-250,pointSvg[i].y-250,pointSvg[i].z]);

		}
		
		len = triangleSvg.length;
		for(var i=0; i< len ; i++ ){
		
			var indexV0 = pointSvg.indexOf(triangleSvg[i].v0);
			var indexV1 = pointSvg.indexOf(triangleSvg[i].v1);
			var indexV2 = pointSvg.indexOf(triangleSvg[i].v2);
			
			facesrc.push( [ indexV0 + 1 , indexV1 + 1 , indexV2 + 1 ] );
			
			uvsrc[i]=[];
			
			uvsrc[i].push( [ pointSvg[indexV0].x / 500,pointSvg[indexV0].y / 500],
						   [ pointSvg[indexV1].x / 500,pointSvg[indexV1].y / 500],
						   [ pointSvg[indexV2].x / 500,pointSvg[indexV2].y / 500]);
			
		}
		
		return { "verticesrc" : verticesrc , "facesrc":facesrc ,"uvsrc" :uvsrc };
		
	}
	
	

}