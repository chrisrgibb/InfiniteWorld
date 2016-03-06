define(function(require) {	


		var TileCreator = require('./tilecreater');
		var Helper = require('./helpers/helpers');
		var OddsHelper = require('./settings/odds');
		var LedgePeice = require('./peices/ledge');
		var SectionCreator = require('./helpers/sectioncreator2');

	// main loop
	// travel down map creating platforms

	function createRandomLedges(rand, tiles, width){


		var halp = new Helper.SectionHelper(rand);
		
		var minSize = 4,
		maxSize = 9, 
		startAt = 7;

		var ledges = halp
				.createIndexs(tiles.length, minSize, maxSize, startAt)
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

	function CreateLedges2(rand, tiles, mapDetails){
		
		var count = 0;
		var ledges = [];
		// create start ledge
		ledges.push(LedgePeice.create({
			x : 0,
			y : mapDetails.startAt,
			width : rand.nextInt(4, 8),
			side : 'left',
			previous : null
		}));
		var interval = mapDetails.startAt;
		var otherLedges = [];
		// if ledge = left 
			// next ledge : [ right across, right across and 1 down, middle  ]
		var previousOne = ledges[0]; 
		/**
		*  var context = {
		*		ledge : 
		*       
		*	}
		*/	

		while (count < mapDetails.height) {
			var currentSide = rand.randomArgs('left', 'right');
			var width = rand.nextInt(5, 8);
			var row = [];
			
			for (var i = 0; i < width ; i++ ) {
				row.push(2);
			}

			var y = interval + rand.nextInt(5, 10);
			var x = currentSide === 'left' ? 0 : mapDetails.width - width;

			otherLedges.push({
				x : x,
				y : y,
				rows : {
					row : row,
					x : x,
					y : y
				} 
			});

			interval = y;

		// debugger;
			count = interval;
		}

		return {
			ledges : ledges,
			otherLedges : otherLedges
		};
	}


	function makeLedge(context){
		if (context.currentSide === 'left') {
			var next = rand.randomArgs('right', 'rightanddown', 'middle');
			
		}	
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
		for(var i = start+1; i< tiles.length; i++){
				tiles[i][0] = 5;
				tiles[i][tiles[0].length -1] = 5;
		}
	}


	return {
		buildMap : function(theme, options, randomgenerator){

			var rand = randomgenerator;

			var mapDetails = {
				startAt : 7,
				width : 16,
				height :rand.nextInt(80, 100)
			}

			var tilecreator = new TileCreator(mapDetails.height, mapDetails.width, 0, theme);
			var tiles = tilecreator.getBlankMap(mapDetails.width, mapDetails.height).tiles;
			
			var sectioncreator = new SectionCreator(tiles);

			// var ledges = createRandomLedges(rand, tiles, mapDetails.width);
				// ledges.forEach(sectioncreator.apply, sectioncreator);

			var ledges = CreateLedges2(rand, tiles, mapDetails);
			ledges.ledges.forEach(sectioncreator.apply, sectioncreator);
			ledges.otherLedges.forEach(function(l){
				sectioncreator.applyArray(l.rows);
			});
				

			CreateSides(tiles, mapDetails.startAt);

			return {
				tiles : tiles,
				backgroundColor : theme.background,
				direction : 1 // 0 for LR, 1 for topdown, 2 for RL, 3 for anything
			};
		}	
	};
});
