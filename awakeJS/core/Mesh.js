function Mesh ( ) {

	this.vertices = [];
	
	this.faces = [];


};

Mesh.prototype = {

	constructor : Mesh,
	
	makeBodyFromSrc : function ( verticesrc , facesrc) {
	
		var vertices = this.vertices;
		
		var faces = this.faces;
		
		for ( i in verticesrc ) {
		
			var vertexsrc = verticesrc[i];
			
			vertices.push( new Vertex( vertexsrc[0] , vertexsrc[1] , vertexsrc[2] );
			
		}
		
		for ( i in facesrc ) {
		
			var _facesrc = facesrc[i];
			
			/* facesrc中对点的引用为verticesrc中点的索引+1 */
			faces.push( new Face( vertices[_facesrc[i][0] - 1] , vertices[_facesrc[i][1] - 1] , vertices[_facesrc[i][2] - 1] ) );
		
		}
	},
	
	update : function () {
	
		/* 这里更新点和绘制面 */
	
	}
}