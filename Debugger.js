var Debugger = function(){
	this.debugText = "";
	this.debug = false;


};

Debugger.prototype.setText = function(text) {
	// alert("setting text "+ text);
	this.debugText = text;
};


Debugger.prototype.render = function(ctx){
	if(this.debugText != ""){
		ctx.fillStyle = "yellow";
		ctx.font = "bold 18px sans-serif";
		ctx.fillText(this.debugText, 20, 20);
	}
};

Debugger.prototype.toggleDebug = function(){
	this.debug = !this.debug;
};