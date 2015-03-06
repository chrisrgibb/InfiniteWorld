var Map = function(level){
	this.enemys = [];
	this.objects = [];
	if(level.nodes){
		this.nodes = level.nodes;
	}
	if(level.backgroundColor){
		this.backgroundColor = level.backgroundColor;
	}

	if(!level.tiles){

		this.tiles = [
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			[0,0,0,16,17,0,0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0,0,0,16,17,0,0],
			[0,0,0,0,0,0,0,0,0,0,0,0,0,9,0,0 ],
			[0,0,0,0,0,0,0,0,0,16,17,0,0,5,0,0],
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0,0,0,0,9,0,0],
			[2,2,2,2,2,3,0,0,0,0,0,1,2,2,2,2],
			[5,5,5,5,6,0,0,0,0,0,0,0,4,5,5,5],
			[5,5,5,5,0,0,0,0,0,0,0,0,0,4,5,5],
			[5,5,5,9,0,0,1,2,2,2,3,0,0,0,4,5],
			[5,5,5,9,0,0,0,4,5,6,0,0,0,0,0,5],
			[5,5,5,11,0,0,0,0,0,0,0,0,0,0,0,5],
			[5,5,5,2,3,0,0,0,0, 0,0,0,0,11,8,5],
			[5,5,5,5,0,0,0,0,0, 1,2,2,2, 2,2,5],
			[5,5,5,5,0,0,0,0,11,0,4,5,5,5,5,5],
			[5,5,5,5,0,0,0,0,11,0,0,4,5,5,5,5],
			[5,5,5,5,0,1,2,2,3,0,0,0,4,5,5,5],
			[5,5,5,6,0,0,4,6,0,0,16,17,0,4,5,5],
			[5,5,6,0,0,0,0,0,0,0,0,0,0,0,4,5],
			[5,5,0,0,0,0,0,0,0,0,0,0,0,0,0,5],
			[5,5,0,0,0,0,0,0,0,0,0,0,0, 0,9,5],
			[5,5,0,0,0,0,0,11,1,2,2,2,3, 0,9,5],
			[5,9,0,0,0,0,0,11,0,4,5,6,11, 0,0,5],
			[5,11,11,0,0,0,0,0,0,0,0,0,0,11,0,5],
			[5,2,3,0,0,0,0,0,0,0,0,0,0,0,11,5],
			[5,5,2,2,2,2,3,0,0,0,9,0,0,0,0,5],
			[5,5,5,5,5,6,0,0,0,1,2,2,2,2,2,5],
			[5,5,5,9,11,0,0,0,0,0,4,5,5,5,5,5],
			[5,5,5,11,0,0,16,17,0,0,0,4,5,5,5,5],
			[5,5,6,0,11,0,0,0,0,0,0,0,4,5,5,5],
			[5,6,11,0,11,0,0,0,0,0,0,0,0,4,5,5],
			[5,0,11,9,0,11,11,0,0,0,0,0,0,0,5,5],
			[5,0,11,0,0,0,11,0,0,0,0,8,0,0,5,5],
			[5,0,9, 0,0,0,9,9,1,2,2,3,0,0,5,5],
			[5,0,11,0,0,0,9,0,0,4,6,0,0,0,5,5],
			[5,0,1, 2,2,2,3,0,0,0,0,0,0,0,9,  5],
			[5,0,0, 0,0,0,0,16,17,0,0,0,0,11,11,  5],
			[5,0,0, 0,0,0,0,0,1,2,2,2,2,2,2,  5],
			[5,11,11,11,11,0,0,0,0,4,5,5,5,5,5,  5],
			[5, 9, 0 ,0,11,0,0,0,0,0,4,5,5,5,5,  5],
			[5,10, 0, 0,11,0,0,0,0,0,0,4,5,5,5, 5],
			[5, 9, 0, 0,11,0,0,0,16,17,0,0,0,0,4, 5],
			[5,2,2,2,2 ,2,2,3,0,0,0,0,0,0,11,  5],
			[5,5,5,5,5 ,6,0,0,0,0,0,0,0,11,0,  5],
			[5,5,5,5,6, 0,0,0,0,0,0,0,11,0,0,  5],
			[5,5,5,5,0, 0,0,0,1,2,2,2,3,0,0,  5],
			[5,5,5,6,0, 0,0,0,0,4,5,6,0,0,0,  5],
			[5,6,0,0,0, 0,0,0,0,0,0,0,0,0,0,  5],
			[5,0,0,0,0, 0,0,0,0,0,0,0,0,0,0,  5],
			[5,0,0,0,0, 0,0,0,0,0,0,0,0,0,0,  5],
			[5,0,0,1,2,2,2,7,2,2,2,2,2,3,0,5 ],
			[5,0,0,0,4,5,5,5,5,5,5,5,6,0,9,5 ],
			[5,0,0,0,0,4,5,5,5,5,5,6,0,0,9,5 ],
			[5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5],
			[5,11,11,9,0,0,0,0,0,0,0,0,0,0,0,5],
			[5,0,0,0,11,0,0,0,0,0,1,2,2,2,2,5],
			[5,0,0,0,11,0,0,0,0,0,0,4,5,5,5,5],
			[5,2,2,2,2,2,3,0,0,16,17,0,0,4,5,5],
			[5,5,5,5,5,6,0,0,0,0,0,0,0 ,0,4,5],
			[5,5,5,5,6,0,0,0,0,0,0,0,0 ,0,0,5],
			[5,5,5,6,0,0,16,17,0,0,0,0,0 ,0,11,5],
			[5,9,11,0,0,0,0,0,0,0,0,0,0 ,11,0,5],
			[5,11,11,0,0,0,0,0,0,0,0,0,0 ,0,0,5],
			[5,2,3,0,0,0,0,0,0,0,0,0,9 ,9,9,5],
			[5,6,0,0,0,0,0,0,0,0,0,0,11 ,0,0,5],
			[5,0,0,0,0,0,0,0,0,0,0,0,11 ,0,11,5],
			[5,0,0,1,2,2,2,2,2,2,2,2,2 ,2,2,5],
			[5,0,0,0,4,5,5,5,5,5,5,5,5 ,5,5,5],
			[5,0,0,0,0,0,4,5,5,5,5,5,5 ,5,5,5],
			[5,2,3,0,0,0,0,0,0,9,4,5,5 ,5,5,5],
			[5,6, 0,0,16,17,0,0,0,0,0,0,0 ,4,5,5],
			[5,9,0,0,0,0,0,0,0,0,0,0,0 ,0,4,5],
			[5,0, 0,0,0,0,0,1,2,2,3,0,0 ,0,0,5],
			[5,0, 0,0,0,0,0,0,0,0,0,0,0 ,0,0,5],
			[5,0, 1,2,2,3,0,0,0,0,0,0,0 ,0,0,5],
			[5,0, 0,0,0,0,0,0,0,0,0,0,9 ,0,0,5],
			[5,0, 0,0,0,0,0,0,16,17,0,1,3 ,0,0,5],
			[5,0, 0,0,0,0,0,0,0,0,0,0,0 ,0,0,5],
			[5,0, 0,0,0,0,0,0,0,0,0,0,0 ,0,9,5],
			[5,3, 0,0,0,0,0,0,0,0,0,0,0 ,0,0,5],
			[5,0, 0,0,0,1,2,3,0,0,0,0,0 ,0,0,5],
			[5,0, 16,17,0,0,0,0,0,0,0,1,3 ,0,0,5],
			[5,0, 0,0,0,0,0,0,0,0,0,0,0 ,0,1,5],

			[5,0, 0,0,0,0,0,0,0,0,0,0,0 ,0,0,5],
			[5,0, 0,0,0,0,0,0,0,0,0,0,0 ,0,0,5],
			[5,0, 1,2,3,0,1,2,3,0,1,2,3 ,0,1,5],
			[5,0, 0,0,0,0,0,0,0,0,0,0,0 ,0,0,5],
			[5,0, 0,0,11,0,0,1,3,0,9,0,11 ,0,0,5],
			[5,0, 0,0,11,0,0,0,0,0,11,0,11 ,0,0,5],
			[5,0, 0,0,11,0,1,2,3,0,9,0,11 ,0,0,5],
			[5,0, 0,0,11,0,0,0,0,0,11,0,11 ,0,0,5],
			[5,2, 3,0,1,2,3,0,1,2,3,0,1 ,2,2,5],
			[5,6, 0,0,0,0,0,0,0,0,0,0,0 ,4,5,5],
			[5,0, 0,0,0,0,0,0,0,0,0,0,0 ,0,4,5],
			[5,0, 0,0,0,0,0,0,0,0,0,0,0 ,0,0,5],
			[5,0, 0,0,0,0,0,0,0,16,17,0,0 ,0,0,5],
			[5,0, 0,0,0,0,0,0,0,0,0,0,0 ,0,0,5],
			[5,0, 0,0,0,0,0,0,0,0,0,0,0 ,0,0,5],
			[5,0, 0,16,17,0,0,0,0,0,0,0,0 ,0,0,5],
			[5,0, 0,0,0,0,0,0,0,0,0,0,0 ,0,0,5],
			[5,0, 0,0,0,0,0,0,0,0,16,17,0 ,0,0,5],
			[5,0, 0,0,0,0,0,0,0,0,0,0,0 ,0,0,5],
			[5,0, 0,0,0,0,0,0,0,0,0,0,0 ,0,0,5],
			[5,0, 0,0,0,0,0,0,0,0,0,0,0 ,0,0,5],
			[5,0, 0,0,0,0,0,0,0,0,0,0,0 ,0,0,5],
			[5,0, 16,17,0,0,0,0,0,0,0,0,0 ,0,0,5],
			[5,0, 0,0,0,0,0,0,0,0,0,0,0 ,0,0,4],

		];

	this.enemys.push(new Enemy(4, 3));
	this.enemys.push(new Enemy(4, 19));
	this.enemys.push(new Enemy(8, 26));
	this.enemys.push(new Enemy(4, 34));
	this.enemys.push(new Enemy(8, 37));
	this.enemys.push(new Enemy(8, 46));
	this.enemys.push(new Enemy(8, 50));
	this.enemys.push(new Scorpion( 4,6) ) ;


	this.objects = [
				new MoneyBag(7, 45), 
			    new MoneyBag(2, 48),
			    new MoneyBag(8, 62),
			    new MoneyBag(2, 78),
			    new MoneyBag(2, 79),
			    ];


	} else {
		this.tiles = level.tiles;

	}

	// this.tiles = [
	// 	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	// 	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	// 	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	// 	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	// 	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	// 	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	// 	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,9,0,0,0,0,0,0,0,0,0,0,0,0,0],
	// 	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,9,0,0,0,0,0,0,0,0,0,0,8,0,0,0,0,0,0],
	// 	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,8,8,0,0,0,0,0,0],
	// 	[0,0,0,0,0,0,0,0,8,0,0,0,0,0,0,0,8,8,0,0,0,0,0,8,8,8,0,0,0,0,0,0],
	// 	[18,18,0,9,9,9,0,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5],
	// 	[18,18,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5]
	// ];


	
	this.blocks = this.createBlocks();

	// create enemies





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
}
	
Map.prototype.getTile = function(x, y){
	return this.blocks[y][x].image;
};

Map.prototype.getBlock = function(x, y){
	return this.blocks[y][x];
}




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

	if(this.blocks[y][x].image ==0 || this.blocks[y][x].image == 16 || this.blocks[y][x].image ==17){
		return 0;
	}else {
		return 1;
	}

}

Map.prototype.getWidth = function(){
	return this.tiles[0].length;
}

Map.prototype.getHeight  = function(){
	return this.tiles.length;
}