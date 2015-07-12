define(['./GameObject'],function(GameObject){
	function MoneyBag(x, y, tilenumber){
		this.x = x*16;
		this.y = y*16;
		this.timer = 0;
		this.cost = 0;
		if(tilenumber===undefined){
			this.tilenumber = 0;
			this.cost = 10;
		}else if(Math.random()> 0.5){
			this.tilenumber =0;
			this.cost = 20;
		} else {
			this.tilenumber = 1;
			this.cost = 10;
		}

	}

	MoneyBag.prototype = new GameObject();

	MoneyBag.prototype.process = function(player){
		player.inventory.money += this.cost;
		this.remove = true;
	};

	return MoneyBag;
});
