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

Map.prototype.createBlocks = function(){
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
};
	
Map.prototype.getTile = function(x, y){
	return this.blocks[y][x].image;
};

Map.prototype.getBlock = function(x, y){
	return this.blocks[y][x];
};

/**
 * 	
 **/
Map.prototype.isBlocking = function(x, y){
	if(y < 0){
		return 0;
	}
	if(x > this.getWidth()-1){
		return 1;
	}
	if(y > this.getHeight()-1){
		return 1;
	}

	if(this.blocks[y][x].image === 0 || this.blocks[y][x].image == 16 || this.blocks[y][x].image ==17){
		return 0;
	}else {
		return 1;
	}
};

Map.prototype.getWidth = function(){
	return this.tiles[0].length;
};

Map.prototype.getHeight  = function(){
	return this.tiles.length;
};