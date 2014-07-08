function EventUtil () {

	

};

EventUtil.addListener = function ( ele , type , handler ) {

 	if ( ele.addEventListener ) {
	
		ele.addEventListener( type, handler, false );
		
	} else if ( ele.attachEvent ) {
	
		ele.attachEvent( "on" + type, handler );
		
	} else { return; }
 
};

EventUtil.removeListener = function ( ele, type , handler ) {

	if ( ele.removeEventListener ) {
	
		ele.removeEventListener( type , handler , false );
	
	} else if ( ele.detachEvent ) {
	
		ele.detachEvent( "on" + type , handler );
	
	} else { return; }

};