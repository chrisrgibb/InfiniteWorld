var MapCreater = function(){


}

MapCreater.prototype = {
	createMap : function(){
		var map = new Map({
			tiles : this.getTiles()
		});

		map.enemys  = this.getEnemies();
		map.objects = this.getObjects();
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
			new Enemy(4, 3),
			new Enemy(4, 19),
			new Enemy(8, 26),
			new Enemy(4, 34),
			new Enemy(8, 37),
			new Enemy(8, 46),
			new Enemy(8, 50),
			new Scorpion( 4,6)
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