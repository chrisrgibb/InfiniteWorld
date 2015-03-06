function TilesCreater(levelHeight, tiles){
	this.levelHeight = levelHeight || 12 ;
	var levelHeight = 12;
	this.tiles = tiles;



	// return {
	// 	blankArray : getBlankArray,
	// 	createGround : this.createGround
	// }
}

	/*
	* gets a 2d array filled with zeros of the given width and height representing the level
	*/
TilesCreater.prototype.blankArray = function (width, height){
	var array = new Array(height);

	for(var y =0; y < height; y++){
		array[y] = [];
		for(var x = 0; x < width; x++){
			array[y].push(0);
		}
	}
	this.tiles = array;
	return this;
}

	/**
	*
	*/
TilesCreater.prototype.createGround = function(tiles, start, length){
	var height = 12;
	var groundTile = 13;
	var tiles = this.tiles;
	for(var i = height -2; i < height; i++ ){
		for(var j =start; j< length; j++){
			tiles[i][j] = groundTile;
		}
	}
	return this;
}




TilesCreater.prototype.createHeights = function(tiles) {
	var length = tiles[0].length;




};