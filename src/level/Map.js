
define(['./Block', './TileDefinitions'],function(Block, TileDefinitions){

	var Map = function(level){
		level = level || {};

		this.enemys = level.enemies || [];
		this.objects = level.objects || [];
		this.nodes = level.nodes || [];
		this.backgroundColor = level.backgroundColor || "#000000";

		this.tiles = level.tiles;
		this.sections = level.sections;
		this.levelData = level;

	};

	Map.prototype = {

		getTile : function(x, y){
			return this.tiles[y][x];
		},
		
		getBlock : function(x, y){
			var tile = this.tiles[y][x];
			var tiledef = TileDefinitions[tile];
			return tiledef;
		},

		isBlocking : function(x, y){
			if(y < 0){
				return 0;
			}
			if(x > this.getWidth()-1){
				return 1;
			}
			if(y > this.getHeight()-1){
				return 1;
			}
			var tile = TileDefinitions[this.tiles[y][x]];

			return tile.isSolid;
		},

		getWidth : function(){
			return this.tiles[0].length;
		},

		getHeight : function(){
			return this.tiles.length;
		}
	};

	return Map;
});

