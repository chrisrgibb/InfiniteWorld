define(['./gameobject'] ,function(GameObject){
	/***
	 *	RING
	 *
	 ***/

	function Ring(x, y){
		this.x = x*16;
		this.y = y*16;
		this.timer = 0;
		this.tilenumber = 2;
	}

	Ring.prototype = new GameObject();

	Ring.prototype.process = function(player){
		player.inventory.ring = true;
		this.remove = true;
	};
	return Ring;
});