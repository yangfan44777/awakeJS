function Timer ( fps )  { /* 单例模式 */

	this.count = 0;
	
	this.fps = fps || 30;
	
	this.actions = []; /* 元素为动画执行的方法的引用 */
	
	this.timer = undefined;
	
	this.state = Timer.STOP;

};

Timer.STOP = 'stop';
Timer.RUNNING = 'running';

Timer.prototype = {

	constructor : Timer,
	
	start : function ( ) {
	
		if ( this.state === Timer.RUNNING ) return;
		
		var interval = 1000 / this.fps;
		
		var f = this.update;

		var actions = this.actions;
		//var _self = this;
		this.timer =  setInterval( function ( ) { f( actions); } , interval );
		//this.timer =  setInterval( function ( ) { _self.update.call( _self) } , interval );
		this.state = Timer.RUNNING;
	},
	
	stop : function () {
	
		clearInterval( this.timer );
		
		this.state = Timer.STOP;
	
	},
	
	update : function( actions) {
	
		//var actions = this.actions;
	
		for ( var i = 0; i < actions.length; i++ ) {
			
			actions[i].call( this );
			
		}
	
	},
	
	addAction : function ( f ) {
	
		if ( f === undefined ) return;
	
		var actions = this.actions;
		
		if ( actions.indexOf( f ) === -1 ) {
		
			actions.push( f );
		
		}
		
	},
	
	hasAction : function ( f ) {
	
		if ( f === undefined ) return;
		
		var actions = this.actions;
		
		if ( actions.indexOf( f ) !== -1 ) {
		
			return true;
		
		}
		
		return false;
		
	},
	
	removeAction : function ( f ) {
	
		if ( f === undefined ) return;
	
		var actions = this.actions;
		
		var index = actions.indexOf( f );
		
		if ( index !== -1 ) {
		
			actions.splice( index , 1 );
		
		}
	
	}
}