// global variables whoop

var WIDTH,
	HEIGHT,
	debug,
	COUNTER = 0,
	CONSTANTS = {
		scale : 2
	},
	haveScaled = false;

var gamepadSupportAvailable = !!navigator.webkitGetGamepads || !!navigator.webkitGamepads;

(function() {
    var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
    window.requestAnimationFrame = requestAnimationFrame;
})();


define([ './game/Game','./extras/Debugger'] ,function(Game, Debugger){
	
	function init(){

		// camera = new Camera();
		debug = new Debugger();
		window.Game = Game;

	}

	init();

	var rangeSlider = document.getElementById('range');
	rangeSlider.addEventListener('change', function(){
		init(rangeSlider.value);
	});

	var checkbox = document.getElementById('checkbox-isRandom');
	checkbox.checked = localStorage['infinite.alexkidd.generateRandomLevel'] === "true";

	checkbox.addEventListener('change', function(){
		var generateRandom = this.checked;
		localStorage['infinite.alexkidd.generateRandomLevel'] = generateRandom;
	});

	var randomSeedValueBox = document.getElementById('randomSeed');
	randomSeedValueBox.value = parseInt(localStorage['infinite.alexkidd.randomSeed'] || 0);
	randomSeedValueBox.addEventListener('change', function(){
		localStorage['infinite.alexkidd.randomSeed'] = this.value;
	});
});