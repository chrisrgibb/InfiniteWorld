function Camera(){

	this.x = 0;
	this.y = 0;

};


Camera.prototype.update = function(){

		// console.log(this.x - player.x);
		// console.log(this.y - player.y);
	this.y = player.y - level.screenHeight/2 | 0;
	if(this.y < 0 ){
		this.y = 0;
	}
	if(this.y > 0){
		// console.log('asd');
		console.log(this.y)
	}

}