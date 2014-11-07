// "DESIGN GRAMMER"
/*
	level := chunks
	chunks := chunk | chunk chunks
	chunk :=








*/





var levelGenerator = function(){
	var RANDOMSEED = 6;
	var height = 12;
	var levelSettings = LevelSettings(),
		randomGen = new Noise(RANDOMSEED);
	var groundTile,
		hazard1,
		hazard2,
		breakable,
		unbreakable,
		questionBox,
		starBox,
		yellowSkull,
		pinkSkull,
		groundIndex = 10,
		backgroundColor,
		EndingX,
		randomIzer;


	init();

	function init(){
		console.log("init");
		setUpLevel(randomTheme());
	}

	function setUpLevel(theme){
		levelSettings.setTheme(theme);
		groundTile = levelSettings.groundTile();
		hazard1 = levelSettings.hazard1();
		hazard2 = levelSettings.hazard2();
		breakable = levelSettings.breakable();
		unbreakable = levelSettings.unbreakable();
		backgroundColor = levelSettings.backgroundColor();
		starBox = 9;
		questionBox = 8;
		pinkSkull = 7;
		yellowSkull = 10;

	}


	function randomTheme(){
		return (randomInt(10) > 4) ? 'one' : 'two';
	}

	/*
	*	array of plain tiles with two tiles on the ground
	*/
	function createPlainLevel(length){

		var tiles = new Array(height);
		for(var i =0; i< tiles.length; i++){
			tiles[i] = [];
			for(var j = 0; j< length; j++){
				tiles[i].push(0);
			}
		}
		for(var i = height -2; i < height; i++ ){
			for(var j =0; j< length; j++){
				tiles[i][j] = groundTile;
			}
		}
		return tiles;
	}

	function randomInt(min, max){
		return Math.round(randomGen.nextNumber(min, max));
	}

	function getOdds(){
		var odds = [];
		odds[0] = 30; // "createGap"
		odds[1] = 30; //"makePlatform"
		odds[2] = 5;  //"triangleThing"
		odds[3] = 30; // "flatGround"
		var totalOdds = 0;

		for(var i = 0 ; i < odds.length; i++){

			if(odds[i] < 0 ){
				odds[i]= 0;
			}
			totalOdds+=odds[i];
			odds[i] = totalOdds - odds[i];
		}

		return {
			odds : odds,
			totalOdds : totalOdds
		}
	}



	function createlevel(){
		setUpLevel('three');
		// get theme
		var length = 100;

		var tiles = createPlainLevel(length);

		var oddsFactory = getOdds();
		var odds = oddsFactory.odds;
		var totalOdds = oddsFactory.totalOdds;

		var index = 12;
		tiles[4][4] = breakable;
		tiles[4][5] = unbreakable;
		
		longHorizontal(3,  5); // TODO what???

		while (index < length) {
			var areaSize = 3 + randomInt(12) | 0;
			// var chance = Math.random() * totalOdds;
			var chance = randomInt(totalOdds);
			var type;
			for (var i = 0; i< odds.length; i++) {
				if (odds[i] <= chance) {
					type = i;
				}
			}
			switch (type) {
				case 0:
					createGap(tiles, index, areaSize-2);
					// square(tiles, index, areaSize -2 , true);
					break;
				case 1:
					createGap(tiles, index, areaSize-2);
					// square(tiles, index, areaSize -2 , true);
					// this.makePlatform(index, size-2);
					break;
				case 2:
					triangleThing(tiles, index, areaSize-2);
					// square(tiles, index, areaSize -2 , true);
					break;
				case 3 :
					// createGap(tiles, index, areaSize-2);
					// longVert(tiles, index, 4);
					fillSquare(tiles, { x :index,
										y : 4,
										width : Math.round(areaSize/3),
										height : 4 },
										new Odds().myOdds() );
					break;
			}
			index+=areaSize;
		}
		EndingX = tiles[0].length - 5;
		return {
			tiles : tiles,
			backgroundColor : backgroundColor
		};
	}


	/**
	* returns a square of
	*/
	function square(tiles, index, size, hollow){
		// build roof
		var y, x;
		var height = randomInt(5);
		var start = groundIndex - 1  -height;
		for(y = start; y< groundIndex; y++ ){
			for(x =index; x < index + size; x++){
				if(y===start || x === index || x=== index + size-1 ){
					tiles[y][x] = breakable;
				}
			}
		}
		tiles[7][index] = starBox;
		tiles[6][index] = yellowSkull;
	}


	function fillSquare(tiles, rect, odds){
		var x = rect.x,
			y = rect.y,
			width = rect.width,
			height = rect.height;

		if( x < 0 || x+width > tiles[y-3].length ||
			y < 0 || y+height > tiles.length -3){
			console.warn("Array out of bounds");
			debugger;
			return;
		}
		var i, j;
		for(i = y; i< y+height; i++){
			for(j = x; j < x+width; j++){
				// var newOdds = odds.getNextOdds();
				// tiles[i][j]= odds ? levelSettings[newOdds]() : 5;
				tiles[i][j]= odds ? 8 : 5;
			}
		}
	}

	function longVert(tiles, index, height){
		// debugger;
		var start = groundIndex -2;
		for (var y = start; y > start-height; y--){
			tiles[y][index] = breakable;
		}
	}


	function longHorizontal(index, size){
		var array = new Uint8Array(size);
		for(var i = 0; i < size; i++){
			var chance = randomInt(10);
			if(chance < 2){
				array[i] = breakable;
			} else if(chance < 4){
				array[i] = unbreakable;
			} else if(chance < 6 ){
				array[i] = starBox;
			}
		}
	}


	function createGap(tiles, index, length){

		for(var i = index+1; i< index + length-1; i++){
			// so we don't create a gap near the end of the level
			if(i > tiles[0].length - 14){
				return;
			}
			tiles[height-2][i] = hazard1;
			tiles[height-1][i] = hazard2;
		}
		if(length < 4){
			return;
		}
		// fill in gap with blocks over top
		var numberOfBlocks = Math.floor(length / 4 );
		var heightOfFirstBlock = 8;
		for(var i = 0; i < numberOfBlocks; i++ ){

			var placeX = randomInt(2+i * 4 + index, 2 + (i *4) + index );
	
			tiles[heightOfFirstBlock][placeX] = breakable;
		}

		
	}

	function triangleThing(tiles, index, length){
		/* options
		   plain triangle
		   triangle with random money
		   triangle with random unbreakable bits
		*/
		// width of triangle will  be 2n -1 wide
		var height = Math.ceil(length / 2);


		var startX = index;
		var middle = startX + (height - 1);

		for(var i = 0; i< height; i++){
			// start at top
			// for triangles with 2 blocks at top initialize j to startX + (height - i)

			for(var j = startX + (height - i -1); j < startX + (height + i ); j++ ){
				tiles[groundIndex - height  + i][j] = breakable;

				if(Math.random() > .4 && j==middle){
					tiles[groundIndex - height  + i][j] = unbreakable;
				}
			}
		}
	}

	function createPlatform(tiles, index, length){


	}

	return {
		createNewMap: function(isRandom){
			var map;
			if(isRandom){
				var level = createlevel(); // get level object
				map = new Map(level.tiles);
				map.backgroundColor = level.backgroundColor;
			}else {
				map = new Map();
			}
			// map.enemys = this.enemies;
			map.objects.push(new RiceBall(EndingX, 8));
			return map;
		}
	};
}



