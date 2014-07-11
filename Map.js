var Map = function(){


	this.tiles = [
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,16,17,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,16,17,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,9,0,0  ],
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

	];

	this.objects = [new MoneyBag(7, 45), 
				    new MoneyBag(2, 48),
				    new MoneyBag(8, 62),
				    new MoneyBag(2, 78),
				    new MoneyBag(2, 79)
				    ];

	// var lg = new LevelGenerator();

	// this.tiles = lg.createLevel();



	// this.tiles = [
	// 	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	// 	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	// 	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	// 	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	// 	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	// 	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	// 	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	// 	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,8,0,0,0,0,0,0],
	// 	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,8,8,0,0,0,0,0,0],
	// 	[0,0,0,0,0,0,0,0,8,0,0,0,0,0,0,0,8,8,0,0,0,0,0,8,8,8,0,0,0,0,0,0],
	// 	[5,5,0,9,9,9,0,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5],
	// 	[5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5]
	// ];


	
	this.blocks = this.createBlocks();

};

Map.prototype.createBlocks = function(){
	var array = [];
	for(var y = 0; y < this.getHeight(); y++){
		var rowArray = [];
		for(var x = 0; x < this.getWidth(); x++){
			var breakable = this.tiles[y][x];


			if( breakable==9 || breakable==8 || breakable ==11 || breakable==10 ){
				rowArray.push( new Block(x, y, true, breakable) );
			} else {
				rowArray.push( new Block(x, y, false, breakable ));
			}

		}
		array.push(rowArray);
	}
	return array;
}

Map.prototype.punchTile = function(x, y){
	if(x > this.blocks[0].length-1){
		return;
	}

	if ( this.blocks[y][x].breakable ){
		// alert("pow!");
		this.blocks[y][x] = new Block(x, y, false, null );	
		this.tiles[y][x] =0;	
	}

	if(this.tiles[y][x]==2){
		this.tiles[y][x] =0;
	}
	
}
	
Map.prototype.getTile = function(x, y){
	return this.tiles[y][x];
};

Map.prototype.getObjects = function(){
	return this.objects;
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
	
	if(this.tiles[y][x]==0 || this.tiles[y][x]==16 || this.tiles[y][x]==17){
		return 0;
	}else{
		return 1;
	}
}

Map.prototype.getWidth = function(){
	return this.tiles[0].length;
}

Map.prototype.getHeight  = function(){
	return this.tiles.length;
}