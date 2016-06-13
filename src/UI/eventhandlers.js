define(function(){

    return  {
		/**
		 * STOP LYING!!!
		 */
        init : function() {

			document.getElementById('start-button').addEventListener('click', function(){
				// startGame();
				Game.startGame();
			});	

            var rangeSlider = document.getElementById('range');
			rangeSlider.addEventListener('change', function(){
				localStorage['infinite.alexkidd.randomSeed'] = this.value;
				document.getElementById('randomSeed').value = rangeSlider.value;
				Game.init();

			});

			var checkbox = document.getElementById('checkbox-isRandom');
			checkbox.checked = localStorage['infinite.alexkidd.generateRandomLevel'] === "true";

			checkbox.addEventListener('change', function() {
				var generateRandom = this.checked;
				localStorage['infinite.alexkidd.generateRandomLevel'] = generateRandom;
			});

			var randomSeedValueBox = document.getElementById('randomSeed');
			randomSeedValueBox.value = parseInt(localStorage['infinite.alexkidd.randomSeed'] || 0);
			randomSeedValueBox.addEventListener('change', function() {
				localStorage['infinite.alexkidd.randomSeed'] = this.value;
				Game.init();
			});

			document.getElementById('randomLevel').addEventListener('click', function() {
				var randomNumber = Math.random() * 100000 | 0;
				randomSeedValueBox.value = randomNumber;
				localStorage['infinite.alexkidd.randomSeed'] = randomNumber;
				Game.init();
			});

			var directionToggle = document.getElementById('select-direction');
			directionToggle.value = localStorage["infinite.alexkidd.direction"] === "1" ?  "vertical" : "horizontal";
			// directionToggle.value = LocalStorageAdapter.get('direction') === "1" ? "vertical" : "horizontal";
			
			directionToggle.addEventListener('change', function(){
				options.direction = this.value === "vertical" ? 1 : 0;
			// 	LocalStorageAdapter.update('direction', options.direction);
			});
        }
    };

});