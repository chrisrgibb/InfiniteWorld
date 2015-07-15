
function RiceBall(x, y){
	this.x = x*16;
	this.y = y*16;
	this.timer = -1;
	this.tilenumber = 4;

}

RiceBall.prototype = new GameObject();

RiceBall.prototype.process = function(){
	alert("End levelRenderer!!!");
	this.remove = true;
};



function Life(x, y){
	this.x = x * 16;
	this.y = y * 16;
	this.timer = 0;
	this.tilenumber = 3;
}

Life.prototype = new GameObject();

Life.prototype.process = function(player){
	player.inventory.lives += 1;
	this.remove = true;
};




//  Shockwave Protectile


