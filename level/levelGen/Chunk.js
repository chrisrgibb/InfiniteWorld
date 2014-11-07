var Chunk = function(x, y, tiles){
	this.x = x;
	this.y = y;
	this.tiles = tiles;

}

Chunk.prototype.thing = function(){
	debugger;
	return this.y;
};

var Triangle  = function(x){
	this.x = x;
	this.y = 5;

}

var GapChunk = function(index, y, tiles){
	this.start = index;
	this.y = y;
	var soooo = 45;
	this.tiles = tiles;
	this.doShit = function(stuff){
		for(var i = index+1; i< index + length-1; i++){
			// so we don't create a gap near the end of the level
			if(i > tiles[0].length - 14){
				// debugger;
				return;
			}
			tiles[height-2][i] = hazard1;
			tiles[height-1][i] = hazard2;
		}
		if(length < 4){
			return;
		}
		// fill in gap with blocks over top
		// var height =
		var numberOfBlocks = Math.floor(length / 4 );// 
		var heightOfFirstBlock = 8;
		for(var i = 0; i < numberOfBlocks; i++ ){
			// var start = 
			debugger;
		}
		tiles[heightOfFirstBlock][index+2] = breakable;
	}
}


Triangle.prototype = new Chunk();
Triangle.prototype.getStuff = function(){

	return this.x;

}
