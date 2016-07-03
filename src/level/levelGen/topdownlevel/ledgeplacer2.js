define(function(require, exports, module) {

	var createLedge = require('./ledge').create;
	var applyLedge = require('./utils').applyLedge;

	var LedgePlacer = function (options, tiles, theme) {
		this.gameOptions = options;
		

		this.makeLedges = function(tiles, rand, theme, mapDetails){

			var startY = mapDetails.topDownOptions.startAt

			var ledges = [];


			var placedLedges = [];
			var startLedge = createLedge(1, startY, 5, "left");

			placedLedges.push(startLedge);

			if(rand.nextInt(0,1) > 0){
				placedLedges.push(createLedge(10, startY, 5, "right" ));
			}

			var lastPlacedLedge = placedLedges[placedLedges.length-1];

			var lastX = lastPlacedLedge.x;
			var lastY = lastPlacedLedge.y + lastPlacedLedge.height;

			


			placedLedges.forEach(function(l){
				applyLedge(l, tiles);
			});

			return placedLedges;

		}

	};

	module.exports = LedgePlacer;

});