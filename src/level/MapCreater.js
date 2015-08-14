define(['./Map', '../game/objects/MoneyBag', '../game/enemies/enemyfactory'],
function(Map, MoneyBag, EnemyFactory){

	var MapCreater = function(){
	};

	MapCreater.prototype = {
		createMap : function(){
			var map = new Map({
				tiles : this.getTiles(),
				backgroundColor : "#0000ff",
				enemies : this.getEnemies(),
				objects : this.getObjects()
			});

			return map;
		},

		getTiles : function(){
			return [
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
				[5,5,5,2,3,0,0,0,0, 0,0,8,0,11,8,5],
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
		},

		getEnemies : function(){
			return [
				EnemyFactory.getBird(1, 1),
				EnemyFactory.getBird(4, 19),
				EnemyFactory.getBird(8, 26),
				EnemyFactory.getBird(4, 34),
				EnemyFactory.getBird(8, 37),
				EnemyFactory.getBird(6, 46),
				EnemyFactory.getBird(8, 50),
				EnemyFactory.getScorpion(4,6)
			];
		},

		getObjects : function(){
			return [
				new MoneyBag(7, 45), 
			    new MoneyBag(2, 48),
			    new MoneyBag(8, 62),
			    new MoneyBag(2, 78),
			    new MoneyBag(2, 79),
			];
		}
	};

	return MapCreater;

});

