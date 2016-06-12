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

require(['hbs!UI/templates/controlpanel', 'UI/UI'], function (templo, UI) {

	document.getElementById('cp2').innerHTML = templo();
    
	UI.init();

});

