define(['./noise'],function(Noise){


var theme;

function isFloat(num){
	return num % 1 !== 0;
}


function TilesCreater(height, length, tiles, leveltheme){
	this.height = height || 12 ;
	this.length = length;
	this.tiles = tiles;
	theme = leveltheme;
}

TilesCreater.prototype  = {
	/*
	* gets a 2d array filled with zeros of the given width and height representing the level
	*/
	blankArray : function (width, height){
		var array = new Array(height);

		for(var y =0; y < height; y++){
			array[y] = [];
			for(var x = 0; x < width; x++){
				array[y].push(0);
			}
		}
		this.tiles = array;
		return this;
	},
	
	createGround : function(start, length){
		var height = 12;
		var groundTile = theme.groundTile;
		var tiles = this.tiles;
		for(var i = height -2; i < height; i++ ){
			for(var j =start; j< length; j++){
				tiles[i][j] = groundTile;
			}
		}
		return this;
	},

	getBlankMap : function(length, height){
		this.length = length;
		this.height = height;
		return this.blankArray(length, height).createGround(0, length).tiles;
	},
	/*
	 * checks the coordinates make sense and then sets the tile to be what you want
	 */

	setTile : function(tilenumber, x, y){
		if(isNaN(tilenumber)){
			console.warn("tile was undefined");
			tilenumber = 0;
		}
		if(isFloat(tilenumber)){
			console.warn("tile ",tilenumber, "was not an int");
			tilenumber = 0;
		}
		var bounds = this.checkBounds(x, y);
		y = bounds.y;
		x = bounds.x;
		if(!bounds.isOut){
			this.tiles[y][x] = tilenumber;
		}
	},

	/**
	 * takes a set of coordinates and if they are out of range for the tile map 
	 * sets them to be inside the bounds
	 */

	checkBounds : function(x, y){
		var outOfBounds = false;
		if(x < 0){
			outOfBounds = true;
			x = 0;
		}
		if(y < 0){
			outOfBounds = true;
			y = 0;
		}
		if(x > this.length-1){
			outOfBounds = true;
			x = this.length-1;
		}
		if(y > this.height-1){
			outOfBounds = true;
			y = this.height -1;
		}
		return {
			x : x,
			y : y,
			isOut : outOfBounds
		};
	}

};
	return TilesCreater;
});

