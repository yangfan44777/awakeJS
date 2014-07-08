var GraphContainer = (function GraphContainer () {

	var unique;
	
	function getInstance() {
	
		if( unique === undefined )
			unique = new Construct();
			
		return unique;
	}
	
	function Construct () {
	
		this.graphs = [];
		
		this.points = [];
	
		this.resizeContainer = new ResizeContainer(  );
		
	}
	Construct.prototype = {
	
		constructor : GraphContainer,
	
		initResize : function () {
			
			
		
			var ul = this._getUL();
			var lr = this._getLR();
			
			for(var i = 0;i<this.graphs.length;i++)
				this.graphs[i].resizeBehaviour.updateOriginal(ul,lr);
		
			this.resizeContainer.display( ul  , lr );
			
			
		/*	for( var i = 0;i<this.graphs.length;i++)
			{
				var g = this.graphs[i];
				var resizeContainer = this.resizeContainer;
				
				g.initResizeBehaviour();
			
				g.resizeBehaviour.original_ul.x = resizeContainer.ul.x;
				g.resizeBehaviour.original_ul.y = resizeContainer.ul.y;
				
				g.resizeBehaviour.original_lr.x = resizeContainer.lr.x;
				g.resizeBehaviour.original_lr.y = resizeContainer.lr.y;
					
			}*/
			
		},
		
		_getUL : function () {
			
			var graphs = this.graphs;
			
			var len = graphs.length;
			
			if(len <= 0 ) return {x:0,y:0};
			
			var ul = {x:graphs[0].ul.x , y :graphs[0].ul.y} ;
			//var lr = graphs[0].lr;
			
			for ( var i = 1 ; i < this.graphs.length ; i++ ){
			
				var g = graphs[i];
				if(g.ul.x < ul.x )ul.x = g.ul.x;
				if(g.ul.y < ul.y )ul.y = g.ul.y;
				
				//if(g.lr.x > ul.x )lr.x = g.lr.x;
				//if(g.lr.y > ul.y )lr.y = g.lr.y;
			
			}
			return ul;
		},
		_getLR : function () {
			
			var graphs = this.graphs;
			
			var len = graphs.length;
			
			if(len <= 0 )return {x:0,y:0};
			
			//var ul = graphs[0].ul;
			var lr = {x:graphs[0].lr.x , y :graphs[0].lr.y} ;
			
			for ( var i = 1 ; i < this.graphs.length ; i++ ){
			
				var g = graphs[i];
				//if(g.ul.x < ul.x )ul.x = g.ul.x;
				//if(g.ul.y < ul.y )ul.y = g.ul.y;
				
				if(g.lr.x > lr.x )lr.x = g.lr.x;
				if(g.lr.y > lr.y )lr.y = g.lr.y;
			
			}
			return lr;
		},
		
		updateGraphs : function (  new_ul , new_lr ) {
		
			var graphs = this.graphs;
		
			var len = graphs.length;
			
			
			
			
			
			for( var i = 0 ; i < len ; i++ ) {
			
				graphs[i].resize(  new_ul , new_lr );
			
			}
		
		},
		
		clearGraphs : function () {
		
			this.graphs = [];
			
		},
		
		addGraph : function ( g ) {
			
			console.log("behind push:");
			
			console.log(g);
		
			if( this.graphs.indexOf(g) ===-1)
				this.graphs.push( g );
			
			console.log("after push:");
			
			console.log(this.graphs);
		
		},
		removeGraph : function ( g ) {
			
			var index = this.graphs.indexOf(g);
			if( index === -1 ) return;
			
			this.graphs.splice( index , 1);
			
			
		
		},
		

	
	}
	
	
	return {
	
		getInstance : getInstance
	
	}
	
})();