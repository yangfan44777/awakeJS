function MPoint ( x , y , r ) {
	//需要引入3dBuilder/core/Circle
	this.pointElement = new Circle( x , y , r );
	this.x = x;
	this.y = y;
	this.z = 0;
	this.r = r;
	this.triangles = [];
	this.lines = [];
	
	
	var self = this;
	var mousedownHandler = function ( e ) {
		
		EventUtil.addListener( window , "mousemove" , moveHandler = function (e) {
			
			self.update();
			
		} );
			
		EventUtil.addListener( window , "mouseup" , upHandler = function () {
			
			EventUtil.removeListener( window , "mousemove" , moveHandler );
			
			EventUtil.removeListener( window , "mouseup" , upHandler );
			
		});
		
	}
	EventUtil.addListener( this.pointElement.element , "mousedown" , mousedownHandler );
	
	EventUtil.addListener( this.pointElement.element , "mouseover" , function(){self.pointElement.element.setAttributeNS (null, 'style', "fill:rgba(255,0,0,1);");} );
	EventUtil.addListener( this.pointElement.element , "mouseout" , function(){self.pointElement.element.setAttributeNS (null, 'style', "fill:#3d3d3d");} );
 };
 
MPoint.prototype = {

	constructor : MPoint,
	
	
	setPosition : function ( x ,  y) {
	
		this.pointElement.setCurrentPosition( x , y );
		this.update();
	
	},
	
	
	update : function () {
	
		var i , len;
		var pointEle = this.pointElement;
		var triangles = this.triangles;
		var lines = this.lines;
		
		this.x = pointEle.currentPosition.x;
		this.y = pointEle.currentPosition.y;
		
		len = triangles.length;
		for( i = 0 ; i < len ; i++ ){
		
			triangles[i].update();
			
		}
		
		len = lines.length;
		for( i = 0 ; i < len ; i++ ){
		
			lines[i].update();
		
		}
	
	},
	
	
	removeUnavailableTriangles :function () {
	
		var triangles = this.triangles;
		var results = [];
		
		
		for( var i=0;i<triangles.length;i++ ){
			
			var tri = triangles[i];
			
			if(  tri.v0 === tri.v1  ||
			     tri.v1 === tri.v2  ||
			     tri.v2 === tri.v0	){
				
				 results.push(tri);
				 triangles[i].destroy();
				 i--;
			}
			
		
		}
		
		for( var i=0;i<triangles.length;i++ ){
			
				for( var j = i+1;j< triangles.length ; j++){
				
					var a = triangles[j];
					var b = triangles[i];
					if( a === b)continue;
					
					if( (a.v0=== b.v0 && a.v1 === b.v1 && a.v2===b.v2) || 
					    (a.v0=== b.v0 && a.v1 === b.v2 && a.v2===b.v1) || 
						(a.v0=== b.v1 && a.v1 === b.v0 && a.v2===b.v2) || 
						(a.v0=== b.v1 && a.v1 === b.v2 && a.v2===b.v0) || 
						(a.v0=== b.v2 && a.v1 === b.v0 && a.v2===b.v1) || 
						(a.v0=== b.v2 && a.v1 === b.v1 && a.v2===b.v0)  ){
						
						results.push(a);
						triangles[j].destroy();
						j--;
					}
				
				}
			
		}	
		
	return results;
	},
	
	removeUnavailableLines : function () {
	
		var lines = this.lines;
		var results = [];
		
		
		for( var i=0;i<lines.length;i++ ){//这里的length不能在外面写，必须写在for这里
			
			var line = lines[i];
			
			if(  line.v0 === line.v1  ){
				
				 results.push(line);
				 lines[i].destroy();
				 i--;
			}
			
		
		}
		
		for( var i=0;i<lines.length;i++ ){//这里的length不能在外面写，必须写在for这里
			
				for( var j = i+1;j< lines.length ; j++){
				
					var a = lines[j];
					var b = lines[i];
					if( a === b)continue;
					
					if( (a.v0=== b.v0 && a.v1 === b.v1 ) || 
					    (a.v0=== b.v1 && a.v1 === b.v0 ) ){
						
						results.push(a);
						lines[j].destroy();
						j--;
					}
				
				}
			
		}	
		
	return results;
	
	}

}