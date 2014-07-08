function Material () {

	/* 保存小画布、变换矩阵 */
	
	this.style = null;
	
	this.matrix = new Matrix4();

	this.visible = true;
};

Material.prototype = {

	constructor : Material 
	
}