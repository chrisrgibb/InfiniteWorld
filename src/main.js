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


define([ './game/Game','./extras/Debugger', './graphics/requestanimationframe'] ,
	
	function(Game, Debugger){
	
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
		Game.init();
	});

	document.getElementById('randomLevel').addEventListener('click', function(){
		var randomNumber = Math.random() * 100000 | 0;
		randomSeedValueBox.value = randomNumber;
		localStorage['infinite.alexkidd.randomSeed'] = randomNumber;
		Game.init();
	});

	
});