define(function() {
	
	var backgroundTiles = {
		isSolid : false,
		breakable : false,
		animated : false
	};

	var unbreakableTile = {
		isSolid : true,
		breakable : false,
		animated : false
	};

	var breakableTile = {
		isSolid : true,
		breakable : true,
		animated : false
	};

	var animatedTile = {
		isSolid : true,
		breakable : true,
		animated : true
	}


	return {
		0 : backgroundTiles,
		1 : unbreakableTile,
		2 : unbreakableTile,
		3 : unbreakableTile,
		4 : unbreakableTile,
		5 : unbreakableTile,
		6 : unbreakableTile,
		7 : unbreakableTile,
		8 : breakableTile,
		9 : breakableTile,
		10 : breakableTile,
		11 : breakableTile,
		12 : unbreakableTile,
		13 : unbreakableTile,
		14 : unbreakableTile,
		15 : unbreakableTile,
		16 : backgroundTiles,
		17 : backgroundTiles,
		18 : unbreakableTile,
		19 : unbreakableTile,
		20 : unbreakableTile,
		21 : breakableTile,
		
		22 : unbreakableTile,
		23 : animatedTile,
		24 : animatedTile,
		25 : animatedTile,
		26 : animatedTile,
		27 : unbreakableTile,
		28 : animatedTile,
		29 : animatedTile,
		30 : animatedTile,
		31 : animatedTile,
		// mt?
		48: backgroundTiles,
		49: backgroundTiles,
		50: backgroundTiles,
		51: backgroundTiles,
		64: backgroundTiles,
		65: backgroundTiles,
		66: backgroundTiles,
		67: backgroundTiles,
		80: backgroundTiles,
		81: backgroundTiles,
		82: backgroundTiles,
		83: backgroundTiles,

	};
	
})