var Map = function(){

	this.tiles = [
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0],
		[1,1,1,1,1,1,0,0,0,0,0,1,1,1,1,1],
		[1,1,1,1,1,0,0,0,0,0,0,0,1,1,1,1],
		[1,1,1,1,0,0,0,0,0,0,0,0,0,1,1,1],
		[1,1,1,2,0,0,1,1,1,1,1,0,0,0,1,1],
		[1,1,1,2,0,0,0,1,1,1,0,0,0,0,0,1],
		[1,1,1,2,0,0,0,0,0,0,0,0,0,0,0,1],
		[1,1,1,1,1,0,0,0,0,0,0,0,0,2,2,1],
		[1,1,1,1,0,0,0,0,1,1,1,1,1,1,1,1],
		[1,1,1,1,0,0,0,0,1,1,1,1,1,1,1,1],
		[1,1,1,1,0,0,0,0,1,1,1,1,1,1,1,1],
		[1,1,1,1,0,0,0,0,1,1,1,1,1,1,1,1],
		[1,1,1,1,0,0,0,0,1,1,1,1,1,1,1,1],
		[1,1,1,1,0,0,0,0,1,1,1,1,1,1,1,1]
	];
	this.blocks = this.createBlocks();

};

Map.prototype.createBlocks = function(){
	var array = [];
	for(var y = 0; y < this.getHeight(); y++){
		var rowArray = [];
		for(var x = 0; x < this.getWidth(); x++){
			if(this.tiles[y][x]==1){
				rowArray.push( new Block(x, y, true, null) );
			} else {
				rowArray.push( new Block(x, y, false, null ));
			}
			// rowArray.push(this.tiles[i][j]);
		}
		array.push(rowArray);
	}
	return array;
}

	
Map.prototype.getTile = function(x, y){
	 // if(this.tiles[y][x]==2){
	 // 	return 1;
	 // }

	return this.tiles[y][x];
};

Map.prototype.getWidth = function(){
	return this.tiles[0].length;
}

Map.prototype.getHeight  = function(){
	return this.tiles.length;
}