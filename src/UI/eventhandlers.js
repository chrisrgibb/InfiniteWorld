define(function(require){



	var optionsManager = null;

    return  {
		/**
		 * STOP LYING!!!
		 */
        init : function(optsman) {
			
			optionsManager = optsman;
			document.getElementById('start-button').addEventListener('click', function(){
				// startGame();
				console.log(userdef);
				Game.startGame();
			
			});	

            var rangeSlider = document.getElementById('range');
			rangeSlider.addEventListener('change', function(){
				localStorage['infinite.alexkidd.randomSeed'] = this.value;
				document.getElementById('randomSeed').value = rangeSlider.value;

				var opss = optionsManager.getMany(['randomSeed', 'generateRandomLevel']);

				Game.init({
					isRandom : opss.generateRandomLevel,
					seedValue : opss.randomSeed
				});

			});

			var checkbox = document.getElementById('checkbox-isRandom');
			checkbox.checked = optionsManager.get('generateRandomLevel');
			//checkbox.checked = localStorage['infinite.alexkidd.generateRandomLevel'] === "true";

			checkbox.addEventListener('change', function() {
				var generateRandom = this.checked;
				optionsManager.update('generateRandomLevel', generateRandom);
				optionsManager.update('generateRandomLevel', generateRandom);
				// localStorage['infinite.alexkidd.generateRandomLevel'] = generateRandom;
			});

			//RANDOM SEEd
			var randomSeedValueBox = document.getElementById('randomSeed');
			randomSeedValueBox.value = optionsManager.get('randomSeed') || 0;

			randomSeedValueBox.addEventListener('change', function() {
				optionsManager.update('randomSeed', this.value);
				Game.init();
			});

			// Random Seed slider
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