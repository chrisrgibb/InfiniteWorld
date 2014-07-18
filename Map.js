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



	// var lg = new LevelGenerator();

	// this.tiles = lg.createLevel();


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

};

Map.prototype.createBlocks = function(){
	var array = [];
	for(var y = 0; y < this.getHeight(); y++){
		var rowArray = [];
		for(var x = 0; x < this.getWidth(); x++){
			var type = this.tiles[y][x];

			// switch(type){
			// 	// blocks that can be broken
			// 	case 8:
			// 	case 9:
			// 	case 10:
			// 	case 11:
			// 	case 21:
			//  	case 35:
			// 		rowArray.push( new Block(x, y, true, type, 1) );
			// 		break;
			// 	// blocks that are solid but can't be broken
			// 	case 2:
			// 	case 5:
			// 	case 7:
			// 	case 12:
			// 	case 18:
			// 	case 19:
			// 	case 20:
			// 	case 32:
			// 		rowArray.push(new Block(x, y, false, type, 1) );
			// 		break;
			// 	// case 16:
			// 	// case 17:
			// 	default:
			// 		rowArray.push( new Block(x, y, false, type, 0 ));
			// 		break;
			// }

			switch(type){
				// blocks that can be broken
				case 8:
				case 9:
				case 10:
				case 11:
				case 21:
			 	case 35:
					rowArray.push( new Block(x, y, true, type, 1) );
					break;
				// blocks that are solid but can't be broken
				// case 2:
				// case 5:
				// case 7:
				// case 12:
				// case 18:
				// case 19:
				// case 20:
				// case 32:
				// 	rowArray.push(new Block(x, y, false, type, 1) );
				// 	break;
				// case 16:
				// case 17:
				case 0:
				case 16:
				case 17:
					rowArray.push( new Block(x, y, false, type, 0 ));
					break;

				default:
					rowArray.push( new Block(x, y, false, type, 1 ));
					break;
			}


			// if( breakable==9 || breakable==8 || breakable ==11 || breakable==10 || breakable==21 
			// 	|| breakable==35 ){
			// 	rowArray.push( new Block(x, y, true, breakable, 1) );
			// } else {
			// 	rowArray.push( new Block(x, y, false, breakable, 0 ));
			// }
		}
		array.push(rowArray);
	}
	return array;
}
	
Map.prototype.getTile = function(x, y){
	// return this.tiles[y][x];
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
	
	// if(this.tiles[y][x]==0 || this.tiles[y][x]==16 || this.tiles[y][x]==17){
	// 	return 0;
	// }else{
	// 	return this.blocks[y][x].breakable;
	// }
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