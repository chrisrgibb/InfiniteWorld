define(function(){

	var Debugger = function(){
		this.debugText = "";
		this.debugText2 = "";
		this.debug = false;
		this.drawGrid = true;

	};

	Debugger.prototype.setText = function(text) {
		// alert("setting text "+ text);
		this.debugText = text;
	};

	Debugger.prototype.setText2 = function(text) {
		this.debugText2 = text;
	};

	Debugger.prototype.render = function(ctx){
		if(this.debugText !== ""){
			ctx.fillStyle = "yellow";
			ctx.font = "bold 18px sans-serif";
			ctx.fillText(this.debugText, 20, 20);
		}
		if(this.debugText2 !== ""){
			ctx.fillStyle = "yellow";
			ctx.font = "bold 18px sans-serif";
			ctx.fillText(this.debugText2, 20, 50);
		}
	};

	Debugger.prototype.toggleDebug = function(){
		this.debug = !this.debug;
	};

	return Debugger;

});

