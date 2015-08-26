define(['./Enemy', './Ghost', './Scorpion', './Frog'],
function(Enemy, Ghost, Scorpion, Frog){


	return {
		getScorpion : function (x, y) {
			return new Scorpion(x, y);
		},
		getBird : function(x, y) {
			return new Enemy(x, y);
		},
		getFrog : function(x, y) {

		}
	}

});