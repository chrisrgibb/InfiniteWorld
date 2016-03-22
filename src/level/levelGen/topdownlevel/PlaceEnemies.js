define(function(require){
	var EnemyFactory = require('../../../game/enemies/enemyfactory');


	function placeEnemies (ledges, tiles, rand) {
		var enemies = [];
		ledges.forEach(function(ledge, index){
			if( index > 0){
				var potentialX = ledge.x + 2; 
				var potentialY = ledge.y - 1;
				enemies.push(EnemyFactory.getBird(potentialX, potentialY));
			}
		});
		return enemies;
	}

	return {
		placeEnemies : placeEnemies
	};

});