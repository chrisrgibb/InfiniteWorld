requirejs.config({
    //By default load any module IDs from src
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

/// reference requirejs.d.ts
require(['UI/UI'], function (UI) {

    /**
     * start the UI and the game
     */
	UI.init();

});

