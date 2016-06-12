requirejs.config({
    //By default load any module IDs from js/lib
    baseUrl: 'src',
    //except, if the module ID starts with "app",
    //load it from the js/app directory. paths
    //config is relative to the baseUrl, and
    //never includes a ".js" extension since
    //the paths config could be for a directory.
    paths: {
        app: '../app',
		hbs: '../node_modules/require-handlebars-plugin/hbs'
    }
});

// global variables whoop
var	CONSTANTS = {
		scale : 2,
		haveScaled : false
	};

require(['main', 'hbs!UI/templates/controlpanel', 'UI/UI'], function (main, templo) {

	document.getElementById('cp2').innerHTML = templo();

	document.getElementById('start-button').addEventListener('click', function(){
		// startGame();
		Game.startGame();
	});	

	main.init();
	main.addEventListeners();

	Game.startGame();

});

