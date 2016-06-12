require(['main', 'hbs!UI/templates/controlpanel'], function (main, templo) {
	document.getElementById('start-button').addEventListener('click', function(){
		// startGame();
		Game.startGame();
	});	

	Game.startGame();

});

