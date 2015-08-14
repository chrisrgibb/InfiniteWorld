define(['./Enemy', './Ghost', './Scorpion'],
function(Enemy, Ghost, Scorpion){



	return {
		getScorpion : function (x, y) {
			return new Scorpion(x, y);
		},
		getBird : function(x, y) {
			return new Enemy(x, y);
		}
	}

})