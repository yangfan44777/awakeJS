function SvgCanvas ( svgDom , width , height ) {

	svgDom.setAttribute("width",width);
	
	svgDom.setAttribute("height",height);
	
	this.svgDom = svgDom;
	
	this.context = new SvgCanvasContext( this );
	

};

SvgCanvas.prototype = {

	constructor : SvgCanvas , 
	
	getContext : function () {
	
		return this.context;
	
	},
	
	appendChild : function ( child ) {
	
		var svgDom = this.svgDom;
	
		child.setContainer(svgDom);
		
		svgDom.appendChild( child.element );
		
	},
	
	removeChild : function ( child ) {
		
		if(child.element===undefined)return;
		
		var svgDom = this.svgDom;
		svgDom.removeChild( child.element );
		
	
	},
	
	insertChild : function ( child ) {
	
		var svgDom = this.svgDom;
	
		child.setContainer(svgDom);
		
		svgDom.insertBefore( child.element,svgDom.firstChild );
	
	},
	
	insertChildBefore :  function ( child , tag ) {
		var svgDom = this.svgDom;
		
		child.setContainer(svgDom);
		
		var tags = document.getElementsByTagName(tag);
		
		if(tags[0]===undefined)
			svgDom.appendChild( child.element );
		else
			svgDom.insertBefore( child.element , tags[0]);
	
	}
	

}

