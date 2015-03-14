function TilesCreater(height, tiles){
	this.height = height || 12 ;
	this.length = 50;
	this.tiles = tiles;
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

/*
 *
 */
TilesCreater.prototype.getBlankMap = function(length, height){
	this.length = length;
	this.height = height;
	return this.blankArray(length, height).createGround(tiles, 0, length).tiles;
}

/*
 * checks the coordinates make sense and then sets the tile to be what you want
 */

TilesCreater.prototype.setTile = function(tilenumber, x, y){
	if(isNaN(tilenumber)){
		tilenumber = 0;
	}
	var bounds = this.checkBounds(x, y);
	y = bounds.y;
	x = bounds.x;
	this.tiles[y][x] = tilenumber;
}

TilesCreater.prototype.checkBounds = function(x, y){
	if(x < 0){
		x = 0;
	}
	if(y < 0){
		y = 0;
	}
	if(x > this.length){
		x = this.length-1;
	}
	if(y > this.height){
		y = this.height -1;
	}
	return {
		x : x,
		y : y
	};
}

