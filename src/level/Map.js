
define(['./Block', './TileDefinitions'],function(Block, TileDefinitions){

	var Map = function(level){
		level = level || {};

		this.enemys = level.enemies || [];
		this.objects = level.objects || [];
		this.nodes = level.nodes || [];
		this.backgroundColor = level.backgroundColor || "#000000";

		this.tiles = level.tiles;
		this.sections = level.sections;

		this.blocks = this.createBlocks();

	};

	var breakableBlocks = [8, 9, 10, 11, 21, 35, 40];



	Map.prototype = {
		createBlocks : function(){
			var array = [];
			for(var y = 0; y < this.getHeight(); y++){
				var rowArray = [];
				for(var x = 0; x < this.getWidth(); x++){
					var type = this.tiles[y][x];
					
					switch(type){
						// blocks that can be broken
						case 8:
						case 9:
						case 10:
						case 11:
						case 21:
					 	case 35:
					 	case 40:
							rowArray.push( new Block(x, y, true, type, 1) );
							break;
						// tiles that are the background
						case 0:
						case 16:
						case 17:
						case 48:
						case 49:
						case 50:
						case 51:
						case 64:
						case 65:
						case 66:
						case 67:
						case 80:
						case 81:
						case 82:
						case 83:
							rowArray.push( new Block(x, y, false, type, 0 ));
							break;
						// animated tiles
						case 23:
						case 28:
							var block = new Block(x, y, false, type, 0);
							block.animated = true;
							rowArray.push(block);
							break;

						
						default:
							// blocks that are solid but can't be broken
							rowArray.push( new Block(x, y, false, type, 1 ));
							break;
					}
				}
				array.push(rowArray);
			}
			return array;
		},

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

