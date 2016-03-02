define(function(require) {	


	var ledgeGrammar = {
		1 : {
			side : "left",
			width : 12,
			next : [
				2, 3, 4
			]
		},
		2 : {
			side : "right",
			width : 12,
			next : [
				1, 4, 6
			]
		},

		3 : {
			side : "right",
			width : 6 ,
			next : [
				4, 6 , 1
			]
		},

		4 : {
			side : "middle",
			width : 4,
			next : [
				6, 4
			]
		},
		5 : {
			side : "middle",
			width : 5,
			next : [
				4, 5
			]
		},

		6 : {
			side : "left",
			width : 6,
			next : [
				3 , 5, 2
			]
		}
	};


		var TileCreator = require('./tilecreater');
		var Helper = require('./helpers/helpers');
		var OddsHelper = require('./settings/odds');
		var LedgePeice = require('./peices/ledge');
		var SectionCreator = require('./helpers/sectioncreator2');

	// main loop
	// travel down map creating platforms

	function createRandomLedges(rand, tiles, width){


		var halp = new Helper.SectionHelper(rand);
			

		var ledges = halp
				.createIndexs(tiles.length, 4, 9, 7)
				.map(function(size){
					var lego = LedgePeice.create({
						rand : rand,
						mapWidth : width,
						y : size.x,
						width : null,
						isRandom : true
					});
					// lego.y = size.x;
					return lego;
		});

		
		return ledges;
	}

	function CreateLedges2(rand, tiles, width){
		var number = 10;
		var ledges = [];
		// for(var i =0; i < number; i++){


		// }
		var interval = 10;
		
		ledges.push(LedgePeice.create({
			x : 0,
			y : 10,
			side : "left",
			width : rand.nextInt(4, 8)
		}));

		var currentPiece = 4;
		var possibleIndex;

		for (var i = 0; i < number; i++) {
			current = ledgeGrammar[currentPiece];
			var nextInterval = interval + rand.nextInt(3, 10);
			possibleIndex = rand.nextInt(0 , current.next.length-1);
			var nextX;
			if (current.side === "middle") {
				nextX = rand.nextInt(4, 7);
			} 
			else if( current.side === "left") {
				nextX = 0
			} else {
				nextX = width - current.width;
			}

			ledges.push(LedgePeice.create({
				x : nextX,
				y : nextInterval,
				side : current.side,
				width : current.width
			}));

			currentPiece = current.next[possibleIndex];
			if(currentPiece == null ) {
				debugger;
			}

			interval = nextInterval;

		}
		// sup
		// debugger;
		// ledges.push(LedgePeice.create({
		// 	y : 10,
		// 	x : 0,
		// 	side : "left",
		// 	width : 12
		// 	// specify a size here
		// }));
		return ledges;
	}

	/**
		Loop down from top
		create path

		1 option : create a bunch of random ledges and then try to fit them into the space

	*/

	function Ledge(config){
		return {
			x : config.x,
			y : config.y,
			width : config.width,
			height :config.height,
			side : config.side
		};
	}

	function CreateSides(tiles, start){
		// var 
		// debugger;
		for(var i = start+1; i< tiles.length; i++){
				tiles[i][0] = 5;
				tiles[i][tiles[0].length -1] = 5;
		}
	}


	return {
		buildMap : function(theme, options, randomgenerator){

			var rand = randomgenerator;
			var width = 16;
			var height = rand.nextInt(80, 100);
			var tilecreator = new TileCreator(height, width, 0, theme);
			var tiles = tilecreator.getBlankMap(width, height).tiles;
			var sectioncreator = new SectionCreator(tiles);

			var ledges = createRandomLedges(rand, tiles, width);
			var ledges = CreateLedges2(rand, tiles, width);
			ledges.forEach(sectioncreator.apply, sectioncreator);

			CreateSides(tiles, ledges[0].y);

			return {
				tiles : tiles,
				backgroundColor : theme.background,
				direction : 1 // 0 for LR, 1 for topdown, 2 for RL, 3 for anything
			};
		}	
	};
});
