function Camera(){

	this.x = 0;
	this.y = 0;
	this.minY = 0;

};


Camera.prototype.update = function(){

		// console.log(this.x - player.x);
		// console.log(this.y - player.y);
	var newY = player.y - level.screenHeight/2 | 0;
	if(newY > this.y){
		this.y = newY;
	}
	
	this.x = player.x - level.screenWidth /2 | 0;
	// this.minY = this.y;

	// if(this.y > this.minY){
	// 	this.minY = this.y;
	// }


	if(this.y < 0 ){
		this.y = 0;
	}
	if(this.y + level.screenHeight > map.getHeight() * 16){
		this.y = map.getHeight() * 16 - level.screenHeight;
	}

	if(this.x < 0){
		this.x = 0;
	}
	if(this.x + level.screenWidth > map.getWidth() * 16){
		this.x = map.getWidth() * 16 - level.screenWidth;
	}


}